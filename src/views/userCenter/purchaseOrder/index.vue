<template>
  <div class="gd-purOrder-main">
    <el-tabs :tab-position="tabPosition" style="height: auto;" @tab-click="tabClick">
      <el-tab-pane name="" label="所有订单"/>
      <el-tab-pane name="2" label="待签署合同"/>
      <el-tab-pane name="3" label="待付款"/>
      <el-tab-pane name="4" label="待发货"/>
      <el-tab-pane name="5" label="待收货"/>
      <el-tab-pane name="xxxx" label="退款退货"/>
      <div class="gd-purOrder-hian">
        <div class="gd-purOrder-search">
          <el-form :inline="true" :model="queryParams" class="demo-form-inline">
            <el-form-item label="产品名称">
              <el-input v-model="queryParams.goodsName" placeholder="输入品牌名称"/>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker v-model="queryParams.time" value-format="timestamp" type="datetime" placeholder="选择日期时间"
                              align="right" :picker-options="pickerOptions"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getOrderList">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="display: flex;align-items: center;margin-bottom: 20px">
          <el-button style="margin-bottom: 0px;margin-right: 10px">批量删除</el-button>
        </div>
        <div class="gd-planInvoice-mian-li">
          <li><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox></li>
          <li>货品</li>
          <li>单价/元</li>
          <li>数量</li>
          <li>总金额(元)</li>
          <li>合同</li>
          <li>状态</li>
          <li>操作</li>
        </div>
        <div class="gd-planInvoice-mian-check">
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <div class="gd-planInvoice-card" v-for="(item,index) in tableData">
              <el-checkbox :label="item.id" v-model="item.checked">
                <p class="gd-el-checkbox">订单号：{{item.orderNumber}} <span style="margin-left: 10px">时间：{{ item.createTime | moment }}</span></p>
                <div class="gd-planInvoice-card-b">
                  <div class="gd-planInvoice-card-left">
                    <li v-for="o in item.orderItemVos">
                      <img :src="o.picUrl" alt="">
                      <p>
                        <span>{{o.name}}</span>
                        <span>规格：{{o.specification}}</span>
                      </p>
                      <p>￥{{o.perPrice}}</p>
                      <p>{{o.num}}</p>
                    </li>
                  </div>
                  <div class="gd-planInvoice-card-right">
                    <div class="gd-planInvoice-card-right-b">
                      <p class="gd-planInvoice-card-total">
                        <span>{{item.totalPrice}}元</span>
                      </p>
                      <p v-if="item.buyerSignState===0" class="gd-badgecom-row"><span class="gd-badgecom-staypay"></span>待签署
                      </p>
                      <p v-if="item.buyerSignState===1" class="gd-badgecom-row"><span class="gd-badgecom-delivery"></span>买家已签署
                      </p>
                      <p class="gd-badgecom-row"><span :class="item.orderState | orderStyleState"/>
                        {{ item.orderState | orderState }}
                      </p>
                    </div>
                    <div class="gd-planInvoice-card-right-s gd-purOrder-btn">
                        <el-button type="text" v-if="item.orderState==1" size="mini" class=""
                                   @click="handleCreate(item.id, item)">生成
                        </el-button>
                        <el-button type="text" v-if="item.buyerSignState!==1 && item.orderState==2"
                                   size="mini" class="" @click="handleEdit(item.id, item)">签署
                        </el-button>
                        <el-button type="text" size="mini" class="" @click="handlePay(item.id, item)">支付
                        </el-button>
                        <el-button type="text" size="mini" class="" @click="handleDetail(item.id, item)">查看
                        </el-button>
                        <el-button type="text" size="mini" class="" @click="handleDelete(scope.$index, item)">删除
                        </el-button>
                    </div>
                  </div>
                </div>
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
        <!--        <el-table ref="multipleTable" v-loading="tableLoading" :data="tableData" tooltip-effect="dark" style="width: 100%"-->
        <!--          @selection-change="handleSelectionChange">-->
        <!--          <el-table-column type="selection" width="45" />-->
        <!--          <el-table-column label="订单编号" prop="orderNumber" width="180" />-->
        <!--          <el-table-column label="产品图片" width="80">-->
        <!--            <template slot-scope="scope">-->
        <!--              <div class="gd-purOrder-title">-->
        <!--                <img :src="scope.row.orderItemVos[0].picUrl" alt="">-->
        <!--              </div>-->
        <!--            </template>-->
        <!--          </el-table-column>-->
        <!--          <el-table-column prop="orderItemVos[0].name" width="150" label="产品名称" show-overflow-tooltip />-->
        <!--          <el-table-column prop="totalPrice" label="交易金额" show-overflow-tooltip>-->
        <!--          </el-table-column>-->
        <!--          <el-table-column prop="orderItemVos[0].specification" width="150" label="类型">-->
        <!--           <template slot-scope="scope">-->
        <!--             <p v-for="item in scope.row.orderItemVos">{{item.specification}}</p>-->
        <!--           </template>-->
        <!--          </el-table-column>-->
        <!--          <el-table-column prop="createTime" label="交易时间" width="150" sortable>-->
        <!--            <template slot-scope="scope">-->
        <!--              {{ scope.row.createTime | moment }}-->
        <!--            </template>-->
        <!--          </el-table-column>-->
        <!--          <el-table-column prop="orderItemVos[0].num" label="数量" width="80" sortable show-overflow-tooltip />-->
        <!--          <el-table-column prop="buyerSignState" label="合同" width="120" sortable show-overflow-tooltip>-->
        <!--            <template slot-scope="scope">-->
        <!--              <p v-if="scope.row.buyerSignState===0" class="gd-badgecom-row"><span class="gd-badgecom-staypay" />待签署</p>-->
        <!--              <p v-if="scope.row.buyerSignState===1" class="gd-badgecom-row"><span class="gd-badgecom-delivery" />买家已签署</p>-->
        <!--            </template>-->
        <!--          </el-table-column>-->
        <!--          <el-table-column prop="orderState" label="状态" width="80" sortable show-overflow-tooltip>-->
        <!--            <template slot-scope="scope">-->
        <!--              <p class="gd-badgecom-row"><span :class="scope.row.orderState | orderStyleState" />-->
        <!--                {{ scope.row.orderState | orderState }}-->
        <!--              </p>-->
        <!--            </template>-->
        <!--          </el-table-column>-->
        <!--          <el-table-column prop="remark" label="备注" show-overflow-tooltip />-->
        <!--          <el-table-column label="操作" width="130">-->
        <!--            <template slot-scope="scope">-->
        <!--              <div class=" gd-purOrder-btn">-->
        <!--                <el-button type="text" v-if="scope.row.orderState==1" size="mini" class="" @click="handleCreate(scope.row.id, scope.row)">生成-->
        <!--                </el-button>-->
        <!--                <el-button type="text" v-if="scope.row.buyerSignState!==1 && scope.row.orderState==2" size="mini" class="" @click="handleEdit(scope.row.id, scope.row)">签署-->
        <!--                </el-button>-->
        <!--                <el-button type="text"  size="mini" class="" @click="handlePay(scope.row.id, scope.row)">支付-->
        <!--                </el-button>-->
        <!--                <el-button type="text" size="mini" class="" @click="handleDetail(scope.row.id, scope.row)">查看-->
        <!--                </el-button>-->
        <!--                <el-button type="text" size="mini" class=""  @click="handleDelete(scope.$index, scope.row)">删除-->
        <!--                </el-button>-->
        <!--              </div>-->
        <!--            </template>-->
        <!--          </el-table-column>-->
        <!--        </el-table>-->

        <div class="gd-purOrder-footer">
          <el-pagination background :current-page="queryParams.queryParams" :page-sizes="[10, 20, 50]"
                         :page-size="queryParams.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="result.total"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"/>
        </div>
      </div>
      <!-- 合同签署弹窗 -->
      <el-dialog title="合同签署" :visible.sync="centerDialogVisible" width="80%" :before-close="handleClose"
                 :close-on-click-modal="false" :close-on-press-escape="false" style="height: 100vh;" center>
        <div v-loading="loading" style="width: 100%; height: 100%;">

          <iframe :src="contractUrl" style="width: 100%; height: 100%;"/>
          <p v-show="contractHide" class="gd-purOrder-contract-count">稍等一下，正在查询合同是否签署成功{{ contractCount }}秒</p>
        </div>
      </el-dialog>
    </el-tabs>
    <div>
      <el-dialog title="选择合同签署类型" :visible.sync="contractSign" width="20%" :before-close="handleSignClose">
        <el-select v-model="convalue" placeholder="请选择合同类型" @change="handleContractType">
          <el-option v-for="item in contractType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="contractSign = false">取 消</el-button>
          <el-button type="primary" @click="handleContractSign">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import userInfoMixins from '@/Mixins/userInfoMixins'
  import orderFilter from '@/Mixins/filters/orderFilter'

  import {
    postGoodsSignUrl,
    postGoodsSignState,
    postGoodsSignfdd,
    createContract
  } from '@/api/table.js'

  export default {
    mixins: [userInfoMixins, orderFilter],
    data() {
      return {
        checkedCities: [],
        checkAll: false,
        isIndeterminate: true,
        convalue: '',
        signType: '',
        contractSign: false,
        contractOrder: 0,
        tableLoading: false,
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          orderState: '',
          signState: ''
        },
        contractType: [{
          value: '1',
          label: '个人'
        }, {
          value: '2',
          label: '企业'
        }],
        tabPosition: 'top',
        currentPage4: 4,
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        contractUrl: '',
        contractCount: 10,
        contractHide: false,
        orderId: 0,
        orderState: '',
        centerDialogVisible: false,
        result: {},
        tableData: [],
        loading: false,
        multipleSelection: []
      }
    },
    computed: {},
    mounted() {
      this.getOrderList()
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val;
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        console.log(value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.tableData.length;
      },
      async getOrderList() {
        if (this.userInfo.userId) {
          try {
            this.tableLoading = true
            const res = await this.$ajax.goodsOrder.gets(this.queryParams)
            this.result = res.result
            this.tableData = res.result.list
            this.tableLoading = false
          } catch (e) {
            this.tableLoading = false
          }
        } else {
          this.$message.warning('请先登录')
        }
      },
      handleSignClose() {
        this.contractSign = false
      },
      handleDetail(id) {
        this.$router.push({
          name: 'PurchaseOrderDetail',
          params: {
            id
          }
        })
      },
      handleContractType(value) {
        this.signType = value
        console.log(this.convalue)
      },
      tabClick(e) {
        this.queryParams.orderState = e.name
        this.$nextTick(() => {
          this.getOrderList()
        })
      },
      onSubmit() {
        console.log('submit!')
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleCreate(orderId, row) {
        this.contractSign = true
        this.contractOrder = orderId
      },
      handleContractSign() {
        createContract({
          id: this.contractOrder,
          signType: Number(this.signType)
        }).then(res => {
          this.$message.success('合同生成成功')
          this.contractSign = false
          this.getOrderList()
        })
      },
      handlePay(orderId, row) {
        //支付
        this.$router.push({
          name: 'OrderPay',
          params: {
            goodsName: row.orderItemVos[0].name,
            serialNumber: row.orderNumber,
            totalPrice: row.totalPrice
          }
        })
      },
      handleEdit(orderId, row) {
        console.log(orderId, row)
        this.orderId = orderId
        postGoodsSignUrl(orderId).then(res => {
          if (res.result) {
            this.contractUrl = res.result.buyerSignUrl
            this.centerDialogVisible = true
          }
        })
      },
      async handleClose() {
        this.contractHide = true
        this.contractCount = 6
        this.countDown()
        try {
          await postGoodsSignfdd(this.orderId).then(res => {
            if (res.code == 200) {
              this.getOrderList()
              this.$message.success('签章成功')
              this.centerDialogVisible = false
            }
          })
        } catch (e) {
          this.getOrderList()
          this.contractCount = 0
          this.loading = false
          this.contractHide = false
          this.centerDialogVisible = false
        }
      },
      countDown() {
        this.loading = true
        setTimeout(() => {
          if (this.contractCount) {
            this.contractCount--
            this.countDown()
            if (this.contractCount === 0) {
              this.centerDialogVisible = false
              this.loading = false
              this.contractHide = false
            }
          }
        }, 1000)
      },
      handleDelete(index, row) {
        console.log(index, row)
      },
      handleSizeChange(val) {
        console.log(val)
        if (val === 'sign') {
          this.queryParams.signState = 1
        } else {
          this.queryParams.signState = ''
          this.queryParams.pageSize = val
        }
        this.$nextTick(() => {
          this.getOrderList()
        })
        // console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.queryParams.pageNum = val
        this.$nextTick(() => {
          this.getOrderList()
        })
        // console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style lang="less">
  .gd-purOrder-main {
    box-sizing: border-box;
    padding: 0px 20px;
    background-color: #fff;
    margin-left: 20px;

    .gd-purOrder-hian {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      box-sizing: border-box;
      padding: 0px 10px;
    }

    .el-tabs__active-bar {
      background-color: #EE7C51 !important;
    }

    .el-tabs__nav-wrap:after {
      background-color: #E6E6E6 !important;
    }

    .el-tabs__nav {
      width: 100%;
      display: flex;
    }

    .el-tabs__item.is-active {
      background-color: transparent !important;
      color: #EE7C51 !important;
    }

    .gd-purOrder-search {
      display: flex;
      justify-content: flex-start;

      .el-button {
        padding: 5px 10px;
      }
    }

    .el-button {
      padding: 3px 10px;
      width: 80px;
      margin-bottom: 10px;
    }

    .gd-purOrder-title {
      img {
        width: 48px;
        height: 48px;
      }
    }

    .gd-purOrder-btn {
      display: flex;

      .el-button {
        width: 34px;
        display: flex;
        padding: 0px;
        align-items: center;
        color: #EE7C51;

        span {
          text-align: center;
          display: block;
          width: 34px;
          height: 100%;
        }
      }
    }

    .el-table--border td:last-of-type .cell,
    .el-table--border th:first-child .cell,
    .el-table .cell {
      padding-left: 0px;
    }

    .el-table {
      box-sizing: border-box;
      padding: 0px 10px;
    }

    .gd-purOrder-footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
  }

  .el-dialog--center {
    height: 100vh !important;
  }

  .el-dialog--center .el-dialog__body {
    height: 100% !important;
    background-color: #fff;
  }

  .gd-purOrder-contract-count {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: red;
    font-size: 30px;
    z-index: 99999999;
  }

  //选中
  .gd-planInvoice-mian-check {
    .el-checkbox {
      text-align: left;
      width: 100%;
      display: flex;
      justify-content: flex-start;
    }

    .el-checkbox__input {
      height: 20px;
      margin-top: 5px;
    }

    .el-checkbox__label {
      width: 100%;
    }

    .gd-el-checkbox {
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: flex-start;
      box-sizing: border-box;
      padding-bottom: 10px;
    }

    .gd-planInvoice-card {
      box-shadow: 0px 1px 6px 0px rgba(25, 8, 15, 0.17);
      margin-bottom: 15px;
      box-sizing: border-box;
      padding: 15px 15px;
      border-radius: 8px;
      background-color: #fff;
      color: #666;
    }

    .gd-planInvoice-card-b {
      display: flex;
      width: 100%;
      margin-top: 10px;
    }

    .gd-planInvoice-card-left {
      width: 63%;
      border-right: 1px solid #eee;

      li {
        width: 100%;
        display: flex;
        margin-bottom: 10px;

        img {
          width: 80px;
          height: 80px;
        }

        p {
          width: 200px;
          margin-left: 10px;

          span {
            text-align: left;
            display: block;
            width: 100%;
            word-break: break-word; /* 文本行的任意字内断开 */
            word-wrap: break-word; /* IE */
            white-space: pre-wrap; /* CSS 2.1 */
          }
        }
      }
    }

    .gd-planInvoice-card-right {
      width: 38%;
      display: flex;
      box-sizing: border-box;
      padding-left: 10px;
      .el-button+.el-button{
        margin-right: 0px;
        margin-left: 0px;
      }

      .gd-planInvoice-card-right-b {
        display: flex;
        align-items: flex-start;
        width: 75%;
        p:nth-of-type(2) {
          flex: 2;
          margin-right: 15px;
        }
        p:nth-of-type(3) {
          flex: 2;
          text-align: left;
          word-break: break-word; /* 文本行的任意字内断开 */
          word-wrap: break-word; /* IE */
          white-space: pre-wrap; /* CSS 2.1 */
        }
        .gd-planInvoice-card-total{
          color: #666;
          font-size: 14px;
          flex: 2;
          span{
            display: block;
            text-align: left;
          }
          span:nth-of-type(2){
            font-size: 14px;
          }
        }
      }

      .gd-planInvoice-card-right-s {
        display: flex;
        width: 25%;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-left: 0px;
      }
    }
  }
  .gd-planInvoice-mian-li{
    display: flex;
    font-size: 13px;
    background-color: #eee;
    margin-bottom: 10px;
    color: #666;
    li{
      height: 30px;
      line-height: 30px;
    }
    li:nth-of-type(1){
      width: 43px;
      display: flex;
      justify-content: center;
    }
    li:nth-of-type(2){
      width: 238px;
    }
    li:nth-of-type(3){
      width: 175px;
    }
    li:nth-of-type(4){
      width: 156px;
    }
    li:nth-of-type(5){
       width: 87px;
       text-align: left;
     }
    li:nth-of-type(6){
      width: 80px;
      text-align: center;
    }
    li:nth-of-type(7){
      width: 86px;
      text-align: center;
    }
    li:nth-of-type(8){
      width: 80px;
      text-align: center;
    }
  }
</style>
