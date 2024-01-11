export const extractURLs = (inputString) => {
  // Regular expression to match URLs
  // This regex is a basic one and might need refinement based on the exact URL patterns expected
  const urlRegex = /https?:\/\/[^\s<>"',;]+/gi;

  // Use the regular expression to find matches in the input string
  const foundURLs = inputString.match(urlRegex);

  // Return the found URLs or an empty array if no URLs were found
  return foundURLs || [];
};
