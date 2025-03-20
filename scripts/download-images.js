const https = require('https');
const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Image URLs from Unsplash (more reliable)
const images = [
  {
    url: 'https://www.apple.com/newsroom/images/2024/01/apple-vision-pro-available-in-the-us-on-february-2/article/Apple-Vision-Pro-availability-hero_big.jpg.large.jpg',
    filename: 'vision-pro-1.jpg'
  },
  {
    url: 'https://www.apple.com/newsroom/images/media/introducing-apple-vision-pro/Apple-WWDC23-Vision-Pro-glass-230605_big.jpg.large.jpg',
    filename: 'vision-pro-2.jpg'
  },
  {
    url: 'https://helios-i.mashable.com/imagery/articles/05C26nDWFCvZ4VxpyH4F1pV/hero-image.fill.size_1248x702.v1686038564.png',
    filename: 'vision-pro-3.jpg'
  }
];

// Download function with headers
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    https.get(url, options, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(path.join(imagesDir, filename));
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded: ${filename}`);
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(new Error(`Error downloading ${filename}: ${err.message}`));
    });
  });
}

// Download all images with retry logic
async function downloadAllImages() {
  const maxRetries = 3;
  const retryDelay = 1000; // 1 second

  for (const image of images) {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        await downloadImage(image.url, image.filename);
        break;
      } catch (error) {
        retries++;
        if (retries === maxRetries) {
          console.error(`Failed to download ${image.filename} after ${maxRetries} attempts:`, error);
        } else {
          console.log(`Retrying download of ${image.filename} (attempt ${retries + 1}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }
  }
  console.log('Download process completed!');
}

downloadAllImages();