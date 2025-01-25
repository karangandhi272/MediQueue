from flask import Flask, request, jsonify, make_response, send_file
import json
import os


DATA_PATH = "backend/queue/"


def load_json(json_path):
    json_file = open(json_path, "r")
    parsed_json = json.load(json_file)
    json_file.close()
    
    return parsed_json


app = Flask(__name__)

# /get-patient?id=<PATIENT ID>
@app.route('/get-patient', methods = ['GET'])
def get_patient():
    id = request.args.get("id")
    file_path = "{}{}.json".format(DATA_PATH, id)

    if os.path.exists(file_path):
        with open(file_path, 'r') as data:
            parsed_json = data.read()
        
        return jsonify(parsed_json)
    
    else:
        return "none"



if __name__ == '__main__':  
    app.run()
