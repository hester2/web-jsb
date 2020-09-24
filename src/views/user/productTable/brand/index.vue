<template>
  <div class="gd-brand-main">
    <p class="gd-brand-title">首页<span>></span><span>产品列表</span></p>
    <div class="gd-brand-btr">
      <div class="gd-purOrder-hian">
        <div class="gd-purOrder-search">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="产品名称">
              <el-input v-model="formInline.product" placeholder="输入品牌名称" />
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker v-model="formInline.time" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions" />
            </el-form-item>
            <el-form-item label="品牌">
              <el-select v-model="formInline.brand" placeholder="请选择品牌">
                <el-option label="国际品牌" value="shanghai" />
                <el-option label="国内品牌" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="display: flex;justify-content: space-between;">
          <div>
            <el-button style="background-color: #FF9800;color: #fff;"><router-link to="/user/brand/add">添加品牌</router-link></el-button>
            <el-button style="background-color: #FF5157;color: #fff;">批量删除</el-button>
            <el-button style="background-color: #43A7FF;color: #fff;">国内品牌</el-button>
            <el-button style="background-color: #73D13D;color: #fff;">国际品牌</el-button>
          </div>
          <div class="gd-brand-progress">
            <p class="gd-brand-chart"><span><span /><span>国内品牌(46%)</span></span><span><span /><span>国外品牌(54%)</span></span></p>
            <el-progress :percentage="50" color="#43A7FF" />
          </div>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40" />
          <el-table-column prop="id" label="id" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" show-overflow-tooltip />
          <el-table-column label="品牌logo" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="gd-purOrder-title">

                <img :src="scope.row.img" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="品牌名称" show-overflow-tooltip />
          <el-table-column prop="address" label="所属地区/国家" show-overflow-tooltip />
          <el-table-column prop="date" label="加入时间" sortable />
          <el-table-column prop="title" label="描述" show-overflow-tooltip />
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
        region: '',
        brand: ''
      },
      tableData: [{
        id: '00123',
        sort: '1',
        img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
        name: '4525',
        date: '2019-11-27 11:21:56',
        address: '已审核',
        state: '已启用',
        title: '中国'
      }, {
        id: '00123',
        sort: '1',
        img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
        name: '4525',
        date: '2019-11-27 11:21:56',
        address: '已审核',
        state: '已启用',
        title: '中国'
      }, {
        id: '00123',
        sort: '1',
        img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
        name: '4525',
        date: '2019-11-27 11:21:56',
        address: '已审核',
        state: '已启用',
        title: '中国'
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
	.gd-brand-main {
		height: 100vh-10;
		box-sizing: border-box;
		padding: 0px 25px;
		display: flex;
		flex-direction: column;

		.gd-brand-title {
			font-size: 12px;
			color: #999999;
			display: flex;
			justify-content: flex-start;
			text-align: left;
			margin-top: 30px;
			margin-bottom: 20px;

			span {
				color: #333;
				margin-left: 4px;
			}
		}

		.gd-brand-btr {
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 4px 15px 1px rgba(32, 39, 57, 0.1);
			box-sizing: border-box;
			padding: 20px 20px;
		}

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
			a{
				color: #fff;
				text-decoration: none;
			}
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

		.gd-brand-progress {
			width: 300px;
		}

		.el-progress-bar__outer {
			background-color: #73D13D;
		}

		.el-progress__text {
			display: none;
		}

		.gd-brand-chart {
			display: flex;
			justify-content: space-between;

			span {
				display: block;
				font-size: 12px;
				display: flex;
				align-items: center;
			}

			span:nth-of-type(1) {
				span:nth-of-type(1) {
					width: 10px;
					height: 10px;
					background-color: #43A7FF;
					border-radius: 50%;
					margin-right: 4px;
				}
			}

			span:nth-of-type(2) {
				span:nth-of-type(1) {
					width: 10px;
					height: 10px;
					background-color: #73D13D;
					border-radius: 50%;
					margin-right: 4px;
				}
			}
		}
	}
</style>
