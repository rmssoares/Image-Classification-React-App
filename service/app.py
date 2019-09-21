from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
from sklearn.externals import joblib
import keras
from keras.applications.resnet50 import ResNet50
from keras.preprocessing import image
from keras.applications.resnet50 import preprocess_input, decode_predictions
import tensorflow as tf
import numpy as np


flask_app = Flask(__name__)
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "ML React App", 
		  description = "Predict results using a trained model")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params', 
				  {'file': fields.String(required = True, 
				  							   description="Image to predict", 
    					  				 	   help="Image cannot be blank")})

# classifier = joblib.load('classifier.joblib')
clf = ResNet50(weights='imagenet')
graph = tf.get_default_graph()

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)		
	def post(self):
		#try: 				
		formData = request.files.get('file','')
		img = image.load_img(formData, target_size=(224, 224))
		x = image.img_to_array(img)
		x = np.expand_dims(x, axis=0)
		x = preprocess_input(x)

		print('predicting...')
		with graph.as_default():
			preds = clf.predict(x)
		print('done')
		print('predicted', preds)
		# decode the results into a list of tuples (class, description, probability)
		# (one such list for each sample in the batch)
		pred_out = str(decode_predictions(preds, top=3)[0])
		print('Predicted:', )

		response = jsonify({
			"statusCode": 200,
			"status": "Prediction made",
			"result": "Prediction: " + pred_out  # str(data)
			})
		response.headers.add('Access-Control-Allow-Origin', '*')
		return response