import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => {

  const [current, setCurrent] = useState(0)

  const handleClick = e => {
    setCurrent(e.key);
  };

  return (
    <AuthUserContext.Consumer>
      {authUser =>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="0"><Link to={ROUTES.LANDING}>Landing</Link></Menu.Item>
          {!authUser && <Menu.Item key="1"><Link to={ROUTES.SIGN_IN}>Sign In</Link></Menu.Item>}
          {!!authUser && <Menu.Item key="2"><Link to={ROUTES.HOME}>Home</Link></Menu.Item>}
          {!!authUser && <Menu.Item key="3"><Link to={ROUTES.ACCOUNT}>Account</Link></Menu.Item>}
          {!!authUser && !!authUser.roles && !!authUser.roles[ROLES.ADMIN] && (
            <Menu.Item key="4"><Link to={ROUTES.ADMIN}>Admin</Link></Menu.Item>
          )}
          {!!authUser && <Menu.Item key="5"><SignOutButton /></Menu.Item>}
        </Menu>
        // authUser ? (
        //   <NavigationAuth authUser={authUser} />
        // ) : (
        //     <NavigationNonAuth />
        //   )
      }
    </AuthUserContext.Consumer>
  );
}

// const NavigationAuth = ({ authUser }) => (
//   <ul >
//     <li>
//       <Link to={ROUTES.LANDING}>Landing</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.HOME}>Home</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.ACCOUNT}>Account</Link>
//     </li>
//     {!!authUser && !!authUser.roles && !!authUser.roles[ROLES.ADMIN] && (
//       <li>
//         <Link to={ROUTES.ADMIN}>Admin</Link>
//       </li>
//     )}
//     <li>
//       <SignOutButton />
//     </li>
//   </ul>
// );

// const NavigationNonAuth = () => (
//   <ul>
//     <li>
//       <Link to={ROUTES.LANDING}>Landing</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.SIGN_IN}>Sign In</Link>
//     </li>
//   </ul>
// );

export default Navigation;
