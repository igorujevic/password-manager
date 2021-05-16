import Account from '../views/desktop/Account.vue';
import Admin from '../views/desktop/Admin.vue';
import ChangePassword from '../views/desktop/ChangePassword.vue';
import Dashboard from '../views/desktop/Dashboard.vue';
import HomeDekstop from '../views/desktop/Home.vue';
import HomeMobile from '../views/mobile/Home.vue';
import Login from '../views/desktop/Login.vue';
import NotFound from '../views/desktop/NotFound.vue';
import Register from '../views/desktop/Register.vue';
import UpdateUserData from '../views/desktop/UpdateUserData.vue';
import store from '../store';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      desktop: HomeDekstop,
      mobile: HomeMobile
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    components: {
      desktop: Dashboard,
      mobile: Dashboard
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/account',
    name: 'Account',
    components: {
      desktop: Account,
      mobile: Account
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/account/change-password',
    name: 'ChangePassword',
    components: {
      desktop: ChangePassword,
      mobile: NotFound
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/account/update-user-data',
    name: 'UpdateUserData',
    components: {
      desktop: UpdateUserData,
      mobile: NotFound
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    components: {
      desktop: Admin,
      mobile: NotFound
    },
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },
    beforeEnter: (to, from, next) => {
      if(store.getters['user/isLoggedIn'] && store.getters['user/isAdmin']) next();
      else if (store.getters['user/isLoggedIn']) next("/dashboard")
      else next("/login");
    }
  },
  {
    path: '/register',
    name: 'Register',
    components: {
      desktop: Register,
      mobile: Register
    }
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      desktop: Login,
      mobile: Login
    }
  },
  {
    path: '*',
    name: '404',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      desktop: NotFound,
      mobile: NotFound
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.fullPath === '/' && store.getters['user/isLoggedIn'] && store.getters['user/isAdmin']) {
    next('/admin-dashboard');
    return;
  }

  if (to.fullPath === '/' && store.getters['user/isLoggedIn'] && !store.getters['user/isAdmin']) {
    next('/dashboard');
    return;
  }

  if ((to.fullPath === '/login' || to.fullPath === '/register') && store.getters['user/isLoggedIn']) {
    if(!store.getters['user/isAdmin']) {
      next('/dashboard');
      return;
    }
    if(store.getters['user/isAdmin']) {
      next('/admin-dashboard');
      return;
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['user/isLoggedIn']) {
      if(to.fullPath !== "/admin-dashboard" && store.getters['user/isAdmin']) {
        next("/admin-dashboard");
        return;
      }
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
