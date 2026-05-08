// Utility functions for the ecommerce app

const IMAGE_CDN_BASE = process.env.REACT_APP_IMAGE_CDN || 'https://d3jw6dk8gsduz3.cloudfront.net';

/**
 * Get the full image URL from a product image filename or partial URL
 * @param {string} imageValue - The image filename or partial URL
 * @returns {string} Full CDN URL
 */
export const getImageUrl = (imageValue) => {
  if (!imageValue) return '';
  // If it's already a full URL, return as is
  if (imageValue.startsWith('http')) return imageValue;
  // If it starts with the CloudFront domain, prepend https://
  if (imageValue.startsWith('d3jw6dk8gsduz3.cloudfront.net')) {
    return `https://${imageValue}`;
  }
  // Otherwise, construct from CDN base
  return `${IMAGE_CDN_BASE}/${imageValue}`;
};

/**
 * Get the image filename from a product object
 * Handles different possible field names
 * @param {object} product - Product object
 * @returns {string} Image filename
 */
export const getProductImage = (product) => {
  return product.image || product.image_url || '';
};