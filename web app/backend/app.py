from flask import Flask, request, jsonify
from flask_cors import CORS
import librosa
import numpy as np
import tensorflow as tf
import os
from tensorflow.image import resize

#! Disable Tensorflow logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

import warnings
warnings.filterwarnings("ignore")

#! Create a Flask app
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

model = tf.keras.models.load_model("Trained_model.h5")
classes = ['blues', 'classical', 'country', 'disco', 'hiphop', 'jazz', 'metal', 'pop', 'reggae', 'rock']

#! Function to load and preprocess the audio data for prediction
def load_and_preprocess_data(file_path, target_shape=(210, 210)):
    data = []
    audio_data, sample_rate = librosa.load(file_path, sr=None)
    chunk_duration = 4
    overlap_duration = 2

    chunk_samples = chunk_duration * sample_rate
    overlap_samples = overlap_duration * sample_rate

    num_chunks = int(np.ceil((len(audio_data) - chunk_samples) / (chunk_samples - overlap_samples))) + 1

    for i in range(num_chunks):
        start = i * (chunk_samples - overlap_samples)
        end = start + chunk_samples
        chunk = audio_data[start:end]

        if len(chunk) < chunk_samples:
            continue

        mel_spectrogram = librosa.feature.melspectrogram(y=chunk, sr=sample_rate)
        mel_spectrogram = resize(np.expand_dims(mel_spectrogram, axis=-1), target_shape)

        data.append(mel_spectrogram)

    return np.array(data)

#! Function to make predictions using the model
def model_prediction(X_test):
    y_pred = model.predict(X_test)
    predicted_categories = np.argmax(y_pred, axis=1)
    unique_elements, counts = np.unique(predicted_categories, return_counts=True)

    max_count = np.max(counts)
    max_elements = unique_elements[counts == max_count]

    return max_elements[0] if max_elements.size > 0 else None

@app.route('/')
def index():
    return 'Welcome to MelodyNet'

@app.route('/predict', methods=['POST'])
#! Function to handle the prediction request from the frontend application
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    # Create the uploads folder if it does not exist
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    try:
        file.save(file_path)
        X_test = load_and_preprocess_data(file_path)

        if X_test.size == 0:
            return jsonify({'error': 'No valid audio data to process'}), 400
        pred = model_prediction(X_test)

        if pred is None:
            return jsonify({'error': 'No prediction made'}), 500
        return jsonify({'prediction': classes[pred]})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/clear-uploads', methods=['POST'])
#! Function to clear the uploads folder after the prediction request
def clear_uploads():
    try:
        for filename in os.listdir(UPLOAD_FOLDER):
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            os.remove(file_path)  # Remove the file
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
