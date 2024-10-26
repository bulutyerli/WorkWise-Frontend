import dateFormat from './dateFormat';

describe('dateFormat', () => {
  it('should return formatted date correctly', () => {
    const testDate = '2024-12-30';
    const expected = '30 December 2024';

    const actual = dateFormat(testDate);
    expect(actual).toBe(expected);
  });

  it('should handle date inputs with time', () => {
    const testDate = '2024-10-27T10:30:00';
    const expected = '27 October 2024';

    const actual = dateFormat(testDate);
    expect(actual).toBe(expected);
  });

  it('should return "Invalid Date" for an invalid date string', () => {
    const testDate = 'invalid-date';
    const expected = 'Invalid Date';

    const actual = dateFormat(testDate);
    expect(actual).toBe(expected);
  });

  it('should have 2 characters for the day', () => {
    const testDate = '2020-3-1';
    const expected = '01 March 2020';

    const actual = dateFormat(testDate);
    expect(actual).toBe(expected);
  });
});
