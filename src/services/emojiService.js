export const generateEmojiPNG = async (emoji) => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set high resolution
  const size = 512; // Increased size for better quality
  canvas.width = size;
  canvas.height = size;
  
  // Clear canvas with transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Use a better font stack for emoji rendering
  const fontSize = Math.floor(size * 0.8); // 80% of canvas size
  ctx.font = `${fontSize}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Draw emoji
  ctx.fillText(emoji.emoji, canvas.width / 2, canvas.height / 2);
  
  // Create a new canvas for transparency optimization
  const optimizedCanvas = document.createElement('canvas');
  const optCtx = optimizedCanvas.getContext('2d');
  
  // Get the emoji bounds
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const bounds = getEmojiBounds(imageData);
  
  // Set optimized canvas size
  const padding = 20; // Add some padding around the emoji
  optimizedCanvas.width = bounds.width + (padding * 2);
  optimizedCanvas.height = bounds.height + (padding * 2);
  
  // Draw cropped emoji
  optCtx.drawImage(
    canvas,
    bounds.left, bounds.top, bounds.width, bounds.height,
    padding, padding, bounds.width, bounds.height
  );
  
  // Convert to PNG with transparency
  return optimizedCanvas.toDataURL('image/png');
};

// Helper function to get emoji bounds
function getEmojiBounds(imageData) {
  const { width, height, data } = imageData;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  
  // Scan the image data to find the emoji boundaries
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[((y * width + x) * 4) + 3];
      if (alpha > 0) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }
  
  return {
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1
  };
}

export const handleDownload = async (emojiData) => {
  try {
    const pngUrl = await generateEmojiPNG(emojiData);
    
    // Create download link
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `${emojiData.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error generating PNG:', error);
  }
}; 