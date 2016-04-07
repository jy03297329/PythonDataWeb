# -*- coding: utf-8 -*-
"""
Created on Thu Apr  7 13:15:12 2016

@author: hjcyz1991
"""
from flask import Flask

app = Flask(__name__)

@app.route("/")
def main():
    return "Welcome!"
    
if __name__ == "__main__":
    app.run()
    