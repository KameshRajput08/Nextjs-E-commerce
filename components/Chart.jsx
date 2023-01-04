import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ aspect, title, data }) => {
  const sortedData = data?.sort(function (a, b) {
    const p = a._id.split('-')[1]; // p and q are month numbers taken from _id(eg: 2022-12)
    const q = b._id.split('-')[1];

    if (a._id.split('-')[0] === b._id.split('-')[0]) {
      if (p < q) {
        return -1;      // -1 === "a" is sorted to be a lower index than "b
      } else return 1;  // 1 === "b" is sorted to be a lower index than "a"
    }

    if (a._id.split('-')[0] < b._id.split('-')[0]) {
      return -1;
    } else return 1;
  });

  return (
    <div className="flex-1 card text-gray-500">
      <div className="m-5">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={sortedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="_id" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(228, 225, 225)" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="data"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
