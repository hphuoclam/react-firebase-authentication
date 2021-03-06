import { useEffect } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import { withTitle } from "../Session"

const RouteLayout = (props) => {
  useEffect(() => {
    props.setPageTitle && props.setPageTitle(props.title)
  }, [props.title])

  return props.children;
};

export default withTitle(RouteLayout);
