import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../actions/actions";

class Counter extends Component {
  render() {
    return (
      <div>
        <h1>Your score: {this.props.ctr}</h1>
        <div>
          <button onClick={this.props.onIncCounter}>Add one</button>
          <button onClick={this.props.onDecCounter}>Remove one</button>
          <button onClick={this.props.onAddFive}>Add five</button>
          <button onClick={this.props.onRemoveFive}>Remove five</button>
          <button onClick={this.props.resetCounter}>Reset</button>
        </div>
        <button onClick={this.props.onStoreResult}>Store the results</button>

        <div>
          <ul>
            {this.props.storedResults.map((item) => (
              <li
                key={item.id}
                onClick={() => this.props.onDeleteResult(item.id)}
              >
                {item.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ctr: state.counter,
    storedResults: state.results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncCounter: () => dispatch({ type: actionTypes.INCREMENT }),
    onDecCounter: () => dispatch({ type: actionTypes.DECREMENT }),
    onAddFive: () => dispatch({ type: actionTypes.ADD, value: 5 }),
    onRemoveFive: () => dispatch({ type: actionTypes.REMOVE, value: 5 }),
    resetCounter: () => dispatch({ type: actionTypes.RESET }),
    onStoreResult: () => dispatch({ type: actionTypes.STORE_RESULT }),
    onDeleteResult: (id) =>
      dispatch({ type: actionTypes.DELETE_RESULT, item: id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
