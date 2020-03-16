import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Skeleton } from 'antd';
import { compose } from 'recompose';
import moment from 'moment';

import { withCurrentUser } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      blogs: [],
    };
  }

  componentDidMount() {
    const { firebase } = this.props;
    this.setState({ loading: true });

    firebase.blogs()
      .orderByChild('isPublic').equalTo(true)
      .on('value', snapshot => {
        const blogsObject = snapshot.val();
        let blogsList = [];
        Object.keys(blogsObject).map(key => {
          firebase.user(blogsObject[key]['createBy']).on('value', snapshot1 => {
            const user = snapshot1.val();
            blogsList.push({
              ...blogsObject[key],
              createBy: { uid: blogsObject[key]['createBy'], ...user },
              uid: key,
            });
          });
          return blogsObject;
        })
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
      <div className="container bg-white">
        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={blogs}
          renderItem={item => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.photo || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />
                  }
                  title={
                    <div>
                      <Link to={{ pathname: `${ROUTES.BLOG}/${item.uid}`, state: { item } }}>{item.title}</Link>
                      <span className="ml-4">{moment(item.createdAt).fromNow()}</span>
                    </div>
                  }
                  description={
                    <div>
                      {item.subTitle}
                    </div>
                  }
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
)(Landing);