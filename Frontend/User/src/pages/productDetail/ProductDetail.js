import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GET_ID } from "../../api/apiService";
import { useDispatch } from "react-redux";
import { ADD } from "../../redux/action/CartAction";


function ProductDetail() {
  const location = useLocation();
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amountItem, setAmountItem] = useState(1);

  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("productId");

  const dispatch = useDispatch();
  // Add product to cart
  const handleAddToCart = (amountItem) => {
    // payload
    const product = {
      ...productDetail,
      amount: parseInt(amountItem), // số lượng của product thêm vào giỏ hàng
    };
    dispatch(ADD(product));
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await GET_ID("/products", productId);
        const productData = {
          id: res.productId,
          name: res.productName,
          price: res.price,
          description: res.description,
          quantity: res.quantity,
          image: res.image,
        };
        setProductDetail(productData);
      } catch (error) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <section class="py-3 bg-light">
        <div class="container">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#">Category name</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#">Sub category</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Items
            </li>
          </ol>
        </div>
      </section>

      <section class="section-content bg-white padding-y">
        <div class="container">
          <div class="row">
            <aside class="col-md-6">
              <div class="card">
                <article class="gallery-wrap">
                  <div class="img-big-wrap">
                    <div>
                      {" "}
                      <a href="#">
                        <img
                          src={`http://localhost:8080/api/public/products/image/${productDetail.image}`}
                        />
                      </a>
                    </div>
                  </div>
                  {/* <div class="thumbs-wrap">
                      <a href="#" class="item-thumb">
                        {" "}
                        <img
                          src={require("../../assets/images/items/15.jpg")}
                        />
                      </a>
                      <a href="#" class="item-thumb">
                        {" "}
                        <img
                          src={require("../../assets/images/items/15-1.jpg")}
                        />
                      </a>
                      <a href="#" class="item-thumb">
                        {" "}
                        <img
                          src={require("../../assets/images/items/15-2.jpg")}
                        />
                      </a>
                      <a href="#" class="item-thumb">
                        {" "}
                        <img
                          src={require("../../assets/images/items/15-1.jpg")}
                        />
                      </a>
                    </div> */}
                </article>
              </div>
            </aside>
            <main class="col-md-6">
              <article class="product-info-aside">
                <h2 class="title mt-3">{productDetail.name}</h2>

                <div class="rating-wrap my-3">
                  <ul class="rating-stars">
                    <li style={{ width: "80%" }} class="stars-active">
                      <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </li>
                    <li>
                      <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </li>
                  </ul>
                  <small class="label-rating text-muted">132 reviews</small>
                  <small class="label-rating text-success">
                    {" "}
                    <i class="fa fa-clipboard-check"></i> 154 orders{" "}
                  </small>
                </div>

                <div class="mb-3">
                  <var class="price h4"> {productDetail.price},00 USD</var>
                </div>

                <p>{productDetail.description}</p>

                <dl class="row">
                  <dt class="col-sm-3">Manufacturer</dt>
                  <dd class="col-sm-9">
                    <a href="#">Great textile Ltd.</a>
                  </dd>

                  <dt class="col-sm-3">Article number</dt>
                  <dd class="col-sm-9">596 065</dd>

                  <dt class="col-sm-3">Guarantee</dt>
                  <dd class="col-sm-9">2 year</dd>

                  <dt class="col-sm-3">Delivery time</dt>
                  <dd class="col-sm-9">3-4 days</dd>

                  <dt class="col-sm-3">Availabilty</dt>
                  <dd class="col-sm-9">in Stock</dd>
                </dl>

                <div class="form-row  mt-4">
                  <div class="form-group col-md flex-grow-0">
                    <div class="input-group mb-3 input-spinner">
                      {/* <div class="input-group-prepend">
                        <button
                          class="btn btn-light"
                          type="button"
                          id="button-plus"
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div> */}
                      <input
                        style={{ "width": "40px","height":"40px" }}
                        type="number"
                        placeholder="1"
                        min="1"
                        value={amountItem}
                        onChange={(e) => setAmountItem(e.target.value)}
                      />
                      {/* <div class="input-group-append">
                        <button
                          class="btn btn-light"
                          type="button"
                          id="button-minus"
                        >
                          {" "}
                          &minus;{" "}
                        </button>
                      </div> */}
                    </div>
                  </div>
                  <div class="form-group col-md">
                    <a
                      href="#"
                      class="btn  btn-primary"
                      onClick={() => handleAddToCart(amountItem)}
                    >
                      <i class="fas fa-shopping-cart"></i>{" "}
                      <span class="text">Add to cart</span>
                    </a>
                    <a href="#" class="btn btn-light">
                      <i class="fas fa-envelope"></i>{" "}
                      <span class="text">Contact supplier</span>
                    </a>
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </section>
      <section class="section-name padding-y bg">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <h5 class="title-description">Description</h5>
              <p>
                Lava stone grill, suitable for natural gas, with cast-iron
                cooking grid, piezo ignition, stainless steel burners, water
                tank, and thermocouple. Thermostatic adjustable per zone. Comes
                complete with lava rocks. Adjustable legs. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
              <ul class="list-check">
                <li>Material: Stainless steel</li>
                <li>Weight: 82kg</li>
                <li>built-in drip tray</li>
                <li>Open base for pots and pans</li>
                <li>On request available in propane execution</li>
              </ul>

              <h5 class="title-description">Specifications</h5>
              <table class="table table-bordered">
                <tr>
                  {" "}
                  <th colspan="2">Basic specs</th>{" "}
                </tr>
                <tr>
                  {" "}
                  <td>Type of energy</td>
                  <td>Lava stone</td>{" "}
                </tr>
                <tr>
                  {" "}
                  <td>Number of zones</td>
                  <td>2</td>{" "}
                </tr>
                <tr>
                  {" "}
                  <td>Automatic connection </td>{" "}
                  <td>
                    {" "}
                    <i class="fa fa-check text-success"></i> Yes{" "}
                  </td>
                </tr>

                <tr>
                  {" "}
                  <th colspan="2">Dimensions</th>{" "}
                </tr>
                <tr>
                  {" "}
                  <td>Width</td>
                  <td>500mm</td>{" "}
                </tr>
                <tr>
                  {" "}
                  <td>Depth</td>
                  <td>400mm</td>{" "}
                </tr>
                <tr>
                  {" "}
                  <td>Height </td>
                  <td>700mm</td>{" "}
                </tr>

                <tr>
                  {" "}
                  <th colspan="2">Materials</th>{" "}
                </tr>
                <tr>
                  {" "}
                  <td>Exterior</td>
                  <td>Stainless steel</td>{" "}
                </tr>
                <tr>
                  {" "}
                  <td>Interior</td>
                  <td>Iron</td>{" "}
                </tr>

                <tr>
                  {" "}
                  <th colspan="2">Connections</th>{" "}
                </tr>
                <tr>
                  {" "}
                  <td>Heating Type</td>
                  <td>Gas</td>{" "}
                </tr>
                <tr>
                  {" "}
                  <td>Connected load gas</td>
                  <td>15 Kw</td>{" "}
                </tr>
              </table>
            </div>

            <aside class="col-md-4">
              <div class="box">
                <h5 class="title-description">Files</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>

                <h5 class="title-description">Videos</h5>

                <article class="media mb-3">
                  <a href="#">
                    <img
                      class="img-sm mr-3"
                      src={require("../../assets/images/posts/3.jpg")}
                    />
                  </a>
                  <div class="media-body">
                    <h6 class="mt-0">
                      <a href="#">How to use this item</a>
                    </h6>
                    <p class="mb-2">
                      {" "}
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel
                      metus scelerisque ante sollicitudin{" "}
                    </p>
                  </div>
                </article>

                <article class="media mb-3">
                  <a href="#">
                    <img
                      class="img-sm mr-3"
                      src={require("../../assets/images/posts/2.jpg")}
                    />
                  </a>
                  <div class="media-body">
                    <h6 class="mt-0">
                      <a href="#">New tips and tricks</a>
                    </h6>
                    <p class="mb-2">
                      {" "}
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel
                      metus scelerisque ante sollicitudin{" "}
                    </p>
                  </div>
                </article>

                <article class="media mb-3">
                  <a href="#">
                    <img
                      class="img-sm mr-3"
                      src={require("../../assets/images/posts/1.jpg")}
                    />
                  </a>
                  <div class="media-body">
                    <h6 class="mt-0">
                      <a href="#">New tips and tricks</a>
                    </h6>
                    <p class="mb-2">
                      {" "}
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel
                      metus scelerisque ante sollicitudin{" "}
                    </p>
                  </div>
                </article>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section class="padding-y-lg bg-light border-top">
        <div class="container">
          <p class="pb-2 text-center">
            Delivering the latest product trends and industry news straight to
            your inbox
          </p>

          <div class="row justify-content-md-center">
            <div class="col-lg-4 col-sm-6">
              <form class="form-row">
                <div class="col-8">
                  <input
                    class="form-control"
                    placeholder="Your Email"
                    type="email"
                  />
                </div>
                <div class="col-4">
                  <button type="submit" class="btn btn-block btn-warning">
                    {" "}
                    <i class="fa fa-envelope"></i> Subscribe{" "}
                  </button>
                </div>
              </form>
              <small class="form-text">
                We’ll never share your email address with a third-party.{" "}
              </small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail