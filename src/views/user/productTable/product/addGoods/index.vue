<template>
  <div class="gd-addGoods-main">
    <p class="gd-addGoods-title">首页<span>></span><router-link to="/user/productTable/product"><span>产品类表</span></router-link><span>></span><span class="gd-addGoods-cor">添加商品</span></p>
    <div class="gd-addGoods-bot">
      <div class="gd-addGoods-le">
        <p class="gd-addGoods-ml">产品类型列表</p>
        <el-collapse accordion>
          <div style=" background-color: #fff;">
            <el-collapse-item>
              <template slot="title">
                <img src="../../../../../assets/img/user/icon-ufication-001.png" alt="" style="margin-right: 10px;">
                ABS
              </template>
              <div style="margin-left: 10px;">
                <p class="gd-ufin-ellipsis">简略标题</p>
              </div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <img src="../../../../../assets/img/user/icon-ufication-001.png" alt="" style="margin-right: 10px;">
                PE
              </template>
              <div style="margin-left: 10px;">
                <p class="gd-ufin-ellipsis">简略标题</p>
              </div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <img src="../../../../../assets/img/user/icon-ufication-001.png" alt="" style="margin-right: 10px;">
                PP
              </template>
              <div style="margin-left: 10px;">
                <p class="gd-ufin-ellipsis">简略标题</p>
              </div>
            </el-collapse-item>
          </div>
        </el-collapse>
      </div>
      <div class="gd-addGoods-re">
        <el-form ref="form" :model="form" :rules="rules" status-icon enctype="multipart/form-data" label-width="100px">
          <div class="gd-addGoods-detail">
            <p class="gd-addGoods-tis"> 商品信息</p>
            <el-form-item label="商品标题" prop="name" class="gd-addGoods-with">
              <el-input v-model="form.name" placeholder="输入商品标题" />
            </el-form-item>
            <el-form-item label="简略标题" prop="title" class="gd-addGoods-with">
              <el-input v-model="form.title" placeholder="请输入标题" />
            </el-form-item>
            <div class="gd-addGoods-row">
              <div class="gd-addGoods-category">类目信息</div>
              <div class="gd-addGoods-category-de">
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
                    <el-cascader
                      v-model="form.val"
                      filterable
                      :options="options"
                      :props="props"
                      clearable
                      @change="handleAddress"
                    />
                  </div>
                </el-form-item>
                <el-form-item label="货运方式" prop="freight">
                  <el-select v-model="form.freight" placeholder="请选择货运方式">
                    <el-option label="物流" value="shanghai" />
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="gd-addGoods-detail">
            <p class="gd-addGoods-tis"> 销售规格</p>
            <div class="gd-addGoods-tab">
              <div class="gd-addGoods-row-img">
                <img src="../../../../../assets/img/icon-physical-add.png" alt="" @click="dialogVisible = true">
              </div>
              <el-table ref="tableData" :data="tableData" border tooltip-effect="dark" style="width:818px" max-height="250">
                <el-table-column fixed :show-overflow-tooltip="true" prop="specTempIndex" label="商品规格" width="220" />
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
          </div>
          <div class="gd-addGoods-detail">
            <p class="gd-addGoods-tis"> 图文描述</p>
            <el-form-item label="关键词" prop="keywords" class="gd-addGoods-with">
              <el-input v-model="form.keywords" placeholder="以逗号分开,最多5个" />
            </el-form-item>
            <el-form-item label="内容简要" prop="textarea" class="gd-addGoods-with">
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
            <el-form-item label="上传图片" class="gd-addGoods-with">
              <div style="display: flex;">
                <el-upload
                  ref="upload"
                  drag
                  multiple
                  name="files"
                  list-type="picture-card"
                  :data="upData"
                  :limit="limit"
                  :action="imageAction"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-upload="beforeAVatarUpload"
                  :on-exceed="onExceed"
                  :on-error="uploadError"
                  :on-success="uploadSuccess"
                  :auto-upload="true"
                  :headers="{Authorization:this.$store.getters.token}"
                >
                  <i slot="default" class="el-icon-plus" />
                </el-upload>
                <el-dialog :visible.sync="dialogUpload">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </div>
            </el-form-item>
            <el-form-item label="详细内容" prop="detail" class="gd-addGoods-with">
              <div class="gd-text-card">
                <!-- 富文本编辑框 -->
                <editor-bar v-model="detail" :is-clear="isClear" @change="change" />
              </div>
            </el-form-item>
            <el-form-item label="是否发布国际版" prop="delivery" label-width="130px">
              <div class="gd-addGoods-switch">
                <el-switch v-model="form.delivery" />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="gd-addGoods-btn">
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button type="primary" @click="handleQuery('form')">
                  保存并预览
                </el-button>
                <el-button>取消</el-button>
              </div>
            </el-form-item>
          </div>
        </el-form>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="35%">
          <div class="gd-addGoods-dialogform">
            <el-form ref="materialForm" :model="materialForm" status-icon label-width="100px" class="demo-ruleForm">
              <el-form-item label="商品规格">
                <el-input v-model="materialForm.specTempIndex" placeholder="" />
              </el-form-item>
              <el-form-item label="发布库存量">
                <el-input v-model="materialForm.goodsStockVo.num" placeholder="" />
              </el-form-item>
              <el-form-item label="单品价格">
                <el-input v-model="materialForm.perPrice" placeholder="" />
              </el-form-item>
              <el-form-item label="最低采购量">
                <el-input v-model="materialForm.minPurchase" placeholder="" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="materialForm.remark" placeholder="" />
              </el-form-item>
              <el-form-item label="展示价格">
                <el-input v-model="showPrice" disabled placeholder="" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitMaterial">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
