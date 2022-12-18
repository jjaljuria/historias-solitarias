const truncate = (text: string, limit: number): string => {
  let truncatedText = "";

  if (text.length <= limit) {
    return text;
  }

  truncatedText = text.substring(0, limit);

  if (truncatedText.endsWith(" ")) {
    truncatedText = truncatedText.substring(0, truncatedText.length - 1);
  }

  truncatedText = truncatedText.concat("...");
  return truncatedText;
};

export default truncate;
