const convertToIdr = (price) => {
  if (price) {
    return `Rp ${price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
  return "-";
};

const formatDate = (parsedDate) => {
  return new Date(parsedDate).toLocaleDateString();
};

export { convertToIdr, formatDate };
