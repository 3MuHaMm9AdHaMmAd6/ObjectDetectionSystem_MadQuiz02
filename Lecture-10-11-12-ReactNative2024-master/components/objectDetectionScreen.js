import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';
import * as jpeg from "jpeg-js";

let modelPromise = null;

const loadModel = async () => {
  if (!modelPromise) {
    modelPromise = mobilenet.load();
  }
  return modelPromise;
};

export default async function classifyUsingMobilenet(imageUri) {
  try {
    console.log("Method is called with image URI:", imageUri);
    await tf.ready();
    
    tf.setBackend("wasm");
    
    // Load MobileNet model (if not already loaded)
    const model = await loadModel();
    console.log("Model loaded successfully");

    // Read the image as base64 string
    const imgBase64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Decode base64 string to image buffer
    const rawImageData = tf.util.encodeString(imgBase64, 'base64').buffer;

    // Convert image buffer to tensor
    const imageTensor = await convertImageToTensor(rawImageData);

    // Classify the tensor and return the identified object with the highest probability
    const predictions = await model.classify(imageTensor);

    console.log("Predictions:", predictions);

    let maxPrediction = null;

    // Find the prediction with the highest probability
    predictions.forEach(prediction => {
      if (!maxPrediction || prediction.probability > maxPrediction.probability) {
        maxPrediction = prediction;
      }
    });

    // Check if the highest probability exists
    if (maxPrediction) {
      const identifiedObject = {
        className: maxPrediction.className,
        probability: maxPrediction.probability.toFixed(3),
        boundingBox: maxPrediction.boundingBox, // Add bounding box data
      };
      console.log('Identified object:', identifiedObject);
      return [identifiedObject]; // Return as an array for consistency with previous implementation
    } else {
      console.log('No object found.');
      return [];
    }
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}
const convertImageToTensor = async (rawImageData) => {
  try {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);

    // Downscale the image
    const scaleFactor = 0.5; // You can adjust this value
    const scaledWidth = Math.floor(width * scaleFactor);
    const scaledHeight = Math.floor(height * scaleFactor);

    // Create a smaller buffer
    const buffer = new Uint8Array(scaledWidth * scaledHeight * 3);
    let offset = 0;

    // Copy pixel data from the original image to the smaller buffer
    for (let y = 0; y < scaledHeight; y++) {
      for (let x = 0; x < scaledWidth; x++) {
        const originalX = Math.floor(x / scaleFactor);
        const originalY = Math.floor(y / scaleFactor);
        const originalOffset = (originalY * width + originalX) * 4;

        buffer[offset] = data[originalOffset]; // copies the red component of the pixel
        buffer[offset + 1] = data[originalOffset + 1]; //copies the red component of the pixel
        buffer[offset + 2] = data[originalOffset + 2]; //copies the red component of the pixel

        offset += 3;
      }
    }
    console.log("Buffer Length", buffer.length);
    console.log("Buffer entries", buffer.slice(0, 1000));

    return tf.tensor3d(buffer, [scaledHeight, scaledWidth, 3]);
  } catch (error) {
    console.error("Error converting image to tensor:", error);
  }
};
