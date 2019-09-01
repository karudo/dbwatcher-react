import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
const obj1 = {
  qwe: {
    qwe: 1
  }
};

const obj2 = {
  zxc: {
    zxc: 2
  }
};

let f: any;

export default function DTest () {
  const [obj, setObj] = useState(obj1);
  const [key, setKey] = useState('qwe');

  console.log(setObj === f);
  f = setObj;

  function handleClick () {
    setObj(obj2 as any);
    setKey('zxc');
  }
  console.log('r', obj, key);

  return <Box px={2} py={.25}><Button onClick={handleClick}>{(obj as any)[key][key]}</Button></Box>
}
