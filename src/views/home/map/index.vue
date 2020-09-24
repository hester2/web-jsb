<template>
  <!--鼠标移入显示 移出隐藏 -->
  <div>
    <div class="amap-page-container">
      <div :style="{width:'100%',height:'900px'}">
        <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
          <el-amap-marker
            v-for="(marker,index) in markers"
            :key="index"
            :position="marker.position"
            :content="marker.content"
            :events="marker.events"
          />
          <el-amap-marker
            v-for="(item,index) in material"
            :key="index+'r'"
            :position="item.position"
            :content="item.content"
            :events="item.events"
            :visible="item.visible"
          />
          <!-- <el-amap-text v-for="text in texts" :text="text.text" :offset="text.offset" :position="text.position" :events="text.events"></el-amap-text> -->
        </el-amap>
      </div>
      <!--  -->

      <!--  -->
    </div>
  </div>

</template>

<script>
import {
  rawMaterialInformation
} from '@/api/table.js'
export default {
  data() {
    return {
      zoom: 5,
      zooms: [5, 5], // 级别
      center: [121.5273285, 31.21515044],
      markers: [],
      material: []
    }
  },
  created() {
    rawMaterialInformation({

    }).then(response => {
				 var _src = 'https://img-blog.csdnimg.cn/20200708112407149.png'
      response.result.manufacturerInformationList.map(item => {
        item.position = [JSON.parse(item.longitude), JSON.parse(item.latitude)],
        item.radius = 20,
        item.fillOpacity = 1,
        item.content =
						'<div style="display: flex;width: auto;justify-content: center; height:50px ; align-items: center;"><img  src=' + _src + ' width="15" height="18" alt="" style="margin-right:5px"><div style="text-align:center;color:#fff; background:rgba(238,124,81,1); height: 25px;line-height:25px; width: 54px; font-size:12px;  border-radius: 5px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;">' + item.name + '</div></div>',
        item.fillColor = 'rgba(0,136,221,1)'
      })
      response.result.rawMaterialInformationList.map(item => {
        item.position = [JSON.parse(item.longitude), JSON.parse(item.latitude)],
        item.radius = 20,
        item.fillOpacity = 1,
        item.visible = true,
        item.content = '<div style="text-align:center;color:#fff; background:rgba(238,124,81,0.6); height: 54px;line-height:54px; width: 54px;font-size:12px;  border-radius:50%; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;">' +
						item.name + '</div>	',
        item.fillColor = 'rgba(0,136,221,1)'
      })
      this.markers = response.result.manufacturerInformationList
      this.material = response.result.rawMaterialInformationList
    })
  },
  methods: {

  }
}
</script>

<style scoped>
	body {
		background-color: #fff;
	}

	.amap-page-container{
		height: 900px;
		overflow: hidden;
	}

	.amap-demo {
		height: 900px;
	}
</style>
