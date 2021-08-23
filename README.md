1. Prepare a base Counter

As you know... Redux is store, reducer and actions. So let's set up a store first

2. But before install redux

3. Then create store in Index.js

```js
import { createStore } from "redux";
const store = createStore();
```

4. Next we need reducers. Reducer is pure function which actually make changes in states. There might be many reducers, so it should be separated file. Collect redux files to reducers folder -> reducer.js. As it is function only, you do not need any react imports but remember to include export.

Then add

```js
const reducer = (state = state, action) => {
  return state;
};
export default reducer;
```

then

```js
const reducer = (state = initialState, action) => {
  return state;
};
const initialState = {
  counter: 0,
};
export default reducer;
```

5. Let's go back to index.js. We have now reducer which take initialState and returns it. Import reducer in and then add it to store

```js
import reducer from "./reducers/reducer";
const store = createStore(reducer);
```

6. We are almost there.... With Redux. Now we need to connect it with React. Yes, those are different packages.... So go ahead and install new package react-redux

```
npm install react-redux
```

7. In index.js connect store and app. For that import Provider and wrap App in to provider

```js
import { Provider } from "react-redux";
const store = createStore(reducer);
ReactDOM.render(
  <Provider>
    {" "}
    <App />
  </Provider>,
  document.getElementById("root")
);
```

And then connect with created store:

```js
ReactDOM.render(
  <Provider store={store}>
    {" "}
    <App />
  </Provider>,
  document.getElementById("root")
);
```

8. All good so far, right? We have store, we have first reducer but now we need to connect it with our component also. Open counter.js and import connect from react-redux

```js
import { connect } from 'react-redux';
export default connect()(Counter);
To be sure clean all old states 10. Create new const to get states out from component
const mapStateToProps = state => {
return {
ctr: state.counter,
};
};
```

And then add it to connector

```js
export default connect(mapStateToProps)(Counter);
```

And then read state from ctr

```js
<div className="counter_text">Your score: {this.props.ctr}</div>
```

Reload page and check does it work now?

9. Ok, we have state coming in! Yeiii! Now we start to modify it. We need mapDispatchToProps which is triggering actions and those will trigger the reducer.

```js
const mapDispatchToProps = (dispatch) => {
  return {
    onIncCounter: () => dispatch({ type: "INCREMENT" }),
  };
};
```

Then connect with connector:

```js
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

And button clicked:

```js
<button onClick={this.props.onIncCounter}>Increase one</button>
```

10. Now we need that function what is actually doing something. Reducer.js

```js
const reducer = (state = initialState, action) => {
  if (action.type === "INCREMENT") {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }
  return state;
};
```

11. So let's do other buttons also

```js
  const mapDispatchToProps = dispatch => {
  return {
  onIncCounter: () => dispatch({type: "INCREMENT"}),
  onDecCounter: () => dispatch({type: 'DECREMENT'}),
  resetCounter: () => dispatch({type: 'RESET'}),
  }
  }

  <button onClick={this.props.onIncCounter}>Increase one</button>
  <button onClick={this.props.onDecCounter}>Decrease one</button>
  <button onClick={this.props.resetCounter}>Reset</button>

  if (action.type === "INCREMENT") {
  return {
  ...state, counter:state.counter +1
  }
  }
  if (action.type === "DECREMENT") {
  return {
  ...state, counter:state.counter -1
  }
  }
  if (action.type === "RESET") {
  return {
  ...state, counter: 0
  }
  }
```

11. It works and juhuu! Two things we could make better. First is that in reducer we repeat code. Perfect here is to use switch

```js
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    case "RESET":
      return { ...state, counter: 0 };
  }
  return state;
};
```

12. Second thing we can improve is to get more control about actions. Currently if you make typo, then well, it is what it is. So let's separate actions. Folder actions and actions.js

```js
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";
```

Then import it in to counter.js

```js
  import \* as actionTypes from "../actions/actions";
```

And

```js
  onIncCounter: () => dispatch({ type: actionTypes.INCREMENT }),
  onDecCounter: () => dispatch({ type: actionTypes.DECREMENT }),
  resetCounter: () => dispatch({ type: actionTypes.RESET }),
```

Then reducer.js

```js
  import \* as actionTypes from "../actions/actions";

  const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.INCREMENT:
  return { ...state, counter: state.counter + 1 };
  case actionTypes.DECREMENT:
  return { ...state, counter: state.counter - 1 };
  case actionTypes.RESET:
  return { ...state, counter: 0 };
  }
  return state;
  };
```

13. Let's see how to pass data with the action. Instead of manually entering added value, we will pass it with dispatching action:

Counter.js

```js
const mapDispatchToProps = (dispatch) => {
  return {
    onAddFive: () => dispatch({ type: actionTypes.ADD, value: 5 }),
    onRemoveFive: () => dispatch({ type: actionTypes.REMOVE, value: 5 }),
  };
};
```

reducer.js

```js
    case actionTypes.ADD:
      return { ...state, counter: state.counter + action.value };
    case actionTypes.REMOVE:
      return { ...state, counter: state.counter - action.value };
```

14. Now, let's try to store results in array.
    First make a button and then add empty array to initialState. Then make dispatch actions, update actions and set case in reducer.

reducer.js - make empty array

```js
const initialState = {
  counter: 0,
  results: [],
};
```

Counter.js - make props

```js
    onStoreResult: () => dispatch({ type: actionTypes.STORE_RESULT }),
```

actions.js - make new const

```js
export const STORE_RESULT = "STORE_RESULT";
```

reducer.js - add case

```js
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({ id: new Date(), value: state.counter }),
      };
```

Counter.js - use map method to display array and remember to use mapStateToProps for getting that array from the state

```js
<ul>
  {this.props.storedResults.map((item) => (
    <li key={item.id} onClick={() => this.props.onDeleteResult(item.id)}>
      {item.value}
    </li>
  ))}
</ul>
...

const mapStateToProps = (state) => {
  return {
    ctr: state.counter,
    storedResults: state.results,
  };
};

```

15. Remove list items on click. For that we need to know what li element you clicked. We use binding to send item id with click and then filtering to "remove" that id from the array.

actions.js - new const

```js
export const DELETE_RESULT = "DELETE_RESULT";
```

reducer.js - new case

```js
    case actionTypes.DELETE_RESULT:
      const updatedArray = state.results.filter(
        (item) => item.id !== action.item
      );
      return {
        ...state,
        results: updatedArray,
      };
```

Counter.js - new dispatch action and onclick triger

```js
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
...

    onDeleteResult: (id) =>
      dispatch({ type: actionTypes.DELETE_RESULT, item: id }),
```
