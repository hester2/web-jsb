<template>
	<div class="gd-home-live">
		<div class="gd-home-chart-t gd-home-live-t" @click="handleChart">
			<img src="../../assets/icon-chat-001.png" alt="">
			视频
		</div>
		<transition name="fade">
			<div v-show="chartShow" class="gd-chart-main" id="audioBox">
				<h1 style="text-align: center; width: 100%;">音视频窗口</h1>
                      <p @click="handleSend">发起通话</p>
			</div>
		</transition>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
// 	var config = {
// 		RongIMLib: RongIMLib,
// 		RongRTC: RongRTC
// 	};
// 	var rongCallLib = RongCallLib.init(config);
	export default {
		name: 'PageLive',
		computed: {
			...mapGetters([
				'userInfo'
			])
		},
		data() {
			return {
				chartShow: false,
				room: '',
			}
		},
		created() {
			var that = this
			if (that.userInfo.rcInfoState === 0) {
				that.loginWebLive()
			}
		},
		methods: {
			//音视频链接通讯
			loginWebLive() {

// 				console.log('oooo', rongCallLib)
// 				var commandWatcher = function(message) {
// 					var messageType = message.messageType;
// 					// 根据消息类型做对应处理
// 					console.log('消息',message)
// 				};
// 				rongCallLib.commandWatch(commandWatcher);
// 				var videoWatcher = function(result) {
// 					console.log('ccccc', result)
// 					var type = result.type;
// 					var boxEl = document.getElementById('audioBox');
// 					console.log('直播', result)
// 					if (type === 'added') {
// 						// 添加音视频节点
// 						var video = result.data;
// 						boxEl.appendChild(video);
// 					} else if (type === 'removed') {
// 						// 删除对应音视频节点
// 						var video = result.data;
// 						boxEl.removeChild(video);
// 					} else if (type == 'leave') {
// 						// 音视频结束, 清空所有音视频 UI
// 					}
// 				};
// 				rongCallLib.videoWatch(videoWatcher);

			},
			handleSend(){
// 				var params = {
// 				  conversationType: RongIMLib.ConversationType.PRIVATE,
// 				  targetId: 'user2',
// 				  inviteUserIds: ['user2'],
// 				  mediaType: RongIMLib.VoIPMediaType.MEDIA_VIDEO
// 				};
// 				rongCallLib.call(params, function(error){
// 				  if (error) {
// 					console.error('发起通话失败', error);
// 				  }
// 				});
			},
			handleChart() {
				if (this.userInfo.userId) {
					this.chartShow = !this.chartShow
				} else {
					this.chartShow = false
					this.$message({
						message: '请先登录',
						type: 'error',
						duration: 3000
					})
				}
			},
		}
	}
</script>

<style lang="less">
	.gd-home-live {
		.gd-home-live-t {
			bottom: 250px;
			background-color: #829AFD;
		}

		.fade-enter-active,
		.fade-leave-active {
			transition: opacity .5s;
		}

		.fade-enter,
		.fade-leave-to

		/* .fade-leave-active below version 2.1.8 */
			{
			opacity: 0;
		}

		.gd-chart-main {
			width: 587px;
			height: 500px;
			position: fixed;
			right: 100px;
			bottom: 50px;
			display: flex;
			z-index: 999999999;
			background-color: #fff;
			box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.2);
		}
	}
</style>
