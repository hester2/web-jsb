<template>
  <div class="gd-fication-main">
    <p class="gd-fication-title">首页<span>></span><span>分类管理</span></p>
    <div class="gd-fication-bot">
      <div class="gd-fication-le">
        <p class="gd-fication-ml">产品类型列表</p>
        <el-collapse accordion>
          <div style=" background-color: #fff;">
            <el-collapse-item>
              <template slot="title">
                <img src="../../../../assets/img/user/icon-ufication-001.png" alt="" style="margin-right: 10px;">
                ABS
              </template>
              <div style="margin-left: 10px;">
                <p class="gd-ufin-ellipsis"><img src="../../../../assets/img/user/icon-fication-001.png" style="margin-right: 10px;" alt="">简略标题</p>
              </div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <img src="../../../../assets/img/user/icon-ufication-001.png" alt="" style="margin-right: 10px;">
                ABS
              </template>
              <div style="margin-left: 10px;">
                <p class="gd-ufin-ellipsis"><img src="../../../../assets/img/user/icon-fication-001.png" style="margin-right: 10px;" alt="">简略标题</p>
              </div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <img src="../../../../assets/img/user/icon-ufication-001.png" alt="" style="margin-right: 10px;">
                ABS
              </template>
              <div style="margin-left: 10px;">
                <p class="gd-ufin-ellipsis"><img src="../../../../assets/img/user/icon-fication-001.png" style="margin-right: 10px;" alt="">简略标题</p>
              </div>
            </el-collapse-item>
          </div>
        </el-collapse>
      </div>
      <div class="gd-fication-re">
        <div style="display: flex;justify-content: space-between;">
          <div>
            <el-button style="background-color: #FF9800;color: #fff;">新增子类型</el-button>
            <el-button style="background-color: #FF5157;color: #fff;">禁用该类型</el-button>
            <el-button style="background-color: #43A7FF;color: #fff;">删除该类型</el-button>
          </div>
        </div>
        <div class="gd-fication-form">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="排序" prop="sorts">
              <el-input v-model="ruleForm.sorts" />
            </el-form-item>
            <el-form-item label="备注" prop="sorts">
              <el-input
                v-model="ruleForm.textarea"
                type="textarea"
                placeholder="请输入内容"
                row="5"
                maxlength="500"
                show-word-limit
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        sorts: '',
        textarea: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'change'
        }],
        sorts: [{
          required: true,
          message: '请输入排序',
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less">
	.gd-fication-main {
		height: 100vh-10;
		box-sizing: border-box;
		padding: 0px 25px;
		display: flex;
		flex-direction: column;

		.gd-fication-title {
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

		.gd-fication-bot {
			display: flex;

		}

		.gd-fication-le {
			width: 10%;
			box-shadow: 0px 4px 15px 1px rgba(32, 39, 57, 0.1);
			box-sizing: border-box;
			border-radius: 5px;
			padding: 10px 10px;

			.el-collapse-item__header {
				border: none
			}

			.gd-fication-ml {
				font-size: 13px;
				text-align: left;
				font-weight: bold;
			}

			.el-collapse-item {
				padding-left: 10px;
			}
			.el-collapse-item__content{
				p{
					text-align: left;
				}
			}
		}

		.gd-fication-re {
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

		.gd-fication-form {
			width: 500px;
			margin-top: 40px;

			.el-textarea__inner {
				height: 100px;
			}
		}
	}
</style>
