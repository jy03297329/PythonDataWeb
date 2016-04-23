from datetime import datetime, date
import time
import json
import csv
import requests

def get_json_data():
    result={"data" : []}
    with open('tsla.csv') as data_file:
        for line in csv.DictReader(data_file, skipinitialspace=True):
            date = time.mktime(datetime.strptime(line['Date'], "%d-%b-%y").timetuple())*1000
            temp = [date, float(line['Close'])]
            result["data"].append(temp)
        return result