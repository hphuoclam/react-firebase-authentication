import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
      };
      this.updateGlobalProfile = this.updateGlobalProfile.bind(this);
    }

    componentDidMount() {
      // this.listener = this.props.firebase.onAuthUserListener(
      //   authUser => {
      //     console.log('setItem ==== authUser', authUser)
      //     localStorage.setItem('authUser', JSON.stringify(authUser));
      //     this.setState({ authUser });
      //   },
      //   () => {
      //     localStorage.removeItem('authUser');
      //     this.setState({ authUser: null });
      //   },
      // );
      this.updateGlobalProfile();
    }

    componentWillUnmount() {
      // this.listener();
      this.updateGlobalProfile();
    }

    updateGlobalProfile() {
      this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
        },
      );
    }

    render() {
      const { authUser } = this.state;
      const newAuthUser = authUser && { ...this.state.authUser, updateGlobalProfile: this.updateGlobalProfile };
      return (
        <AuthUserContext.Provider value={newAuthUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
