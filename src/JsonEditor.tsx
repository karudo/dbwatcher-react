import React, {useReducer} from 'react';
import produce, {Draft} from 'immer';

type State = {
  count: number;
  props: {
    qwe: number;
  }
}

const initialState: State = {
  count: 0,
  props: {
    qwe: 5
  }
};

function createReducer <S = any>(reducers: {[key: string]: ((s: Draft<S>, p?: any) => S) | ((s: Draft<S>, p?: any) => void)}) {
  return function (state: S, action: {type: string, payload?: any}): S {
    return produce<S>(state, (s) => reducers[action.type](s, action.payload));
  }
}

const reducer = createReducer<State>({
  plus: (s, n) => {
    s.count += n
  },
  minus: s => ({...s, count: s.count -1}),
  qwe: s => {
    s.props.qwe++
  }
});

export default function JsonEditor () {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState);
  return <div>
    hello {state.count} - {state.props.qwe}
    <div onClick={() => dispatch({type: 'plus', payload: 10})}>plus</div>
    <div onClick={() => dispatch({type: 'minus'})}>minus</div>
    <div onClick={() => dispatch({type: 'qwe'})}>qwe</div>
  </div>
}
