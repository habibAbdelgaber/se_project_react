const imageMap = [
  {
    name: 'Avatar Off',
    image: new URL('../assets/images/avatar-off.png', import.meta.url).href,
  },
  {
    name: 'Avatar On',
    image: new URL('../assets/images/avatar-on.png', import.meta.url).href,
  },
  {
    name: 'WTWR',
    image: new URL('../assets/images/wtwr.png', import.meta.url).href,
  },
  {
    name: 'Close Icon',
    image: new URL('../assets/images/close-icon.png', import.meta.url).href,
  },
];

/**
 * Get image by key with fallback to ''
 * @param {string} key - The key to look up the image.
 * @returns {string} - The image URL or an empty string if not found.
 */

export function getImage(key) {
  return (
    imageMap.find((item) => item.name === key) || {
      name: 'Unknown Image',
      image: '',
    }
  );
}
