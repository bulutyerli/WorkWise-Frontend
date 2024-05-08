import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import addCommasToMillion from '../../utils/addCommasToMillion';

export default function FinanceLineChart<T>({
  data,
  dataKeys,
  colors,
}: {
  data: T[];
  dataKeys: string[];
  colors: string[];
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" tickSize={15} />
        <YAxis
          type="number"
          domain={['dataMin', 'auto']}
          tickFormatter={(value) => `$${value / 1000000}m`}
          tickSize={6}
          tickCount={4}
        />
        <Tooltip formatter={addCommasToMillion} />
        <Legend height={36} />

        {dataKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[index]}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
