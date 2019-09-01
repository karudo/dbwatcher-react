import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';
import { reduxBatch } from '@manaflair/redux-batch';
import { mapValues, isEqual } from 'lodash';

const middleware = [...getDefaultMiddleware(), logger];

interface State {
  a: number;
}

const preloadedState: State = {
  a: 0
};

export default configureStore<State>({
  reducer(store, action) {
    return { a: (store as State).a + 1 };
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [reduxBatch]
});

function qwe<State, Props, RR>(selectors: {
  [key: string]: (state: State, props: Props) => any;
}): (state: State, props: Props) => RR {
  let results: RR;
  return function(state: State, props: Props): RR {
    const newResults: RR = mapValues(selectors, fn => fn(state, props)) as RR;
    if (!isEqual(results, newResults)) {
      results = newResults;
    }
    return results;
  };
}
