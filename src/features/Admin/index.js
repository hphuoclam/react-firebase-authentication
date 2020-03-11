import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { Menu } from 'antd';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import { BlogList, BlogItem, BlogForm } from '../Blogs';
import Home from './home';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const { SubMenu } = Menu;

const AdminPage = () => (
  <div className="row">
    <div className="col col-md-2 p-0">
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="1"><Link to={ROUTES.ADMIN_USERS}>Users</Link></Menu.Item>
        <Menu.Item key="2"><Link to={ROUTES.ADMIN_BLOGS}>Blogs</Link></Menu.Item>
      </Menu>
    </div>
    <div className="col col-md-10 pt-3 pb-3 bg-white vh-100">
      <Switch>
        <Route exact path={ROUTES.ADMIN} component={Home} />
        {/* users*/}
        <Route path={ROUTES.ADMIN_USERS_DETAILS} component={UserItem} />
        <Route path={ROUTES.ADMIN_USERS} component={UserList} />
        {/* blogs */}
        <Route path={ROUTES.ADMIN_BLOGS_ADD_NEW} component={BlogForm} />
        <Route path={ROUTES.ADMIN_BLOGS} component={BlogList} />
      </Switch>
    </div>
  </div>
);

const condition = authUser =>
  authUser && !!authUser.roles && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
