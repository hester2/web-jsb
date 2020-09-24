<template>
  <div class="gd-physical-main">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="材料特性表" name="second">
        <el-form ref="speciForm" :model="speciForm" status-icon label-width="100px" class="demo-ruleForm">
          <p class="gd-physical-p">牌号分类</p>
          <div class="gd-physical-brand">
            <el-form-item label="品名">
              <el-input v-model="speciForm.catagoryName" placeholder="请输入品名" />
            </el-form-item>
            <el-form-item label="产地">
              <el-input v-model="speciForm.areaName" placeholder="例如:中石化" />
            </el-form-item>
            <el-form-item label="牌号">
              <el-input v-model="speciForm.codeName" placeholder="例如:7042" />
            </el-form-item>
            <el-form-item label="类别">
              <el-input v-model="speciForm.varietyName" placeholder="DFDA,D-聚乙烯,F-挤出,D-颗粒,A-该产品的第一代" />
            </el-form-item>
          </div>
          <p class="gd-physical-p">规格用途</p>
          <div class="gd-physical-brand">
            <el-form-item label="规格级别">
              <el-input v-model="speciForm.rawSpecificationRank" placeholder="例如:防止持续性带电 注射成型" />
            </el-form-item>
            <el-form-item label="外观颜色">
              <el-input v-model="speciForm.rawAppearanceColour" placeholder="例如:透明" />
            </el-form-item>
            <el-form-item label="该料用途">
              <el-input v-model="speciForm.rawPurpose" placeholder="例如:电气元件,通用" />
            </el-form-item>
            <el-form-item label="备注说明">
              <el-input v-model="speciForm.rawRemark" placeholder="请输入备注" />
            </el-form-item>
          </div>
        </el-form>
        <p class="gd-physical-p">技术参数</p>
        <div class="gd-physical-col">
          <div class="gd-physical-row">
            <img src="../../assets/img/icon-physical-add.png" alt="" @click="dialogVisible = true">
          </div>

          <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width:1200px" max-height="250">
            <el-table-column fixed :show-overflow-tooltip="true" prop="rawProperty" label="性能项目" width="250" />
            <el-table-column prop="rawTestCondition" label="试验条件" width="210" />
            <el-table-column prop="rawTestMethod" label="测试的方法" width="210" />
            <el-table-column prop="rawTestData" label="测试数据" width="210" />
            <el-table-column prop="rawTestDataUnit" label="数据单位" width="198" />
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
          <div>
            <el-form ref="submitMaterial" :model="materialForm" status-icon label-width="100px" class="demo-ruleForm">
              <el-form-item label="性能项目">
                <el-input v-model="materialForm.rawProperty" placeholder="例如:物理性能-溶化体积流率（MVR）(260°C/5.0kg)" />
              </el-form-item>
              <el-form-item label="试验条件">
                <el-input v-model="materialForm.rawTestCondition" placeholder="请输入试验条件" />
              </el-form-item>
              <el-form-item label="测试数据">
                <el-input v-model="materialForm.rawTestData" placeholder="请输入测试数据" />
              </el-form-item>
              <el-form-item label="数据单位">
                <el-input v-model="materialForm.rawTestDataUnit" placeholder="请输入数据单位" />
              </el-form-item>
              <el-form-item label="测试方法">
                <el-input v-model="materialForm.rawTestMethod" placeholder="请输入测试方法" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitMaterial">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
        <el-button style="margin-top: 20px;" type="primary" @click="handleSubmit">提交并预览</el-button>
      </el-tab-pane>
      <el-tab-pane label="生成材料特性表" name="three" disabled>
        <div class="gd-physical-table">
          <div class="gd-physical-head">
            <h3>品种：{{ answer.catagoryName }}{{ answer.codeName }}{{ answer.varietyName }}</h3>
            <p>生产企业：{{ answer.areaName }}</p>
          </div>
          <div class="gd-physical-center">
            <p>规格用途</p>
            <table class="gd-speci-table" cellpadding="0" cellspacing="0">
              <tr>
                <td class="gd-physical-td">规格级别</td>
                <td>{{ rawSpecificationVo.rawSpecificationRank }}</td>
                <td class="gd-physical-td">外观颜色</td>
                <td>{{ rawSpecificationVo.rawAppearanceColour }}</td>
              </tr>
              <tr>
                <td class="gd-physical-td">该料用途</td>
                <td colspan="3">{{ rawSpecificationVo.rawPurpose }}</td>
              </tr>
              <tr>
                <td class="gd-physical-td">备注说明</td>
                <td colspan="3">{{ rawSpecificationVo.rawRemark }}</td>
              </tr>
            </table>
            <p>技术参数</p>
            <el-table :data="technology" border style="width: 100%">
              <el-table-column prop="rawProperty" label="性能项目" width="400">
                <template slot-scope="scope">
                  <span>{{ scope.row.rawProperty.substring(0,3) }}</span>
                  <span>{{ scope.row.rawProperty }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="rawTestCondition" label="试验条件[状态]" width="156" />
              <el-table-column prop="rawTestMethod" label="测试方法" width="200" />
              <el-table-column prop="rawTestData" label="测试数据" width="200" />
              <el-table-column prop="rawTestDataUnit" label="数据单位" width="200" />
            </el-table>
            <el-button style="padding: 3px 10px; width: 80px; margin-top: 20px;" @click="handleEdit">编辑</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="编辑材料特性表" name="four" disabled>
        <el-form ref="speciFormto" :model="speciFormto" status-icon label-width="100px" class="demo-ruleForm">
          <p class="gd-physical-p">牌号分类</p>
          <div class="gd-physical-brand">
            <el-form-item label="品名">
              <el-input v-model="speciFormto.catagoryName" placeholder="请输入品名" />
            </el-form-item>
            <el-form-item label="产地">
              <el-input v-model="speciFormto.areaName" placeholder="例如:中石化" />
            </el-form-item>
            <el-form-item label="牌号">
              <el-input v-model="speciFormto.codeName" placeholder="例如:7042" />
            </el-form-item>
            <el-form-item label="类别">
              <el-input v-model="speciFormto.varietyName" placeholder="DFDA,D-聚乙烯,F-挤出,D-颗粒,A-该产品的第一代" />
            </el-form-item>
          </div>
          <p class="gd-physical-p">规格用途</p>
          <div class="gd-physical-brand">
            <el-form-item label="规格级别">
              <el-input v-model="speciFormto.rawSpecificationRank" placeholder="例如:防止持续性带电 注射成型" />
            </el-form-item>
            <el-form-item label="外观颜色">
              <el-input v-model="speciFormto.rawAppearanceColour" placeholder="例如:透明" />
            </el-form-item>
            <el-form-item label="该料用途">
              <el-input v-model="speciFormto.rawPurpose" placeholder="例如:电气元件,通用" />
            </el-form-item>
            <el-form-item label="备注说明">
              <el-input v-model="speciFormto.rawRemark" placeholder="请输入备注" />
            </el-form-item>
          </div>
        </el-form>
        <p class="gd-physical-p">技术参数</p>
        <div class="gd-physical-col">
          <div class="gd-physical-row">
            <img src="../../assets/img/icon-physical-add.png" alt="" @click="dialogVisibles = true">
          </div>

          <el-table ref="multipleTable" :data="totableData" border tooltip-effect="dark" style="width:1200px" max-height="250">
            <el-table-column fixed :show-overflow-tooltip="true" prop="rawProperty" label="性能项目" width="250" />
            <el-table-column prop="rawTestCondition" label="试验条件" width="210" />
            <el-table-column prop="rawTestMethod" label="测试的方法" width="210" />
            <el-table-column prop="rawTestData" label="测试数据" width="210" />
            <el-table-column prop="rawTestDataUnit" label="数据单位" width="198" />
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisibles" width="40%">
          <div>
            <el-form ref="submitMaterial" :model="materialFormto" status-icon label-width="100px" class="demo-ruleForm">
              <el-form-item label="性能项目">
                <el-input v-model="materialFormto.rawProperty" placeholder="例如:物理性能-溶化体积流率（MVR）(260°C/5.0kg)" />
              </el-form-item>
              <el-form-item label="试验条件">
                <el-input v-model="materialFormto.rawTestCondition" placeholder="请输入试验条件" />
              </el-form-item>
              <el-form-item label="测试数据">
                <el-input v-model="materialFormto.rawTestData" placeholder="请输入测试数据" />
              </el-form-item>
              <el-form-item label="数据单位">
                <el-input v-model="materialFormto.rawTestDataUnit" placeholder="请输入数据单位" />
              </el-form-item>
              <el-form-item label="测试方法">
                <el-input v-model="materialFormto.rawTestMethod" placeholder="请输入测试方法" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitMaterialTo">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
        <el-button style="margin-top: 20px;" type="primary" @click="handleSubmitTo">提交并预览</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  saveRawInformation,
  getRawInformation,
  updateRawReception
} from '@/api/table.js' // 导入api
import {
  Message
} from 'element-ui'
export default {
  data() {
    return {
      activeName: 'second',
      dialogVisible: false,
      dialogVisibles: false,
      answer: '',
      rawSpecificationVo: '',
      materialForm: {
        rawProperty: '',
        rawTestCondition: '',
        rawTestMethod: '',
        rawTestData: '',
        rawTestDataUnit: ''
      },
      speciForm: {
        areaName: '',
        catagoryName: '',
        codeName: '',
        varietyName: '',
        rawSpecificationRank: '',
        rawAppearanceColour: '',
        rawPurpose: '',
        rawRemark: ''
      },
      materialFormto: {
        rawProperty: '',
        rawTestCondition: '',
        rawTestMethod: '',
        rawTestData: '',
        rawTestDataUnit: ''
      },
      speciFormto: {
        areaName: '',
        catagoryName: '',
        codeName: '',
        varietyName: '',
        rawSpecificationRank: '',
        rawAppearanceColour: '',
        rawPurpose: '',
        rawRemark: '',
        id: '',
        rawCodeId: ''
      },
      totableData: [],
      tableData: [],
      multipleSelection: [],
      technology: [],
      formId: 0,
      areaId: 0,
      codeId: 0,
      varietyId: 0,
      catagoryId: 0,
      ido: 0,
      rawCodeId: 0
    }
  },
  created() {
    console.log(this.formId + 'llll')
    if (this.formId) {
      getRawInformation({
        rawCodeId: this.formId
      }).then(response => {
        console.log(response.result)
      })
    }
  },
  methods: {
    handleEdit() {
      this.activeName = 'four'
      getRawInformation({
        rawCodeId: this.formId
      }).then(response => {
        var data = response.result
        this.speciFormto.areaName = data.areaName
        this.speciFormto.catagoryName = data.catagoryName
        this.speciFormto.codeName = data.codeName
        this.speciFormto.varietyName = data.varietyName
        this.speciFormto.rawSpecificationRank = data.rawSpecificationVo.rawSpecificationRank
        this.speciFormto.id = data.rawSpecificationVo.id
        this.speciFormto.rawAppearanceColour = data.rawSpecificationVo.rawAppearanceColour
        this.speciFormto.rawCodeId = data.rawSpecificationVo.rawCodeId
        this.speciFormto.rawPurpose = data.rawSpecificationVo.rawPurpose
        this.speciFormto.rawRemark = data.rawSpecificationVo.rawRemark
        this.totableData = data.rawParameterVos
        this.areaId = data.areaId
        this.codeId = data.codeId
        this.varietyId = data.varietyId
        this.catagoryId = data.catagoryId
        this.ido = data.rawSpecificationVo.id
        this.rawCodeId = data.rawSpecificationVo.rawCodeId
      })
    },
    handleSubmit() {
      Message({
        message: '不好意思，此页面的接口已封，暂停服务',
        type: 'error',
        duration: 5 * 1000
      })
      var that = this
      saveRawInformation({
        areaName: that.speciForm.areaName,
        catagoryName: that.speciForm.catagoryName,
        codeName: that.speciForm.codeName,
        varietyName: that.speciForm.varietyName,
        rawParameterVos: this.tableData,
        rawSpecificationVo: {
          rawAppearanceColour: that.speciForm.rawAppearanceColour,
          rawPurpose: that.speciForm.rawPurpose,
          rawRemark: that.speciForm.rawRemark,
          rawSpecificationRank: that.speciForm.rawSpecificationRank
        }
      }).then(response => {
        this.activeName = 'three'
        this.formId = response.result
        getRawInformation({
          rawCodeId: this.formId
        }).then(response => {
          this.answer = response.result
          this.rawSpecificationVo = response.result.rawSpecificationVo
          this.technology = response.result.rawParameterVos
        })
        this.tableData = ''
        this.speciForm = {
          areaName: '',
          catagoryName: '',
          codeName: '',
          varietyName: '',
          rawSpecificationRank: '',
          rawAppearanceColour: '',
          rawPurpose: '',
          rawRemark: ''
        }
      })
    },
    handleSubmitTo() {
      console.log(this.totableData)
      var that = this
      updateRawReception({
        areaName: that.speciFormto.areaName,
        catagoryName: that.speciFormto.catagoryName,
        codeName: that.speciFormto.codeName,
        varietyName: that.speciFormto.varietyName,
        rawParameterVos: this.totableData,
        codeId: this.codeId,
        areaId: this.areaId,
        catagoryId: this.catagoryId,
        varietyId: this.varietyId,
        rawSpecificationVo: {
          rawAppearanceColour: that.speciFormto.rawAppearanceColour,
          rawPurpose: that.speciFormto.rawPurpose,
          rawRemark: that.speciFormto.rawRemark,
          rawSpecificationRank: that.speciFormto.rawSpecificationRank,
          id: this.ido,
          rawCodeId: this.rawCodeId
        }
      }).then(respones => {
				          this.activeName = 'three'
						  getRawInformation({
						  	rawCodeId: this.formId
						  }).then(response => {
						  	this.answer = response.result
						  	this.rawSpecificationVo = response.result.rawSpecificationVo
						  	this.technology = response.result.rawParameterVos
						  })
      })
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submitForm() {
      console.log(this.ruleForm)
    },
    submitMaterial() {
      const row = {
        rawProperty: this.materialForm.rawProperty,
        rawTestCondition: this.materialForm.rawTestCondition,
        rawTestData: this.materialForm.rawTestData,
        rawTestDataUnit: this.materialForm.rawTestDataUnit,
        rawTestMethod: this.materialForm.rawTestMethod
      }
      this.dialogVisible = false
      this.tableData.unshift(row)
    },
    submitMaterialTo() {
      const row = {
        rawProperty: this.materialFormto.rawProperty,
        rawTestCondition: this.materialFormto.rawTestCondition,
        rawTestData: this.materialFormto.rawTestData,
        rawTestDataUnit: this.materialFormto.rawTestDataUnit,
        rawTestMethod: this.materialFormto.rawTestMethod
      }
      this.dialogVisibles = false
      this.totableData.unshift(row)
      console.log(this.tableData)
    }
  }
}
</script>

<style lang="less">
	.gd-physical-main {
		width: 100%;
		height: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		box-sizing: border-box;
		padding-top: 30px;

		.el-tabs {
			width: 1250px;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		.el-form {
			margin-top: 30px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.el-form-item {
				width: 500px;
			}

			p {
				width: 1200px;
			}
		}

		.el-tabs__active-bar {
			background-color: #ee7c51;
		}

		.el-tabs__item.is-active {
			color: #ee7c51;
		}

		.gd-physical-col {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.gd-physical-row {
			width: 1200px;
			display: flex;
			justify-content: flex-start;

			img {
				width: 35px;
				height: 35px;
			}

			.el-button {

				span {
					display: block;
					height: 35px !important;
					line-height: 35px !important;
				}
			}

		}

		.gd-physical-p {
			font-size: 20px;
			color: #666;
			margin: 20px 0px;
		}

		.gd-physical-brand {
			display: flex;
			width: 1200px;

			.el-input {
				width: 56%;
			}

			.el-form-item__content {
				margin-left: 0px !important;
			}
		}

		.gd-physical-table {
			width: 1198px;
			height: auto;
			border: 1px solid #e1e4e6;
		}

		.gd-physical-head {
			width: 100%;
			height: 95px;
			background: #fafafa;
			text-align: center;
			border-bottom: 1px solid #e1e4e6;
			padding: 10px 0;

			p {
				font-size: 12px;
			}
		}

		.gd-physical-center {
			width: 100%;
			height: auto;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 20px 20px;

			p {
				text-align: left;
				margin-bottom: 10px;
				margin-top: 10px;
				color: #666;
			}

			.el-table--border th {
				height: 47px;
				line-height: 47px;

			}

			.el-table td,
			.el-table th {
				padding: 0px;
			}

			.el-table {
				tr td:nth-of-type(1) {
					.cell {
						padding: 0px;
						height: 47px;
						line-height: 47px;
						display: flex;

						span {
							display: block;
							width: 200px;
							height: 47px;
							line-height: 47px;
							padding: 0px 10px;
						}

						span:nth-of-type(1) {
							width: 150px;
						}

						span:nth-of-type(2) {
							width: 250px;
							border-left: 1px solid #e1e4e6;
						}

					}
				}
			}
		}

		.gd-speci-table {
			border: 1px solid #e1e4e6;
			border-bottom: 0px solid #e1e4e6;
			border-right: 0px solid #e1e4e6;

			td {
				height: 34px;
				line-height: 34px;
				border-bottom: 1px solid #e1e4e6;
				border-right: 1px solid #e1e4e6;
				font-size: 13px;
				color: #666;
			}

			.gd-physical-td {
				width: 300px;
			}

		}
	}
</style>
