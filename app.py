# -*- coding: utf-8 -*-
"""
Created on Thu Apr  7 13:15:12 2016

@author: hjcyz1991
"""
import json
from flask import Flask, render_template, jsonify, request
from stock_scraper import get_data
from json_data import get_line_data
from json_data import get_table_data

#print(data)

app = Flask(__name__)

@app.route("/")
def main():
	data = get_table_data()
	return render_template("index.html", data = data)

@app.route("/json_data", methods=['GET', 'POST'])
def json_data():
	movie_name = request.args.get('movie', 0, type=str)
	print("!!!!!!!!!!!!!!!!!")
	print(movie_name)
	res = {'series' : []}
	res['series'].append(get_line_data(movie_name))
	return jsonify(res)

@app.route("/sChart")
def s_chart():
	return render_template("sChart.html")
    
if __name__ == "__main__":
    app.run()


