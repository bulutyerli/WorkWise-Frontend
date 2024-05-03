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
import { FinanceData } from '../../types/types';
import getChartDomain from '../../utils/getChartDomain';
import addCommasToMillion from '../../utils/addCommasToMillion';

const accessor = (item: FinanceData) => +item.amount;

export default function LineChartFinance({
  data,
  text,
  color,
}: {
  data: FinanceData[];
  text: string;
  color: string;
}) {
  const [min, max] = getChartDomain(data, accessor);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 15, left: 15, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" tickSize={15} />
        <YAxis
          dataKey="amount"
          tickFormatter={(value) => `$${value / 1000000}m`}
          domain={[min, max]}
          tickSize={6}
        />
        <Tooltip formatter={addCommasToMillion} />
        <Legend
          height={36}
          payload={[
            {
              value: text,
              dataKey: 'amount',
              color: color,
              type: 'line',
            },
          ]}
        />
        <Line type="monotone" dataKey="amount" stroke={color} />
      </LineChart>
    </ResponsiveContainer>
  );
}
