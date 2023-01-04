import axios from "axios";
import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FiMoreVertical } from "react-icons/fi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Featured = ({ salesData }) => {
  const [revenue, setRevenue] = useState(0)
  const [lastmonth, setLastmonth] = useState(0)
  const [diff, setDiff] = useState(0)

  useEffect(() => {
    const date = new Date();
    const lastMonth = new Date(new Date().setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    let month = date.getMonth() + 1;
    if (month.toString().length === 1) month = `0${month}`

    let lmonth = lastMonth.getMonth() + 1; // lmonth === last month number
    if (lmonth.toString().length === 1) lmonth = `0${lmonth}`

    salesData?.map(item => {
      item._id === `${date.getFullYear()}-${month}` && setRevenue(item.data)
      item._id === `${lastMonth.getFullYear()}-${lmonth}` && setLastmonth(item.data)
    })
  }, [salesData])

  useEffect(() => {
    async function fetchData() {
      const res = salesData && await axios.put('http://localhost:3000/api/admin/growth', { summary: salesData })
      setDiff(res?.data)
    }
    fetchData()
  }, [salesData])

  return (
    <div className="flex-3 card p-3">
      <div className="flex items-center justify-between text-gray-700">
        <h1 className="text-xl font-semibold">Total Revenue</h1>
        <FiMoreVertical size={30} />
      </div>
      <div className="p-5 flex flex-col items-center justify-between gap-4">
        <div className="w-1/2 h-1/2">
          <CircularProgressbar value={diff ? Math.abs(diff) : "100%"} text={diff ? diff : "Insufficient Data"} strokeWidth={5} styles={buildStyles({
            pathColor: `${diff < 0 && '#ff3333'}`,
            textColor: `${diff < 0 && '#ff3333'}`,
            textSize : `${diff ? '25px' : '10px'}`
          })} />
        </div>
        <p className="font-medium text-gray-700">Total sales made this month</p>
        <p className="text-3xl font-semibold">${revenue}</p>
        <p className="fo font-thin text-sm text-gray-700 text-center">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="flex items-center justify-between w-full">
          <div className="text-center">
            <div className="text-sm">Target</div>
            <div className="positive flex items-center">
              <MdKeyboardArrowUp size={30} />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="flex items-center negative">
              <MdKeyboardArrowDown size={30} />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="flex items-center positive">
              <MdKeyboardArrowUp size={30} />
              <div className="resultAmount">${lastmonth}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
