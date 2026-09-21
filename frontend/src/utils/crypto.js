/**
 * In-browser SHA-256 cryptographic utility for BikeChain.
 * Computes exact SHA-256 cryptographic digests of text and files
 * using the browser-native Web Cryptography API (window.crypto.subtle).
 */

/**
 * Compute SHA-256 hash of a string.
 * @param {string} text 
 * @returns {Promise<string>} 64-character uppercase hex hash
 */
export async function computeSHA256(text) {
  if (!text) return '';
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  } catch (error) {
    console.error('SHA-256 calculation error:', error);
    return '';
  }
}

/**
 * Compute SHA-256 hash of a File or Blob.
 * Hashes raw binary bytes consistently.
 * @param {File|Blob} file 
 * @returns {Promise<string>} 64-character uppercase hex hash
 */
export async function computeFileSHA256(file) {
  if (!file) return '';
  try {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  } catch (error) {
    console.error('File SHA-256 calculation error:', error);
    return '';
  }
}
