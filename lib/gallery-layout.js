import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { imageSize } from 'image-size';

// Determine layout while building, so lazy loading cannot change the image order.
export function galleryRows(gallery = [], inputPath) {
  const groups = new Map();
  for (const image of gallery) {
    const dimensions = imageSize(readFileSync(resolve(dirname(inputPath), image.src)));
    const rotated = dimensions.orientation >= 5 && dimensions.orientation <= 8;
    const width = rotated ? dimensions.height : dimensions.width;
    const height = rotated ? dimensions.width : dimensions.height;
    const ratio = width / height;
    const orientation = ratio < 1 ? 'portrait' : 'landscape';
    if (!groups.has(orientation)) groups.set(orientation, []);
    groups.get(orientation).push({ ...image, width, height, ratio });
  }
  const rows = [];
  for (const [orientation, images] of groups) {
    const limit = orientation === 'portrait' ? 4 : 3;
    const rowCount = Math.ceil(images.length / limit);
    let offset = 0;
    for (let i = 0; i < rowCount; i++) {
      // Balance rows: five portraits become a row of three and a row of two.
      const count = Math.ceil((images.length - offset) / (rowCount - i));
      const items = images.slice(offset, offset + count);
      const sum = items.reduce((total, image) => total + image.ratio, 0);
      rows.push({
        orientation,
        images: items,
        columns: items.map(image => `${image.ratio.toFixed(6)}fr`).join(' '),
        maxWidth: Math.round(Math.min(1080, sum * 340 + (count - 1) * 16))
      });
      offset += count;
    }
  }
  return rows;
}
