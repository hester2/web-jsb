<template>
  <div>
    <div class="gd-chatIm-right" v-if="!chatUserList.length==0" v-show="chatMsgShow">
      <div class="gd-chatIm-right-top">
        <div class="gd-chatIm-right-title" v-if="chatUserTarget.type==3">
          {{chatUserTarget.latestMessage.content.user.id}}
          <p>{{chatUserTarget.latestMessage.content.user.name}}</p>
          <p>企业签名引入位置</p>
        </div>
        <div class="gd-chatIm-right-title" v-else>
          {{userData&&userData[conversationUser]&&userData[conversationUser].rcId}}
          <p>{{userData&&userData[conversationUser]&&userData[conversationUser].name}}</p>
          <p>企业签名引入位置</p>
        </div>
        <div style="width: 40%;display: flex;justify-content: flex-end;align-items: center">
          <span class="icon iconfont" @click="handleAddFriend"
                style="font-size: 20px;margin-right: 20px;cursor: pointer;">&#xe608;</span>
          <div @click.stop="handleCollect" style="margin-top: 5px;cursor: pointer;">
            <span class="icon iconfont" v-if="showCollect" style="font-size: 25px;">&#xe60c;</span>
            <span class="icon iconfont" v-if="!showCollect" style="font-size: 25px;color:#FF7A46;">&#xe60b;</span>
          </div>
          <span class="icon iconfont" style="margin-left: 20px;cursor: pointer "
                @click.stop="handleMore">&#xe62b;</span>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="聊天" name="0">
          <div class="gd-chart-center middle" ref="middle" id="middle">
            <p class="gd-chart-history" v-if="hasMore" @click="handleHistoryMore(chatUserSelected)">加载历史消息</p>
            <div v-else style="text-align: center; color: #aaaaaa">———— 无历史消息 ————</div>
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
                <p class="gd-chart-p gd-chart-pr" style="width: 240px" v-else-if="item.messageType=='RC:SightMsg'">
                  <video width="240" height="240" controls>
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
                <p class="gd-chart-p gd-chart-pr" v-else>{{ item.content.content}}</p>
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
                <p class="gd-chart-p gd-chart-pr" style="width: 240px" v-else-if="item.messageType=='RC:SightMsg'">
                  <video width="240" height="240" controls>
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
                <p id="hj" class="gd-chart-p gd-chart-pr" v-else>{{ item.content.content }}</p>
              </div>
            </div>
          </div>
          <el-dialog :visible.sync="dialogvaurl">
            <img width="100%" :src="dialogUrl" alt="">
          </el-dialog>
          <div class="gd-chart-bottom">
            <div class="gd-chart-icon">
              <img src="../../../assets/img/shop/icon-char-002.png" alt="" @click="showEmojiPanel">
              <!-- <img class="layui-upload-img" name="titleBase64Img" id="base64Img" :src="headImg" /> -->
              <div class="fileInput">
                <img src="../../../assets/img/shop/icon-char-003.png" alt="">
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
        </el-tab-pane>
        <el-tab-pane label="合同" name="1">合同</el-tab-pane>
        <el-tab-pane label="店铺" name="2">店铺</el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
  import im from '@/common/rongIm'
  import EmojiPanel from '@/components/emoji/EmojiPanel.vue'
  import $ from 'jquery'
  import {
    mapGetters,
    createNamespacedHelpers
  } from 'vuex'

  const {mapActions} = createNamespacedHelpers('rongIm/message')

  import {
    formatDate
  } from '@/utils/date.js'
  import Login from "../../user/Login";

  export default {
    name: "contentItem",
    props:{
      chatMsgShow:Boolean,
      chatUserSelected:String,
      chatUserTarget:Object
    },
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
    },
    components: {
      EmojiPanel,
    },
    filters: {
      formatDate(time) {
        var data = new Date(time)
        return formatDate(data, 'MM-dd hh:mm')
      }
    },
    data(){
      return{
        hasMore:false,
        msgType:0,
        groupInfo:[],
        infoShow: false,
        dialogGroup: false,
        modelDiog: false,
        loading: false,
        activeName: '0',
        dialogVisible: false,
        dialogInfoVisible: false,
        addUserInfo: {},
        isShowEmojiPanel: false,
        showCollect: true,//收藏
        historyMsg: '加载历史消息',
        dialogUrl: '',
        dialogvaurl: false,
        chatUserSelf: {
          'headAddr': 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3621869950,2480486393&fm=26&gp=0.jpg',
          'nickname': '',
          'username': this.$store.state.user.userInfo.rcId,
          'password': this.$store.state.user.userInfo.hxPassWord
        }, //	当前用户
        content: '',
        msgCount: 0, //未读消息
        newTrue: true,
        msgDisplay: false,
        form: {
          phone: '',
          verifyMsg: ''
        },
        listEmojin: [],
        headImg: "",
        imageUrl: "",
        type: '',
        file: [],
        sentTime: 0,
      }
    },
    update () {
      this.handleGobottom()
    },
    methods:{
      ...mapActions(['getMessage', 'getTotalSpecifiedCount', 'sendMessage']),
      handleMore(){
        this.infoShow=true
        console.log(this.infoShow)
        this.$emit('change', this.infoShow)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleAddFriend() {
        //根据手机号搜索发送消息
        this.dialogVisible = true
        this.modelDiog = false
      },
      handleCollect() {
        this.showCollect = !this.showCollect
      },
      //预览图片
      handlePreview(file) {
        this.dialogUrl = file;
        this.dialogvaurl = true;
      },
      //通过手机号搜索好友
      submitForm(formName) {
        var that = this
        searchPhone(this.form.phone).then(res => {
          that.$message(res.message);
          that.chatUserSelected = res.result.rcId
          console.log('好友id', res.result.rcId)
          rongCloud(res.result.rcId).then(res => {
            that.$message(res.message);
            that.chatUserList.push({
              targetId: that.chatUserSelected,
              latestMessage: {
                sentTime: new Date().getTime(),
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
                messageType: RongIMLib.MESSAGE_TYPE.IMAGE, // 'RC:TxtMsg'
                content: {
                  content: that.imageUrl, // 文本内容
                  imageUri: data.downloadUrl,
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
      handleGobottom() {
        var that = this
        that.$nextTick(() => {
          let middle = document.getElementById('middle');
          middle.scrollTop = middle.scrollHeight
        })
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
          var target={}
          console.log(this.chatUserTarget.type)
          if(this.chatUserTarget.type==1){
           target = {
             targetId: this.chatUserSelected,
             type: RongIMLib.CONVERSATION_TYPE.PRIVATE
           }
          }else if(this.chatUserTarget.type==3){
            target = {
              targetId: this.chatUserSelected,
              type: RongIMLib.CONVERSATION_TYPE.GROUP
            }
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
      handleHistoryMore(selectId){
        var that=this
        if(this.rongMessage.messageData[selectId].length>20){
         var sentTime=this.rongMessage.messageData[selectId].pop()
         var targetId = selectId
         const params = {
           timestrap:sentTime.sentTime,
           count: 20
         }

         if (that.chatUserTarget.type == 3) {
           this.$store.dispatch('rongIm/message/getGroupMessage', {targetId, params}).then(res => {
             var message = res.list; //历史消息列表
             this.hasMore = res.hasMore // 是否还有历史消息可以获取
           })
         } else {
           this.$store.dispatch('rongIm/message/getMessage', {targetId, params}).then(res => {
             var message = res.list; //历史消息列表
             this.hasMore = res.hasMore // 是否还有历史消息可以获取
           })
         }
        }
      },
      handleHistory() {
        var that = this
        var data = this.chatUserList

        data.map(item => {
          this.$store.dispatch('rongIm/message/getTotalSpecifiedCount', item.targetId)
          var targetId = item.targetId
          const params = {
            timestrap: this.rongMessage.messageData[item.targetId] ? this.rongMessage.messageData[item.targetId].sentTime + 1 : +new Date(),
            count: 20
          }
          if (item.type == 3) {
            this.$store.dispatch('rongIm/message/getGroupMessage', {targetId, params}).then(res => {
              var message = res.list; //历史消息列表
              this.hasMore = res.hasMore // 是否还有历史消息可以获取
            })
          } else {
            this.$store.dispatch('rongIm/message/getMessage', {targetId, params}).then(res => {
              var message = res.list; //历史消息列表
              this.hasMore = res.hasMore // 是否还有历史消息可以获取
            })
          }
        })
      },
    },
    created() {
      var that=this
      this.handleHistory()
      that.handleEmogi()
      if (this.conversationUser) {
        this.chatMsgShow = true
      }

      if (this.$route.query.idx) {
        that.chatUserSelected = this.$route.query.idx
      }
    }
  }
</script>

<style scoped>

</style>
