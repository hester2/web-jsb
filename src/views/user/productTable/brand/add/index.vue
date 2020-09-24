<template>
  <div class="gd-brandadd-main">
    <p class="gd-brandadd-title">首页<span>></span><span>品牌管理</span><span>></span><span class="gd-brandadd-cor">添加品牌</span></p>
    <div class="gd-brandadd-btom">
      <el-form ref="form" :model="form" :rules="rules" status-icon enctype="multipart/form-data" label-width="100px">
        <el-form-item label="品牌名称" prop="name">
          <el-input v-model="form.name" placeholder="输入商品标题" />
        </el-form-item>
        <el-form-item label="品牌序列号" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-input v-model="form.keywords" placeholder="以逗号分开,最多5个" />
        </el-form-item>
        <el-form-item label="品牌图片">
          <div>
            <el-upload
              ref="upload"
              drag
              multiple
              name="files"
              list-type="picture-card"
              :data="upData"
              :file-list="fileList"
              :limit="limit"
              :action="imageAction"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-upload="beforeAVatarUpload"
              :on-exceed="onExceed"
              :on-error="uploadError"
              :on-success="uploadSuccess"
              :auto-upload="true"
            >
              <i slot="default" class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogUpload">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item label="地区" prop="val">
          <div class="block">
            <el-cascader v-model="form.val" filterable :options="options" :props="props" clearable @change="handleAddress" />
          </div>
        </el-form-item>
        <el-form-item label="品牌描述" prop="textarea">
          <el-input
            v-model="form.textarea"
            type="textarea"
            placeholder="请输入内容"
            resize="none"
            :rows="5"
            maxlength="500"
            minlength="10"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="是否显示状态" prop="delivery" label-width="130px">
          <div class="gd-brandadd-switch">
            <el-switch v-model="form.delivery" />
          </div>
        </el-form-item>
        <el-form-item>
          <div class="gd-brandadd-btn">
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </div>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import {
  Message
} from 'element-ui'
export default {
  data() {
    return {
      imageAction: this.$WebUrl + '/fileUploading',
      upData: {
        code: 2
      },
      fileList: [],
      limit: 1,
      dialogImageUrl: '',
      options: [],
      props: {
        multiple: false
      },
      dialogUpload: false,
      form: {
        name: '',
        title: '',
        keywords: '',
        val: '',
        textarea: '',
        delivery: false
      },
      rules: {
        name: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        keywords: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        textarea: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    const _this = this
    this.$http.get('/static/citylist.json').then(function(response) {
      const data = response.data
      this.options = data
    })
      .catch(function(error) {
        console.log('出错喽：' + error)
      })
  },

  methods: {

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
    // 设置保存发送后台数据事件
    handleAddress(value) {
      this.vals = this.getCascaderObj(this.form.val, this.options)
      console.log(this.vals)
      if (this.vals.length < 3) {
        var data = this.vals[0].label + this.vals[1].label
      } else {
        var data = this.vals[0].label + this.vals[1].label + this.vals[2].label
      }
      console.log(data)
      this.sendArea = data
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit(formName) {
      // 富文本编辑
      if (this.fileList == '') {
        Message({
          message: '* 品牌图片',
          type: 'error',
          duration: 5 * 1000
        })
        return
      } else if (this.sendArea == '') {
        Message({
          message: '地址不能为空',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

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
    beforeAVatarUpload(file) {
      if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !==
					'image/gif') {
        this.$message.error('只支持jpg、png、gif格式的图片！')
        return false
      }
    },
    uploadSuccess(response, file, fileList) {
      console.log('上传图片成功')
      console.log(response.result.url[0])
      this.fileList.push({
        url: this.$UploadUrl + response.result.url[0]
      })
      this.fileArray.push({
        url: response.result.url[0]
      })
      console.log(urls)
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
	.gd-brandadd-main {
		height: 100vh-10;
		box-sizing: border-box;
		padding: 0px 25px;
		display: flex;
		flex-direction: column;

		.gd-brandadd-title {
			font-size: 12px;
			color: #999999;
			display: flex;
			justify-content: flex-start;
			text-align: left;
			margin-top: 30px;
			margin-bottom: 20px;

			span {
				color: #999999;
				margin-left: 4px;
			}

			.gd-brandadd-cor {
				color: #333 !important;
			}
		}

		.gd-brandadd-btom {
			box-shadow: 0px 4px 15px 1px rgba(32, 39, 57, 0.1);
			box-sizing: border-box;
			padding: 25px 20px;
		}

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

		.el-input {
			width: 450px;
		}

		.el-textarea__inner {
			width: 450px;
		}

		.gd-brandadd-btn {
			margin-left: 100px;

			.el-button {
				padding: 3px 20px;
			}
		}
	}
</style>
