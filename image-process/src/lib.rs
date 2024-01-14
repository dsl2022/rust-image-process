use wasm_bindgen::prelude::*;

// Function to convert an image to grayscale
#[wasm_bindgen]
pub fn to_grayscale(image_data: &[u8], width: usize, height: usize) -> Vec<u8> {
    let mut gray_image = vec![0; width * height];

    for y in 0..height {
        for x in 0..width {
            let idx = y * width + x;
            let pixel = &image_data[idx * 4..(idx + 1) * 4]; // Assuming RGBA
            let gray_value = (0.3 * pixel[0] as f32 + 0.59 * pixel[1] as f32 + 0.11 * pixel[2] as f32) as u8;
            gray_image[idx] = gray_value;
        }
    }

    gray_image
}

