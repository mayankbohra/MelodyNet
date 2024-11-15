# Music Genre Classification Using Deep Learning

## NOTE
The deployed model, named "model-1," has 11,402 trainable parameters and achieved an accuracy of 48.59% on the training set, while the validation set results were 46.71% accuracy.

Although I developed a more accurate "Final Model" that achieved 98.88% accuracy on the training set and 92.55% accuracy on the validation set, I was unable to deploy it due to its size—over 14 million trainable parameters. Render.com's free plan, which limits memory to 512 MB of RAM, could not accommodate the larger model.

To demonstrate my ML skills within the memory constraints, I deployed the smaller model instead. This project showcases not only my machine learning expertise but also my ability to develop and deploy a model effectively, demonstrating proficiency in creating a full-stack application that integrates an ML model.

## Introduction

Music genre classification is an exciting task that leverages machine learning to categorize audio files into different genres based on their acoustic features. This project develops a music genre classifier that accurately predicts the genre of an audio file. By using deep learning techniques, particularly Convolutional Neural Networks (CNNs), we process raw audio files, convert them into a suitable format, and classify them into one of the 10 genres in the GTZAN dataset.

The GTZAN dataset consists of 100 audio files (30 seconds each) from 10 distinct genres. The objective of this project is to build a model capable of predicting the genre of any given audio file, with the potential for integrating this model into a web application for easy user interaction.

## Why Pre-process Audio Data?

Audio data is complex and difficult to process directly. Raw audio signals are typically noisy and contain a wide range of frequencies, which may overwhelm the neural network. To mitigate this, we preprocess the audio data to make it more manageable for the model to extract meaningful patterns.

### Audio Chunking

Raw audio is divided into 4-second chunks with a 2-second overlap. This chunking process enhances pattern visibility by allowing the neural network to focus on smaller, digestible segments of the audio. This step is crucial for generating **mel-spectrograms**, which significantly improve model performance.

### Mel-Spectrograms

A mel-spectrogram is a time-frequency representation of an audio signal, displaying how its energy is distributed across different frequencies over time. Unlike traditional spectrograms, which use a linear frequency scale, mel-spectrograms utilize the **mel scale**, a frequency scale based on human auditory perception. This makes mel-spectrograms especially useful for music genre classification.

Mel-spectrograms are used as input to the CNN, which then learns to recognize patterns in the frequency content associated with different genres.

## Workflow

### 1. Data Loading and Pre-processing

The first step is loading the audio files using the `librosa` library. We split the audio into 4-second chunks, with a 2-second overlap, and apply transformations to generate mel-spectrograms for each chunk.

### 2. Model Architecture

A **Convolutional Neural Network (CNN)** is used for classification, as CNNs excel at tasks involving image-like data, and mel-spectrograms can be treated as images representing audio frequencies. The architecture includes the following layers:

- **Convolutional Layers (Conv2D)**: Extract features from the mel-spectrogram.
- **Max Pooling Layers (MaxPool2D)**: Reduce the size of the feature maps.
- **Flatten Layer**: Converts multi-dimensional feature maps into a one-dimensional vector.
- **Dense Layers**: Learn non-linear relationships between features.
- **Dropout Layers**: Prevent overfitting by randomly deactivating certain neurons during training.

The final layer uses a **softmax activation function** to output a probability distribution over the 10 possible genres.

### 3. Model Training and Evaluation

The model is trained on the training dataset, with performance evaluated on a separate test set using metrics such as **accuracy**, **precision**, **recall**, **F1-score**, and a **confusion matrix**. After training, the model is tested with new audio files to evaluate its ability to generalize.

## Mel-Spectrograms: An Overview

### What is a Mel-Spectrogram?

A mel-spectrogram is a time-frequency representation of an audio signal. It captures key features of the signal in a way that aligns with human auditory perception. The mel scale compresses higher frequencies to reflect the ear's reduced sensitivity to them.

### How to Create a Mel-Spectrogram

1. **Time Domain Representation**: Plot the amplitude of the audio signal over time.
2. **Fourier Transform**: Convert the signal into the frequency domain using the **Fast Fourier Transform (FFT)**.
3. **Logarithmic Scaling**: Use a logarithmic scale for the y-axis to better match human perception of sound.
4. **Mapping to Mel Scale**: Map the frequencies to the mel scale.

### Why Use Mel-Spectrograms?

Mel-spectrograms are essential for music genre classification as they:

- Provide a structured representation of the audio signal.
- Capture features that are relevant to genre classification.
- Allow CNNs to learn patterns corresponding to different musical genres.

## Neural Network Architecture

The CNN architecture consists of the following layers:

- **Conv2D (Convolutional Layers)**: Extract features from the input data using filters.
- **MaxPool2D (Max Pooling Layers)**: Reduce the size of feature maps, focusing on important features.
- **Flatten Layer**: Converts multi-dimensional feature maps into a one-dimensional vector.
- **Dense Layers**: Fully connected layers that learn complex relationships between features.
- **Dropout Layers**: Used to prevent overfitting by randomly disabling neurons during training.

The final **Dense layer** outputs a probability distribution over the 10 genres, using the **softmax activation function**.

### Padding in Conv2D Layers

Padding is applied in the convolutional layers to preserve the feature map size. There are two types of padding:

- **"Same" padding**: The output feature map has the same dimensions as the input.
- **No padding**: The feature map shrinks as the convolution progresses, capturing increasingly complex features.

### Model Summary

The `model.summary()` function provides a detailed overview of the model's architecture, including:

- Layer types (Conv2D, MaxPool2D, Flatten, Dense, Dropout).
- Output shape at each layer.
- The number of trainable and non-trainable parameters.

## Training and Evaluation

Once the model is built, it is trained using mel-spectrograms of audio chunks. The model's weights are adjusted based on the difference between the predicted and actual genres.

### Common Training Issues

One common challenge is ensuring that the **output shape of the model matches the shape of the labels**. To fix this, make sure the genre labels are one-hot encoded to match the number of classes in the output layer.

## Conclusion

In this project, we developed a music genre classifier using deep learning techniques, specifically Convolutional Neural Networks (CNNs). By transforming raw audio files into mel-spectrograms and using these as input to the model, the classifier can predict the genre of audio files from the GTZAN dataset. The project showcases the potential of deep learning in audio classification tasks such as music genre recognition.
