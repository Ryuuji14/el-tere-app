import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  MODIFY_PRODUCT_QUANTITY,
} from "../constants";

const cartItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.payload.product;

      const isThereAnotherCompanyId = state.some(
        (item) => item.product.company_id !== product?.company_id
      );

      if (isThereAnotherCompanyId) {
        return state;
      }
      return [...state, action.payload];
    case MODIFY_PRODUCT_QUANTITY: {
      const newState = [...state];
      const index = newState.findIndex(
        (item) => item?.product.id === action.payload.productId
      );

      if (index > -1) {
        const quantityToAdd =
          newState[index].product.quantity + action.payload.quantity;

        newState[index].product.quantity = Math.max(quantityToAdd, 1);
      }
      return newState;
    }

    case REMOVE_FROM_CART:
      return state.filter((cartItem) => cartItem !== action.payload);
    case CLEAR_CART:
      return (state = []);
  }
  return state;
};

export default cartItems;