import EditorBar from '../../../../../components/textEdit/index.vue'
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
      dialogVisible: false,
      dialogImageUrl: '',
      dialogUpload: false,
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
        goodsStockVo: {
          num: ''
        },
        perPrice: '',
        minPurchase: '',
        remark: '',
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
    _this.handleSave()
    this.$http.get('/static/citylist.json').then(function(response) {
      const data = response.data
      this.options = data
    })
      .catch(function(error) {
        console.log('出错喽：' + error)
      })
  },

  methods: {
    handleMak(value) {
      console.log(JSON.stringify(this.form.making.toString()))
    },
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
            'goodsImgVos': this.fileArray

          }).then(response => {
            if (response.code == 200) {
              _this.querId = response.result
              this.$router.push({
                path: '/user/product/goodsPreview',
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
            'goodsImgVos': this.fileArray

          }).then(response => {
            if (response.code == 200) {
              Message({
                message: '发布完成',
                type: 'error',
                duration: 5 * 1000
              })
              setTimeout(location.reload(), 500)
              this.idx = ''
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
    // 规格添加一行
    submitMaterial() {
      const row = {
        specTempIndex: this.materialForm.specTempIndex,
        goodsStockVo: {
          num: this.materialForm.goodsStockVo.num
        },
        perPrice: this.materialForm.perPrice,
        minPurchase: this.materialForm.minPurchase,
        remark: this.materialForm.remark,
        showPrice: this.showPrice
      }
      console.log(row)
      this.dialogVisible = false
      this.tableData.push(row)
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
      this.fileArray.push({
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
    },
    handleSave() {
      if (this.idx) {
        getGoodsInfo({
          goodsSpuId: this.idx
        }).then(response => {
          console.log(response)
          var data = response.result
          this.fileList = response.result.goodsImgVos
          this.fileArray = response.result.goodsImgVos
          var data = response.result.goodsSkuVoList
          data.map(item => {
            item.goodsStockVo.num = item.goodsStockVo.availableNum
          })
          console.log(data)
          this.tableData = data,
          this.form.name = response.result.title,
          this.form.title = response.result.subTitle,
          this.form.serial = response.result.code,
          this.form.making = response.result.craftType.split(','),
          this.form.material = response.result.material,
          this.form.brand = response.result.brand,
          this.form.origin = response.result.producingArea,
          this.form.unit = response.result.unit,
          this.form.val = response.result.sendArea,
          this.form.freight = response.result.deliverWay,
          this.form.keywords = response.result.keywords,
          this.form.textarea = response.result.profiles,
          this.detail = response.result.detail
        })
      }
    }
  }
}
</script>

<style lang="less">
	.gd-addGoods-main {
		height: 100vh-10;
		box-sizing: border-box;
		padding: 0px 25px;
		display: flex;
		flex-direction: column;

		.gd-addGoods-title {
			font-size: 12px;
			color: #999999;
			display: flex;
			justify-content: flex-start;
			text-align: left;
			margin-top: 30px;
			margin-bottom: 20px;

			a{
				text-decoration: none;
			}

			span {
				color: #999999;
				margin-left: 4px;
			}

			.gd-addGoods-cor {
				color: #333 !important;
			}
		}

		.gd-addGoods-bot {
			display: flex;

		}

		.gd-addGoods-le {
			width: 10%;
			box-shadow: 0px 4px 15px 1px rgba(32, 39, 57, 0.1);
			box-sizing: border-box;
			border-radius: 5px;
			padding: 10px 10px;

			.el-collapse-item__header {
				border: none
			}

			.gd-addGoods-ml {
				font-size: 13px;
				text-align: left;
				font-weight: bold;
			}

			.el-collapse-item {
				padding-left: 10px;
			}
		}

		.gd-addGoods-re {
			margin-left: 10px;
			width: 89%;
			box-sizing: border-box;
			border-radius: 5px;
			padding: 20px 10px;
			padding-top: 0px;
			// box-shadow: 0px 4px 15px 1px rgba(32, 39, 57, 0.1);
		}

		.gd-addGoods-detail {
			box-shadow: 0px 4px 15px 1px rgba(32, 39, 57, 0.1);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			padding-bottom: 20px;
			margin-bottom: 20px;

			.gd-addGoods-with {
				.el-form-item__content {
					margin-left: 0px;
					display: flex;
					justify-content: flex-start;
				}

				.el-input {
					width: 818px;
				}
				.el-textarea{
					width: 818px;
				}
			}

			.gd-addGoods-tis {
				width: 100%;
				border-bottom: 1px solid #E6E6E6;
				height: 45px;
				line-height: 45px;
				font-size: 13px;
				color: rgba(51, 51, 51, 1);
				box-sizing: border-box;
				padding-left: 20px;
				text-align: left;
				margin-bottom: 20px;
			}
		}

		.gd-addGoods-row {
			display: flex;
			width: 1157px;

			.gd-addGoods-category {
				width: 80px;
				font-size: 12px;

			}

			.gd-addGoods-category-de {
				width: 818px;
				background-color: #FCFCFC;
				display: flex;
				display: -webkit-flex;
				justify-content: flex-start;
				flex-direction: row;
				flex-wrap: wrap;
				box-sizing: border-box;
				padding: 10px 10px;
				margin-left: 20px;

				.el-form-item {
					width: 50%;
					display: flex;

					.el-form-item__content {
						margin-left: 0px !important;
					}
				}

				.el-input--suffix .el-input__inner {
					padding-right: 15px;
				}
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

			.gd-addGoods-btn {
				.el-button {
					padding: 5px 10px;
				}
			}

			.gd-addGoods-switch {
				height: 40px;
				display: flex;
				align-items: center;
			}
		}

		.gd-addGoods-dialogform {
			.el-form-item {
				width: 400px !important;
			}
		}

		.gd-addGoods-row-img {
			width: 1100px;
			display: flex;
			justify-content: flex-start;
			margin-bottom: 20px;

			img {
				width: 35px;
				height: 35px;
			}
		}

		.gd-addGoods-tab {
			display: flex;
			flex-direction: column;
			width: 955px;
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
		.el-upload-list{

		}
	}
</style>
