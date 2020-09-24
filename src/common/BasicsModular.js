import Vue from 'vue'
export default class BasicsModular {
  constructor(key, label) {
    this.keyName = key || 'id'
    this.labelName = label || 'name'
  }
  // 异步组件
  asyncComponent() {
    Vue.$message.success('不要着急……开发中……')
  }
  // 转换至select组件
  item2ValueLabel(arr) {
    if (arr && arr.length) {
      return arr.map((item) => {
        return Object.assign({}, { ...item }, { value: item[`${this.keyName}`], label: item[`${this.labelName}`] })
      })
    }
  }
}
