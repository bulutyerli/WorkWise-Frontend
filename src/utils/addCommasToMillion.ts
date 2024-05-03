const addCommasToMillion = (value: number) => {
  const newNum = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${newNum}`;
};

export default addCommasToMillion;
