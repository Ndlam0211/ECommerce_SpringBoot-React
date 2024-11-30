import { toast } from "react-toastify";
import { getCartData, removeCart, storeCart } from "../../helpers";

const initCart = {
  carts: getCartData() ? getCartData() : [], // chứa dữ liệu các product được thêm vào cart
  amountItem: 0, // số product khác nhau có trong cart
  totalAmount: 0, // tổng tiền
};

const CartReducer = (state = initCart, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
      const existingItemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        // Sản phẩm đã có trong giỏ hàng
        const updateCart = state.carts.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.amount }
            : item
        );

        toast.info(`Increase amount of ${action.payload.name} successfully`, {
          position: "top-right",
          autoClose: 3000,
        });

        // Lưu cart vào localStorage
        storeCart(updateCart);

        return {
          ...state,
          carts: updateCart,
          amountItem: state.amountItem,
        };
      } else {
        // Sản phẩm chưa có trong giỏ hàng
        toast.info(`Added ${action.payload.name} to cart successfully`, {
          position: "top-right",
          autoClose: 3000,
        });

        const updateCart = [
          ...state.carts,
          { ...action.payload, quantity: action.payload.amount },
        ];

        // Lưu cart vào localStorage
        storeCart(updateCart);

        return {
          ...state,
          carts: updateCart,
          amountItem: state.amountItem + 1,
        };
      }
    case "INCREASE":
      const increaseItem = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      const increaseCart = state.carts.map((item, index) =>
        index === increaseItem ? { ...item, quantity: ++item.quantity } : item
      );

      // Lưu cart vào localStorage
      storeCart(increaseCart);

      return {
        ...state,
        carts: increaseCart,
        amountItem: state.amountItem,
      };

    case "DECREASE":
      const decreaseItem = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      const decreaseCart = state.carts.map((item, index) =>
        index === decreaseItem ? { ...item, quantity: --item.quantity } : item
      );

      // Lưu cart vào localStorage
      storeCart(decreaseCart);

      return {
        ...state,
        carts: decreaseCart,
        amountItem: state.amountItem,
      };
      
    case "TOTAL_CART":
      let total = 0;
      state.carts.map((item) => {
        total += item.price * item.quantity;
      });

      const newState = {
        ...state,
        totalAmount: total,
      };
      return newState;

    case "REMOVE_CART_ITEM":
      toast.info(`Delete ${action.payload.name} from cart successfully`, {
        position: "top-right",
        autoClose: 3000,
      });

      const updateCart = state.carts.filter(
        (item) => item.id !== action.payload.id
      );

      // Lưu cart vào localStorage
      storeCart(updateCart);

      return {
        ...state,
        carts: updateCart,
        amountItem: state.amountItem - 1,
      };

    case "CLEAR_CART":
      toast.info(`Clear cart successfully`, {
        position: "top-right",
        autoClose: 3000,
      });

      // xóa cart khỏi localStorage
      removeCart();

      return {
        ...state,
        carts: [],
        amountItem: 0,
      };

    default:
      return state;
  }
};

export default CartReducer;
