import React from 'react';
import jsonReducer, { push1 } from './redux/jsonReducer';
import { connect } from 'react-redux';

interface TestProps {
  color: 'red' | 'black';
  a: number;
}

type A = number | string;

class Test extends React.Component<TestProps> {
  constructor (props: TestProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick () {
    console.log('click')
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.props.dispatch({type: 'q'});
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.props.dispatch({type: 'q'});
  }
  shouldComponentUpdate(nextProps: Readonly<TestProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    console.log('shouldComponentUpdate', nextProps)
    return true;
  }

 render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
   console.log('render with props', this.props);
   return (
     <div onClick={this.onClick}>
       hello {this.props.a}
     </div>
   );
 }
}

export default connect(
  state => {
    console.log(state)
    return state;
  },
  (dispatch, ownProps) => {
    console.log(11111, ownProps);
    return { dispatch };
  }
)(Test);
