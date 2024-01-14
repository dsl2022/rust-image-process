
// Import the WASM module and the to_grayscale function
import init, { to_grayscale } from './pkg/image_process.js';

// Function to load and initialize the WASM module
async function loadWasm() {
  await init();
}

// Call loadWasm when the web application initializes
loadWasm().then(() => {
  console.log('WASM module loaded');
});
export function processImage(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    const grayscaleData = to_grayscale(imageData.data, width, height);
    const canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const rgbaData = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      rgbaData[i * 4] = grayscaleData[i];     // R
      rgbaData[i * 4 + 1] = grayscaleData[i]; // G
      rgbaData[i * 4 + 2] = grayscaleData[i]; // B
      rgbaData[i * 4 + 3] = 255;              // A
    }
    const outputImageData = new ImageData(rgbaData, width, height);
    ctx.putImageData(outputImageData, 0, 0);
  }
  
  document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(fileEvent) {
      const img = new Image();
      
      // The image is not fully loaded until this event fires
      img.onload = function() {        
        const canvas = document.getElementById('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        processImage(imageData);
      };
      
      // Setting the src property begins loading the image
      img.src = fileEvent.target.result;
    };
    reader.readAsDataURL(file);
  });
  

  loadWasm();