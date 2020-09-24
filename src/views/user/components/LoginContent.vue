<template>
	<div class="login-content">
		<div class="gd-home-login-to"><span>扫码登录更方便</span><img src="../../../assets/img/icon-home-004.png" @click="handleShow(0)"></div>
		<div class="gd-home-login-to">手机验证码登录</div>
		<el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="" class="demo-ruleForm">
			<el-form-item prop="phone">
				<el-input v-model="ruleForm.phone" placeholder="请输入手机号" />
			</el-form-item>
			<el-form-item prop="verifyCode" class="gd-home-login-col">
				<el-input v-model="ruleForm.verifyCode" type="text" placeholder="请输入验证码" autocomplete="off" />
				<el-button v-if="sendAuthCode" type="primary" class="el-button-btn" @click="submitCode">获取验证码
				</el-button>
				<el-button v-else type="primary" class="auth_text el-button-btn">{{ auth_time }}秒后重发</el-button>
			</el-form-item>
			<el-button type="primary" class="gd-home-btn" @click="submitForm('ruleForm')">登录</el-button>
			<div v-if="dialogSoft" class="gd-home-login-code" @click="handleShow(1)">
				<div style="width: 185px; height: 169px;" id="qrcode" ref="qrcode">
					<!-- app端扫码登录 -->

				</div>
				<p style="color: rgb(238, 124, 81);font-weight: bold;">打开金塑宝app</p>
				<p>扫一扫登录</p>
			</div>
			<div v-if="dialogWeChat" class="gd-login-wchat">
				<img src="../../../assets/img/icon-home-close.png" alt="" @click="handleShow(2)">
				<div class="gd-login-wchat-top">
					<wx-login v-bind="wxLoginParams" :href="'data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlIHsNCiAgZGlzcGxheTogbm9uZTsNCn0NCi5pbXBvd2VyQm94IC5zdGF0dXMuc3RhdHVzX2Jyb3dzZXIgew0KICBkaXNwbGF5OiBub25lOw0KfQ0KLmltcG93ZXJCb3ggLnFyY29kZSB7DQogIGJvcmRlcjogbm9uZTsNCiAgd2lkdGg6IDIwMHB4Ow0KICBoZWlnaHQ6IDIwMHB4Ow0KfQ0KLmltcG93ZXJCb3ggLnN0YXR1c3sNCiAgZGlzcGxheTogbm9uZQ0KfQ=='" />
				</div>
				<p>微信扫码登录快捷</p>
			</div>
		</el-form>
		<div class="gd-home-login-btm">
			<div class="gd-home-login-bo"><span>
					<!--忘记密码--></span><span @click="()=>{$router.push({name:'Register'})}">注册新账号</span></div>
			<div class="gd-home-login-mr">
				<el-divider>第三方登录</el-divider>
			</div>
			<div class="gd-home-login-third"><img src="../../../assets/img/icon-login-001.png" alt="" @click="handleShow(3)">
			</div>
		</div>
		<wei-xin-register-dialog ref="weiXinRegisterDialog" @submit="emitAfterLogin" />
		<phone-register-dialog ref="phoneRegisterDialog" @submit="emitAfterLogin" />
	</div>
</template>

