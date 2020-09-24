<template>
  <div class="gd-Tinformation-main">
    <p class="gd-Tinformation-title">首页<span>></span><span>分类管理</span></p>
    <div class="gd-Tinformation-card">
      <el-row>
        <el-col class="grid-content-mation">
          <div class="grid-content-find">
            <img src="" alt="">
            <p>
              交易金额
              <span>34522.86</span>
            </p>
          </div>
        </el-col>
        <el-col class="grid-content-mation">
          <div class="grid-content-find" />
        </el-col>
        <el-col class="grid-content-mation">
          <div class="grid-content-find" />
        </el-col>
        <el-col class="grid-content-mation">
          <div class="grid-content-find" />
        </el-col>
        <el-col class="grid-content-mation">
          <div class="grid-content-find" />
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>

</script>

<style lang="less">
	.gd-Tinformation-main {
		height: 100vh-10;
		box-sizing: border-box;
		padding: 0px 25px;
		display: flex;
		flex-direction: column;

		.gd-Tinformation-title {
			font-size: 12px;
			color: #999999;
			display: flex;
			justify-content: flex-start;
			text-align: left;
			margin-top: 30px;
			margin-bottom: 20px;

			span {
				color: #333;
				margin-left: 4px;
			}
		}

		.gd-Tinformation-card {
			display: flex;

			.el-row {
				width: 100%;
			}

		}

		.grid-content-mation {
			background-color: #ccc;
			width: 19%;
			height: 140px;
			margin-right: 20px;

			&:last-of-type {
				margin-right: 0px;
			}

		}

		.grid-content-find {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			border-radius:6px;

			p {
				font-size: 12px;
				color: #fff;
				display: flex;
				flex-direction: column;
				text-align: left;

				span {
					color: #fff;
					font-size: 22px;
					margin-top: 10px;
				}
			}
		}
	}
</style>
