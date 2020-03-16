import React from 'react';

const withTitle = Component => {
  class withTitle extends React.Component {

    setPageTitle(title) {
      document.title = title;
    }

    render() {
      return <Component {...this.props} setPageTitle={this.setPageTitle} />;
    }
  }

  return withTitle;
};

export default withTitle;
