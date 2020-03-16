import React, { Component } from 'react';
import { get } from "lodash";
import moment from "moment";
import { compose } from "recompose"

import { withTitle } from '../Session';
import { withFirebase } from '../Firebase';

import "./BlogDetail.scss"

class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      blog: null
    };
  }

  componentDidMount() {
    const { firebase, setPageTitle } = this.props
    this.setState({ loading: true });
    firebase.blog(this.props.match.params.id)
      .on('value', snapshot => {
        let blog = snapshot.val();
        setPageTitle(blog.title);
        firebase.user(blog.createBy).on('value', snapshot1 => {
          blog.createBy = { uid: blog.createBy, ...snapshot1.val() };
          this.setState({
            blog,
            loading: false,
          });
        })
      });
  }

  componentWillUnmount() {
    this.props.firebase.blog(this.props.match.params.id).off();
  }

  renderBlog() {
    const { blog } = this.state;
    return (
      <div>
        <h1 className="title">
          {blog.title}
        </h1>
        <div className="time">
          {moment(blog.createdAt).fromNow()}
        </div>
        <h4 className="subTitle">
          {blog.subTitle}
        </h4>
        <div className="description">
          {blog.description}
        </div>
        <div className="author">
          {get(blog, "createBy.fullName")}
        </div>
      </div>
    )
  }

  render() {
    const { blog, loading } = this.state;

    return (
      <div className="container bg-white pt-5 pb-5 BlogDetail">
        {loading && <div>Loading ...</div>}

        {blog && this.renderBlog()}
      </div>
    );
  }
}

export default compose(
  withFirebase,
  withTitle
)(BlogDetail);
