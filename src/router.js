import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies);
Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      meta: {
        layout: "default",
      },
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('./views/viewTweets')
        },
        {
          path: '/search/:query?',
          name: 'Search',
          component: () => import( './views/search.vue'),
        },
        {
          path: '/compose',
          name: 'Compose',
          component: () => import('./views/createTweet')
        },
        {
          path: '/post/:id',
          name: 'Post',
          component: () => import('./views/tweetFull')
        },
        {
          path: '/profile',
          name: 'My Profile',
          component: () => import( './views/myprofile.vue'),
        },
        {
          path: '/user/:username',
          name: 'Profile',
          component: () => import( './views/profile.vue'),
        },
        {
          path: '/profile/edit',
          name: 'Edit profile',
          component: () => import('./views/editProfile')
        },
        {
          path: '/changepassword',
          name: 'Change password',
          meta: {
              requiresAuth: true
          },
          component: () => import(/* webpackChunkName: "about" */ './views/change_password.vue')
        },
        {
          path: '/advertise',
          name: 'Advertise',
          component: () => import('./views/advertise.vue')
        },
        {
          path: '/promote/:postid',
          name: 'Promotion',
          component: () => import('./views/promote.vue')
        },
        {
          path: '/mypromotion',
          name: 'My Subscription',
          meta: {
              requiresAuth: true
          },
          component: () => import('./views/mypromotion.vue')
        },
    
      ]
    },
    {
      path: '/career',
      name: 'Career',
      meta: {
        layout: "content",
      },
      component: () => import( './views/careers.vue'),
    },
    {
      path: '/about',
      name: 'About',
      meta: {
        layout: "content",
      },
      component: () => import( './views/About.vue'),
    },
    {
      path: '/blog',
      component: () => import( './views/blog.vue'),
      children: [
        {
          path: '/admin/bposts',
          name: 'Admin Blog',
          component: () => import( './views/AdminBlogposts.vue'),
          meta: {
            layout: "content",
            requiresAuth: true
          },
        },
        {
          path: '/',
          name: 'Blog',
          component: () => import( './views/blogposts.vue'),
          meta: {
            layout: "content",
          },
        },
        {
          path: '/blog/compose',
          name: 'Compose Blog post',
          component: () => import( './views/blogcompose.vue'),
          meta: {
            layout: "content",
            requiresAuth: true
          },
        },
        {
          path: '/blog/:id',
          name: 'Blog Post',
          component: () => import( './views/blogpost.vue'),
          meta: {
            layout: "content",
          },
        },
      ]
    },
    {
      path: '/privacy',
      name: 'Privacy policy',
      meta: {
        layout: "content",
      },
      component: () => import( './views/privacy.vue'),
    },
    {
      path: '/confirmmail',
      name: 'confirmmail',
      meta: {
        layout: "no-sidebar",
        requiresAuth: false
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/confirmmail.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
          layout: "no-sidebar",
          requiresAuth: false
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/email/reset',
      name: 'Send email',
      meta: {
          layout: "no-sidebar",
          requiresAuth: false
      },
      component: () => import(/* webpackChunkName: "about" */ './views/resetPassword.vue')
    },
    {
      path: '/emailsent/reset',
      name: 'Email sent message',
      meta: {
          layout: "no-sidebar",
          requiresAuth: false
      },
      component: () => import(/* webpackChunkName: "about" */ './views/resetPassword2.vue')
    },
    {
      path: '/password/reset/:token',
      name: 'New password',
      meta: {
          layout: "no-sidebar",
          requiresAuth: false
      },
      component: () => import(/* webpackChunkName: "about" */ './views/resetPassword3.vue')
    },
    {
      path: '/sign_up',
      name: 'sign_up',
      meta: {
          layout: "no-sidebar",
          requiresAuth: false
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
    },
  ]
})
router.beforeEach((to, from, next) => {
  // window.$cookies.remove('auth-token')
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (window.$cookies.get('auth-token') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
  next()
})

export default router
