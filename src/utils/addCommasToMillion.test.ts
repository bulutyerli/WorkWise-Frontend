import addCommasToMillion from './addCommasToMillion';

describe('addCommasToMillion', () => {
  it('should format number with commas and dollar sign', () => {
    const numToChange = 2000000;
    const expected = '$2,000,000';

    const actual = addCommasToMillion(numToChange);

    expect(actual).toBe(expected);
  });
});
