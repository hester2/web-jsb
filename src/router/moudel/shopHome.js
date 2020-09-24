const shopHome = [
  {
    path: '/shopHome/home/:id?',
    name: 'ShopHome',
    component: () => import('@/views/shop/shopHome'),
    meta: {
      keepAlive: true,
      title: '店铺首页'
    }
  }, {
    path: '/shopHome/product',
    name: 'ShopHomeProduct',
    component: () => import('@/views/shop/shopHome/product'),
    meta: {
      keepAlive: true,
      title: '产品分类'
    }
  }, {
    path: '/shopHome/live',
    name: 'ShopHomeLive',
    component: () => import('@/views/shop/shopHome/live'),
    meta: {
      keepAlive: true,
      title: '店铺直播'
    }
  }

]
export default shopHome
