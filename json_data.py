from datetime import datetime, date
import time
import json
import csv
import requests

def get_line_data(movie_name):
	movie_name_query = movie_name
	result=[[],[]]
	with open('scott2016daily_scoreNsales.csv') as data_file:
		for line in csv.DictReader(data_file, skipinitialspace=True):
			date = time.mktime(datetime.strptime(line['date'], "%Y-%m-%d").timetuple())*1000
			score = 0
			text_pos = line['text pos']
			text_neg = line['text neg']
			if text_pos != '' and text_neg != '':
				score = float(text_pos) - float(text_neg)
			temp = [date, score]
			result[0].append(temp)
			result[1].append(temp)
		return result

def get_table_data():
	result = []
	with open('scott2016daily_scoreNsales.csv') as data_file:
		for line in csv.DictReader(data_file, skipinitialspace=True):
			name = "move name"
			volume = 1000
			sentiment = 0.55
			sales = "$100,000"
			result.append({
				"name" : name,
				"volume" : volume,
				"sentiment" : sentiment,
				"sales" : sales
				})
		return result
