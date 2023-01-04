import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa";
import { MdOutlineAccountBalance, MdOutlineMonetizationOn, MdOutlineShoppingCart } from "react-icons/md";

const Widget = ({ type, count, summary }) => {
  const [diff, setDiff] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const res = summary && await axios.put('http://localhost:3000/api/admin/growth', { summary })
      setDiff(res?.data)
    }
    fetchData()
  }, [])


  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: (<Link href="/admin/users"><span className="w-[max-content] text-xs border border-b-gray-200">view all users</span></Link>),
        icon: (
          <BsPerson
            size={30}
            className="p-[2px] rounded-md self-end"
            color="crimson"
            backgroundColor="rgba(255, 0, 0, 0.2)"
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: (<Link href="admin/orders"><span className="w-[max-content] text-xs border border-b-gray-200">view all orderds</span></Link>),
        icon: (
          <MdOutlineShoppingCart
            size={30}
            className="p-[2px] rounded-md self-end"
            color="goldenrod"
            backgroundColor="rgba(218, 165, 32, 0.2)"
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: (<Link href="/admin/revenue"><span className="w-[max-content] text-xs border border-b-gray-200">view net earnings</span></Link>),
        icon: (
          <MdOutlineMonetizationOn
            size={30}
            className="p-[2px] rounded-md self-end"
            color="green"
            backgroundColor="rgba(0, 128, 0, 0.2)"
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "PRODUCTS",
        isMoney: false,
        link: (<Link href="/admin/products"><span className="w-[max-content] text-xs border border-b-gray-200">view all products</span></Link>),
        icon: (
          <FaProductHunt
            size={30}
            className="p-[2px] rounded-md self-end"
            color="purple"
            backgroundColor="rgba(128, 0, 128, 0.2)"
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="flex-1 flex justify-between p-3 border border-gray-200 shadow-md rounded-md h-[200px]">
      <div className="flex flex-col gap-5 justify-between">
        <span className="text-[rgb(160, 160, 160)] text-base font-semibold">{data.title}</span>
        <span className="text-4xl">
          {data.isMoney && "$"} {count}
        </span>
        {data.link}
      </div>
      <div className="flex flex-col justify-between">
        <div className={`flex items-center text-base ${diff >= 0 ? 'positive' : 'negative'}`}>
          {diff > 0 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
