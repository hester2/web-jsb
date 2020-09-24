const orderStateArr = ['待生成合同', '待签署', '待支付', '待发货', '待收货', '完成', '订单超时未支付自动取消', '卖家已取消', '买家已取消', '订单已手动取消', '删除订单']
const orderState = new Map()
for (let i = 0; i < orderStateArr.length; i++) {
  orderState.set(i + 1, orderStateArr[i])
}

const orderStateStyleArr = ['gd-badgecom-staypay', 'gd-badgecom-already', 'gd-badgecom-staypay', 'gd-badgecom-already', 'gd-badgecom-stay', 'gd-badgecom-delivery', 'gd-badgecom-already', 'gd-badgecom-already', 'gd-badgecom-already', 'gd-badgecom-already', 'gd-badgecom-already']
const orderStyleState = new Map()
for (let i = 0; i < orderStateStyleArr.length; i++) {
  orderStyleState.set(i + 1, orderStateArr[i])
}

export default {
  filters: {
    orderState: function(dataStr) {
      return orderState.get(dataStr * 1)
    },
    orderStyleState: function(dataStr) {
      return orderStyleState.get(dataStr * 1)
    }
  }
}
