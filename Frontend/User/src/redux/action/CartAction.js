export const ADD = (item) => ({
    type: "ADD_TO_CART",
    payload: item,
})

export const TOTAL = () => ({
    type: "TOTAL_CART",
    payload: '',
})

export const REMOVE = (item) => ({
    type: "REMOVE_CART_ITEM",
    payload: item,
})

export const CLEAR = () => ({
    type: "CLEAR_CART",
    payload: '',
})

export const INCREASE = (item) => ({
  type: "INCREASE",
  payload: item,
})

export const DECREASE = (item) => ({
  type: "DECREASE",
  payload: item,
})