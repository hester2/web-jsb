<template>
  <div class="gd-advertising-main">
    <p class="gd-advertising-title">首页<span>></span><span>分类管理</span></p>

    <div class="gd-advertising-re">
      <div style="display: flex;" class="gd-advertising-bto">
        <el-button style="background-color: #FF9800;color: #fff;" @click="addIfication = true">添加分类</el-button>
        <el-button style="background-color: #FF5157;color: #fff;">批量删除</el-button>
        <el-input v-model="serInput" style="width: 200px; margin-left: 10px;" placeholder="请输入内容" clearable />
      </div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" />
        <el-table-column prop="id" label="id" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="num" label="数量" sortable show-overflow-tooltip />
        <el-table-column prop="name" label="描述" show-overflow-tooltip />
        <el-table-column prop="date" label="加入时间" show-overflow-tooltip />
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
    <el-dialog title="添加分类" :visible.sync="addIfication" width="30%">
      <div class="gd-advertising-addpic">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="分类名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="分类描述">
            <el-input v-model="form.textarea" type="textarea" placeholder="请输入内容" minlength="10" maxlength="100" show-word-limit />
          </el-form-item>
          <el-form-item label="显示状态">
            <el-switch v-model="form.resource" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="addIfication = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      serInput: '',
      currentPage4: 3,
      addIfication: false,
      tableData: [{
        id: '00123',
        num: '1',
        name: '广告图',
        date: '2019-11-27 11:21:56',
        state: '已启用'
      }, {
        id: '00123',
        num: '1',
        name: '广告图',
        date: '2019-11-27 11:21:56',
        state: '已启用'
      }, {
        id: '00123',
        num: '1',
        name: '广告图',
        date: '2019-11-27 11:21:56',
        state: '已启用'
      }],
      multipleSelection: [],
      form: {
        name: '',
        textarea: '',
        resource: true
      },
      rules: {
        name: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        textarea: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        resource: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.addIfication = false
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
	.gd-advertising-main {
		height: 100vh-10;
		box-sizing: border-box;
		padding: 0px 25px;
		display: flex;
		flex-direction: column;

		.gd-advertising-title {
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

		.el-button{
			padding: 3px 10px;
		}

		.gd-advertising-re {
			margin-left: 10px;
			width: 89%;
			box-sizing: border-box;
			border-radius: 5px;
			padding: 20px 10px;
			box-shadow: 0px 4px 15px 1px rgba(32, 39, 57, 0.1);

			.el-button {
				padding: 3px 10px;
			}
		}

		.gd-advertising-bto {
			margin-bottom: 20px;

			.el-button {
				padding: 0px 10px;
				height: 30px;
			}

			.el-input__inner {
				height: 30px;
				line-height: 30px;
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

		.gd-purOrder-footer {
			display: flex;
			justify-content: flex-end;
			margin-top: 10px;
		}
		.gd-advertising-addpic{
			.el-textarea__inner{
				height: 100px;
			}
			.el-textarea{
				width:400px;
			}
			.el-form-item{
				display: flex;
				.el-form-item__content{
					margin-left: 0px !important;
					width: 400px;
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
			}
		}
	}
</style>
