const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadFile(url: string, outputPath: string) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(outputPath, response.data);
    console.log(`Downloaded ${url} to ${outputPath}`);
  } catch (error) {
    console.error(`Error downloading ${url}: ${error}`);
  }
}

const filesToDownload = [
  'https://grid.space/code/engine.js',
  'https://grid.space/code/kiri_work.js',
  'https://grid.space/code/manifold.wasm',
];

filesToDownload.forEach(url => {
  const fileName = url.split('/').pop();
  const outputPath = path.join(__dirname, '../code', fileName || 'downloaded_file');
  downloadFile(url, outputPath);
});
