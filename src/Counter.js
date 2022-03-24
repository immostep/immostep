import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import useInterval from './hooks/useInterval';

function Counter({ reverse = false, start = 0 }) {
  let [count, setCount] = useState(start);

  useInterval(() => {
    let c = count;

    if (reverse) {
      c -= 1;
    } else {
      c += 1;
    }

    setCount(c);
  }, 1000);

  return <>{count}</>;
}

export default memo(Counter);

Counter.propTypes = {
  reverse: PropTypes.bool,
  start: PropTypes.number
};
