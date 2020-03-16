import React, { Component } from 'react';
import { get } from "lodash";
import moment from "moment";

import { withFirebase } from '../Firebase';

class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      blog: null
    };
  }

  componentDidMount() {
    const { firebase } = this.props
    this.setState({ loading: true });
    firebase.blog(this.props.match.params.id)
      .on('value', snapshot => {
        let blog = snapshot.val();
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
    console.log('=-=-blog', blog)
    return (
      <div>
        <h1>
          {blog.title}
        </h1>
        <div>
          {moment(blog.createdAt).fromNow()}
        </div>
        <h3>
          {blog.subTitle}
        </h3>
        <div>
          {blog.description}
        </div>
        <div className="text-right">
          {get(blog, "createBy.fullName")}
        </div>
      </div>
    )
  }

  render() {
    const { blog, loading } = this.state;

    return (
      <div className="container bg-white pt-5 pb-5">
        {loading && <div>Loading ...</div>}

        {blog && this.renderBlog()}
      </div>
    );
  }
}

export default withFirebase(BlogDetail);
