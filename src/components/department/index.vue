<template>
  <div class="gd-depart-details-main">
    <div class="gd-depart-top">
      <div class="gd-header-col">
        <input v-model="issue_content" type="text" placeholder="请输入需要分析的品名" @input="inputFunc">
        <el-button type="primary" size="small" @click="handleClick">分析</el-button>
        <div v-show="serch_result_issue" class="gd-serch-result">
          <li v-for="item in searchData" @click="handleActive(item.name)">
            {{ item.name }}
          </li>
        </div>
      </div>
    </div>
    <div v-show="bgSearch" class="gd-departcom-w">
      <p class="gd-departcom-p"><span>塑料玩具</span><img
        src="../../assets/img/icon-depart-detail-002.png"
        alt=""
        @click="onClose"
      ></p>
      <div class="gd-departcom-row">
        <div class="gd-departcom-row-le">
          <p>主要材料</p>
          <div class="gd-departcom-row-nl">
            <p>丙烯腈-丁二烯-苯乙烯三元聚合物(ABS， 玩具的主流材料)</p>
            <p>丙烯腈(A) - 提高玩具硬度、耐磨、耐热性。 </p>
            <p>丁二烯(B) - 提升玩具柔顺、韧性、弹性及耐冲击强度。 </p>
            <p>苯乙烯(S) - 保持良好成型性(流动性着色性)及保持材料刚性 </p>
          </div>
          <p class="gd-departcom-row-nls">可能涉及牌号</p>
          <div class="gd-departcom-row-nl">
            <p><span>D-1000</span><span>AG-1511</span></p>
          </div>
        </div>
        <div class="gd-departcom-row-rl">
          <img src="../../assets/img/bg-depart-detail-002.png" alt="">
        </div>
      </div>
      <p class="gd-departcom-row-p">化工结构</p>
      <img src="../../assets/img/bg-depart-detail-003.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgSearch: false,
      issue_content: '', // 输入框中的内容
      serch_result_issue: false, // 控制搜索的问题显示隐藏
      serch_result: [{
        name: 'ABS'
      },
      {
        name: 'PP'
      },
      {
        name: 'PE'
      },
      {
        name: 'PC'
      },
      {
        name: 'PP'
      }
      ]

    }
  },

  // 计算属性，当输入内容的时候下面的方法就会根据你输入的内容来过滤serch_result数组中的数据
  computed: {
    searchData() {
      var issue_content = this.issue_content
      if (issue_content) {
        return this.serch_result.filter(function(product) {
          return Object.keys(product).some(function(key) {
            return String(product[key]).toLowerCase().indexOf(issue_content) > -1
          })
        })
      }
      return this.products
    }
  },
  methods: {
    handleClick() {
      this.bgSearch = true
    },
    onClose() {
      this.bgSearch = false
    },
    // 监听输入事件，当input中有内容时，下面的搜索列表显示出来
    inputFunc() {
      if (this.issue_content.length > 0) {
        this.serch_result_issue = true
      } else {
        this.serch_result_issue = false
      }
    },
    handleActive(o) {
      this.issue_content = o
      this.serch_result_issue = false
    }
  }
}
</script>

<style lang="less">
	.gd-depart-details-main {
		width: 100%;
		height: auto;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		position: relative;

		.gd-depart-top {
			width: 100%;
			background-size: 100% 100%;
			background-image: url(../../assets/img/bg-depart-001.png);
			height: 400px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-end;
			box-sizing: border-box;
			padding-bottom: 50px;

			.gd-header-col {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
                position: relative;
			}

			.gd-serch-result {
				position: absolute;
				top: 45px;
				background-color: #fff;
				width: 200px;
				height: auto;
				box-shadow:0px 1px 10px 0px rgba(0, 0, 0, 0.05);
				li{
					font-size: 14px;
					color: #666;
					text-align: left;
					cursor: pointer;
					box-sizing: border-box;
					padding-left: 15px;
				}
			}

			.gd-header-col .el-button {
				width: 113px;
				padding: 0px 10px;
				border-radius: 3px 3px 3px 3px;
				margin-top: 20px;
			}

			::-webkit-input-placeholder {
				color: #999;
				font-size: 12px;
			}

			.gd-header-col input {
				height: 35px;
				line-height: 35px;
				box-sizing: border-box;
				padding: 0px 20px;
				border: none;
				border: 1px solid #ccc;
				border-radius: 5px 5px 5px 5px;
				width: 200px;

				outline: none;
			}

		}

		.gd-departcom-w {
			width: 1124px;
			height: auto;
			position: absolute;
			background-color: #E6E6E6;
			border-radius: 5px;
			top: 500px;
			box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.05);
			box-sizing: border-box;
			padding: 20px 20px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

		}

		.gd-departcom-p {
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-bottom: 30px;

			span {
				display: block;
				font-size: 24px;
				font-weight: bold;
			}

			img {
				display: block;
			}
		}

		.gd-departcom-row {
			display: flex;
			justify-content: space-between;
		}

		.gd-departcom-row-le {
			width: 500px;
			height: 265px;
			font-size: 13px;
			text-align: left;
			font-weight: bold;

			p {
				margin-bottom: 10px;
			}

			.gd-departcom-row-nl {
				margin-left: 20px;

				p {
					display: flex;
				}

				span {
					color: #EE7C51;
					display: block;
					margin-left: 30px;
				}
			}

			.gd-departcom-row-nls {
				margin-top: 20px;
			}
		}

		.gd-departcom-row-rl {
			width: 316px;
			height: 265px;

			img {
				height: 265px;
			}
		}

		.gd-departcom-row-p {
			text-align: left;
			font-weight: bold;
			font-size: 12px;
		}
	}
</style>