<script>
	import userInfoMixins from '@/Mixins/userInfoMixins'
	import {
		mapActions
	} from 'vuex'
	import wxLogin from 'vue-wxlogin'
	import WeiXinRegisterDialog from '@/views/user/components/WeiXinRegisterDialog'
	import PhoneRegisterDialog from '@/views/user/components/PhoneRegisterDialog'
	import {
		soleLogo
	} from '@/api/table.js'

	import QRCode from 'qrcodejs2'
	export default {
		name: 'LoginContent',

		components: {
			QRCode,
			wxLogin,
			WeiXinRegisterDialog,
			PhoneRegisterDialog
		},

		mixins: [userInfoMixins],

		props: {

		},

		data() {
			return {
				qrCode: '',
				dialogVisible: false,
				dialogWeChat: false,
				dialogSoft: false,
				sendAuthCode: true,
				auth_time: 0, // 验证码倒计时
				wx_auth_time: 0, // 验证码倒计时
				// 验证码登录
				ruleForm: {
					phone: '',
					verifyCode: '',
					appType: '1',
					loginType: '1'
				},
				rules: {
					phone: [{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
						{
							pattern: /^1[3456789]\d{9}$/,
							message: '您输入正确的手机号码',
							trigger: 'blur'
						}
					],
					verifyCode: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}]
				},
				wxLoginParams: {
					redirect_uri: encodeURIComponent(window.location.href),
					appid: 'wxe4cd6faf73a4952f',
					scope: 'snsapi_login',
					theme: 'black',
					rel: 'external nofollow'
				}

			}
		},

		computed: {},

		watch: {},

		created() {},

		mounted() {
			if (this.$route.query.code && !this.token && Object.keys(this.userInfo).length === 0) {
				this.wxLogin()
			}
		},

		destroyed() {},

		methods: {
			...mapActions('user', ['Login', 'WxLogin', 'qrLogin']),
			async submitCode() {
				await this.$refs.ruleForm.validateField('phone', async (errorMessage) => {
					if (errorMessage === '') {
						try {
							const res = await this.$ajax.user.loginCode({
								phone: this.ruleForm.phone
							})
							this.$message.success(res.message + res.result)
							this.sendAuthCode = false
							this.auth_time = 60
							this.countDown()
						} catch (e) {
							// this.$message.error(e.message)
						}
					}
				})
			},
			// 倒计时
			countDown() {
				setTimeout(() => {
					if (this.auth_time) {
						this.auth_time--
						this.countDown()
					} else {
						this.sendAuthCode = true
					}
				}, 1000)
			},
			// 手机登录
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const res = await this.Login(this.ruleForm)

						if (res.result && res.result.registerState === 0) {
							this.$refs.phoneRegisterDialog.edit(this.ruleForm)
							/* setTimeout(() => {
							  this.$router.push({ name: 'Register' })
							}, 1000)
							this.$message.error(res.result.message)*/
						} else {
							this.$emit('afterLogin', res)
						}
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			async wxLogin() {
				const res = await this.WxLogin({
					appId: 'wxe4cd6faf73a4952f',
					secret: 'ed6deab4586f40c9a1f9cd4c7c05e88d',
					code: this.$route.query.code,
					grantType: 'authorization_code'
				})
				console.log(res)
				if (res.result.bindState === 0) {
					this.$refs.weiXinRegisterDialog.edit(res.result)
				} else {
					this.emitAfterLogin(res)
				}
			},
			emitAfterLogin(res) {
				this.$emit('afterLogin', res)
			},
			handleQrcode(qrcode) {
				var that = this
				var qrcode = this.qrCode
				this.$nextTick(() => {
					var canvas = this.$refs.qrcode;

					new QRCode(canvas, {

						text: 'jinsubao://qrLogin?identifier=' + qrcode,

						width: 168,

						height: 168,

						colorDark: "#333", //二维码颜色

						colorLight: "#ffffff" //二维码背景色

					})
				})
				var params = {
					'identifier': that.qrCode
				}
				that.screenPolling(params)
			},
			handleShow(o) {
				switch (o) {
					case 0:
						this.dialogSoft = !this.dialogSoft
						console.log(this.dialogSoft)
						if (this.dialogSoft == false) {
							document.getElementById('qrcode').innerHTML = ""
						} else {
							soleLogo().then(response => {
								const data = response
								if (data.code === 200) {
									this.qrCode = data.result
									this.handleQrcode(data.result)
								}
							})
						}
						break
					case 1:
						this.dialogSoft = false
						break
					case 2:
						this.dialogWeChat = false
						break
					case 3:
						this.dialogWeChat = true
						break
				}
			},
			// 轮询
			screenPolling(params) {
				// this.pollingNumber = this.pollingNumber + 1
				var that = this
				window.setTimeout(async () => {
					try {
						const result = await this.$ajax.user.qrLogin(params)
						if (result) {
							if (result.result.phone) {
								// 一键登录
								var info = result
								const res = await that.qrLogin(info)
								console.log('页面', res)
								if (res.result && res.result.registerState === 0) {
									this.$refs.phoneRegisterDialog.edit(info)
								} else {
									this.$emit('afterLogin', res)
								}
							} else if (result.result.qrLoginIdState === 2) {
								//app端取消后直接隐藏二维码
								soleLogo().then(response => {
									that.screenPolling({
										'identifier': response.result
									})
									that.qrCode = response.result
									document.getElementById('qrcode').innerHTML = ""
									that.handleQrcode(response.result)
								})
								// that.$message('已取消登录');

							} else if (result.result.qrLoginIdState === 0) {
								//失效
								soleLogo().then(response => {
									that.screenPolling({
										'identifier': response.result
									})
									that.qrCode = response.result
									document.getElementById('qrcode').innerHTML = ""
									that.handleQrcode(response.result)
								})
								// that.$message('二维码已失效');
							} else {
								//没有返回数据
								that.screenPolling(params)
							}

						}

					} catch (e) {

						// that.screenPolling(params)

					}
				}, 3000)
			},
		}
	}
</script>

