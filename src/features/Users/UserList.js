import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Skeleton, PageHeader } from 'antd';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Users"
        />

        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={users}
          renderItem={item => (
            <List.Item
              actions={[
                <Link
                  to={{
                    pathname: `${ROUTES.ADMIN_USERS}/${item.uid}`,
                    state: { item },
                  }}
                >Details</Link>
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.avatar || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />
                  }
                  title={
                    <span>
                      <Link to={{ pathname: `${ROUTES.ADMIN_USERS}/${item.uid}`, state: { item } }}>{item.fullName}</Link>
                      <span className="ml-3">{item.email}</span>
                    </span>
                  }
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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

export default withFirebase(UserList);
