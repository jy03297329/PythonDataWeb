# -*- coding: utf-8 -*-
"""
Created on Thu Apr  7 13:15:12 2016

@author: hjcyz1991
"""
from flask import Flask, render_template, jsonify
from stock_scraper import get_data



app = Flask(__name__)

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/data")
def data():
    return jsonify(get_data())
    
if __name__ == "__main__":
    app.run()


