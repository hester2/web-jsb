<template>
  <div class="gd-placeOrder-main">
    <div class="gd-placeOrder-w">
      <div v-if="address.length===0" class="gd-placeOrder-newaddress">
        <p class="gd-placeOrder-name">收货地址:</p>
        <div class="gd-placeOrder-form">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <div class="gd-placeOrder-left">
              <el-form-item label="收货人" prop="name">
                <el-input v-model="ruleForm.name" />
              </el-form-item>
              <el-form-item label="发货地点" prop="val">
                <el-cascader v-model="ruleForm.val" filterable :options="options" :props="props" clearable @change="handleAddress" />
              </el-form-item>
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="ruleForm.address" type="textarea" />
              </el-form-item>
              <el-form-item label="邮编" prop="email">
                <el-input v-model="ruleForm.email" />
              </el-form-item>
              <el-form-item label="手机" prop="phone">
                <el-input v-model="ruleForm.phone" />
              </el-form-item>
              <el-form-item label="固定电话" prop="fixedPhone">
                <el-input v-model="ruleForm.fixedPhone" />
              </el-form-item>
              <el-form-item label="" prop="defaultAddress">
                <el-checkbox-group v-model="ruleForm.defaultAddress">
                  <el-checkbox label="设置为默认地址" name="defaultAddress" />
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div class="gd-placeOrder-right">
              <el-form-item label="粘贴地址" prop="addressAll">
                <el-input v-model="ruleForm.addressAll" type="textarea" placeholder="粘贴收件人姓名、电话、地址" />
              </el-form-item>
              <p style="display: flex;justify-content: flex-end;">
                <el-button>自动匹配地址</el-button>
              </p>
            </div>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确认收货</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-if="address.length>0" class="gd-placeOrder-newaddress">
        <p class="gd-placeOrder-name">收货地址:</p>
        <div class="gd-placeOrder-form">
          <div v-show="ressList">
            <div v-if="defaultAddress.length!==0" class="defaultAddress">
              <p class="gd-placeOrder-pl"><img src="../../../assets/img/icon-placeOrder-001.png" alt="">
                <span>{{ defaultAddress.contact }}{{ defaultAddress.provinceName }}{{ defaultAddress.cityName }}{{ defaultAddress.areaName }}
                  {{ defaultAddress.address }} </span><span>{{ defaultAddress.phone }}</span></p>
              <p class="gd-placeOrder-pr"><span @click="handleEdit">更改地址</span></p>
            </div>
            <div v-if="address.length!=0&&defaultAddress==''" class="address">
              <p class="gd-placeOrder-pl"><img src="../../../assets/img/icon-placeOrder-001.png" alt="">
                <span>{{ address[0].contact }}{{ address[0].provinceName }}{{ address[0].cityName }}{{ address[0].areaName }}
                  {{ address[0].address }} </span><span>{{ address[0].phone }}</span></p>
              <p class="gd-placeOrder-pr"><span @click="handleEdit">更改地址</span></p>
            </div>
          </div>
          <div v-show="addressDetail" class="gd-placeOrder-gt">
            <el-radio-group v-model="radioList" @change="handleChange(radioList.address)">
              <el-radio v-for="(item,index) in address" :key="index" :label="item">
                <div class="gd-placeOrder-lo">
                  <p>{{ item.contact }}{{ item.provinceName }}{{ item.cityName }}{{ item.areaName }} {{ item.address }}
                    <span style="color: #EE7C51;">{{ item.phone }}</span></p>
                  <p v-show="item.isshow" class="gd-placeOrder-mall">
                    <span @click="handleDeufal(item)">设置为默认地址</span><span @click="handleNewEdit(item)">修改</span>
                    <span @click="handleDel(item)">删除</span></p>
                </div>
              </el-radio>
            </el-radio-group>
            <p style="text-align: left;font-size: 12px; cursor: pointer;color: #EE7C51;" @click="handleNew">添加新地址 <span
                @click="handleCan">取消</span></p>
            <div v-show="createAd" class="gd-placeOrder-form">
              <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                <div class="gd-placeOrder-left">
                  <el-form-item label="收货人" prop="nickname">
                    <el-input v-model="ruleForm.name" />
                  </el-form-item>
                  <el-form-item label="发货地点" prop="val">

                    <el-cascader v-model="ruleForm.val" filterable :options="options" :props="props" clearable @change="handleAddress" />

                  </el-form-item>
                  <el-form-item label="详细地址" prop="address">
                    <el-input v-model="ruleForm.address" type="textarea" />
                  </el-form-item>
                  <el-form-item label="邮编" prop="email">
                    <el-input v-model="ruleForm.email" />
                  </el-form-item>
                  <el-form-item label="手机" prop="phone">
                    <el-input v-model="ruleForm.phone" />
                  </el-form-item>
                  <el-form-item label="固定电话" prop="fixedPhone">
                    <el-input v-model="ruleForm.fixedPhone" />
                  </el-form-item>
                  <el-form-item label="" prop="defaultAddress">
                    <el-checkbox-group v-model="ruleForm.defaultAddress">
                      <el-checkbox label="设置为默认地址" name="defaultAddress" />
                    </el-checkbox-group>
                  </el-form-item>
                </div>
                <div class="gd-placeOrder-right">
                  <el-form-item label="粘贴地址" prop="addressAll">
                    <el-input v-model="ruleForm.addressAll" type="textarea" placeholder="粘贴收件人姓名、电话、地址" />
                  </el-form-item>
                  <p style="display: flex;justify-content: flex-end;">
                    <el-button @click="handleIdentify">自动匹配地址</el-button>
                  </p>
                </div>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">确认收货</el-button>
                  <el-button @click="handleCancel">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <div class="gd-placeOrder-newaddress gd-placeOrder-newaddress-b">
        <div class="gd-placeOrder-top">
          供应商：兴建祥贸易 <img src="../../../assets/img/icon-placeOrder-002.png" alt="">
        </div>
        <div class="gd-placeOrder-bom">
          <p class="gd-placeOrder-name gd-placeOrder-names">订单:</p>
          <div class="gd-placeOrder-lr">

            <order-goods-table :table-data="orderGoods" @change="orderGoodsTableChange" />

            <div class="gd-placeOrder-bc">
              <div class="gd-placeOrder-bc-le">
                <p>备注信息</p>
                <el-input v-model="notes" />
              </div>
              <div class="gd-placeOrder-bc-lr">
                <p>货品总金额：<span>{{ orderTotalAmount }} 元</span></p>
                <p>运费共计：<span>0.00 元</span></p>
              </div>
            </div>
          </div>
        </div>
        <div class="gd-placeOrder-bom gd-placeOrder-bom-t" style="align-items: center;">
          <p class="gd-placeOrder-name">合同签署:</p>
          <div class="gd-placeOrder-bom" style="width: 100%">
            <el-select v-model="convalue" placeholder="请选择合同类型" @change="handleContractType">
              <el-option v-for="item in contractType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="gd-placeOrder-bom gd-placeOrder-bom-t">
          <p class="gd-placeOrder-name">合同签署:</p>
          <div class="gd-placeOrder-bom" style="width: 100%">
            <el-row style="width: 100%;margin: 0px;" :gutter="20">
              <el-col :span="3">
                <div @click="getdocx">
                  <div><span class="icon iconfont" style="font-size: 64px;color: #EE7C51">&#xe618;</span></div>
                  <div>销售合同</div>
                </div>
              </el-col>
              <!--<el-col :span="3">
                <a href="/files/1111.pdf" target="_blank">
                  <div><span class="icon iconfont" style="font-size: 64px;color: #EE7C51">&#xe618;</span></div>
                  <div>销售合同</div>
                </a>
              </el-col>-->
              <!-- <el-col :span="3">
                <div><span class="icon iconfont" style="font-size: 64px;color: #EE7C51">&#xe618;</span></div>
                <div>销售合同</div>
              </el-col>-->
            </el-row>

          </div>
        </div>
        <el-divider />
        <el-row class="gd-placeOrder-rows" :gutter="20">
          <el-col :span="2">总计：</el-col>
          <el-col :span="14">
            <p>货品种类: {{ orderGoods.length }} 种</p>
            <p>数量总计：{{ orderTotalNumber }}吨</p>
          </el-col>
          <el-col :span="8">
            <p>货品总金额 ： {{ orderTotalAmount }} 元</p>
            <p>运费总计 ： 0 元</p>
            <p>应付总额（含运费）： {{ orderTotalAmount }} 元</p>
          </el-col>
        </el-row>
        <el-divider />
        <div class="gd-placeOrder-btns">
          <el-button type="primary" @click="submitOrder">
            提交订单
          </el-button>
        </div>
      </div>
    </div>
    <el-dialog title="修改地址" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="gd-placeOrder-form gd-placeOrder-form-t">
        <el-form ref="editForm" :model="editForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <div class="gd-placeOrder-left">
            <el-form-item label="收货人" prop="name">
              <el-input v-model="editForm.name" />
            </el-form-item>
            <el-form-item label="发货地点" prop="val">

              <el-cascader v-model="editForm.val" filterable :options="options" :props="editProps" clearable @change="handleEditAddress" />

            </el-form-item>
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="editForm.address" type="textarea" />
            </el-form-item>
            <el-form-item label="邮编" prop="email">
              <el-input v-model="editForm.email" />
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input v-model="editForm.phone" />
            </el-form-item>
            <el-form-item label="固定电话" prop="fixedPhone">
              <el-input v-model="editForm.fixedPhone" />
            </el-form-item>
            <el-form-item label="" prop="defaultAddress">
              <el-checkbox-group v-model="editForm.defaultAddress">
                <el-checkbox label="设置为默认地址" name="defaultAddress" />
              </el-checkbox-group>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitEditForm('editForm')">确认收货</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="查看合同" :visible.sync="contractDialogVisible" width="80%" style="height: 100vh;" center>
      <h1>再等等吧</h1>
      <a href="22222.docx"></a>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import {
    insertUserAddress,
    obtainUserAddress,
    updateUserAddress,
    cancelUserAddress
  } from '@/api/table.js'
  import OrderGoodsTable from '@/views/marke/components/OrderGoodsTable'
  import userInfoMixins from '@/Mixins/userInfoMixins'

  export default {
    components: {
      OrderGoodsTable
    },
    mixins: [userInfoMixins],
    data() {
      return {
        dialogVisible: false,
        contractDialogVisible: false,
        radioList: '',
        ressList: true,
        addressDetail: false,
        createAd: false,
        address: true,
        notes: '',
        ruleForm: {
          name: '',
          val: '',
          address: '',
          email: '',
          defaultAddress: false,
          phone: '',
          fixedPhone: '',
          addressAll: ''
        },
        editForm: {
          name: '',
          address: '',
          provinceId: '',
          provinceName: '',
          areaId: '',
          areaName: '',
          cityId: '',
          cityName: '',
          email: '',
          val: '',
          defaultAddress: '',
          phone: '',
          fixedPhone: '',
          id: 0
        },
        vals: [],
        options: [],
        address: [],
        defaultAddress: [],
        rules: {
          name: [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }],
          address: [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }]
        },
        // 发货组件
        props: {},
        editProps: {},
        tableData: [],
        // 新增省市区编号
        provinceName: '',
        cityName: '',
        areaName: '',
        provinceId: '',
        cityId: '',
        areaId: '',
        // 编辑省市区编号
        editProvinceName: '',
        editCityName: '',
        editAreaName: '',
        editProvinceId: '',
        editCityId: '',
        editAreaId: '',
        // userInfo: [],
        // 订单商品
        orderGoods:[],
        contractType: [{
          value: '1',
          label: '个人'
        }, {
          value: '2',
          label: '企业'
        }],
        convalue: '',
        signType: '',
      }
    },
    computed: {
      ...mapState('order', ['markeDetails'], 'userInfo'),
      orderTotalAmount() {
      	const price = this.orderGoods[0].orderAmount*this.orderGoods[0].price

      	return price
      },
      orderTotalNumber(){
        const price =this.orderGoods[0].orderAmount
        return price
      }
    },
    watch: {

    },
    created() {
        this.orderGoods = [this.markeDetails]
      // this.userInfo = JSON.parse(localStorage.getItem('user-info'))
      this.handleCreatAddress()
      this.$http.get('/citylist.json').then(function(response) {
          const data = response.data
          // console.log(response.data)
          this.options = data
        })
        .catch(function(error) {
          console.log('出错喽：' + error)
        })
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
      handleContractType(value) {
        this.signType = value
        console.log(this.convalue)
      },
      getdocx() {
        // window.open('/files/22222.docx', '_blank')
        this.contractDialogVisible = true
      },
      //
      // 			getdocx() {
      // 				console.log('docx')
      // 				      this.$http.get('/files/22222.docx', {
      // 				        responseType: 'blob' // 重要
      // 				      }).then(response => {
      // 				        console.log(response)
      // 				        const url = window.URL.createObjectURL(new Blob([response.data]))
      // 				        const link = document.createElement('a')
      // 				        const fname = 'report.docx'
      // 				        link.href = url
      // 				        link.setAttribute('download', fname)
      // 				        document.body.appendChild(link)
      // 				        link.click()
      // 				      })
      // 			},
      orderGoodsTableChange(data) {
        this.orderGoods = data
      },
      // 提交订单
      async submitOrder() {
        console.log('33', this.orderGoods,this.signType)
        var dataJson = []
        this.orderGoods.map(item => {
          dataJson.push({
            name:item.title,
            perPrice:item.price,
            specification:item.rawType,
            picUrl:item.rawProvideImgVos[0].url,
            num: this.orderTotalNumber,
            remark:this.notes,
            totalPrice:this.orderTotalAmount,
            shopId: this.userInfo.id,
            rawProvideInfoId:item.id
          })
        })
        const data = {
          orderItemVos:dataJson,
          receivingAddressId: this.defaultAddress.id || this.address[0].id,
          materialsType: '',
          shopId:this.userInfo.id,
          type: 1,
          userId: this.userInfo.userId,
          signType: Number(this.signType)
        }
        try {
          if (this.convalue == '') {
            this.$message.error('请选择合同类型')
          } else {
            const res = await this.$ajax.goodsOrder.post(data)
            console.log(res)
            if (res) {
              this.$message.success('成功下单')
              setTimeout(() => {
                this.$router.push({
                  name: 'PurchaseOrder'
                })
              }, 1500)
            }
          }
        } catch (e) {
          // this.$message.error(e.message || '下单失败请重试')
        }
      },
      handleChangeNum(o) {

      },
      // 自动识别
      handleIdentify() {

      },
      handleCan() {
        this.ressList = true
        this.addressDetail = false
      },
      // 修改默认地址
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },

      objectSpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (columnIndex === 7) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
      handleEdit() {
        this.addressDetail = true
        this.ressList = false
        this.createAd = false
      },
      handleNew() {
        this.createAd = true
        this.radioList = ''
        return this.address.map(item => {
          this.$set(item, 'isshow', false)
          return item
        })
      },
      handleChange(value) {
        this.createAd = false
        var val = value
        var changeList = this.address
        for (var i in changeList) {
          if (val == changeList[i].address) {
            changeList[i].isshow = true
          } else {
            changeList[i].isshow = false
          }
        }
      },
      handleCancel() {
        this.addressDetail = false
        this.ressList = true
      },
      getCascaderObj(val, opt) {
        return val.map(function(value, index, array) {
          for (var itm of opt) {
            if (itm.value == value) {
              opt = itm.children
              return itm
            }
          }
          return null
        })
      },
      // 设置保存发送后台数据地址
      handleEditAddress(value) {
        this.editvals = this.getCascaderObj(this.editForm.val, this.options)
        console.log(this.editvals + '11')
        if (this.editvals.length < 3) {
          this.editProvinceName = this.editvals[0].label
          this.editCityName = this.editvals[1].label
          this.editProvinceId = value[0]
          this.editCityId = value[1]
        } else {
          this.editProvinceName = this.editvals[0].label
          this.editCityName = this.editvals[1].label
          this.editAreaName = this.editvals[2].label
          this.editProvinceId = value[0]
          this.editCityId = value[1]
          this.editAreaId = value[2]
        }
        // this.sendArea = data
      },
      handleAddress(value) {
        console.log(this.editForm.val)
        this.vals = this.getCascaderObj(this.ruleForm.val, this.options)
        console.log(this.vals)
        if (this.vals.length < 3) {
          this.provinceName = this.vals[0].label
          this.cityName = this.vals[1].label
          this.provinceId = value[0]
          this.cityId = value[1]
        } else {
          this.provinceName = this.vals[0].label
          this.cityName = this.vals[1].label
          this.areaName = this.vals[2].label
          this.provinceId = value[0]
          this.cityId = value[1]
          this.areaId = value[2]
        }
        // this.sendArea = data
      },
      // 地址为空 新增收货地址
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var check
            if (this.ruleForm.defaultAddress == false) {
              check = 1
            } else {
              check = 2
            }
            insertUserAddress({
              'contact': this.ruleForm.name,
              'address': this.ruleForm.address,
              'areaId': this.areaId,
              'areaName': this.areaName,
              'cityId': this.cityId,
              'cityName': this.cityName,
              'defaultAddress': check,
              'id': 0,
              'postalCode': this.ruleForm.email,
              'phone': this.ruleForm.phone,
              'provinceId': this.provinceId,
              'provinceName': this.provinceName,
              'userId': this.userInfo.userId
            }).then(response => {
              this.handleCreatAddress()
              this.$refs[formName].resetFields()
              this.createAd = false
              this.ressList
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      // 编辑地址
      handleNewEdit(val) {
        console.log(val)
        this.dialogVisible = true
        var defaults
        if (val.defaultAddress == 1) {
          defaults = false
        } else {
          defaults = true
        }
        var city = []
        if (val.areaId == '') {
          city = [val.provinceId, val.cityId]
        } else {
          city = [val.provinceId, val.cityId, val.areaId]
        }

        this.editForm = {
          name: val.contact,
          address: val.address,
          provinceId: val.provinceId,
          provinceName: val.provinceName,
          areaId: val.areaId,
          areaName: val.areaName,
          cityId: val.cityId,
          cityName: val.cityName,
          email: val.email,
          val: city,
          defaultAddress: defaults,
          phone: val.phone,
          fixedPhone: val.fixedPhone,
          id: val.id
        }
        console.log(this.editForm.val)
      },
      // 修改
      submitEditForm(formName) {
        var check
        if (this.editForm.defaultAddress == false) {
          check = 1
        } else {
          check = 2
        }
        console.log(check)
        updateUserAddress(this.editForm.id, {
          'contact': this.editForm.name,
          'address': this.editForm.address,
          'areaId': this.editForm.areaId,
          'areaName': this.editForm.areaName,
          'cityId': this.editForm.cityId,
          'cityName': this.editForm.cityName,
          'defaultAddress': check,
          'postalCode': this.editForm.email,
          'phone': this.editForm.phone,
          'provinceId': this.editForm.provinceId,
          'provinceName': this.editForm.provinceName
        }).then(respones => {
          this.handleCreatAddress()
          this.dialogVisible = false
          this.ressList = true
          this.addressDetail = false
          this.$refs[formName].resetFields()
        })
      },
      // 删除
      handleDel(val) {
        cancelUserAddress(val.id).then(respones => {
          if (val.defaultAddress == 2) {
            this.defaultAddress = []
          }
          this.handleCreatAddress()
        })
      },
      // 设置默认
      handleDeufal(val) {
        // 直接设置默认值 就直接传2
        updateUserAddress(val.id, {
          'contact': val.contact,
          'address': val.address,
          'areaId': val.areaId,
          'areaName': val.areaName,
          'cityId': val.cityId,
          'cityName': val.cityName,
          'defaultAddress': 2,
          'phone': val.phone,
          'provinceId': val.provinceId,
          'provinceName': val.provinceName,
          'userId': this.userInfo.userId
        }).then(respones => {
          this.handleCreatAddress()
          this.ressList = true
          this.addressDetail = false
        })
      },
      // 查询
      handleCreatAddress() {
        obtainUserAddress(this.userInfo.userId).then(respones => {
          console.log(respones)
          respones.result.map(item => {
            this.$set(item, 'isshow', false)
            return item
          })
          var data = respones.result
          this.address = data
          for (var i in data) {
            if (data[i].defaultAddress == 2) {
              this.defaultAddress = data[i]
            }
          }
          if (this.address.length == 0) {
            this.address = []
            this.defaultAddress = []
          }
          console.log(this.defaultAddress)
          console.log('gg')
          console.log(this.address)
        })
      }
    }
  }
