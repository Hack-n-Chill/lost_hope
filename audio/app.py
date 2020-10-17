from flask import Flask, send_file, after_this_request, jsonify
from flask.globals import request
from flask_cors import CORS, cross_origin
import json
from voice import inference
import random, os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

hashes = {}
chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"


@app.route('/')
@cross_origin()
def home():
    return "Hello Team Lost Hope"


@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    data = ''
    if request.method == 'POST':
        if request.get_data() is not None:
            data = request.get_data()
            data= json.loads(data)
        else:
            return app.response_class(
                response=json.dumps({"status": "Invalid input"}),
                status=400,
                mimetype='application/json'
            )
    else:
        return app.response_class(
            response=json.dumps({"status": "Method not allowed"}),
            status=405,
            mimetype='application/json'
        )

    # print(data)
    dat = ''
    while True:
        dat = ''.join(random.sample(chars, 16))
        if hashes.get(dat) is None:
            hashes[dat] = 1
            break
    # print(dat)
    inference.predict(data.get('text', 'sorry no data found'), f'audio/{dat}')

    @after_this_request
    def cleanup(res):
        try:
            for f in sorted(os.listdir('audio/')):
                if dat in f:
                    os.remove(f'audio/{f}')
            os.remove(f'audio/{dat}.wav')
            hashes.pop(dat)
        except Exception as e:
            pass
        return res

    return send_file(f'audio/{dat}.wav', as_attachment=True)
    # res= app.response_class(
    #     response=json.dumps({"status":"200"}),
    #     status=200,
    #     mimetype='application/json'
    # )
    # return res


if __name__ == "__main__":
    app.run(debug=True, port=8080)
