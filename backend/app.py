from flask import Flask, request, jsonify, make_response, send_file
import json
import os


QUEUE_PATH = "backend/queue/"


def load_json(json_path):
    json_file = open(json_path, "r")
    parsed_json = json.load(json_file)
    json_file.close()
    
    return parsed_json


def find_longest_by_triage(triage):
    highest = -1
    suffix = "{}.json".format(triage)

    for file in os.listdir(QUEUE_PATH):
        filename = os.fsdecode(file)
        if not filename.endswith(suffix):
            continue
        
        path = "{}{}".format(QUEUE_PATH, file)
        with open(path, 'r') as f:
            parsed_json = json.load(f)

        if (parsed_json["time_elapsed"] > highest):
            highest = parsed_json["time_elapsed"]
    
    return highest
    

app = Flask(__name__)

# /get-patient?id=<PATIENT ID>
@app.route('/get-patient', methods = ['GET'])
def get_patient():
    id = request.args.get("id")

    if (id.endswith(".json")):
        pass
    else:
        id = id + ".json"

    file_path = QUEUE_PATH + id

    if not os.path.exists(file_path):
        return jsonify({ "error" : "id not found"})
    
    longest_elapsed = find_longest_by_triage(id[-6])
    new_category = { "longest_elapsed_by_triage" : longest_elapsed }
    
    with open(file_path, 'r') as file:
        requested_data = json.load(file)

    requested_data.update(new_category)
    return jsonify(requested_data)



if __name__ == '__main__':  
     app.run()