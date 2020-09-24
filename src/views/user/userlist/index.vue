<template>
  <div>
    <div class="jh">
      <ul>
        <li>第一行</li>
        <li>第二行</li>
        <li>第三行</li>
        <li>第四行</li>
        <li>第一行</li>
        <li>第二行</li>
      </ul>
    </div>
    <!-- 图片放大镜,需要自定义图片的宽高在这里传入,组件有设置默认的宽高,不传也可以 -->
    <div style="margin-top: 30px;">
      <magnifier :img-list="imgList" />
      <!-- 在store里存值 异步修改值 -->
      <input v-model="num" type="text">
      <button @click="getNum">dd</button>
    </div>
  </div>
</template>
<script>
import Magnifier from '@/components/Magnifier'
export default {
  components: {
    // 商品放大镜图
    Magnifier
  },
  data() {
    return {
      num: '',
      imgList: [{
        url: 'https://resource.smartisan.com/resource/aee0949bc33654bc18cedb8cd7dfbcff.jpg'
      },
      {
        url: 'https://resource.smartisan.com/resource/548de41c48d47232b4ed541c1df57c2f.jpg'
      },
      {
        url: 'https://resource.smartisan.com/resource/406eddef8808fa5a9be9594d07ef8643.jpg'
      }
      ]
    }
  },
  created() {
    this.num = this.$store.state.profitNav
  },
  methods: {
    handleSend() {
      this.content = ''
      console.log('gg')
    },
    getNum() {
      this.$store.dispatch('settings/profitNavActions', this.num) // 异步修改
      console.log(this.$store.state.settings.profitNav)
      // profitNavAction是index.js中action定义的方法
      // 通过dispatch来调用异步中的方法
      // 通过commit来调用同步方法
    }
  }
}
</script>
<style>
	@keyframes scroll {
		0% {
			-webkit-transform: translateY(0px);
			transform: translateY(0px);
		}

		20% {
			-webkit-transform: translateY(0px);
			transform: translateY(0px);
		}

		25% {
			-webkit-transform: translateY(-30px);
			transform: translateY(-30px);
		}

		45% {
			-webkit-transform: translateY(-30px);
			transform: translateY(-30px);
		}

		50% {
			-webkit-transform: translateY(-60px);
			transform: translateY(-60px);
		}

		70% {
			-webkit-transform: translateY(-60px);
			transform: translateY(-60px);
		}

		75% {
			-webkit-transform: translateY(-90px);
			transform: translateY(-90px);
		}

		95% {
			-webkit-transform: translateY(-90px);
			transform: translateY(-90px);
		}

		100% {
			-webkit-transform: translateY(-120px);
			transform: translateY(-120px);
		}
	}

	.jh {
		width: 200px;
		height: 60px;
		overflow: hidden;
		margin-top: 30px;
	}

	.jh ul {
		height: 100%;
		width: 100%;
		-webkit-animation: scroll 5s infinite;
	}

	.jh ul li {
		line-height: 30px;
		height: 30px;
	}
</style>
