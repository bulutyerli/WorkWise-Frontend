import { getDateDifference } from './getDateDifference';

describe('getDateDifference', () => {
  it('should return correct number of days between 2 dates', () => {
    const date1 = '2024-12-01';
    const date2 = '2024-12-10';

    const expected = 10;
    const actual = getDateDifference(date1, date2);
    expect(actual).toBe(expected);
  });

  it('should handle leap years correctly', () => {
    const date1 = '2024-02-28';
    const date2 = '2024-03-01';
    const expected = 3;

    const actual = getDateDifference(date1, date2);
    expect(actual).toBe(expected);
  });

  it('should return the correct number of days when dates are in different formats', () => {
    const date1 = '10/01/2024'; // MM/DD/YYYY
    const date2 = '2024-10-10'; // YYYY-MM-DD
    const expected = 10;

    const actual = getDateDifference(date1, date2);
    expect(actual).toBe(expected);
  });
});
