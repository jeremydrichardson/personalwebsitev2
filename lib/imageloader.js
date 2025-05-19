const sizes = {
    'phone': 480,
    'tablet-portrait': 800,
    'tablet-landscape': 1024,
    'desktop': 1280,
    'desktop-large': 1440,
};

export default function customImageLoader({ src, width }) {
    // Determine the next size up based on the requested width
    const sizeKeys = Object.keys(sizes);
    let selectedWidth = sizes['desktop-large']; // Default to the largest size

    for (const key of sizeKeys) {
        if (width <= sizes[key]) {
            selectedWidth = sizes[key];
            break;
        }
    }

    // Extract the file extension from the source
    const fileExtension = src.split('.').pop();
    const fileName = src.replace(`.${fileExtension}`, '');

    // Construct the URL
    const url = `https://wp.jeremyrichardson.dev/wp_image_service/${fileName}-${selectedWidth}.${fileExtension}`;

    return url;
}