import React from 'react';

const Documentation = () => {
    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-md max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-bold text-center underline mb-6">Music Genre Classification using Deep Learning</h1>

            <section className="mb-6">
                <h2 className="text-3xl font-semibold mb-4">Introduction</h2>
                <p className="text-lg">
                    In this project, we developed a <span className="font-bold">music genre classifier</span> that can identify the genre of an
                    audio file. Using deep learning techniques, specifically convolutional neural networks (CNNs), we built a model that can process
                    raw audio files, convert them into a suitable representation, and then classify them into one of the 10 genres in the GTZAN dataset.
                </p>
                <br></br>
                <p className="text-lg">
                    The GTZAN dataset includes 100 audio files, each 30 seconds long, for 10 different genres. The goal is to predict the genre of any given
                    audio file, potentially integrating the model into a web application for easy user interaction.
                </p>
                <br></br>
                <br></br>
            </section>

            <section className="mb-6">
                <h2 className="text-3xl font-semibold mb-4">Workflow of the Project</h2>

                <ol className="list-decimal pl-10">
                    <li className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Data Loading and Pre-processing</h3>
                        <p className="text-lg">
                            The first step in the workflow is to load the audio files. Using the <span className="font-bold">librosa</span> library, we load the audio files,
                            split them into 4-second chunks, and apply transformations to generate mel-spectrograms.
                        </p>
                    </li>

                    <li className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Model Architecture</h3>
                        <p className="text-lg">
                            A convolutional neural network (CNN) is used for classification. CNNs are highly effective for image-related tasks, and
                            mel-spectrograms are essentially images that represent the frequency content of audio. The model architecture consists of
                            several layers:
                        </p>
                        <ul className="list-disc pl-8 text-lg">
                            <li><span className="font-bold">Convolutional Layers (Conv2D)</span>: These layers extract features from the mel-spectrogram using filters of varying sizes.</li>
                            <li><span className="font-bold">Max Pooling Layers (MaxPool2D)</span>: These layers reduce the dimensionality of the feature maps, making the model computationally efficient.</li>
                            <li><span className="font-bold">Flatten Layer</span>: This layer converts the 2D feature maps into a 1D vector.</li>
                            <li><span className="font-bold">Dense Layers</span>: These layers perform fully connected operations to make predictions.</li>
                            <li><span className="font-bold">Dropout Layers</span>: These layers prevent overfitting by randomly deactivating neurons during training.</li>
                        </ul>
                        <p className="text-lg">The final output layer uses a softmax activation function to produce a probability distribution over the possible genres.</p>
                    </li>

                    <li className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Model Training and Evaluation</h3>
                        <p className="text-lg">
                            The model is trained on the training set, and its performance is evaluated on a separate test set using metrics such as
                            accuracy, precision, recall, F1-score, and a confusion matrix. After training, the model is tested with new audio files to
                            assess how well it generalizes to unseen data.
                        </p>
                    </li>
                </ol>
                <br></br>
            </section>


            <section className="mb-6">
                <h2 className="text-3xl font-semibold mb-4">Why Pre-process Audio Data?</h2>
                <p className="text-lg">
                    Audio data is inherently complex and challenging to process directly. Raw audio signals are often noisy, containing a broad range of
                    frequencies that can overwhelm a neural network. To address this, we preprocess the audio data, making it more manageable for the
                    model to learn meaningful patterns.
                </p>
                <br></br>
                <ol className="list-decimal pl-7">
                    <li className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Audio Chunking</h3>
                        <p className="text-lg">
                            Raw audio is divided into 4-second chunks with a 2-second overlap. This chunking process helps to enhance the visibility of
                            patterns within the audio, as it allows the network to focus on smaller, more digestible segments of the audio. This step is
                            essential for generating mel-spectrograms, which are crucial for the model's performance.
                        </p>
                    </li>
                    <li className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Mel-spectrogram</h3>
                        <p className="text-lg">
                            Mel-spectrograms are visual representations of the frequency content of audio signals. By converting audio signals into
                            mel-spectrograms, we transform the audio data into a format that is more suitable for deep learning models. This conversion
                            helps the model learn relevant features that can aid in genre classification.
                        </p>
                    </li>
                </ol>
                <br></br>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Mel-Spectrograms: An Overview</h2>
                <h3 className="text-xl font-semibold mb-2 pl-5">What is a Mel-Spectrogram?</h3>
                <p className="text-lg pl-7">
                    A mel-spectrogram is a time-frequency representation of an audio signal. It helps capture the characteristics of the audio signal in
                    a way that aligns with human perception of sound. The mel scale compresses higher frequencies, reflecting the fact that the human
                    ear is less sensitive to high-frequency changes.
                </p>
                <br></br>

                <h3 className="text-xl font-semibold mb-2 pl-5">How to Create a Mel-Spectrogram</h3>
                <ol className="list-decimal pl-8 space-y-2 text-lg pl-12">
                    <li><span className="font-bold">Time Domain Representation</span>: Start by plotting the amplitude of the audio signal against time.</li>
                    <li><span className="font-bold">Fourier Transform</span>: Convert the signal into the frequency domain using the Fast Fourier Transform (FFT), which breaks the signal into smaller, overlapping segments for analysis.</li>
                    <li><span className="font-bold">Logarithmic Scaling</span>: The y-axis is transformed to a logarithmic scale to represent how humans perceive sound.</li>
                    <li><span className="font-bold">Mapping to Mel Scale</span>: The frequencies are mapped onto the mel scale, ensuring the spectrogram aligns with human auditory perception.</li>
                </ol>
                <br></br>
                <br></br>
            </section>
        </div>
    );
};

export default Documentation;
