const convertToIdr = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

const formatDate = (parsedDate) => {
  return new Date(parsedDate).toLocaleDateString();
};

export { convertToIdr, formatDate };
