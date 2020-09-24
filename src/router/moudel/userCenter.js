const userCenter = [
  {
    path: '/userCenter/purchaseOrder',
    component: () => import('@/views/userCenter/purchaseOrder'),
    name: 'PurchaseOrder',
    meta: {
      keepAlive: true,
      title: '采购订单'
    }
  },
  {
    path: '/userCenter/myAttention',
    component: () => import('@/views/userCenter/myAttention'),
    name: 'MyAttention',
    meta: {
      keepAlive: true,
      title: '我的关注'
    }
  },
  {
    path: '/userCenter/planInvoice',
    component: () => import('@/views/userCenter/planInvoice'),
    name: 'PlanInvoice',
    meta: {
      keepAlive: true,
      title: '计划货单'
    }
  },
  {
    path: '/userCenter/userSetting',
    component: () => null,
    name: 'UserSetting',
    meta: {
      keepAlive: true,
      title: '用户设置及认证'
    }
  }
]
export default userCenter
