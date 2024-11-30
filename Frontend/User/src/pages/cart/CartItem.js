import { useState } from "react";
import { useDispatch } from "react-redux";
import { DECREASE, INCREASE, REMOVE } from "../../redux/action/CartAction";

function CartItem(props) {
    const [quantity, setQuantity] = useState(props.item.quantity);

    const dispatch = useDispatch();

    const removeItem = (item) => {
      dispatch(REMOVE(item));
    };

    const decrease = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        dispatch(DECREASE(props.item));
      }
    };

    const increase = () => {
      setQuantity(quantity + 1);
      dispatch(INCREASE(props.item));
    };
    return (
      <tr>
        <td>
          <figure class="itemside">
            <div class="aside">
              <img
                src={`http://localhost:8080/api/public/products/image/${props.item.image}`}
                class="img-sm"
              />
            </div>
            <figcaption class="info">
              <a href="#" class="title text-dark">
                {props.item.name}
              </a>
            </figcaption>
          </figure>
        </td>
        {/* <td>
          <select class="form-control">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </td> */}
        <td className="shoping__cart__quantity">
          <div className="quantity">
            <div className="input-group-btn">
              <button
                className="btn btn-primary btn-minus"
                onClick={() => decrease()}
              >
                <i className="fa fa-minus"></i>
              </button>
            </div>
            <div className="pro-qty">
              <input
                type="text"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="input-group-btn">
              <button
                className="btn btn-primary btn-plus"
                onClick={() => increase()}
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </td>
        <td>
          <div class="price-wrap">
            <var class="price">${props.item.price}</var>
          </div>
        </td>
        <td className="shoping__cart__total">
          ${props.item.price * props.item.quantity}
        </td>
        <td class="text-right">
          <a
            data-original-title="Save to Wishlist"
            title=""
            href=""
            class="btn btn-light"
            data-toggle="tooltip"
          >
            {" "}
            <i class="fa fa-heart"></i>
          </a>
          <a href="" class="btn btn-light" onClick={()=>removeItem(props.item)}>
            {" "}
            Remove
          </a>
        </td>
      </tr>
    );
}

export default CartItem