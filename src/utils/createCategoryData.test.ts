import { ByCategoryData } from '../types/types';
import createCategoryData from './createCategoryData';

describe('createCategoryData', () => {
  it('should transform and return data correctly', () => {
    const mockData: ByCategoryData[] = [
      { year: 2024, amount: 500, category: 'test-category', id: 123 },
      {
        year: 2023,
        amount: 1500,
        category: 'test-category-2',
        id: 321,
      },
    ];

    const expectedData = [
      {
        year: 2024,
        'test-category': 500,
        id: 123,
      },
      { year: 2023, 'test-category-2': 1500, id: 321 },
    ];

    const actual = createCategoryData(mockData);
    expect(actual).toEqual(expectedData);
  });
});
