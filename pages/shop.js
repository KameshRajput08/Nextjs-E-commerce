import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProductComp from "../components/Product";
import Product from "../models/Product";
import connectMongo from "../utils/conn";
import { FiSearch } from "react-icons/fi";

const Shop = ({ data }) => {
  const [sort, setSort] = useState("newest");
  const [products, setProducts] = useState(data);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (search !== "") {
        const filteredProducts = products.filter((product) => {
          search.toLocaleLowerCase();
          product.name.toLocaleLowerCase();
          return product?.name?.includes(search);
        });
        setProducts(filteredProducts);
      } else {
        setProducts(data);
      }
    }
    fetchData();
  }, [search]);

  useEffect(() => {
    switch (sort) {
      case "newest":
        products.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "desc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "asc":
        products.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }
  }, [sort]);

  return (
    <Layout title={`Shop-${search}`}>
      <div className="px-10 py-4 flex items-center flex-col justify-between lg:flex-row">
        <h3 className="text-2xl font-semibold my-4">
          {search == "" ? "Home/Shop" : `Results for ${search}`}
        </h3>
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="flex">
            <span className="font-semibold hidden lg:block text-lg mr-4">
              Sort Products:
            </span>
            <select
              className="outline-none p-[5px] mr-2 lg:mr-5 bg-[#e3e6f3] border-2 border-[#333333] opacity-70 rounded-lg"
              onClick={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="asc">Price (asc)</option>
              <option value="desc">Price (desc)</option>
            </select>
          </div>
          <div className="max-h-9 bg-[#e3e6f3] opacity-70 rounded-full border-2 border-[#333333] p-3 lg:px-5 flex items-center mx-2">
            <FiSearch size={30} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#e3e6f3] opacity-7 border-none lg:w-full focus:ring-0 outline-none"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      <div className="px-10 py-5 pb-10 flex justify-center flex-wrap gap-10">
        {products === [] ? (
          <div>Products not found</div>
        ) : (
          products?.map((p) => {
            return <ProductComp key={p.slug} product={p} />;
          })
        )}
      </div>
    </Layout>
  );
};

export default Shop;

export const getServerSideProps = async ({ req }) => {
  connectMongo();
  const res = await Product.find().lean();

  return {
    props: {
      data: JSON.parse(JSON.stringify(res)),
    },
  };
};
