# -*- coding: utf-8 -*-
"""
Created on Thu Apr  7 13:15:12 2016

@author: hjcyz1991
"""
import json
from flask import Flask, render_template, jsonify, request
from stock_scraper import get_data
from content_management import data
from json_data import get_json_data

test = data()
test1 = get_json_data()

#print(data)

app = Flask(__name__)

@app.route("/")
def main():
	data = get_json_data()
	return render_template("index.html", data = test1)

# @app.route("/albums")
# def album():
# 	return render_template("albums.html", data = data)

# @app.route("/geographical")
# def geographical():
# 	return render_template("geographical.html")

@app.route("/data")
def data():
    return jsonify(get_data())

@app.route("/json_data", methods=['GET', 'POST'])
def json_data():
	name = request.args.get('movie', 0, type=str)
	res = {'series' : []}
	res['series'].append(get_json_data())
	return jsonify(res)

@app.route("/sChart")
def s_chart():
	return render_template("sChart.html")
    
if __name__ == "__main__":
    app.run()


