import React, { useEffect, useState } from "react";
import { GET_ALL } from "../api/apiService";
import Slider from "../pages/home/Slider";
import Deal from "../pages/home/Deal";
import Apparel from "../pages/home/Apparel";
import Electronics from "../pages/home/Electronics";
import Request from "../pages/home/Request";
import Items from "../pages/home/Items";
import Services from "../pages/home/Services";
import Region from "../pages/home/Region";
import Subscribe from "../pages/home/Subscribe";
import Section1 from "../pages/home/Section1";

export default function Home(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const params = {
      pageNumber: 0,
      pageSize: 5,
      sortBy: "categoryId",
      sortOrder: "asc",
    };

    GET_ALL(`categories`, params)
      .then((response) => {
        const catesData = response.content.map((cate) => ({
          categoryId: cate.categoryId,
          categoryName: cate.categoryName,
        }));

        setCategories(catesData); // Set the categories state
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error); // Handle errors
      });
  }, []);

  return (
    <div className="container">
      <Slider />
      <Deal />
      {categories.map((category) => (
        <Section1
          key={category.categoryId}
          categoryName={category.categoryName}
          categoryId={category.categoryId}
        />
      ))}
      <Apparel />
      <Electronics />
      <Request />
      <Items />
      <Services />
      <Region />
      <Subscribe />
    </div>
  );
}
