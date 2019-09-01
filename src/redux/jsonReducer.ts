import { createReducer, createAction } from 'redux-starter-kit';

interface R {
  a: number[];
}

export const push1 = createAction('push')
export default createReducer<R>(
  { a: [] },
  {
    [push1.type](state, action) {
      console.log(state, action)
      state.a.push(89898);
    }
  }
);

export function immSet (obj: any, pathArr: (string | number)[], value: any): any {
  const index = pathArr[0];
  const newValue =
    pathArr.length > 1 ? immSet(obj[index], pathArr.slice(1), value) : value;
  if (Array.isArray(obj)) {
    const retArr = obj.slice();
    retArr[index as number] = newValue;
    return retArr;
  }
  return {
    ...obj,
    [index]: newValue
  };
}