</script>

<style lang="less">
  .gd-placeOrder-main {
    width: 100%;
    height: 100%;
    background-color: #FAFAFA;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    .gd-placeOrder-w {
      width: 1200px;
      height: 100%;
    }

    .gd-placeOrder-newaddress {
      width: 1200px;
      // height: 410px;
      background: rgba(255, 255, 255, 1);
      display: flex;
      box-sizing: border-box;
      padding: 20px 20px;
      margin: 20px 0px;
    }

    .gd-placeOrder-form {
      width: 1039px;

      .el-form {
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;

        .el-button {
          padding: 3px 10px;
        }

        .gd-placeOrder-left {
          width: 600px;
          border-right: 1px solid rgba(230, 230, 230, 1);

          .el-input__inner {
            height: 30px;
            line-height: 30px;
            width: 300px;
          }

          .el-form-item {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 10px;
          }

          .el-textarea {
            width: 300px;
          }

          .el-form-item__content {
            display: flex;
            justify-content: flex-start;
            margin-left: 0px !important;
          }

          .el-checkbox-group {
            margin-left: 100px;
          }
        }

        .gd-placeOrder-right {
          width: 350px;

          .el-form-item {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .el-form-item__content {
            margin-left: 30px !important;
            width: 320px;

            .el-textarea__inner {
              height: 90px;
            }
          }
        }
      }
    }

    .gd-placeOrder-pl {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        width: 14px;
        height: 16px;
        margin-right: 10px;
      }

      span {
        font-size: 12px;
        color: #333;
      }

      span:nth-of-type(2) {
        color: #EE7C51;
      }
    }

    .gd-placeOrder-pr {
      display: flex;

      span {
        font-size: 12px;
        color: #999;
        margin-right: 25px;
      }

      span:nth-of-type(1) {
        margin-left: 23px;
      }
    }

    .gd-placeOrder-gt {
      .el-radio-group {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        .el-radio {
          display: flex;
          align-items: center;
          height: 35px;
        }

        .gd-placeOrder-lo {
          display: flex;
          justify-content: space-between;
          width: 900px;
        }

        .gd-placeOrder-mall {
          font-size: 12px;

          span {
            margin-right: 10px;
            font-size: 12px;
          }
        }
      }
    }

    .gd-placeOrder-btn {
      display: flex;
      margin-top: 10px;

      .el-button {
        padding: 3px 10px;
      }

      .el-button:nth-of-type(1) {
        background-color: #EE7C51;
        color: #fff;
      }
    }

    .gd-placeOrder-name {
      width: 161px;
      font-size: 13px;
      color: #666666;
    }

    .gd-placeOrder-names {
      text-align: center;
    }

    //订单模块
    .gd-placeOrder-newaddress-b {
      padding: 0px;
      display: flex;
      flex-direction: column;
    }

    .gd-placeOrder-top {
      width: 100%;
      height: 40px;
      background: rgba(238, 124, 81, 1);
      color: #fff;
      font-size: 12px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0px 30px;

      img {
        width: 15px;
        height: 14px;
      }
    }

    .gd-placeOrder-bom {
      display: flex;
      box-sizing: border-box;
      padding: 30px 0px;

      .el-col {
        font-size: 13px;
        color: #666;
      }
    }

    .gd-placeOrder-lr {
      width: 1033px;
      background-color: #FAFAFA;
    }

    .gd-placeOrder-title {
      display: flex;
      align-items: center;

      img {
        width: 60px;
        height: 60px;
      }
    }

    .el-table {
      margin-top: 0px;
    }

    .el-table th,
    .el-table tr {
      background-color: transparent;
    }

    .gd-placeOrder-bc {
      display: flex;
      justify-content: space-between;
      height: 80px;
      box-sizing: border-box;
      padding: 0px 20px;
      align-items: center;

      .gd-placeOrder-bc-le {
        width: 400px;
        display: flex;
        font-size: 12px;
        align-items: center;

        p {
          width: 70px;
        }

        .el-input__inner {
          width: 300px;
          height: 30px;
          line-height: 30px;
        }
      }

      .gd-placeOrder-bc-lr {
        display: flex;
        flex-direction: column;

        p {
          font-size: 12px;
        }

        span {
          font-size: 14px;
          color: #EE7C51;
        }
      }
    }

    .gd-placeOrder-bom-t {
      border-top: 1px solid #E6E6E6;
      margin: 0px 50px;
    }

    .gd-placeOrder-form-t {
      width: 404px;

      .gd-placeOrder-left {
        border: none !important;
      }
    }

    .el-radio__input.is-checked+.el-radio__label {
      color: #333;
    }

    .gd-placeOrder-rows {
      box-sizing: border-box;
      padding: 0px 20px;

      .el-col:nth-of-type(1) {
        text-align: center;
      }

      .el-col {
        font-size: 13px;
        color: #666666;
      }
    }

    .gd-placeOrder-btns {
      text-align: right;
      margin-bottom: 20px;

      .el-button {
        padding: 6px 10px;
        margin-right: 20px;
      }
    }

    .el-row {
      margin: 0px !important;
    }
  }
</style>
