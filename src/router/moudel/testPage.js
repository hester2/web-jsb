const testPage = [
  {
    path: '/testPage/sse',
    component: () => import('@/views/testPage/TestSse'),
    name: 'TestSse',
    meta: {
      keepAlive: true,
      title: 'sse测试'
    }
  }
]
export default testPage
