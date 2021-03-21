import * as React from 'react';
export default (props: any) => {
  return <div {...props}>{props.render(React.createElement)}</div>;
};
