<template>
  <div class="gd-from-main">
    <div class="gd-from-row">
      <h3>表单提交</h3>
      <el-tabs :tab-position="tabPosition" style="height:500px;">
        <el-tab-pane label="市场">
          <el-form ref="raw" :model="raw">
            <p>市场</p>
            <el-form-item label="名称">
              <el-input v-model="raw.name" />
            </el-form-item>
            <el-form-item label="经度">
              <div @click="dialogVisible = true">
                <el-input v-model="raw.longitude" />
              </div>
            </el-form-item>
            <el-form-item label="纬度">
              <div @click="dialogVisible = true">
                <el-input v-model="raw.latitude" />
              </div>
            </el-form-item>

            <el-button type="primary" @click="onSubmit1">提交</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="原料生产商">
          <el-form ref="form" :model="form">
            <p>原料生产商</p>
            <el-form-item label="名称">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="经度">
              <div @click="dialogVisible = true">
                <el-input v-model="form.longitude" />
              </div>
            </el-form-item>
            <el-form-item label="纬度">
              <div @click="dialogVisible = true">
                <el-input v-model="form.latitude" />
              </div>
            </el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="自定义">
          <el-form ref="form" :model="custom">
            <p>自定义</p>
            <el-form-item label="名称">
              <el-input v-model="custom.name" />
            </el-form-item>
            <el-form-item label="经度">
              <div @click="dialogVisible = true">
                <el-input v-model="custom.longitude" />
              </div>
            </el-form-item>
            <el-form-item label="纬度">
              <div @click="dialogVisible = true">
                <el-input v-model="custom.latitude" />
              </div>
            </el-form-item>
            <el-button type="primary" @click="onSubmit2">提交</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>

    </div>

    <el-dialog title="选择地址" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
      <div style="height: 400px;">
        <div class="amap-page-container">
          <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult">hhhhhhhhh</el-amap-search-box>
          <el-amap ref="map" vid="amapDemo" :center="center" :zoom="zoom" :events="events" class="amap-demo">
            <el-amap-marker :position="markers" />
          </el-amap>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  inserRawMaterialManufacturer,
  insertRawMaterialBazaar
} from '@/api/table.js'

import {
  MessageBox,
  Message
} from 'element-ui'
export default {
  data() {
    return {
      tabPosition: 'left',
      dialogVisible: false,
      form: {
        name: '',
        longitude: '',
        latitude: ''
      },
      raw: {
        name: '',
        longitude: '',
        latitude: ''
      },
      custom: {
        name: ''
      },
      zoom: 1,
      markers: [0, 0],
      center: [0, 0],
      searchOption: {
        city: '中国',
        citylimit: true
      },
      events: {
        init: (o) => {
          console.log(o.getCenter())
          console.log(this.$refs.map.$$getInstance())
          o.getCity(result => {
            console.log(result)
          })
        },
        'moveend': () => {},
        'zoomchange': () => {},
        'click': (e) => {
          console.log(e.lnglat)
          this.form.longitude = e.lnglat.lng
          this.form.latitude = e.lnglat.lat
          this.raw.longitude = e.lnglat.lng
          this.raw.latitude = e.lnglat.lat
          this.custom.longitude = e.lnglat.lng
          this.custom.latitude = e.lnglat.lat
          this.dialogVisible = false
        }
      }
    }
  },
  methods: {
    onSearchResult(pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          const {
            lng,
            lat
          } = poi
          lngSum += lng
          latSum += lat
          this.markers = [poi.lng, poi.lat]
        })
        const center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.center = [center.lng, center.lat]
      }
    },
    // 原料商
    onSubmit() {
      inserRawMaterialManufacturer({
        'latitude': this.form.latitude,
        'longitude': this.form.longitude,
        'name': this.form.name
      }).then(response => {
        Message({
          message: '提交成功',
          type: 'success',
          duration: 800
        })
        this.$refs[form].resetFields()
      })
    },
    // 市场
    onSubmit1() {
      insertRawMaterialBazaar({
        'latitude': this.raw.latitude,
        'longitude': this.raw.longitude,
        'name': this.raw.name
      }).then(response => {
        Message({
          message: '提交成功',
          type: 'success',
          duration: 800
        })
        this.$refs[raw].resetFields()
      })
    },
    onSubmit2() {

    },
    getMap() {},
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="less">
	.gd-from-main {
		width: 100%;
		height: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;

		.gd-from-row {
			width: 1200px;
			height: auto;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			margin-top: 100px;

			h3 {
				width: 1200px;
				text-align: left;
				border-bottom: 2px solid #DF825B;
				line-height: 40px;
				font-size: 20px;
			}

			.el-tabs {
				margin-top: 50px;
			}

			.el-tabs__nav-wrap:after {
				background-color: transparent;
			}

			.el-tabs__active-bar {
				background-color: transparent;
			}

			.el-tabs__item {
				font-size: 20px;
				font-weight: bold;
				color: #333333;
				margin-bottom: 20px;
				padding: 0px;
				text-align: left;
			}

			.el-tabs__item.is-active {
				color: #DF825B !important;
			}
		}

		.el-form {
			width: 565px;
			border: 2px solid rgba(233, 235, 239, 1);
			box-sizing: border-box;
			padding: 20px 20px;
			margin-left: 80px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.el-form-item {
				display: flex;
				justify-content: flex-start;
				width: 512px;
			}

			.el-input {
				width: 465px;
			}

			p {
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 20px;
				width: 100%;
				text-align: left;
			}
		}

		.amap-demo {
			height: 400px;
		}

		.amap-page-container {
			position: relative;
		}

		.search-box {
			position: absolute;
			top: 25px;
			left: 20px;
		}

		.el-button {
			height: 30px;
			line-height: 30px;
			width: 60px;
			padding: 0px;
			margin-bottom: 50px;

			span {
				display: block;
				height: 30px;
				line-height: 30px;
			}
		}
	}
</style>