<style lang="less">
	.login-content {
		.gd-home-login {
			position: absolute;
			right: 400px;
			top: 6px;
			height: 335px;
			width: 250px;
			background-color: #fff;
			z-index: 999;
			box-shadow: 0px 1px 6px 0px rgba(25, 8, 15, 0.17);
		}

		.gd-home-login-comp {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			p:nth-of-type(1) {
				margin-bottom: 20px;
			}

			img {
				width: 85px;
				height: 85px;
				border-radius: 50%;
				margin-top: 20px;
			}

			p {
				font-size: 16px;
				margin-top: 10px;
			}
		}

		.gd-home-login-to {
			height: 30px;
			line-height: 30px;
			font-size: 12px;
			box-sizing: border-box;
			padding: 0px 20px;
			margin-top: 9px;
			color: #333333;
			display: flex;
			justify-content: flex-end;

			span {
				border: 1px solid #ff5722;
				font-size: 12px;
				color: #ff5722;
				height: 24px;
				line-height: 24px;
				border-radius: 8px;
				box-sizing: border-box;
				padding: 0px 5px;
			}

			img {
				display: block;
				width: 28px;
				height: 28px;
			}
		}

		.gd-home-login-to:nth-of-type(2) {
			margin-top: 0px;
			display: flex;
			justify-content: flex-start;
			font-size: 14px;
		}

		.gd-home-login-bo {
			display: flex;
			justify-content: space-between;
			margin: 17px 0px;
			width: 100%;

			span:nth-of-type(1) {
				display: block;
				color: #ADADAD;
				font-size: 12px;
			}

			span:nth-of-type(2) {
				display: block;
				color: #FF7444;
				font-size: 12px;
			}
		}

		.gd-home-login-third {
			display: flex;
			justify-content: center;
			margin-top: 0px !important;

			img {
				display: block;
				width: 15px;
				height: 14px;
			}

			img:nth-of-type(1) {
				margin-right: 6px;
			}

			img:nth-of-type(2) {
				margin-left: 6px;
			}
		}

		.gd-home-login-mr {
			font-size: 12px;
			margin: 0px;
			height: 19px;
		}

		.el-divider--horizontal {
			margin: 0px;
		}

		.el-divider__text {
			font-size: 12px;
			color: #666666;
		}

		.gd-home-btn {
			background-color: #FF5E2A !important;
			border: none;
			margin-top: 15px !important;
		}

		.el-form {
			width: 100%;
			height: auto;
			box-sizing: border-box;
			padding: 0px 20px;
			position: relative;

			.gd-home-login-code {
				height: 244px;
				width: 100%;
				position: absolute;
				top: -28px;
				left: 0px;
				background-color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				img {
					width: 80px;
					height: 80px;
					display: block;
				}

				p:nth-of-type(1) {
					font-size: 15px;
				}

				p:nth-of-type(2) {
					font-size: 14px;
				}
			}

			.gd-login-wchat {
				background-color: #fff;
				height: 335px;
				width: 100%;
				position: absolute;
				z-index: 999;
				top: -69px;
				left: 0px;
				display: flex;
				flex-direction: column;
				overflow: hidden;
				align-items: center;

				.gd-login-wchat-top {
					width: 200px;
					height: 200px;
					position: absolute;
					top: 44px;
					left: -17px;
				}

				p {
					position: absolute;
					bottom: 41px;
					left: 50%;
					transform: translateX(-50%);
					font-size: 15px;
				}

				img {
					display: block;
					margin-left: 200px;
					margin-top: 10px;
				}
			}
		}

		.gd-home-login-btm {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 0px 20px;
		}

		.el-form-item {
			margin-bottom: 10px;
		}

		.el-input {
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
		}

		.el-icon-s-custom {
			color: #999;
		}

		.el-input__inner {
			border: none;
			height: 28px;
			line-height: 28px;
		}

		.el-button--primary {
			width: 100%;
			height: 35px;
			padding: 0px;
			margin-top: 10px;
		}

		.el-input__icon {
			line-height: 30px;
		}

		.el-form-item__error {
			line-height: 16px;
		}

		.el-form-item__content {
			width: 100%;
			margin-left: 0px !important;
			border-bottom: 1px solid #DBDBDB;
			margin-top: 15px;
			display: flex;

			.el-input__inner {
				padding: 0px;
			}

			.el-button-btn {
				width: 130px;
				height: 22px;
				line-height: 22px;
				margin: 0px !important;
				background: rgba(235, 235, 235, 1);
				border: none;

				span {
					display: block;
					width: 100%;
					height: 22px;
					line-height: 22px;
					color: #FF6735;
					text-align: center;
					font-size: 12px !important;
				}
			}
		}

		#qrcode img {
			width: auto;
			height: auto;
		}
	}
</style>
