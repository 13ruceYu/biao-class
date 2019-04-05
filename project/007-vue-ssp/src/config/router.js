import Home from "../pages/Home";
import Thread from "../pages/Thread";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";


import My from "../pages/user/My";
import Activity from "../pages/user/Activity";
import Profile from "../pages/user/Profile";
import Account from "../pages/user/Account";
import Message from "../pages/user/Message";

import Admin from "../pages/admin/Admin";
import AdminUser from "../pages/admin/User";
import AdminThread from "../pages/admin/Thread";
import AdminCat from "../pages/admin/Cat";
import AdminTheme from "../pages/admin/Theme";

export default [{
    path: '/',
    component: Home,
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/forgotpassword',
    component: ForgotPassword
  },
  {
    path: '/thread/:id',
    component: Thread
  },
  {
    path: '/admin',
    component: Admin,
    children: [{
        path: 'user',
        component: AdminUser
      },
      {
        path: 'thread',
        component: AdminThread
      },
      {
        path: 'cat',
        component: AdminCat
      },
      {
        path: 'theme',
        component: AdminTheme
      }
    ]
  },
  {
    path: '/my',
    component: My,
    children: [{
        path: 'activity',
        component: Activity
      },
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'account',
        component: Account
      },
      {
        path: 'message',
        component: Message
      }
    ]
  }
];