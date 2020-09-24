<template>
  <div class="gd-ufication-main">
    <p class="gd-ufication-title">首页<span>></span><span>分类管理</span></p>
    <div class="gd-ufication-bot">
      <div class="gd-ufication-le">
        <p class="gd-ufication-ml">产品类型列表</p>
        <el-collapse v-model="activeNames" accordion>
          <div style=" background-color: #fff;">
            <el-collapse-item name="1">
              <template slot="title">
                <img src="../../../../assets/img/user/icon-ufication-001.png" alt="" style="margin-right: 10px;">全部（235）
              </template>
              <div style="margin-left: 10px;">
                <p class="gd-ufin-ellipsis"><img
                  src="../../../../assets/img/user/icon-ufication-002.png"
                  style="margin-right: 5px;"
                  alt=""
                >10CM塑料图大(5)</p>
              </div>
              <div style="margin-left: 10px;">
                <p class="gd-ufin-ellipsis"><img
                  src="../../../../assets/img/user/icon-ufication-002.png"
                  style="margin-right: 5px;"
                  alt=""
                >10CM塑料图大(5)</p>
              </div>
              <div style="margin-left: 10px;">
                <p class="gd-ufin-ellipsis"><img
                  src="../../../../assets/img/user/icon-ufication-002.png"
                  style="margin-right: 5px;"
                  alt=""
                >10CM塑料图大(5)</p>
              </div>
            </el-collapse-item>
          </div>
        </el-collapse>
      </div>
      <div class="gd-ufication-re">
        <div style="display: flex;" class="gd-ufication-bto">
          <el-button style="background-color: #FF9800;color: #fff;" @click="addPicture = true">添加图片</el-button>
          <el-button style="background-color: #FF5157;color: #fff;">批量删除</el-button>
          <el-input v-model="serInput" style="width: 200px; margin-left: 10px;" placeholder="请输入内容" clearable />
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40" />
          <el-table-column prop="id" label="id" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" sortable show-overflow-tooltip />
          <el-table-column prop="name" label="分类" show-overflow-tooltip />
          <el-table-column label="图片" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="gd-purOrder-title">
                <img :src="scope.row.img" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="size" label="尺寸" />
          <el-table-column label="链接地址">
            <template slot-scope="scope">
              <div style="color: #FF7138;">
                {{ scope.row.address }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="加入时间" sortable />
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
    <el-dialog title="添加图片" :visible.sync="addPicture" width="30%" :before-close="handleClose">
      <div class="gd-ufication-addpic">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="所属分类">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="首页轮播图大" value="shanghai" />
              <el-option label="首页轮播图小" value="beijing" />
              <el-option label="首页轮播图中" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="图片大小">
            <div class="gd-ufication-dil">
              <el-input v-model="form.width" placeholder="宽" />
              <span style="margin: 0px 10px;"> - </span>
              <el-input v-model="form.height" placeholder="高" />
            </div>
          </el-form-item>
          <el-form-item label="显示排序">
            <el-input v-model="form.sorts" placeholder="数值越大排列越靠前" />
          </el-form-item>
          <el-form-item label="链接地址" class="gd-ufication-so">
            <el-input v-model="form.link" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="显示状态">
            <el-switch v-model="form.resource" />
          </el-form-item>
          <el-form-item label="上传图片">
            <div>
              <el-upload
                ref="upload"
                drag
                multiple
                name="files"
                list-type="picture-card"
                :data="upData"
                :action="imageAction"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-exceed="onExceed"
                :on-error="uploadError"
                :on-success="uploadSuccess"
                :before-upload="beforeAvatarUpload"
                :auto-upload="true"
              >
                <i slot="default" class="el-icon-plus" />
              </el-upload>
              <el-dialog :visible.sync="dialogUpload">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="addPicture = false">取消</el-button>
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
      imageAction: this.$WebUrl + '/fileUploading',
      upData: {
        code: 2
      },
      fileList: [],
      dialogImageUrl: '',
      options: [],
      props: {
        multiple: false
      },
      form: {
        width: '',
        height: '',
        sorts: '',
        link: '',
        resource: true
      },
      rules: {
        width: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        height: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        sorts: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        link: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        resource: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }]
      },
      dialogUpload: false,
      activeNames: '1',
      currentPage4: 3,
      serInput: '',
      addPicture: false,
      tableData: [{
        id: '00123',
        sort: '1',
        img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
        name: '广告图',
        size: '1890 X 1080',
        date: '2019-11-27 11:21:56',
        address: 'https://https://cloud.baidu.com campaign.html?',
        state: '已启用'
      }, {
        id: '00123',
        sort: '1',
        img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
        name: '广告图',
        size: '1890 X 1080',
        date: '2019-11-27 11:21:56',
        address: 'https://https://cloud.baidu.com campaign.html?',
        state: '已启用'
      }, {
        id: '00123',
        sort: '1',
        img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
        name: '广告图',
        size: '1890 X 1080',
        date: '2019-11-27 11:21:56',
        address: 'https://https://cloud.baidu.com campaign.html?',
        state: '已启用'
      }],
      multipleSelection: []
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
    },
    // 上传图片
    handleRemove(file, fileList) {

    },
    handlePreview(file) {
      if (file.status === 'success') {
        this.dialogImageUrl = file.url
        this.dialogUpload = true
        this.$nextTick(() => {
          this.$refs.showImage.init(file.url)
        })
      }
    },
    onExceed(files, fileList) {
      this.$message.error('提示：只能上传20张图片！')
    },
    // 图片上传
    beforeAvatarUpload(file) {
      var that = this
      if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$message.error('只支持jpg、png、gif格式的图片！')
        return false
      }

      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => { // 让页面中的img标签的src指向读取的路径
          const img = new Image()
          img.src = reader.result
          const width = 120
          const height = 60
          img.onload = () => {
            const valid = img.width < width && img.height < height
            // 校验图片大小
            if (valid) {
              resolve()
            } else {
              this.$message.warning(`上传的图片必须是等于120*60!,当前文件${img.width}×${img.height}`)
              reject()
            }
          }
        }
      })
    },

    uploadSuccess(response, file, fileList) {
      console.log('上传图片成功')
      console.log(response.result.url[0])
      this.fileList.push({
        url: response.result.url[0]
      })
    },
    uploadError(response, file, fileList) {
      this.$message.error('上传图片失败！')
    },

    onBeforeUpload(file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/gif' || 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
      }
      return isIMAGE && isLt1M
    }

  }
}
</script>

