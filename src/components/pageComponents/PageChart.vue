<template>
  <div class="gd-page-chart">
    <div class="gd-home-chart-t" @click="handleChart">
      <img src="../../assets/icon-chat-001.png" alt="">
      消息
    </div>
    <transition name="fade">
      <div v-if="chartShow" class="gd-chart-main">
        <div class="gd-chart-left">
          <li v-for="(item, index) in chatUserList" :class="{'bgActive':item.targetId==chatUserSelected}"
              class="gd-chart-col"
              @click="handleSwitch(index, item.targetId,userData[item.targetId])"
              @mouseover="hoverIndex = index"
              @mouseout="hoverIndex = -1">
            <img :src="userData && userData[item.targetId] && userData[item.targetId].portrait"
                 onerror="this.src='https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491929439,4106440758&fm=26&gp=0.jpg'"
                 class="gd-chart-avatar" alt="">
            <p class="gd-chart-title">{{ userData && userData[item.targetId] && userData[item.targetId].name}}</p>
            <span v-if="targetCount!=0&&newMsg==item.targetId" class="gd-chart-newmsg">{{targetCount}}</span>
            <p class="gd-chart-empty" @click.stop="handleEmpty(item.targetId,item.type)">
              <img src="../../assets/img/shop/icon-chat-delete.png" alt=""></p>
          </li>
          <p class="gd-chat-add" @click="handleMore">
            <span class="icon iconfont" style="font-size: 40px;color:#707070;margin-bottom: 10px;">&#xe785;</span>
            更多{{unreadMessageCount}}
          </p>
        </div>
        <div ref="table-container" class="gd-chart-right">
          <div v-if="msgDisplay">
            <div class="gd-chart-top">
              <img class="gd-chart-avatar" :src="chatUserTarget.portrait"
                   onerror="this.src='https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491929439,4106440758&fm=26&gp=0.jpg'"
                   alt="">
              <p>{{ chatUserTarget.name }}</p>
              <img src="../../assets/img/shop/icon-char-001.png" alt="" @click="handleHide">
            </div>
            <div class="gd-chart-center middle" ref="middle" id="middle">
              <p class="gd-chart-history" @click="handleHistoryMore(chatUserSelected)">{{historyMsg}}</p>
              <div v-for="(item, index) in messageList" :key="index" class="gd-chart-row">
                <div class="gd-chart-time">
                  <p>{{ item.sentTime | formatDate }}</p>
                </div>
                <div v-if="item.messageDirection==1" class="gd-chart-ofe">
                  <!-- 图片-->
                  <p class="gd-chart-p gd-chart-pr" v-if="item.messageType=='RC:ImgMsg'"
                     @click="handlePreview(item.content.imageUri)">
                    <span v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)"></span>
                    <img :src="item.content.content"
                         style="width: 80px;height: 80px;border-radius: 0px;"
                         alt="">
                  </p>
                  <!--小视频-->
                  <p class="gd-chart-p gd-chart-pr" style="width: 200px" v-else-if="item.messageType=='RC:SightMsg'">
                    <video width="200" height="200" controls>
                      <source src="item.content.sightUrl">
                    </video>
                  </p>
                  <!--GIF图片-->
                  <p class="gd-chart-p gd-chart-pr" v-else-if="item.messageType=='RC:GIFMsg'"
                     @click="handlePreview(item.content.remoteUrl)">
                    <img :src="item.content.remoteUrl" style="width: 80px;height: 80px;border-radius: 0px;" alt=""></p>
                  <!--语音-->
                  <p class="gd-chart-p gd-chart-pr" v-else-if="item.messageType=='RC:VcMsg'">
                    <audio controls="controls" style="width: 112px;">
                      <source :src="'data:application/x-authoware-map;base64,'+item.content.content">
                      </source>
                    </audio>
                  </p>
                  <!-- 文字-->
                  <p  class="gd-chart-p gd-chart-pr" v-else>{{ item.content.content}}</p>
                  <img :src="item.content.user.portrait"
                       onerror="this.src='https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491929439,4106440758&fm=26&gp=0.jpg'">
                </div>
                <div v-if="item.messageDirection==2" class="gd-chart-ofo">
                  <img :src="item.content.user.portrait"
                       onerror="this.src='https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491929439,4106440758&fm=26&gp=0.jpg'">
                  <!--图片-->
                  <p class="gd-chart-p gd-chart-pr" v-if="item.messageType=='RC:ImgMsg'"
                     @click="handlePreview(item.content.imageUri)">
                    <img :src="item.content.imageUri" style="width: 80px;height: 80px;border-radius: 0px;" alt="">
                  </p>
                  <!--小视频-->
                  <p class="gd-chart-p gd-chart-pr" style="width: 200px" v-else-if="item.messageType=='RC:SightMsg'">
                    <video width="200" height="200" controls>
                      <source src="item.content.sightUrl">
                    </video>
                  </p>
                  <!--GIF图片-->
                  <p class="gd-chart-p gd-chart-pr" v-else-if="item.messageType=='RC:GIFMsg'"
                     @click="handlePreview(item.content.remoteUrl)">
                    <img :src="item.content.remoteUrl" style="width: 80px;height: 80px;border-radius: 0px;" alt=""></p>
                  <!--语音-->
                  <p class="gd-chart-p gd-chart-pr" v-else-if="item.messageType=='RC:VcMsg'">
                    <audio controls="controls" style="width: 112px;">
                      <source :src="'data:application/x-authoware-map;base64,'+item.content.content">
                      </source>
                    </audio>
                  </p>
                  <!--文字-->
                  <p  class="gd-chart-p gd-chart-pr" v-else>{{ item.content.content }}</p>
                </div>
              </div>
            </div>
            <el-dialog :visible.sync="dialogvaurl">
              <img width="100%" :src="dialogUrl" alt="">
            </el-dialog>
            <div class="gd-chart-bottom">
              <div class="gd-chart-icon">
                <img src="../../assets/img/shop/icon-char-002.png" alt="" @click="showEmojiPanel">
                <!-- <img class="layui-upload-img" name="titleBase64Img" id="base64Img" :src="headImg" /> -->
                <div class="fileInput">
                  <img src="../../assets/img/shop/icon-char-003.png" alt="">
                  <input type="file" id="Updateimage" style="width: 20px;opacity: 0;" @change="toBase64()"
                         accept="image/jpeg, image/png, image/jpg"/>

                </div>
                <emoji-panel :emojis="listEmojin" v-if="isShowEmojiPanel" @emojiClick="appendEmoji"/>
              </div>
              <form action="" @keyup.enter="handleSend" @submit.prevent="handleSend()">
                <div class="gd-chart-text">
									<textarea id="textpanel" v-model="content" name="desc" value="" class="gd-chart-text"
                            style="resize: none;"
                            placeholder="请输入，按Enter直接发送消息，Ctrl+Enter换行"/>
                </div>
                <div class="gd-chart-btn">
                  <button class="" type="submit">发送</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import im from '@/common/rongIm'
  import EmojiPanel from '../emoji/EmojiPanel.vue'
  import {
    searchPhone
  } from '@/api/table.js'

  import {rongCloud} from '@/api/user.js'

  import {
    mapGetters,
    createNamespacedHelpers
  } from 'vuex'


  import {
    formatDate
  } from '@/utils/date.js'

  import $ from 'jquery'
  import dataURL2Audio from '@/utils/fileUtil.js'

  const {mapActions} = createNamespacedHelpers('rongIm/message')

  export default {
    name: 'PageChart',
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
      ...mapGetters('rongIm', ['rongUser', 'rongMessage', 'rongConversation', 'conversationUser']),
      chatUserList: function () {
        return this.rongConversation.conversationList
      },
      messageList: function () {
        return this.rongMessage.messageData[`${this.conversationUser}`]
      },
      userData: function () {
        return this.rongUser.vuexUserData
      },
      rongUserInfo: function () {
        return this.rongUser.rongUser
      },
      targetCount:function() {
        return this.rongMessage.targetCount
      },
      newMsg:function(){
        return this.rongMessage.newMsg
      },
      unreadMessageCount:function(){
        return this.rongMessage.unreadMessageCount
      },
    },
    filters: {
      formatDate(time) {
        var data = new Date(time)
        return formatDate(data, 'MM-dd hh:mm')
      }
    },
    components: {
      EmojiPanel
    },
    data() {
      //TODO 第二次改过后 有些没用的参数没删掉
      return {
        chartShow: false,
        dialogVisible: false,
        isShowEmojiPanel: false,
        historyMsg: '加载历史消息',
        dialogUrl: '',
        dialogvaurl: false,
        chatUserSelf: {
          'headAddr': 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3621869950,2480486393&fm=26&gp=0.jpg',
          'nickname': '',
          'username': this.$store.state.user.userInfo.rcId,
          'password': this.$store.state.user.userInfo.hxPassWord
        }, //	当前用户
        chatUserTarget: {},
        chatUserSelected: '', //	选中的对象username
        // chatUserList: [], //	会话列表
        chatMessageList: [], //	消息列表，二维数组，username作为key
        content: '',
        msgCount: 0,//未读消息
        newTrue: true,
        msgDisplay: false,
        form: {
          phone: ''
        },
        listEmojin: [],
        headImg: "",
        imageUrl: "",
        type: '',
        file: [],
        sentTime: 0,
        rcInfoState: 0,//通讯是否连接正常
      }
    },
    mounted() {
      var that = this
    },
    created() {
      var that = this
      this.handleHistory()
      if (that.userInfo.userId) {
        if (this.chatUserSelected) {
          this.handleGetMessageList().then((res) => {
            this.handleGobottom()
          })
        }
        that.loginWebIM()
      }
    },
    methods: {
      ...mapActions(['getMessage','getTotalSpecifiedCount', 'sendMessage']),
      // 初始化账号
      loginWebIM() {
        var that = this
        var rcInfoState = {
          'rcInfoState': 0
        }
        that.rcInfoState = 0
        that.$store.dispatch('user/rcUserInfoState', rcInfoState)

        // 初始化列表
        if (this.rongConversation) {
          // that.handleUserList()

          //初始化Emoji
          that.handleEmogi()
          if (!that.$route.query.rcInfoState) {
            that.handleMessage()
          }
        }
      },
      handleMessage() {
        var that = this
        // 收到文本消息

      },
      handleMore() {
        this.dialogVisible = true
        this.chartShow = false
        if (this.rcInfoState == 0) {
          this.$router.push({
            path: '/chat/message',
            query: {
              rcInfoState: this.rcInfoState
            }
          })
        } else {
          this.$message('通讯正在连接中')
        }
      },
      toBase64() {
        var that = this
        var file = document.querySelector('input[type=file]').files[0];
        this.file = file
        var reader = new FileReader();
        reader.onloadend = function () {
          $("#base64Img").attr("style", "display:inline-block");
          $("#base64Img").attr("src", reader.result);
          that.imageUrl = reader.result
          that.updataImg()
        }
        if (file) {
          reader.readAsDataURL(file);
        }
      },
      //发送图片
      updataImg() {
        var that = this


        var fileType = RongIMLib.FILE_TYPE.IMAGE;

        var config = {
          domain: 'http://upload.qiniu.com',
          fileType: fileType,
          getToken: function (callback) {
            im.getFileToken(fileType).then(function (data) {
              callback(data.token, data)
            }).catch(function (error) {
              console.log('获取上传 token 失败', error);
            });
          }
        };

        var uploadCallbacks = {
          onProgress: function (loaded, total) {
            var percent = Math.floor(loaded / total * 100);
            console.log('已上传: ', percent);
          },

          onCompleted: function (data) {
            var fileType = RongIMLib.FILE_TYPE.IMAGE;
            var filename = data.filename; // 通过 uploadCallbacks 的 onCompleted 中返回的 data 获取
            var oriname = data.name; // 通过 uploadCallbacks 的 onCompleted 中返回的 data 获取
            im.getFileUrl(fileType, data.filename, oriname).then(function (data) {
              const target = {
                targetId: that.chatUserSelected,
                type: RongIMLib.CONVERSATION_TYPE.PRIVATE
              }
              const message = {
                messageType:RongIMLib.MESSAGE_TYPE.IMAGE, // 'RC:TxtMsg'
                content: {
                  content: that.imageUrl, // 文本内容
                  imageUri:data.downloadUrl,
                  user: that.rongUserInfo
                },
                sentTime: +new Date(),
                messageDirection: 1
              }
              console.log('发送', message)
              that.handleGobottom()
              that.sendMessage({target, message}).then(res => {

              })
            }).catch(function (error) {
              console.log('获取文件 url 失败', error);
            });
          },
          onError: function (error) {
            console.error('上传失败', error);
          }
        };

        var _file = this.file; // 上传的 file 对象
        UploadClient.initImage(config, function (uploadFile) {
          uploadFile.upload(_file, uploadCallbacks);
        });
      },

      //预览图片
      handlePreview(file) {
        this.dialogUrl = file;
        this.dialogvaurl = true;
      },
      handleHide() {
        this.chartShow = false
      },
      // 漫游 消息会话获取
      handleGetMessageList() {
        return new Promise((resolve, reject) => {
          const targetId = this.chatUserSelected
          const params = {
            timestrap: this.messageList ? this.messageList[0].sentTime + 1 : +new Date(),
            count: 20
          }
          this.getMessage({targetId, params}).then(res => {
            this.hasMore = res.hasMore // 是否还有历史消息可以获取
            resolve(res)
          })


        })
      },
      handleHistoryMore(selectId){
        var that=this
        var sentTime=this.rongMessage.messageData[selectId].pop()
        var targetId = selectId
        const params = {
          timestrap:sentTime.sentTime,
          count: 20
        }

        if (that.chatUserTarget.type == 3) {
          this.$store.dispatch('rongIm/message/getGroupMessage', {targetId, params}).then(res => {
            var message = res.list; //历史消息列表
            var hasMore = res.hasMore
          })
        } else {
          this.$store.dispatch('rongIm/message/getMessage', {targetId, params}).then(res => {
            var message = res.list; //历史消息列表
            var hasMore = res.hasMore
          })
        }
      },
      handleHistory() {
        var that = this
        console.log(this.chatUserList)
        var data=this.chatUserList
        data.map(item=>{
          this.$store.dispatch('rongIm/message/getTotalSpecifiedCount', item.targetId)
          var targetId= item.targetId
          const params = {
            timestrap: this.rongMessage.messageData[item.targetId] ? this.rongMessage.messageData[item.targetId].sentTime + 1 : +new Date(),
            count: 20
          }

          if(item.type==3){
            this.$store.dispatch('rongIm/message/getGroupMessage', {targetId, params}).then(res => {
              var message = res.list; //历史消息列表
              var hasMore = res.hasMore
            })
          }else {
            this.$store.dispatch('rongIm/message/getMessage', {targetId, params}).then(res => {
              var message = res.list; //历史消息列表
              var hasMore = res.hasMore
            })
          }
        })
      },

      // 消息
      emoji(word) {
        // 生成html
        const type = word.substring(1, word.length - 1)
        return `<span class="emoji-item-common emoji-${type} emoji-size-small" ></span>`
      },
      showEmojiPanel() {
        this.isShowEmojiPanel = !this.isShowEmojiPanel
      },
      appendEmoji(text) {
        const el = document.getElementById('textpanel')
        var ml = el.value + text
        this.content = ml
        this.isShowEmojiPanel = false
      },
      // 删除指定会话
      handleEmpty(oid, type) {
        var that = this
        console.log(type)
        if(type==1) {
          this.$store.dispatch('rongIm/conversation/getRemoveConversationList', oid)
        }else if(type==3){
          this.$store.dispatch('rongIm/conversation/getRemoveGroupList', oid)
        }
      },

      handleGobottom() {
        var that = this
        that.$nextTick(() => {
          let middle = document.getElementById('middle');
          middle.scrollTop = middle.scrollHeight
        })
      },
      //红点
      handleSwitch(o, uname, user) {
        this.$store.dispatch('rongIm/conversation/switchConversation', uname)
        this.msgDisplay = true
        var that = this
        that.chatUserSelected = uname
        that.chatUserTarget = user
        that.$nextTick(() => {
          let middle = document.getElementById('middle');
          middle.scrollTop = middle.scrollHeight
        })
        if (uname == that.chatUserSelected) {
          this.$store.dispatch('rongIm/message/removeSpecifiedCount', uname)
        } else {
          that.newTrue = true
        }
      },

      //表情
      handleEmogi() {
        RongIMLib.RongIMEmoji.init();
        var list = RongIMLib.RongIMEmoji.list;
        this.listEmojin = list
      },
      // 发送文本消息
      handleSend() {
        var that = this
        const val = that.content

        if (val != '') {
          const target = {
            targetId: this.chatUserSelected,
            type: RongIMLib.CONVERSATION_TYPE.PRIVATE
          }
          const message = {
            messageType: RongIMLib.MESSAGE_TYPE.TEXT, // 'RC:TxtMsg'
            content: {
              content: val, // 文本内容
              user: this.rongUserInfo
            },
            sentTime: +new Date(),
            messageDirection: 1
          }
          console.log('发送', message, target)
          that.handleGobottom()
          this.sendMessage({target, message}).then(res => {
            if (res) {
              this.content = ''
            }
          })
        } else {
          this.$message.error('请输入内容')
        }
      },

      /**
       * 动态追加消息  TODO第一版本以前留下
       */
      appendMessage(to, message) {
        var that = this
        if (message.flag == 1) {
          let _messageList = this.chatMessageList[to]
          if (!_messageList) {
            _messageList = new Array()
          }
          _messageList.unshift(message)
          this.$set(this.chatMessageList, to, _messageList) // 实时更新

        } else {
          let _messageList = this.chatMessageList[to]
          if (!_messageList) {
            _messageList = new Array()
          }
          _messageList.push(message)
          this.$set(this.chatMessageList, to, _messageList) // 实时更新
        }
      },

      handleChart() {
        var that = this
        if (this.userInfo.userId) {
          console.log(that.$WebIM)
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
      //通过手机号搜索好友  TODO 已隐藏 这个界面不需要此需求
      submitForm(formName) {
        var that = this
        searchPhone(this.form.phone).then(res => {
          that.chatUserSelected = res.result.rcId
          console.log('好友id', res.result.rcId)
          rongCloud(res.result.rcId).then(res => {
            that.$message(res.message);
            that.chatUserList.push({
              targetId: that.chatUserSelected,
              latestMessage: {
                content: {
                  user: {
                    id: that.chatUserSelected,
                    name: res.result.nickname,
                    portrait: res.result.headAddr
                  }
                }
              }
            })
            that.chatUserTarget = {
              id: that.chatUserSelected,
              name: res.result.nickname,
              portrait: res.result.headAddr
            }
          })

        })
        console.log('添加好友列表', this.chatUserList)

        this.dialogVisible = false
        // this.$refs[formName].resetFields();
      }

    }
  }
</script>

<style lang="less">
  @import "../../assets/css/emoji.css";

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to

    /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .gd-chart-main {
    width: 559px;
    height: 500px;
    position: fixed;
    right: 100px;
    bottom: 50px;
    display: flex;
    z-index: 999999999;
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.2);

    .gd-chart-left {
      width: 88px;
      height: 500px;
      padding-bottom: 66px;
      background-color: #FBE1D7;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      position: relative;
      border-right: 1px solid #F2F2F2;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;

      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }

    .gd-chat-add {
      position: fixed !important;
      bottom: 50px;
      font-size: 13px;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-top: 1px solid #eee;
      color: #707070;
      z-index: 9999999;
      cursor: pointer;
      width:88px;
      height: 70px;
      display: flex;
      box-sizing: border-box;
      padding: 10px 0px;

      .el-icon-circle-plus-outline {
        font-size: 30px;
      }
    }

    .gd-chart-empty {
      // background-color: #fff;
      font-size: 12px;
      position: absolute;
      right: 25px;
      top: -5px;

      img {
        width: 14px;
        height: 14px;
        margin-top: 6px;
      }
    }

    .gd-chart-right {
      width: 470px;
      height: 100%;
      overflow: hidden;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      border-left: 1px solid #F2F2F2;
      position: relative;
    }

    .gd-chart-top {
      height: 60px;
      border-bottom: 1px solid #eee;
      display: flex;
      box-sizing: border-box;
      padding: 10px 20px;
      align-items: center;
      position: relative;

      img:nth-of-type(2) {
        position: absolute;
        right: 10px;
        width: 21px;
        height: 21px;
        cursor: pointer;
      }
    }

    .gd-chart-center {
      width: 470px;
      height: 31.9vh;
      overflow-y: auto;
      overflow-x: hidden;
      box-sizing: border-box;
      padding: 20px 15px;
      background-color: #fff;

      .gd-chart-history {
        font-size: 13px;
        cursor: pointer;
      }
    }

    .gd-chart-bottom {
      height: 135px;
      background-color: #EFEFEF;
      box-shadow: border-box;
      padding: 0.625rem 0.9375rem;
      position: absolute;
      bottom: 0px;
      width: 94%;

      form {
        background-color: #fff;
        border-radius: 5px;
        height: 89px;
        margin: 5px 0px;
      }
    }

    .gd-chart-col {
      display: flex;
      position: relative;
      height: 80px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin: 10px 0px;

      &:nth-of-type(1) {
        margin-top: 0px;
      }

      .gd-chart-newmsg {
        position: absolute;
        left: 20px;
        background-color: red;
        display: block;
        width: 10px;
        height: 10px;
        font-size: 10px;
        color: #fff;
        line-height: 10px;
        border-radius: 50%;
        top: 5px;
      }
    }

    .bgHover {
      background-color: #F0F0F0;
      border-radius: 0.5rem;
    }

    .gd-chart-avatar {
      width: 35px;
      height: 35px;
      background-color: #ccc;
      border-radius: 50%;
      margin-right: 10px;
    }

    .gd-chart-row {
      display: flex;
      margin-bottom: 10px;
      height: auto;
      display: flex;
      flex-direction: column;
    }

    .gd-chart-ofo {
      display: flex;
      margin-bottom: 10px;
      width: 100%;
      justify-content: flex-start;
      align-items: flex-start;

    }

    .gd-chart-time {
      display: flex;
      justify-content: center;
      line-height: 25px;
      margin: 12px 0px;

      p {
        width: 104px;
        text-align: center;
        font-size: 13px;
        color: #333;
        background-color: #FEE3D8;
        border-radius: 5px;
      }
    }

    .gd-chart-ofo img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    .gd-chart-ofo .gd-chart-p {
      background: #dcdcdc;
      margin-left: 10px;
    }

    .gd-chart-ofe .gd-chart-p {

      background: #9EEA6A;
    }

    .gd-chart-p {
      display: inline-block;
      border-radius: 5px;
      font-size: 12px;
      padding: 5px 5px;
      margin: 5px 0;
      line-height: 20px;
      margin-left: 5px;
      max-width: 230px;
      word-wrap: break-word;
    }

    .gd-chart-ofe {
      display: flex;
      margin-bottom: 10px;
      width: 100%;
      justify-content: flex-end;
      align-items: flex-start;
    }

    .gd-chart-ofe img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    .gd-chart-pr {
      margin-left: 0px;
      margin-right: 5px;
    }

    .gd-chart-icon {
      display: flex;
      height: 30px;
      width: 100%;
      position: relative;

      .el-icon-picture-outline {
        font-size: 29px;
        color: #666;
      }

      .fileInput {
        position: relative;

        input {
          position: absolute;
          left: 0px;
        }

        img {
          left: 0px;
          height: 36px;
          width: 36px;
        }
      }
    }

    .gd-chart-icon img {
      // background-color: #ccc;
      height: 36px;
      width: 36px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .gd-chart-text {
      height: 64px;
      width: 100%;
      color: #666;
      background-color: transparent;
      outline: none;
      border: none;
      box-sizing: border-box;
      padding: 2px 10px;
    }

    .gd-chart-text::-webkit-input-placeholder {
      color: #CCCCCC;
    }

    .gd-chart-btn {
      height: 25px;
      display: flex;
      justify-content: flex-end;
      // margin-top: 10px;
    }

    .gd-chart-btn button {
      padding: 0 18px;
      background-color: #FF7842;
      color: #fff;
      width: 58px;
      text-align: center;
      white-space: nowrap;
      text-align: center;
      font-size: 14px;
      border: none;
      border-radius: 2px 0px 0px 2px;
      cursor: pointer;
    }

    .gd-chart-title {
      text-align: center;
      line-height: 25px;
      width: 88px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      color: rgba(112, 112, 112, 1);
      margin-top: 5px;
    }

    .bgActive {
      background-color: #fff;
      z-index: 999999;
      box-sizing: border-box;
      padding: 6px 0px;

    }

    .comment-wrap {
      width: 522px;
      margin-bottom: 180px;

    }

    .emoji-item-common {
      background: url("../../assets/img/emoji_sprite.png");
      display: inline-block;
    }

    .emoji-item-common:hover {
      cursor: pointer;
    }

    .emoji-size-small {
      /* // 表情大小 */
      zoom: 0.3;
    }

    .emoji-size-large {
      zoom: 0.5;
      /* // emojipanel表情大小 */
      margin: 4px;
    }

    .emoji-panel-wrap {
      text-align: left;
    }

    textarea {
      padding: 0px
    }

    .gd-dislog-main {
      position: absolute;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 17px 0px rgba(229, 229, 229, 0.92);
      border-radius: 11px;
      left: 50px;
      top: 20%;
      height: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 0px 20px;

      p:nth-of-type(1) {
        width: 100%;
        text-align: left;
        margin: 20px 0px;
        display: flex;
        justify-content: space-between;
      }

      .el-form {
        display: flex;
        justify-content: flex-start;
        width: 65%;

        .el-button {
          height: 40px;
          width: 70px;
          margin-left: -4px;
          z-index: 9999;
          border-radius: 0px 4px 4px 0px;
          padding: 0px;
        }
      }
    }

    .el-dialog__wrapper {
      z-index: 9999999 !important;
    }
  }

  .gd-page-ml-chat {
    .gd-home-chart-t {
      display: none;
    }
  }

</style>
