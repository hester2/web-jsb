<template>
  <div class="gd-order-goods-table">
    <el-table :data="localTableData" border style="width: 100%;" row-key="id">
      <el-table-column prop="id" label="编号" width="90" />
      <el-table-column label="产品图片" width="120">
        <template slot-scope=" { row, column, $index }">
          <div class="gd-placeOrder-title">
            <img :src="row.url" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="产品名称" width="100" />
      <el-table-column prop="specification" label="类型" width="100" />
      <el-table-column prop="perPrice" label="单价" />
      <el-table-column prop="orderAmount" label="数量" width="200">
        <template slot-scope="{ row, column, $index }">

          <div class="gd-purOrder-title">
            <el-input-number
              v-model="row.orderAmount"
              size="mini"
              :step="1"
              :min="0"
              label=""
              @change="handleChangeNum"
            />
            <!--            -->
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="总金额" width="100">
        <template slot-scope="{ row, column, $index }">
          {{ row.orderAmount * row.perPrice }}
        </template>
      </el-table-column>
      <el-table-column label="运费评估" width="100">
        <template slot-scope="{ row, column, $index }">
          0
        </template>
      </el-table-column>
    </el-table>
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
      default: () => { return [] }
    }
  },

  data() {
    return {
      localTableData: []
    }
  },

  computed: {},

  watch: {
    tableData: {
      handler: function(val) {
        this.localTableData = JSON.parse(JSON.stringify(val))
      },
      deep: true
    }
  },

  created() {
    this.localTableData = JSON.parse(JSON.stringify(this.tableData))
  },

  mounted() {
  },

  destroyed() {
  },

  methods: {
    handleChangeNum() {
      this.$emit('change', this.localTableData)
    }
  }
}
</script>

<style scoped lang="less">
.gd-order-goods-table{

}
</style>
