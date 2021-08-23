import * as actionTypes from "../actions/actions";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case actionTypes.DECREMENT:
      return { ...state, counter: state.counter - 1 };
    case actionTypes.ADD:
      return { ...state, counter: state.counter + action.value };
    case actionTypes.REMOVE:
      return { ...state, counter: state.counter - action.value };
    case actionTypes.RESET:
      return { ...state, counter: 0 };
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({ id: new Date(), value: state.counter }),
      };
    case actionTypes.DELETE_RESULT:
      const updatedArray = state.results.filter(
        (item) => item.id !== action.item
      );
      return {
        ...state,
        results: updatedArray,
      };
  }
  return state;
};

const initialState = {
  counter: 0,
  results: [],
};

export default reducer;
