import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Button, Skeleton, PageHeader } from 'antd';
import { compose } from 'recompose';

import { withCurrentUser } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class BlogList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      blogs: [],
    };
  }

  componentDidMount() {
    const { firebase, authUser } = this.props;
    this.setState({ loading: true });

    firebase.blogs()
      // .orderByChild('updatedAt')
      .orderByChild('createBy')
      .equalTo(authUser.uid)
      .on('value', snapshot => {
        const blogsObject = snapshot.val();

        const blogsList = blogsObject ? Object.keys(blogsObject).map(key => ({
          ...blogsObject[key],
          uid: key,
        })) : [];

        this.setState({
          blogs: blogsList,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.blogs().off();
  }

  render() {
    const { blogs, loading } = this.state;
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Blogs"
          extra={[
            <Button key="1" type="primary" onClick={e => this.props.history.push(ROUTES.ADMIN_BLOGS_ADD_NEW)}>Add New</Button>,
          ]}
        />
        {/* {loading && <div>Loading ...</div>} */}

        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={blogs}
          renderItem={item => (
            <List.Item
              actions={[
                <Link
                  to={{
                    pathname: `${ROUTES.ADMIN_BLOGS}/${item.uid}`,
                    state: { item },
                  }}
                >Details</Link>
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.photo || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />
                  }
                  title={
                    <span>
                      <Link to={{ pathname: `${ROUTES.ADMIN_BLOGS}/${item.uid}`, state: { item } }}>{item.title}</Link>
                    </span>
                  }
                  description={item.subTitle}
                />
                {/* <div>content</div> */}
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default compose(
  withFirebase,
  withCurrentUser
)(BlogList);