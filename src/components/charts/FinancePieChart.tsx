import { PieChart, Pie, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { ByCategoryData } from '../../types/types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#4d7c0f'];

const RADIAN = Math.PI / 180;

interface Label {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: Label) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const FinancePieChart = ({ data }: { data: ByCategoryData[] }) => {
  const parsedData = data.map((item) => ({
    ...item,
    amount: +item.amount,
  }));
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={parsedData}
          cx="50%"
          cy="50%"
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="amount"
          labelLine={false}
        >
          <LabelList
            dataKey="category"
            position="outside"
            stroke="120"
            width={20}
            offset={15}
          />
          {parsedData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default FinancePieChart;
