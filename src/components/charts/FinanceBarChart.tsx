import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ByMonthData } from '../../types/types';
import addCommasToMillion from '../../utils/addCommasToMillion';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function FinanceBarChart({
  data,
  color,
  label,
}: {
  data: ByMonthData[];
  color: string;
  label: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickFormatter={(month) => monthNames[month - 1]}
        />
        <YAxis
          tickFormatter={(value) => `$${value / 1000000}m`}
          domain={['dataMin - 100000', 'auto']}
        />
        <Tooltip formatter={addCommasToMillion} />
        <Legend formatter={() => label} />
        <Bar dataKey="amount" fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
}
