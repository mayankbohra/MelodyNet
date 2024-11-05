import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';

const AudioUpload = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type !== 'audio/wav') {
      toast.error('Only .wav format files are accepted!');
      setFile(null);
    } else {
      setFile(selectedFile);
      setPrediction('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setLoading(false);

    if (data.prediction) {
      setPrediction(`The uploaded music is of '${data.prediction}' genre`);
    } else if (data.error) {
      toast.error(data.error);
    }
  };

  const handleClear = async () => {
    setFile(null);
    setPrediction('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    const response = await fetch('http://localhost:5000/clear-uploads', {
      method: 'POST',
    });

    const data = await response.json();
    if (data.success) {
      toast.success('Cleared Successfully');
    } else {
      toast.error('Error clearing uploads folder');
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-600 p-6 rounded-lg shadow-lg transition-all duration-300">
      <h2 className="text-2xl mb-4 font-semibold text-center">Upload Audio File</h2>
      <input
        type="file"
        accept="audio/wav"
        onChange={handleFileChange}
        className="block mb-4 p-2 border border-gray-300 rounded-lg w-full"
        ref={fileInputRef} 
      />
      {file && <p className="mb-4 text-gray-600">Selected file: {file.name}</p>}
      {!loading && !prediction && (
        <button
          onClick={handleUpload}
          className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
        >
          Upload
        </button>
      )}
      {loading && (
        <button
          disabled
          className="w-full p-3 bg-gray-500 text-white font-semibold rounded-lg transition duration-200"
        >
          Predicting...
        </button>
      )}
      {prediction && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg border border-green-300 transition-opacity duration-500">
          {prediction}
        </div>
      )}
      {prediction && (
        <button
          onClick={handleClear}
          className="mt-4 w-full p-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default AudioUpload;
