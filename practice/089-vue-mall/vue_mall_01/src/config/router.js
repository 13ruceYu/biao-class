import Home from "../pages/Home";
import Product from "../pages/Product";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Recover from "../pages/Recover";

import My from "../pages/My";
import Order from "../pages/Order";
import Setting from "../pages/Setting";

import Base from "../pages/admin/Base";
import AdminUser from "../pages/admin/User";
import AdminBrand from "../pages/admin/Brand";
import AdminCat from "../pages/admin/Cat";
import AdminProduct from "../pages/admin/Product";
import AdminOrder from "../pages/admin/Order";

export default [{
    path: '/',
    component: Home,
  },
  {
    path: '/product/:id',
    component: Product,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/recover',
    component: Recover,
  },
  {
    path: '/my',
    component: My,
    children: [{
      path: 'order/:id?',
      component: Order,
    }, {
      path: 'setting',
      component: Setting,
    }, ]
  },
  {
    path: '/admin',
    component: Base,
    children: [{
        path: 'user',
        component: AdminUser,
      },
      {
        path: 'brand',
        component: AdminBrand,
      },
      {
        path: 'cat',
        component: AdminCat,
      },
      {
        path: 'product',
        component: AdminProduct,
      },
      {
        path: 'order',
        component: AdminOrder,
      },
    ]
  },
]