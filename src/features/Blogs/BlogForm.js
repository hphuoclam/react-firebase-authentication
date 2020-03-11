import React, { Component } from 'react';
import { PageHeader } from "antd";

import { withFirebase } from '../Firebase';

class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
    };
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    // this.props.firebase
    //   .user(this.props.match.params.id)
    //   .on('value', snapshot => {
    //     this.setState({
    //       user: snapshot.val(),
    //       loading: false,
    //     });
    //   });
  }

  componentWillUnmount() {
    // this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    // this.props.firebase.doPasswordReset(this.state.user.email);
  };

  render() {
    const { user, loading } = this.state;

    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Blogs Add New"
        />

        {loading && <div>Loading ...</div>}

        {user && (
          <div>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <span>
              <button
                type="button"
                onClick={this.onSendPasswordResetEmail}
              >
                Send Password Reset
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(BlogForm);
