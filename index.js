// require is Node.js function and it does not work in browser. Use native import syntax to import API KEY for security reason.
// require('dotenv').config();

const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=dogs&limit=25&offset=0&rating=g&lang=en`;


const images = [];

async function getImages() {
    const response = await fetch(endpoint);
    const data = await response.json();

    // Populate the images array
    for (let i = 0; i < data.data.length; i++) {
        images.push(data.data[i]);
    }

    // Display images
    displayImages(images);
}

function displayImages(images) {
    const container = document.getElementById('image-container');
    container.innerHTML = ''; // Clear any existing content

    images.forEach(imageData => {
        const img = document.createElement('img');
        img.src = imageData.images.fixed_height.url; // Use the fixed height image URL
        img.alt = imageData.title || 'GIF'; // Set alt text if available
        container.appendChild(img); // Append the image to the container
    });
}

// Export the function if using modules
export { getImages };

// Add an event listener to the button after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('fetch-button');
    button.addEventListener('click', getImages);
});
