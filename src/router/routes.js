import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFoundComponent from '@/pages/NotFoundComponent';

import AuthGuard from './auth-guard';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: AuthGuard,
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
  },

  { path: '*',
    component: NotFoundComponent,
    beforeEnter: AuthGuard,
  },
];
