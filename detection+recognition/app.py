from flask import Flask, send_file, after_this_request, jsonify
from flask.wrappers import Response
from flask_cors import CORS, cross_origin
from flask.globals import request
import json
import random, os

from werkzeug.datastructures import Headers
import inference
import decontraction as dcn
import os
import requests

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

hashes = {}
chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
cache_Path='cache/'

def getUnique():
    dat = ''
    while True:
        dat = ''.join(random.sample(chars, 16))
        if hashes.get(dat) is None and os.path.exists(os.path.join(cache_Path, dat))==False:
            hashes[dat] = 1
            return dat

@app.route('/')
@cross_origin()
def home():
    return "Hello Team Lost Hope"


@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    data = []
    if request.method == 'POST':
        if 'pdf' in request.files:
            folder = os.path.join(cache_Path, getUnique())
            data.append(folder)
            os.mkdir(folder)
            # print(re)
            pdf = request.files['pdf']
            path = os.path.join(folder , pdf.filename)
            # pdf saved at path 
            pdf.save(path)
            data.append(pdf.filename)
            print(data)
        else:
            return app.response_class(
                response=json.dumps({"status": "Bad Request"}),
                status=400,
                mimetype='application/json'
            )
    else:
        return app.response_class(
            response=json.dumps({"status": "Invalid Method"}),
            status=405,
            mimetype='application/json'
        )
    
    textStream = inference.getText(data)
    text = ' '.join([v for v in textStream.values()])
    text = dcn.decontract(text)
    
    audioAPI = os.getenv('TTSRoute')
    response = requests.post(url=audioAPI, data=json.dumps({'text': text}), headers ={'content-type': 'application/json'})
    
    with open(data[0]+'/a.wav', 'wb') as f:
        f.write(response.content)


    return send_file(data[0]+'/a.wav', as_attachment=True)

if __name__ == '__main__':
    app.run()        



#  app.response_class(
            #     response=json.dumps({"text": text}),
            #     status=200,
            #     mimetype='application/json'
            # )