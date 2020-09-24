const shop = [
  /* {
    path: '/shop/home',
    component: () => import('@/views/home'),
    name: 'Home',
    meta: {
      keepAlive: true,
      title: '首页'
    }
  },*/
  {
    path: '/shop/home',
    component: () => import('@/views/home'),
    name: 'Home',
    meta: {
      keepAlive: true,
      title: '首页'
    }
  },
  {
    path: '/shop/auction',
    name: 'Auction',
    component: () => import('@/views/home/auction'),
    meta: {
      keepAlive: true,
      title: '竞拍',
      hidden: true
    }
  },
  {
    path: '/shop/marke',
    name: 'Marke',
    component: () => import('@/views/marke'),
    meta: {
      keepAlive: true,
      title: '原料市场'
    }
  },
  {
    path: '/shop/supplierDetail',
    name: 'SupplierDetail',
    component: () => import('@/views/marke/supplierDetail'),
    meta: {
      keepAlive: true,
      title: '供应商详情',
      hidden: true
    }
  },
  {
    path: '/shop/goods',
    name: 'Shop',
    component: () => import('@/views/shop'),
    meta: {
      keepAlive: false,
      title: '制品商城'
    }
  },
  {
    path: '/shop/information',
    name: 'Information',
    component: () => import('@/views/information'),
    meta: {
      keepAlive: true,
      title: '行情中心',
      hidden: false
    }
  },
  {
    path: '/shop/supply',
    name: 'Supply',
    component: () => import('@/views/supply'),
    meta: {
      keepAlive: true,
      title: '供应链金融',
      hidden: true
    }
  },
  {
    path: '/shop/logistics',
    name: 'Logistics',
    component: () => import('@/views/logistics'),
    meta: {
      keepAlive: true,
      title: '智慧物流',
      hidden: false
    }
  }, {
    path: '/shop/department',
    name: 'Department',
    component: () => import('@/views/department'),
    meta: {
      keepAlive: true,
      title: '物性科学院',
      hidden: false
    }
  },
  {
    path: '/shop/shopDetail/:id',
    name: 'ShopDetail',
    props: true,
    component: () => import('@/views/shop/shopDetail'),
    meta: {
      title: '商品详情',
      keepAlive: false,
      hidden: true
    }
  },
  {
    path: '/marke/markeDetail/:id',
    name: 'MarkeDetail',
    props: true,
    component: () => import('@/views/marke/markeDetail'),
    meta: {
      title: '原料商品详情',
      keepAlive: false,
      hidden: true
    }
  },
  {
    path: '/marke/markePlaceOrder',
    name: 'MarkePlaceOrder',
    component: () => import('@/views/marke/markePlaceOrder'),
    meta: {
      title: '原料提交订单',
      keepAlive: false,
      hidden: true
    }
  },
  {
    path: '/userCenter/purchaseOrderDetail/:id',
    name: 'PurchaseOrderDetail',
    component: () => import('@/views/userCenter/purchaseOrderDetail'),
    meta: {
      keepAlive: true,
      title: '订单详情',
      hidden: true
    }
  },
  {
    path: '/userCenter/orderPay',
    name: 'OrderPay',
    component: () => import('@/views/userCenter/orderPay'),
    meta: {
      keepAlive: true,
      title: '订单支付',
      hidden: true
    }
  },
  {
    path: '/userCenter/payment',
    name: 'Payment',
    component: () => import('@/views/userCenter/payment'),
    meta: {
      keepAlive: true,
      title: '支付完成',
      hidden: true
    }
  },
  {
    path: '/shop/placeOrder',
    name: 'PlaceOrder',
    component: () => import('@/views/shop/placeOrder'),
    meta: {
      keepAlive: true,
      hidden: true
    }
  },
  {
    path: '/shop/release',
    name: 'Release',
    component: () => import('@/views/shop/release'),
    meta: {
      activeMenu: '/shop',
      apiActiveMenu: '/shop/release',
      keepAlive: true,
      hidden: true
    }
  },
  {
    path: '/shop/edit',
    name: '编辑原材料',
    component: () => import('@/views/shop/edit'),
    meta: {
      activeMenu: '/shop',
      apiActiveMenu: '/shop/edit',
      keepAlive: true,
      hidden: true
    }
  },
  {
    path: '/shop/previewDetail',
    name: '预览商品详情',
    component: () => import('@/views/shop/previewDetail'),
    meta: {
      activeMenu: '/shop',
      apiActiveMenu: '/shop/previewDetail',
      keepAlive: false,
      hidden: true
    }
  },
  {
    path: '/department/departmentDetail',
    name: '物性科学院详情',
    component: () => import('@/views/department/departmentDetail'),
    meta: {
      activeMenu: '/department',
      apiActiveMenu: '/department/departmentDetail',
      keepAlive: true,
      hidden: true
    }
  },
  {
    path: '/materialInfo',
    name: '发布原料信息',
    component: () => import('@/views/materialInfo'),
    meta: {
      keepAlive: true,
      hidden: true
    }
  }, {
    path: '/physicalForm',
    name: '物性表单',
    component: () => import('@/views/physicalForm'),
    meta: {
      keepAlive: true,
      hidden: true
    }
  }, {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/views/chat'),
    meta: {
      keepAlive: true,
      hidden: true
    }
  }

]
export default shop
