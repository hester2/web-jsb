<template>
  <div class="gd-depart-main">
    <department />
    <div class="gd-depart-w">
      <h3>热门品类 <el-button><router-link to="/physicalForm">添加牌号及品种</router-link></el-button>
      </h3>
      <div class="gd-depart-w gd-depart-ws">
        <div class="gd-depart-col">
          <h4>ABS</h4>
          <div class="gd-depart-cols">
            <p @click="handleDetail"><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>PP</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>HOPE</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>LDPE</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>LLDPE</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>HIPS</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>GPPS</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>EVA</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>AS</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>MVLDPE</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>PC</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>PBT</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>PA6</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>PET</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>PC/ABS</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>PMMA</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>P0M</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>
        <div class="gd-depart-col">
          <h4>ABS/PMMA</h4>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
          <div class="gd-depart-cols">
            <p><span>></span>GA-850</p>
            <p><span>></span>HI121H</p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import department from '@/components/department/index.vue'
export default {
  components: {
    department
  },
  data() {
    return {

    }
  },
  methods: {
    handleDetail() {
      this.$router.push('/department/departmentDetail')
    }
  }
}
</script>

<style lang="less">
	.gd-depart-main {
		width: 100%;
		height: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;

		.gd-depart-top {
			// width: 100%;
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

		.gd-depart-w {
			width: 1200px;
			height: auto;

			h3 {
				text-align: left;
				color: #EE7C51;
				margin: 30px 0px;
				display: flex;
				justify-content: space-between;

				.el-button {
					padding: 5px 10px;
					a{
						text-decoration: none;
						color: #666;
					}
				}
			}
		}

		.gd-depart-ws {
			box-sizing: border-box;
			display: flex;
			display: -webkit-flex;
			justify-content: flex-start;
			flex-direction: row;
			flex-wrap: wrap;

			.gd-depart-col {
				width: 250px;
				height: 200px;
				margin-left: 40px;

				h4 {
					border-bottom: 1px solid #FCEFE9;
					font-size: 15px;
					font-weight: bold;
					color: #EE7C51;
					height: 30px;
					line-height: 30px;
					text-align: left;
					margin: 0px;
				}
			}

			.gd-depart-cols {
				width: 100%;
				height: auto;
				display: flex;

				p {
					width: 50%;
					height: 30px;
					line-height: 30px;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					color: #939599;
					font-size: 13px;
					cursor: pointer;

					span:nth-of-type(1) {
						font-size: 15px;
						font-weight: bold;
						color: #EE7C51;
						display: block;
						margin-right: 5px;
					}
				}
			}
		}
	}
</style>
