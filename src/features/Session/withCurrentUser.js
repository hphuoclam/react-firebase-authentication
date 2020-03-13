import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withCurrentUser = Component => {
  class withCurrentUser extends React.Component {

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            <Component {...this.props} authUser={authUser} />
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(withCurrentUser);
};

export default withCurrentUser;
