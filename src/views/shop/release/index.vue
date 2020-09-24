<template>
	<div class="gd-release-main">
		<div class="gd-release-card">
			<p class="gd-release-title">
				<router-link to="/">主页</router-link> <span class="el-icon-arrow-right" />
				<router-link to="/shop">制成品商城</router-link><span class="el-icon-arrow-right" /><span>发布制成品</span>
			</p>
			<el-form ref="form" :model="form" :rules="rules" status-icon enctype="multipart/form-data" label-width="100px">
				<el-form-item label="商品标题" prop="name">
					<el-input v-model="form.name" placeholder="输入商品标题" />
				</el-form-item>
				<el-form-item label="简略标题" prop="title">
					<el-input v-model="form.title" placeholder="请输入标题" />
				</el-form-item>
				<div class="gd-release-row">
					<el-form-item label="产品编号" prop="serial">
						<el-input v-model="form.serial" placeholder="请输入编号" />
					</el-form-item>
					<el-form-item label="制塑工艺" prop="making">
						<el-select v-model="form.making" multiple placeholder="请选择制塑工艺" @change="handleMak">
							<el-option v-for="item in make" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</el-form-item>
					<el-form-item label="材质" prop="material">
						<el-input v-model="form.material" placeholder="请输入标题" />
					</el-form-item>
					<el-form-item label="品牌" prop="brand">
						<el-input v-model="form.brand" placeholder="请输入标题" />
					</el-form-item>
				</div>
				<div class="gd-release-row">
					<el-form-item label="产地" prop="origin">
						<el-input v-model="form.origin" placeholder="请输入产地" />
					</el-form-item>
					<el-form-item label="单位" prop="unit">
						<el-select v-model="form.unit" placeholder="请选择单位">
							<el-option label="t" value="t" />
							<el-option label="kg" value="kg" />
						</el-select>
					</el-form-item>
					<el-form-item label="发货地点" prop="val">
						<div class="block">
							<el-cascader v-model="form.val" filterable :options="options" :props="props" clearable @change="handleAddress" />
						</div>
					</el-form-item>
					<el-form-item label="货运方式" prop="freight">
						<el-select v-model="form.freight" placeholder="请选择货运方式">
							<el-option label="物流" value="shanghai" />
						</el-select>
					</el-form-item>
				</div>
				<div class="gd-release-tab">
					<div class="gd-release-row-img">
						<img src="../../../assets/img/icon-physical-add.png" alt="" @click="dialogVisible = true">
					</div>
					<el-table ref="tableData" :data="tableData" border tooltip-effect="dark" style="width:1100px" max-height="250">
						<el-table-column fixed :show-overflow-tooltip="true" prop="specTempIndex" label="商品规格" width="130" />
						<el-table-column label="规格图片" width="80">
							<template slot-scope="scope">
								<div class="gd-purOrder-title">
									<img :src="scope.row.url" alt="">
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="goodsStockVo.num" label="发布库存量" width="138" />
						<el-table-column prop="perPrice" label="单品价格" width="180" />
						<el-table-column prop="minPurchase" label="最低采购量" width="100" />
						<el-table-column prop="showPrice" label="展示价格" width="140" />
						<el-table-column prop="remark" label="备注" width="198" />
						<el-table-column label="操作" width="120">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">
									删除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<el-form-item label="关键词" prop="keywords">
					<el-input v-model="form.keywords" placeholder="以逗号分开,最多5个" />
				</el-form-item>
				<el-form-item label="内容简要" prop="textarea">
					<el-input v-model="form.textarea" type="textarea" placeholder="请输入内容" resize="none" :rows="5" maxlength="500"
					 minlength="10" show-word-limit />
				</el-form-item>
				<el-form-item label="上传图片">
					<div>
						<el-upload drag multiple name="files" list-type="picture-card" :data="upData" :limit="limit" action="#"
						 :on-preview="handlePreview" :on-remove="handleRemove" :before-upload="beforeAVatarUpload" :on-exceed="onExceed"
						 :on-error="uploadError" :on-success="uploadSuccess" :http-request="httpRequest" :auto-upload="true" :headers="{Authorization:this.$store.getters.token}">
							<i slot="default" class="el-icon-plus" />
						</el-upload>
						<el-dialog :visible.sync="dialogUpload">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
						<p style="color: #666;margin: 10px 0px;">最多上传20张图片</p>
					</div>
				</el-form-item>
				<el-form-item label="详细内容" prop="detail">
					<div class="gd-text-card">
						<!-- 富文本编辑框 -->
						<editor-bar v-model="detail" :is-clear="isClear" @change="change" />
					</div>
				</el-form-item>
				<el-form-item label="是否发布国际版" prop="delivery" label-width="130px">
					<div class="gd-release-switch">
						<el-switch v-model="form.delivery" />
					</div>
				</el-form-item>
				<el-form-item>
					<div class="gd-release-btn">
						<el-button type="primary" @click="onSubmit('form')">提交</el-button>
						<el-button type="primary" @click="handleQuery('form')">
							保存并预览
						</el-button>
						<el-button>取消</el-button>
					</div>
				</el-form-item>
			</el-form>

			<el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
				<div class="gd-release-dialogform">
					<el-form ref="materialForm" :model="materialForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="商品规格" prop="specTempIndex">
							<el-input v-model="materialForm.specTempIndex" placeholder="" />
						</el-form-item>
						<el-form-item label="商品图片" prop="url">
							<div style="display: flex;">
								<el-upload ref="upload" drag multiple name="files" list-type="picture-card" :data="upData" :limit="skuLimit"
								 action="#" :on-preview="handleSkuPreview" :on-remove="handleSkuRemove" :on-exceed="onSkuExceed" :on-error="uploadError"
								 :http-request="httpSkuRequest" :on-success="uploadSkuSuccess" :before-upload="beforeSkuAvatarUpload" :headers="{Authorization:this.$store.getters.token}"
								 :auto-upload="true">
									<i slot="default" class="el-icon-plus" />
								</el-upload>
								<el-dialog :visible.sync="skudialogUpload">
									<img width="100%" :src="skudialogImageUrl" alt="">
								</el-dialog>
							</div>
						</el-form-item>
						<el-form-item label="发布库存量" prop="goodsStockVo.num">
							<el-input v-model="materialForm.goodsStockVo.num" placeholder="" />
						</el-form-item>
						<el-form-item label="单品价格" prop="perPrice">
							<el-input v-model="materialForm.perPrice" placeholder="" />
						</el-form-item>
						<el-form-item label="最低采购量" prop="minPurchase">
							<el-input v-model="materialForm.minPurchase" placeholder="" />
						</el-form-item>
						<el-form-item label="备注" prop="remark">
							<el-input v-model="materialForm.remark" placeholder="" />
						</el-form-item>
						<el-form-item label="展示价格" prop="showPrice">
							<el-input v-model="showPrice" disabled placeholder="" />
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitMaterial('materialForm')">提交</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-dialog>

		</div>
	</div>
