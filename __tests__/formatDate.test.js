import formatDate from '../Client/utils/formatDate';

describe('test formatDate functionality', () => {
  const data = [];
  const days = 10;
  test('return formatted data', () => {
    expect(formatDate(data, days).length).toBe(days + 1);
  });
});
