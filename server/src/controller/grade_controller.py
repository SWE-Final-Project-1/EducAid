from flask import Blueprint, request
import ai21
from config.config import Config
from constants.LLM_config import (
    SYSTEM_INSTRUCTIONS,
    AI_ROLE,
    RUBRIC
)

from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
import os
import json
import time
import base64
import uuid

grade = Blueprint("grade", __name__)
ai21.api_key = Config.LLM_API_KEY
blob_service_client = BlobServiceClient.from_connection_string(Config.AZURE_STORAGE_CONNECTION_STRING)


@grade.route("/", methods=["POST"])
def auto_grade():
    try:
        req = json.loads(request.data)

        course_information = req.get("courseInformation")
        rubric = req.get("rubric")
        assignment_instructions = req.get("assignmentInstructions")
        assignment_file = base64.b64decode(req.get('file'))
        assignment_file_extension = req.get('fileExtension')    

        blob_client = blob_service_client.get_blob_client(container="educaid", blob=f"{uuid.uuid4().hex}.{assignment_file_extension}")
        blob_client.upload_blob(assignment_file)
        assignment_url = f"https://educaidblob.blob.core.windows.net/educaid/{blob_client.blob_name}"

        essay = extract_text(assignment_url)
        # print(essay)

        if not (course_information or rubric or assignment_instructions or essay):
            return {"msg": "Please provide all required fields"}, 400

        prompt = f"""
            System Instructions:
            {SYSTEM_INSTRUCTIONS}

            AI_ROLE:
            {AI_ROLE}

            Course Information:
            {course_information}

            Rubric:
            {RUBRIC}

            Assignment Instructions:
            {assignment_instructions}

            Essay:
            {essay}
            """
        response = ai21.Completion.execute(
            model="j2-ultra",
            prompt=prompt,
            numResults=1,
            maxTokens=1500,
            temperature=0.7,
            topP=1,
        )
        print(response.completions[0].data.text)

        response_dict = json.loads(response.completions[0].data.text)
        return {"response": response_dict}, 200
    except Exception as e:
        print(e)
        return {"msg": "An error occurred"}, 500


# @grade.route("/ocr", methods=["POST"])
def extract_text(file_data):
    subscription_key = Config.VISION_KEY 

    endpoint = Config.VISION_ENDPOINT

    computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))
    
    read_image_url = file_data
    
    read_response = computervision_client.read(read_image_url,  raw=True)
    
    # Get the operation location (URL with an ID at the end) from the response
    read_operation_location = read_response.headers["Operation-Location"]
    # Grab the ID from the URL
    operation_id = read_operation_location.split("/")[-1]

    # Call the "GET" API and wait for it to retrieve the results 
    while True:
        read_result = computervision_client.get_read_result(operation_id)
        if read_result.status not in ['notStarted', 'running']:
            break
        time.sleep(1)

    res = ""
    # Print the detected text, line by line
    if read_result.status == OperationStatusCodes.succeeded:
        for text_result in read_result.analyze_result.read_results:
            for line in text_result.lines:
                res += line.text + " " 
    return res 
    