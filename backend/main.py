import ifem_award_api
import json

QUEUE_PATH = "backend/queue/"

# Creates a random patient json with its id as the name and adds it to the queue directory
test = ifem_award_api.patients.generate_mock_patient()
testjson = test.serialize()
f = open("{}{}_{}.json".format(QUEUE_PATH, testjson["id"], testjson["triage_category"]), "w")
json.dump(testjson, f)
f.close()
