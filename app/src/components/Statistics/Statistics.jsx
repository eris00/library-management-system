import "./Statistics.css";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from "recharts";

const data = [
  { name: "Izdane knjige", value: 73, color: "green" },
  { name: "Rezervisane knjige", value: 44, color: "orange" },
  { name: "Knjige u prekoračenju", value: 25, color: "red" },
];

const Statistics = () => {
  return (
    <div style={{ width: 500, height: 300 }}>
      <h3>STATISTIKA</h3>
      <BarChart
        layout="vertical"
        width={500}
        height={250}
        data={data}
        margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Bar dataKey="value">
          <LabelList dataKey="value" position="right" />
          {data.map((entry, index) => (
            <Bar key={index} dataKey="value" fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default Statistics;