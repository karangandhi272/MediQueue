from ifem_award_api import patients
import json


# Creates a random patient json with its id as the name and adds it to the queue directory
def add_random_to_queue():
    test = patients.generate_mock_patient()
    testjson = test.serialize()
    f = open("queue/{}.json".format(testjson["id"]), "w")
    json.dump(testjson, f)
    f.close()
