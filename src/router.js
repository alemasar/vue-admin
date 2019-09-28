
import Vue from "vue";
import Router from "vue-router";
import axios from 'axios'

function loadView(view) {
  console.log(view)
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}/${view}.vue`)
}
function requireAuth(to, from, next){
  axios.get(process.env.VUE_APP_API_URL + "getRole", {
    headers: {
      'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Origin': '*',
   },
  withCredentials: true
  })
  .then(response => {
    const responseRole = response.data.role;
    const authorizedRole = to.meta.role;
    if (responseRole === authorizedRole){
      next();
    } else {
      next('/')
    }
  });
}
Vue.use(Router)

export default new Router({
  linkExactActiveClass: "active",
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: loadView('Login')
    },
    {
      path: '/users',
      name: 'users',
      component: loadView('User'),
      meta: { role: 'superadmin' },
      beforeEnter: requireAuth
    }
  ]
})