</template>

<script>
	import EditorBar from '../../../components/textEdit/index.vue'
	import $ from 'jquery'
	import {
		Message
	} from 'element-ui'
	import {
		insertGoodsInfo,
		getGoodsInfo
	} from '@/api/table.js'
	export default {
		components: {
			EditorBar
		},
		data() {
			return {
				imageAction: this.$WebUrl + '/file/upload',
				upData: {
					code: 2
				},
				make: [{
						value: 1,
						label: '注塑'
					},
					{
						value: 2,
						label: '吹塑'
					},
					{
						value: 3,
						label: '挤塑'
					},
					{
						value: 4,
						label: '热塑'
					},
					{
						value: 5,
						label: '压塑'
					},
					{
						value: 6,
						label: '拉丝'
					},
					{
						value: 7,
						label: '轧光'
					}, {
						value: 8,
						label: '真空'
					}, {
						value: 9,
						label: '螺旋'
					}, {
						value: 10,
						label: '其他'
					}
				],
				limit: 20,
				skuLimit: 1,
				dialogVisible: false,
				dialogImageUrl: '',
				dialogUpload: false,
				skudialogUpload: false,
				skudialogImageUrl: '',
				skufileList: '',
				disabled: false,
				fileArray: [],
				vals: '',
				sendArea: '',
				form: {
					name: '',
					title: '',
					serial: '',
					making: '',
					material: '',
					brand: '',
					origin: '',
					unit: '',
					address: '',
					freight: '',
					keywords: '',
					desc: '',
					val: '',
					textarea: '',
					detail: '',
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
					serial: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}],
					material: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}],
					keywords: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}],
					desc: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}],
					val: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}],
					textarea: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}]

				},
				materialForm: {
					specTempIndex: '',
					url: '',
					goodsStockVo: {
						num: ''
					},
					specTempIndex: '',
					perPrice: '',
					minPurchase: '',
					showPrice: ''
				},
				tableData: [],
				// 发货组件
				props: {
					multiple: false
				},
				// 编辑表单
				isClear: false,
				detail: '',
				content: '',
				options: [],
				querId: '',
				idx: '',
				// 城市code
				provinceName: '',
				cityName: '',
				areaName: '',
				provinceId: '',
				cityId: '',
				areaId: ''
			}
		},
		computed: {
			showPrice() {
				const price = this.materialForm.perPrice * this.materialForm.minPurchase

				return price
			}
		},
		created() {
			const _this = this
			_this.idx = this.$route.query.idxs
			this.$http.get('/citylist.json').then(function(response) {
					const data = response.data
					this.options = data
				})
				.catch(function(error) {
					console.log('出错喽：' + error)
				})
		},
		mounted() {
			// 设置背景单一样式
			document.querySelector('body').setAttribute('style', 'background-color:#FAFAFA; overflow-x: hidden;')
		},
		beforeDestroy() {
			document.querySelector('body').removeAttribute('style')
		},

		methods: {
			handleList() {
				this.$ajax.goods.getList(this.form)
			},
			handleMak(value) {},
			handleQuery(formName) {
				var _this = this
				if (this.tableData == '') {
					Message({
						message: '规格不能为空',
						type: 'error',
						duration: 5 * 1000
					})
					return
				} else if (this.fileArray.length < 2) {
					Message({
						message: '图片必须上传两张',
						type: 'error',
						duration: 5 * 1000
					})
					return
				} else if (this.detail == '<p><br></p>') {
					Message({
						message: '详细内容不能为空',
						type: 'error',
						duration: 5 * 1000
					})
					return
				}
				this.$refs[formName].validate((valid) => {
					if (valid) {
						insertGoodsInfo({
							'status': 1,
							'goodsSkuVoList': this.tableData,
							'title': this.form.name,
							'subTitle': this.form.title,
							'code': this.form.serial,
							'craftType': this.form.making.toString(),
							'material': this.form.material,
							'brand': this.form.brand,
							'producingArea': this.form.origin,
							'unit': this.form.unit,
							'provinceId': this.provinceId,
							'provinceName': this.provinceName,
							'cityId': this.cityId,
							'cityName': this.cityName,
							'areaId': this.areaId,
							'areaName': this.areaName,
							'deliverWay': this.form.freight,
							'keywords': this.form.keywords,
							'profiles': this.form.textarea,
							'detail': this.detail,
							'goodsImgVos': this.fileArray,
							'shopId': this.$store.state.user.userInfo.id

						}).then(response => {
							if (response.code == 200) {
								_this.querId = response.result.id
								this.$router.push({
									path: '/shop/previewDetail',
									query: {
										idx: _this.querId
									}
								})
							}
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			change(val) {
				this.detail = val
			},
			// 转化省市区
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
				if (this.vals.length < 3) {
					this.provinceName = this.vals[0].label
					this.cityName = this.vals[1].label
					this.provinceId = value[0]
					this.cityId = value[1]
					this.sendArea = this.vals[0].label + this.vals[1].label
				} else {
					this.provinceName = this.vals[0].label
					this.cityName = this.vals[1].label
					this.areaName = this.vals[2].label
					this.provinceId = value[0]
					this.cityId = value[1]
					this.areaId = value[2]
					this.sendArea = this.vals[0].label + this.vals[1].label + this.vals[2].label
				}
			},
			onSubmit(formName) {
				// 富文本编辑
				if (this.tableData == '') {
					Message({
						message: '规格不能为空',
						type: 'error',
						duration: 5 * 1000
					})
					return
				} else if (this.fileArray.length < 2) {
					Message({
						message: '图片必须上传两张',
						type: 'error',
						duration: 5 * 1000
					})
					return
				} else if (this.detail == '<p><br></p>') {
					Message({
						message: '详细内容不能为空',
						type: 'error',
						duration: 5 * 1000
					})
					return
				}
				this.$refs[formName].validate((valid) => {
					if (valid) {
						insertGoodsInfo({
							'status': 2,
							'goodsSkuVoList': this.tableData,
							'title': this.form.name,
							'subTitle': this.form.title,
							'code': this.form.serial,
							'craftType': this.form.making.toString(),
							'material': this.form.material,
							'brand': this.form.brand,
							'producingArea': this.form.origin,
							'unit': this.form.unit,
							'provinceId': this.provinceId,
							'provinceName': this.provinceName,
							'cityId': this.cityId,
							'cityName': this.cityName,
							'areaId': this.areaId,
							'areaName': this.areaName,
							'deliverWay': this.form.freight,
							'keywords': this.form.keywords,
							'profiles': this.form.textarea,
							'detail': this.detail,
							'goodsImgVos': this.fileArray,
							'shopId': this.$store.state.user.userInfo.id

						}).then(response => {
							if (response.code == 200) {
								Message({
									message: '发布完成',
									type: 'success',
									duration: 5 * 1000
								})
								this.$router.push({
									name: 'Shop'
								})
							}
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			deleteRow(index, rows) {
				rows.splice(index, 1)
			},

			handleRemove(file, fileList) {
				fileList = fileList.map(v => {
					return {
						url: v.response.result.url[0],
						type: 1
					}
				})
				this.fileArray = fileList
			},
			handlePreview(file) {
				if (file.status === 'ready') {
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
			//elementui 自带的上传的
			uploadSuccess(response, file, fileList) {
				this.fileArray.push({
					url: response.result.url[0],
					type: 1
				})
			},

			httpRequest(files) {
				const file = files.file
				var that = this
				const fileName = new Date().valueOf() + parseInt(Math.random() * 10000) + file.name.substring(0, 20)
				console.log(fileName)
				this.$ajax.aliSTS.put('/goods/', fileName, file).then(res => {
					if (res) {
						that.fileArray.push({
							url: res.url,
							type: 1
						})
						const file = {
							uid: res.name, // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
							name: res.name, // 文件名
							status: 'done', // 状态有：uploading done error removed
							response: res.res, // 服务端响应内容
							url: res.url
						}
					}
				})
			},
			handleSkuRemove(file, fileList) {
				fileList = fileList.map(v => {
					return {
						url: v.response.result.url[0],
						type: 1
					}
				})
				this.skufileList = fileList
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
			},
			// 规格添加一行
			submitMaterial(formName) {
				const row = {
					specTempIndex: this.materialForm.specTempIndex,
					url: this.skufileList,
					goodsStockVo: {
						num: this.materialForm.goodsStockVo.num
					},
					perPrice: this.materialForm.perPrice,
					minPurchase: this.materialForm.minPurchase,
					remark: this.materialForm.remark,
					showPrice: this.showPrice
				}
				this.dialogVisible = false
				this.tableData.push(row)
				this.$refs.upload.clearFiles()
				this.$refs.materialForm.resetFields()
			},
			// 规格上传图片
			handleSkuPreview(file) {
				if (file.status === 'ready') {
					this.skudialogImageUrl = file.url
					this.skudialogUpload = true
					this.$nextTick(() => {
						this.$refs.showImage.init(file.url)
					})
				}
			},
			onSkuExceed(files, fileList) {
				this.$message.error('提示：只能上传1张图片！')
			},
			// 图片上传
			beforeSkuAvatarUpload(file) {
				var that = this
				if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png') {
					this.$message.error('只支持jpg、png、gif格式的图片！')
					return false
				}
			},
			uploadSkuSuccess(response, file, fileList) {
				console.log('上传图片成功')
				this.skufileList = response.result.url[0]
			},

			httpSkuRequest(files) {
				const file = files.file
				var that = this
				const fileName = new Date().valueOf() + parseInt(Math.random() * 10000) + file.name.substring(0, 20)
				console.log(fileName)
				this.$ajax.aliSTS.put('/goods/', fileName, file).then(res => {
					if (res) {
						that.skufileList = res.url
						const file = {
							uid: res.name, // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
							name: res.name, // 文件名
							status: 'done', // 状态有：uploading done error removed
							response: res.res, // 服务端响应内容
							url: res.url
						}
					}
				})
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
	.gd-release-main {
		width: 100%;
		height: 100%;
		background-color: #FAFAFA;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		box-sizing: border-box;
		padding-top: 50px;

		.gd-release-card {
			width: 1200px;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			background-color: #fff;
			box-sizing: border-box;
			padding: 0px 20px;
		}

		.gd-release-title {
			width: 1200px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin: 20px 0px;
			font-size: 15px;

			span {
				display: block;
				color: #666;
				margin: 0px 5px;
			}

			a {
				text-decoration: none;
				color: #666;
			}
		}

		.el-form {
			width: 1200px;
		}

		.gd-release-row {
			display: flex;

			.el-input {
				width: 80%;
			}

			.el-cascader {
				display: flex;
				justify-content: flex-start;
			}
		}

		.el-form {

			.el-form-item {
				width: 1157px;
			}

			.gd-release-btn {
				.el-button {
					padding: 5px 10px;
				}
			}

			.gd-release-switch {
				height: 40px;
				display: flex;
				align-items: center;
			}
		}

		.gd-release-dialogform {
			.el-form-item {
				width: 416px !important;
			}
		}

		.gd-release-row-img {
			width: 1100px;
			display: flex;
			justify-content: flex-start;
			margin-bottom: 20px;

			img {
				width: 35px;
				height: 35px;
			}
		}

		.el-table {
			margin-bottom: 30px;
		}

		.gd-release-tab {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.el-form-item__content {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			a {
				text-decoration: none;
				color: #fff;
			}
		}

		.gd-text-card {
			width: 900px;
			height: auto;
		}

		.el-upload-dragger {
			width: 100%;
			height: 146px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.gd-purOrder-title {
			img {
				width: 60px;
				height: 60px;
			}
		}
	}
</style>
