# import sys
# import threading
# from flask import escape 
import json
from flask import Flask, request, jsonify, Response
import requests
# from flask_cors import CORS
# import json

app = Flask(__name__)

@app.route('/')
def index():
    return "Jurassic LLM at your service"

#Send the LLM request, receive the response, write it into a file 
@app.route('/general_request', methods=['POST'])
def send_general_request():
    prompt = json.loads(request.data)
    response = requests.post(
        "https://api.ai21.com/studio/v1/j2-mid/complete",
        headers={
            "Authorization": "Bearer <Dummy token>",
            "Content-Type": "application/json"
        },
        data=json.dumps({
            "prompt": prompt['prompt'],
            "numResults": 1,
            "maxTokens": 30,
            "temperature": 0.7,
            "topKReturn": 0,
            "topP":1,
            "countPenalty": {
                "scale": 0,
                "applyToNumbers": False,
                "applyToPunctuations": False,
                "applyToStopwords": False,
                "applyToWhitespaces": False,
                "applyToEmojis": False
            },
            "frequencyPenalty": {
                "scale": 0,
                "applyToNumbers": False,
                "applyToPunctuations": False,
                "applyToStopwords": False,
                "applyToWhitespaces": False,
                "applyToEmojis": False
            },
            "presencePenalty": {
                "scale": 0,
                "applyToNumbers": False,
                "applyToPunctuations": False,
                "applyToStopwords": False,
                "applyToWhitespaces": False,
                "applyToEmojis": False
            },
            "stopSequences":["##"]
        })
    )

    # Process response
    response_data = response.json()

    ##Add error handling

    if not "./Responses.txt":
        with open('./data/Responses.txt', 'w') as fin:
            fin.write(response_data["completions"][0]["data"]["text"])
    else:
        with open('./data/Responses.txt', 'a') as fin:
            fin.write(response_data["completions"][0]["data"]["text"])


    # Return response data to client
    return jsonify(response_data["completions"][0]["data"]["text"]), 200

@app.route('/grammar_request', methods=['POST'])
def send_grammar_request():
    prompt = json.loads(request.data)
    
    response = requests.post(
        "https://api.ai21.com/studio/v1/gec",
        headers={
            "Authorization": "Bearer 7X7mvKNPEJ4eXieVoFsTISA2p0yGumA2",
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        data = json.dumps(prompt)
    )

    #TODO - Retrieve suggestions and locations in an array form?

    # Process response
    response_data = response.json()

    ##Add error handling

    # Return response data to client
    return jsonify(response_data), 200


@app.route("/improvement_request", methods = ["POST"])
def send_improvement_request():
    prompt = json.loads(request.data)
    
    response = requests.post(
        "https://api.ai21.com/studio/v1/improvements",
        headers={
            "Authorization": "Bearer 7X7mvKNPEJ4eXieVoFsTISA2p0yGumA2",
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        data = json.dumps(prompt)
    )

    #TODO - How to present and handle responses

    # Process response
    response_data = response.json()

    ##Add error handling

    # Return response data to client
    return jsonify(response_data), 200




@app.route("/segment_summarize", methods = ["POST"])
def send_segment_summarization_request():
    prompt = json.loads(request.data)
    
    response = requests.post(
        "https://api.ai21.com/studio/v1/summarize-by-segment",
        headers={
            "Authorization": "Bearer 7X7mvKNPEJ4eXieVoFsTISA2p0yGumA2",
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        data = json.dumps(prompt)
    )

    #TODO - How to present and handle responses

    # Process response
    response_data = response.json()

    ##Add error handling

    # Return response data to client
    return jsonify(response_data), 200





    

app.run(debug=True)