<style lang="less">
	.gd-ufication-main {
		height: 100vh-10;
		box-sizing: border-box;
		padding: 0px 25px;
		display: flex;
		flex-direction: column;

		.gd-ufication-title {
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
			padding: 0px 10px;
		}

		.gd-ufication-bot {
			display: flex;

		}

		.gd-ufication-le {
			width: 10%;
			box-shadow: 0px 4px 15px 1px rgba(32, 39, 57, 0.1);
			box-sizing: border-box;
			border-radius: 5px;
			padding: 10px 10px;

			.el-collapse-item__header {
				border: none
			}

			.gd-ufication-ml {
				font-size: 13px;
				text-align: left;
				font-weight: bold;
			}
		}

		.gd-ufication-re {
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

		.gd-purOrder-title {
			img {
				width: 48px;
				height: 48px;
			}
		}

		.el-collapse-item__content p {
			text-align: left;
		}

		.gd-ufication-bto {
			a {
				text-decoration: none;
				color: #fff;
			}

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

		.cell {
			text-align: center;
		}

		.gd-ufication-addpic {}

		.el-form-item {
			display: flex;
			justify-content: flex-start;
		}

		.el-form-item__content {
			margin-left: 0px !important;
		}

		.el-upload-dragger {
			width: 100%;
			height: 146px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.gd-ufication-dil{
			display: flex;
			.el-input{
				width: 95px;
			}
		}

		.gd-ufication-so{
			.el-input{
				width: 400px;
			}
		}

	}
</style>
