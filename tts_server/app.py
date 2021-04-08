from flask import Flask, request,send_file
from flask_restx import Api, Resource 
from eval import main, init
import torch

app = Flask(__name__)  
api = Api(app)  

@api.route('/tts')
class ttspost(Resource):
    def post(self):
        params = request.get_json(force=True)
        path = params['path']
        word = params['word']

        main(path, word)
#        return word, 201
        filename = './result/temp.wav'
        return send_file(filename, mimetype='audio/wav')

if __name__ == "__main__":
    init()
    app.run(debug=True, host='192.168.219.104', port=8088)
