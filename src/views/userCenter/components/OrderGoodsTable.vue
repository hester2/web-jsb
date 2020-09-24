<template>
  <div class="gd-order-center-table">
    <el-table :data="localTableData" border style="width: 100%;" row-key="id" :span-method="objectSpanMethod">
      <el-table-column label="产品图片" width="120">
        <template slot-scope=" { row, column, $index }">
          <div class="gd-placeOrder-title">
            <img :src="row.picUrl" width="20" height="20" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="产品名称" />
      <el-table-column prop="specification" label="类型" />
      <el-table-column prop="perPrice" label="单价" />
      <el-table-column prop="num" label="数量" />
      <el-table-column prop="totalPrice" label="总价" />
      <el-table-column prop="remark" label="说明" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class=" gd-purOrder-btn">
            <el-button size="mini" class="" @click="handleRelation (scope.row.orderId, scope.row)">联系客服</el-button>
            <el-button size="mini" class="" @click="handleExamine(scope.row.orderId,1)">下载合同</el-button>
            <el-button size="mini" class="" @click="handleExamine(scope.row.orderId, 2)">查看合同</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <p>实付款：{{orderPay}}元</p>
    <!-- 合同查看路径-->
    <el-dialog title="合同签署" :visible.sync="centerDialogVisible" width="80%" :before-close="handleClose" style="height: 100vh;"
      center>
      <iframe :src="contractUrl" style="width: 100%; height: 100%;" />
    </el-dialog>
    <p v-html="downPdf"></p>
  </div>

</template>

<script>
  export default {
    name: 'OrderGoodsTable',

    components: {},

    mixins: [],

    props: {
      tableData: {
        type: Array,
        default: () => {
          return []
        }
      },
      id: [String, Number],
      buyerSignState:[String, Number],
    },

    data() {
      return {
        localTableData: [],
        centerDialogVisible: false,
        contractUrl: '',
        downPdf: ''
      }
    },

    computed: {
      orderPay() {
        var price = this.tableData.map(item => {
          return item.totalPrice
        })
        var totalPrice = 0;
        price.forEach(function(val, idx, arr) {
          totalPrice += val;
        }, 0);
        return totalPrice;
      }
    },

    watch: {
      tableData: {
        handler: function(val) {
          this.localTableData = val
        },
        deep: true
      }
    },

    created() {
      this.localTableData = this.tableData
    },

    mounted() {},

    destroyed() {},

    methods: {
      handleRelation(orderId, item) {
        //联系客服
        this.$router.push({
          name: 'Chat'
        })
      },
      async handleExamine(orderId, type) {
        //查看合同
        try {
          if(this.buyerSignState!==0){
            var res = await this.$ajax.goods.getOrderContract(this.id)
            if (type == 1) {
              const link = document.createElement('a')
              link.href = res.result.downloadUrl
              document.body.appendChild(link)
              link.click()
            } else if (type == 2) {
              this.centerDialogVisible = true
              this.contractUrl = res.result.viewUrl
            }
          }else {
            this.$message.error('还未生成合同')
          }
        } catch (e) {

        }
      },
      objectSpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (columnIndex === 1 || columnIndex === 6 || columnIndex === 7) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
      handleClose() {
        this.centerDialogVisible = false
      }
    }
  }
</script>

<style lang="less">
  .gd-order-center-table {
    .gd-placeOrder-title {
      img {
        width: 80px;
        height: 80px;
      }
    }

    .gd-purOrder-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .el-button {
        padding: 3px 10px;
        width: 100px;
        margin-top: 10px;
        margin-left: 0px;
      }
    }

    .el-dialog--center {
      height: 100vh !important;
    }

    .el-dialog--center .el-dialog__body {
      height: 100% !important;
      background-color: #fff;
    }
    .el-button:hover{
       box-sizing: border-box;
       background-color:transparent;
       border: 1px solid #DCDFE6;
       color:#EE7C51 ;
    }
  }
</style>
