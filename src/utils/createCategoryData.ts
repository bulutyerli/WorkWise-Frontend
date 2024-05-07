import { ByCategoryData } from '../types/types';

const createCategoryData = (data: ByCategoryData[]) => {
  const newData = data.map((item) => ({
    year: item.year,
    [item.category]: item.amount,
    id: item.id,
  }));
  return newData;
};

export default createCategoryData;
