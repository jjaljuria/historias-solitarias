const date = (date: Date) => {
  return `${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
};

export default date;
