const toCurrency = (price) => {
  if (price) {
    return `Rp ${price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
  return "-";
};

const toDateFormat = (parsedDate) => {
  return new Date(parsedDate).toLocaleDateString();
};

export { toCurrency, toDateFormat };
