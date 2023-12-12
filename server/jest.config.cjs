/** @returns {Promise<import('jest').Config>} */

module.exports = async () => {
  return {
    "preset": "@shelf/jest-mongodb"
  };
};
