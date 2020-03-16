import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';

const routes = [
    {
        path: ROUTES.LANDING,
        component: LandingPage,
        title: "Landing",
        exact: true,
    },
    {
        path: ROUTES.SIGN_UP,
        component: SignUpPage,
        title: "Sign Up"
    },
    {
        path: ROUTES.SIGN_IN,
        component: SignInPage,
        title: "Sign In",
    },
    {
        path: ROUTES.PASSWORD_FORGET,
        component: PasswordForgetPage,
        title: "Password Forget"
    },
    {
        path: ROUTES.HOME,
        component: HomePage,
        title: "Home"
    },
    {
        path: ROUTES.ACCOUNT,
        component: AccountPage,
        title: "Account"
    },
    {
        path: ROUTES.ADMIN,
        component: AdminPage,
        title: "Admin"
    },

];

export default routes;