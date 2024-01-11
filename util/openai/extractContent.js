export const extractContent = (data) => {
  return data.retrievedMessagesList.data[0].content[0].text.value || "";
};
