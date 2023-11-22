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
def sendLLM_request():
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


    

app.run(debug=True)