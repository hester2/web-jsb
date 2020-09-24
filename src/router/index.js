import Vue from 'vue'
import VueRouter from 'vue-router'
import { LogoLayout, ShopLayout, UserCenterLayout, ShopHomeLayout, TestLayout,ChatLayout } from '@/layouts'
import shop from '@/router/moudel/shop'
import shopHome from '@/router/moudel/shopHome'
import shopChat from '@/router/moudel/shopChat'
import userCenterRouter from '@/router/moudel/userCenter'
import testPage from '@/router/moudel/testPage'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location) // .catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/shop/home'
  },
  {
    path: '/user',
    redirect: '/user/login',
    component: LogoLayout,
    meta: {
      keepAlive: false,
      title: '用户'
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/user/Login'),
        meta: {
          keepAlive: false,
          title: '登录'
        } // 不显示
      }, {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/user/Register'),
        meta: {
          keepAlive: false,
          title: '注册'
        }
      }
    ]
  },
  {
    path: '/shop',
    component: ShopLayout,
    redirect: '/shop/home',
    meta: {
      keepAlive: true
    },
    children: shop
  },
  {
    path: '/userCenter',
    component: UserCenterLayout,
    redirect: '/userCenter/purchaseOrder',
    name: 'userCenter',
    meta: {
      title: '用户中心',
      keepAlive: true,
      hidden: true
    },
    children: userCenterRouter
  },
  {
    path: '/home/map',
    name: '地图',
    component: () => import('@/views/home/map'),
    meta: {
      activeMenu: '/', // 主菜单 的 接口文档 高亮
      apiActiveMenu: '/home/map', // 子菜单高亮
      keepAlive: true
    }
  },
  {
    path: '/formMap',
    name: '地图表单',
    component: () => import('@/views/formMap'),
    meta: {
      keepAlive: true,
      hidden: true
    }
  },
	{
	  path: '/shopHome',
	  component:ShopHomeLayout,
	  meta: {
	    keepAlive: true
	  },
		children: shopHome
	},
	{
	  path: '/chat',
		redirect: '/chat/message',
	  component:ChatLayout,
	  meta: {
	    keepAlive: true,
	  },
		children: shopChat
	}
  /* {
    path: '*',
    redirect: '/shop/home'
  }*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
