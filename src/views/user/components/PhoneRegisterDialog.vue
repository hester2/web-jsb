<template>
  <div class="gd-phone-register">
    <el-dialog title="当前手机号未注册,请先注册" :visible.sync="visible" width="20%" :append-to-body="true">
      <el-form
        ref="form"
        :model="form"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm gd-demo-ruleForm"
      >
        <el-form-item prop="nickname" lable="昵称">
          <el-input v-model="form.nickname" placeholder="用户昵称" />
        </el-form-item>
        <el-button type="primary" class="gd-home-btn" @click="handleValidate()">提交</el-button>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
import dialogFormMixins from '@/Mixins/dialogFormMixins'
import { mapActions } from 'vuex'

export default {
  name: 'PhoneRegisterDialog',

  components: {},

  mixins: [dialogFormMixins],

  props: {},

  data() {
    return {
      form: {
        verifyCode: '',
        phone: '',
        nickname: '',
        appType: 1,
        wxUnionId: '',
        identificationCode: 0
      },
      rules: {
        nickname: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }]
      }
    }
  },

  computed: {},

  watch: {},

  created() {
  },

  mounted() {
  },

  destroyed() {
  },

  methods: {
    ...mapActions('user', ['Register']),
    /*  edit(data) {
      console.log('PhoneRegisterDialog.edit', data)
    },*/
    async handleSubmit() {
      const res = await this.Register(this.form)
      if (res) {
        this.$emit('submit', res)
        this.hide()
      }
    }
  }
}
</script>

<style  lang="less">
	.el-dialog__title{
		font-size: 15px;
		color:#333;
	}
  .gd-demo-ruleForm{
		display: flex;
		justify-content: flex-start;
		.el-form-item__content{
			margin-left: 0px !important;
		}
		.el-button--primary{
			height: 40px;
			border-radius: 0px 4px 4px 0px;
			padding: 4px 10px;
			margin-left: -10px;
			z-index: 9999;
		}
	}
</style>
