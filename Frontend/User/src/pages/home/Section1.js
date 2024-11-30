import React, { useEffect, useState } from "react";
import { GET_ALL } from "../../api/apiService";
// import starsActive from "../../assets/images/icons/stars-active.svg";
// import starsDisable from "../../assets/images/icons/stars-disable.svg";
import { Link } from "react-router-dom";

const cardTextStyle = {
  maxWidth: "80%",
};

const Section1 = ({ categoryName, categoryId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const params = {
      pageNumber: 0,
      pageSize: 5,
      sortBy: "productId",
      sortOrder: "asc",
    };

    GET_ALL(`categories/${categoryId}/products`, params)
      .then((response) => {
        setProducts(response.content); // Set the products state
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error); // Handle errors
      });
  }, [categoryId]);

  return (
    <section className="padding-bottom">
      <header className="section-heading mb-4">
        <h4 className="title-section text-uppercase">{categoryName}</h4>
      </header>
      <div className="row">
        {products.length > 0 &&
          products.map((row) => (
            <div className="col-xl-3 col-lg-3 col-md-4 col-6" key={row.productId}>
              <div className="card card-product-grid">
                <Link to={`/productDetail?productId=${row.productId}`} className="img-wrap">
                  <img
                    src={`http://localhost:8080/api/public/products/image/${row.image}`}
                    alt={row.productName}
                  />
                </Link>
                <figcaption className="info-wrap">
                  <ul className="rating-stars mb-1">
                    {/* <li style={cardTextStyle} className="stars-active">
                      <img src={starsActive} alt="Active Star" />
                    </li>
                    <li>
                      <img src={starsDisable} alt="Disabled Star" />
                    </li> */}
                  </ul>
                  <div>
                    <Link to={`/productDetail?productId=${row.productId}`} className="title">
                      {row.productName}
                    </Link>
                  </div>
                  <div className="price h5 mt-2">${row.price}</div>
                </figcaption>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Section1;
