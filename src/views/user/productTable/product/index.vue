<template>
  <div class="gd-product-main">
    <p class="gd-product-title">首页<span>></span><span>产品列表</span></p>
    <div class="gd-product-bot">
      <div class="gd-product-le">
        <p class="gd-product-ml">产品类型列表</p>
        <el-collapse accordion>
          <div style=" background-color: #fff;">
            <el-collapse-item>
              <template slot="title">
                <img src="../../../../assets/img/user/icon-ufication-001.png" alt="" style="margin-right: 10px;">
                ABS
              </template>
              <div style="margin-left: 10px;">
                <p class="gd-ufin-ellipsis">简略标题</p>
              </div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <img src="../../../../assets/img/user/icon-ufication-001.png" alt="" style="margin-right: 10px;">
                PE
              </template>
              <div style="margin-left: 10px;">
                <p class="gd-ufin-ellipsis">简略标题</p>
              </div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <img src="../../../../assets/img/user/icon-ufication-001.png" alt="" style="margin-right: 10px;">
                PP
              </template>
              <div style="margin-left: 10px;">
                <p class="gd-ufin-ellipsis">简略标题</p>
              </div>
            </el-collapse-item>
          </div>
        </el-collapse>
      </div>
      <div class="gd-product-re">
        <div class="gd-purOrder-hian">
          <div class="gd-purOrder-search">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="产品名称">
                <el-input v-model="formInline.product" placeholder="输入品牌名称" />
              </el-form-item>
              <el-form-item label="时间">
                <el-date-picker v-model="formInline.time" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div style="display: flex;">
            <el-button style="background-color: #FF9800;color: #fff;"><router-link to="/user/product/addGoods">添加商品</router-link></el-button>
            <el-button style="background-color: #FF5157;color: #fff;">批量删除</el-button>
          </div>
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40" />
            <el-table-column label="订单编号" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.serial }}</template>
            </el-table-column>
            <el-table-column prop="name" label="产品名称" show-overflow-tooltip />
            <el-table-column prop="price" label="原价格" show-overflow-tooltip />
            <el-table-column prop="totel" label="现价" show-overflow-tooltip />
            <el-table-column prop="date" label="加入时间" sortable />
            <el-table-column prop="address" label="所属地区/国家" show-overflow-tooltip />
            <el-table-column prop="statev" label="审核状态" sortable show-overflow-tooltip />
            <el-table-column prop="state" label="状态" sortable show-overflow-tooltip />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class=" gd-purOrder-btn">
                  <el-button size="mini" style="background-color: #FF7138;" type="danger">禁用</el-button>
                  <el-button size="mini" class="el-icon-edit" style="background-color: #43A7FF;" @click="handleEdit(scope.$index, scope.row)" />
                  <el-button size="mini" class="" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="gd-purOrder-footer">
            <el-pagination
              :current-page="currentPage4"
              :page-sizes="[10, 20, 50]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      formInline: {
        product: '',
        region: ''
      },
      tableData: [{
        name: 'DFDA-7042A',
        serial: '987767',
        price: '120000.00',
        totel: '4525',
        date: '2019-11-27 11:21:56',
        statev: '已审核',
        state: '已发货',
        address: '中国'
      }, {
        name: 'DFDA-7042A',
        serial: '987767',
        price: '120000.00',
        totel: '4525',
        date: '2019-11-27 11:21:56',
        statev: '已审核',
        state: '已发货',
        address: '中国'
      }, {
        name: 'DFDA-7042A',
        serial: '987767',
        price: '120000.00',
        totel: '4525',
        date: '2019-11-27 11:21:56',
        statev: '已审核',
        state: '已发货',
        address: '中国'
      }],
      multipleSelection: []
    }
  },
  methods: {
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
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less">
	.gd-product-main {
		height: 100vh-10;
		box-sizing: border-box;
		padding: 0px 25px;
		display: flex;
		flex-direction: column;

		.el-button{
			a{
				text-decoration: none;
				color: #fff;
			}
		}

		.gd-product-title {
			font-size: 12px;
			color: #999999;
			text-align: left;
			margin-top: 30px;
			margin-bottom: 20px;

			span {
				color: #333;
				margin-left: 4px;
			}
		}

		.gd-product-bot {
			display: flex;

		}

		.gd-product-le {
			width: 10%;
			box-shadow: 0px 4px 15px 1px rgba(32, 39, 57, 0.1);
			box-sizing: border-box;
			border-radius: 5px;
			padding: 10px 10px;

			.el-collapse-item__header {
				border: none
			}

			.gd-product-ml {
				font-size: 13px;
				text-align: left;
				font-weight: bold;
			}

			.el-collapse-item {
				padding-left: 10px;
			}
		}

		.gd-product-re {
			margin-left: 10px;
			width: 89%;
			box-sizing: border-box;
			border-radius: 5px;
			padding: 20px 10px;
			box-shadow: 0px 4px 15px 1px rgba(32, 39, 57, 0.1);

			.gd-purOrder-hian {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
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
				.el-button{
					width: 42px;
					font-size: 12px;
					padding: 0px;
				}
			}

			.el-table td,
			.el-table th.is-leaf {
				text-align: center;
			}

			.cell {
				padding-left: 0px;
				font-size: 12px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.gd-purOrder-footer {
				display: flex;
				justify-content: flex-end;
				margin-top: 10px;
			}
		}
	}
</style>
