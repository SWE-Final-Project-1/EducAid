from flask import Blueprint
import ai21
from config.config import Config
from constants.LLM_config import (
    SYSTEM_INSTRUCTIONS,
    AI_ROLE,
)

grade = Blueprint("grade", __name__)
ai21.api_key = Config.LLM_API_KEY


@grade.route("/", methods=["POST"])
def auto_grade():
    try:
        req = json.loads(request.data)

        course_information = req.get("courseInformation")
        rubric = req.get("rubric")
        assignment_instructions = req.get("assignmentInstructions")
        essay = req.get("essay")
        
        if not (course_information or rubric or assignment_instructions or essay):
            return {'msg': 'Please provide all required fields'}, 400

        prompt = f"""
            System Instructions:
            {SYSTEM_INSTRUCTIONS}

            AI_ROLE:
            {AI_ROLE}

            Course Information:
            {course_information}

            Rubric:
            {rubric}

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

        return {"response": response.completions[0].data.text}, 200
    except Exception as e:
        print(e)

