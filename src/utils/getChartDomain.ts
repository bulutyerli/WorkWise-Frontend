export default function getChartDomain<T>(
  data: T[],
  accessor: (item: T) => number
): number[] {
  const values = data.map(accessor);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const buffer = (max - min) * 0.1;
  const minNumber = min - buffer;
  const maxNumber = max + buffer;

  const roundedMin = Math.floor(minNumber / 10000000) * 10000000;
  const roundedMax = Math.ceil(maxNumber / 10000000) * 10000000;

  return [roundedMin, roundedMax];
}
