import csv
# import pandas as pd
from datetime import datetime

def get_slope(file_name):
	file = file_name
	len = 0
	x = []
	temp_count = 0
	temp_date = ""
	with open(file) as data_file:
		data = sorted(data, key = lambda row: datetime.strptime(row[0], "%d-%b-%y"))
		df = pd.read_csv(file)
		df = df.sort('date')
		for line in df:

	        # for line in csv.DictReader(data_file, skipinitialspace=True):
	        #     x.append(x[len] + line[''])
	        # return result