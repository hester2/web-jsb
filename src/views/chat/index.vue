<template>
  <div class="gd-chatIm-main">
    <div class="gd-chatIm-w" @click.stop="infoShow = false">
      <div class="gd-chatIm-left">
        <div class="gd-chatIm-left-top">
          <p><img :src="rongUserInfo.portrait" onerror="this.src='https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491929439,4106440758&fm=26&gp=0.jpg'"
              alt="">{{rongUserInfo.nickname}}</p>
          <div class="gd-chatIm-pranf">
            <span class="icon iconfont" style="margin-right: 10px;cursor: pointer;" @click="handleAdd">&#xe608;</span>
            <span class="icon iconfont" style="cursor: pointer;">&#xe643;</span>
            <div class="gd-chatIm-fied" v-if="modelDiog">
              <p @click="handleAddFriend">添加好友</p>
              <p @click="handleAddGroup">添加群聊</p>
            </div>
          </div>
        </div>
        <div class="gd-chart-left gd-chatIm-left-list">
          <li v-for="(item, index) in chatUserList" :class="{'bgActive':item.targetId==chatUserSelected}" @click="handleSwitch(item, item.targetId,userData[item.targetId])"
            @mouseover="hoverIndex = index" @mouseout="hoverIndex = -1">
            <img class="gd-chatIm-left-avtar" :src="userData && userData[item.targetId] && userData[item.targetId].portrait?userData[item.targetId].portrait
                  :imgError"
              alt="">
            <div class="gd-chatIm-left-text">
          <li class="gd-chatIm-left-name">
            <p v-if="item.type==3">{{item.latestMessage.content.user.name}}</p>
            <p>{{ userData && userData[item.targetId] && userData[item.targetId].name}}</p>
            <p>{{ item.latestMessage.sentTime | formatDate }}</p>
          </li>
          <span v-if="targetCount!=0&&newMsg==item.targetId" class="gd-chart-newmsg">{{targetCount}}</span>
          <p class="gd-chart-empty" @click.stop="handleEmpty(item.targetId,item.type)">
            <img src="../../assets/img/shop/icon-chat-delete.png" alt=""></p>
          <p class="gd-chatIm-left-title">
            <span v-if="msgCount==0"></span>
            <span>{{ item.latestMessage.content.content}}</span>
          </p>
        </div>
        </li>
      </div>
    </div>
    <!--消息面板-->
    <content-item :chatMsgShow="chatMsgShow" :chatUserTarget="chatUserTarget" :chatUserSelected="chatUserSelected"
      @change="handleInfoShow"></content-item>
    <audio controls="controls" hidden src="../../assets/img/test.mp3" ref="audio"></audio>
  </div>
  <div class="gd-chatIm-right-b" v-show="infoShow">
    <p style="display: flex;justify-content: flex-end;margin: 10px 10px">
      <i class="el-icon-close" @click.stop="infoShow = false "></i></p>
    <group-info :msgGroupInfo="msgGroupInfo" :groupInfo="groupInfo"></group-info>
  </div>
  <div class="gd-dislog-main" v-if="dialogVisible">
    <p style="font-size: 13px;color: #666;">搜索好友 <i class="el-icon-close" @click="dialogVisible = false"></i></p>
    <el-form :model="form" ref="form">
      <el-form-item>
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitSearch('form')">搜索</el-button>
    </el-form>
    <div style="width: 100%;" v-show="dialogInfoVisible">
      <p style="width: 100%;text-align: left; margin: 0px;font-size: 13px; color: #666;">好友信息</p>
      <div class="gd-dislog-main-info">
        <p style="width: auto;line-height: 53px;"><img :src="addUserInfo.headAddr" onerror="this.src='https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491929439,4106440758&fm=26&gp=0.jpg'" alt="">{{addUserInfo.nickname}}
        </p>

      </div>
      <el-form :model="form" ref="form" style="width: 100%;display: flex;flex-direction: column;">
        <p style="width: 100%;text-align: left; margin: 0px;font-size: 13px; color: #666;">验证信息</p>
        <el-form-item class="gd-el-form-item">
          <el-input v-model="form.verifyMsg" autocomplete="off" placeholder="请输入验证消息"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="padding: 3px; 10px;width: 80px;" @click="submitFriendForm()">添加好友
      </el-button>
    </div>
  </div>

  <add-groups :dialogGroup="dialogGroup"></add-groups>

  </div>
</template>

<script>
  import im from '@/common/rongIm'
  import $ from 'jquery'
  import addGroups from '../chat/components/addGroups'
  import groupInfo from '../chat/components/groupInfo'
  import contentItem from '../chat/components/contentItem'

  import {
    mapGetters,
    createNamespacedHelpers
  } from 'vuex'

  const {
    mapActions
  } = createNamespacedHelpers('rongIm/message')


  import {
    formatDate
  } from '@/utils/date.js'

  import {
    searchPhone,
    getAddFriends,
    getGroupInfoList
  } from '@/api/table.js'

  import {
    rongCloud
  } from '@/api/user.js'

  export default {
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
      ...mapGetters('rongIm', ['rongUser', 'rongMessage', 'rongConversation', 'conversationUser']),
      chatUserList: function() {
        return this.rongConversation.conversationList
      },
      messageList: function() {
        return this.rongMessage.messageData[`${this.conversationUser}`]
      },
      userData: function() {
        return this.rongUser.vuexUserData
      },
      rongUserInfo: function() {
        return this.rongUser.rongUser
      },
      targetCount: function() {
        return this.rongMessage.targetCount
      },
      newMsg: function() {
        return this.rongMessage.newMsg
      },
      unreadMessageCount: function() {
        return this.rongMessage.unreadMessageCount
      },
    },
    components: {
      addGroups,
      groupInfo,
      contentItem
    },
    filters: {
      formatDate(time) {
        var data = new Date(time)
        return formatDate(data, 'MM-dd hh:mm')
      }
    },

    watch: {},
    data() {
      //TODO 第二次改过后 有些没用的参数没删掉
      return {
        imgError:'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491929439,4106440758&fm=26&gp=0.jpg',
        msgGroupInfo: {},
        groupInfo: [],
        infoShow: false,
        dialogGroup: false,
        chatMsgShow: false,
        modelDiog: false,
        loading: false,
        activeName: '0',
        dialogVisible: false,
        dialogInfoVisible: false,
        addUserInfo: {},
        isShowEmojiPanel: false,
        dialogUrl: '',
        dialogvaurl: false,
        chatUserSelected: '', //	选中的对象username
        chatUserTarget: {},
        content: '',
        msgCount: 0, //未读消息
        newTrue: true,
        msgDisplay: false,
        form: {
          phone: '',
          verifyMsg: ''
        },
        sentTime: 0,
      }
    },
    methods: {
      ...mapActions(['getMessage', 'getTotalSpecifiedCount', 'sendMessage']),
      handleInfoShow() {
        this.infoShow = true
      },
      handleAdd() {
        this.modelDiog = !this.modelDiog
      },
      handleAddGroup() {
        this.dialogGroup = true
        this.modelDiog = false
      },
      handleAddFriend() {
        //根据手机号搜索发送消息
        this.dialogVisible = true
        this.modelDiog = false
      },
      submitFriendForm(formName) {
        var that = this
        try {
          getAddFriends({
            receiptId: this.addUserInfo.rcId,
            sendId: this.userInfo.rcId,
            receiptHeadAddr: this.addUserInfo.headAddr,
            receiptNickname: this.addUserInfo.nickname,
            sendHeadAddr: this.rongUserInfo.portrait,
            sendNickname: this.rongUserInfo.nickname,
            greetSb: this.form.verifyMsg
          }).then(res => {
            that.$message(res.message);
            that.dialogVisible = false
          })
        } catch (e) {
          that.$message(res.message);
        }
      },
      submitSearch() {
        var that = this
        searchPhone(this.form.phone).then(res => {
          that.$message(res.message);
          that.addUserInfo = res.result
          console.log('好友id', res.result.rcId)
          this.dialogInfoVisible = true

        })
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

      handleHide() {
        this.chartShow = false
      },

      // 删除指定会话
      handleEmpty(oid, type) {
        var that = this
        console.log(type)
        if (type == 1) {
          this.$store.dispatch('rongIm/conversation/getRemoveConversationList', oid)
        } else if (type == 3) {
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
      //选中
      handleSwitch(o, uname, user) {
        this.$store.dispatch('rongIm/conversation/switchConversation', uname)
        this.msgDisplay = true
        var that = this
        that.chatMsgShow = true
        that.chatUserSelected = uname
        that.chatUserTarget = user
        getGroupInfoList(o.targetId).then(res => {
          that.groupInfo = res.result
        })
        that.msgGroupInfo = o
        if (user == undefined) {
          that.chatUserTarget = o
        }
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
          this.sendMessage({
            target,
            message
          }).then(res => {
            if (res) {
              this.content = ''
            }
          })
        } else {
          this.$message.error('请输入内容')
        }
      },
      /**
       * 动态追加消息
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

    },
    created() {
      var that = this
      console.log('跳转列表', this.chatUserList)
      if (this.conversationUser) {
        this.chatMsgShow = true
      }

      if (this.$route.query.idx) {
        that.chatUserSelected = this.$route.query.idx
      }
      // that.chatUserList.push(info)
    },
    mounted() {
      //设置背景单一样式
      document.querySelector("body").setAttribute("style",
        "background: #eee; overflow-x: hidden;");
    },
    beforeDestroy() {
      document.querySelector("body").removeAttribute("style");
    }
  }
</script>

<style lang="less">
  .gd-chatIm-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    box-sizing: border-box;
    height: 81.2vh;
    padding: 0px;
    position: relative;

    .gd-chatIm-w {
      width: auto;
      background-color: #fff;
      display: flex;
      height: 81.2vh;
      box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.2);
    }

    .gd-chatIm-left {
      width: 280px;
      border-right: 1px solid #eee;

      .gd-chart-empty {
        font-size: 12px;
        position: absolute;
        right: 3px;
        top: -3px;

        img {
          width: 14px;
          height: 14px;
          margin-top: 6px;
        }
      }

      .gd-chatIm-left-top {
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 10px 10px;

        p {
          display: flex;
          align-items: center;

          img {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }

        .gd-chatIm-pranf {
          position: relative;

        }

        .gd-chatIm-fied {
          position: absolute;
          top: 30px;
          height: 0px;
          width: 100px;
          height: 100px;
          z-index: 999;
          font-size: 13px;
          background-color: #fff;
          box-sizing: border-box;
          padding: 10px 15px;
          box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.2);

          p {
            cursor: pointer;
          }
        }
      }

      .gd-chatIm-left-list {
        border-top: 1px solid #ccc;
        position: relative;
        z-index: 50;

        li {
          height: 74px;
          background-color: #eee;
          display: flex;
          box-sizing: border-box;
          padding: 10px 10px;
          border-bottom: 1px solid #fff;
          position: relative;

          .gd-chatIm-left-avtar {
            width: 55px;
            height: 55px;
            border-radius: 50%;
          }

          .gd-chart-newmsg {
            position: absolute;
            background-color: red;
            display: block;
            width: 15px;
            height: 15px;
            font-size: 10px;
            color: #fff;
            line-height: 15px;
            border-radius: 50%;
            right: 5px;
            bottom: 5px;
          }

          .gd-chatIm-left-text {
            width: 215px;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            padding: 0px 10px;

            .gd-chatIm-left-name {
              display: flex;
              justify-content: space-between;
              font-size: 13px;
              padding: 0px;
              height: auto;
              margin-bottom: 10px;
              background-color: transparent;
              color: #333 !important;
              border: none !important;

              p:nth-of-type(1) {
                color: #333;
              }

              p:nth-of-type(2) {
                font-size: 12px;
                color: #333;
              }
            }

            .gd-chatIm-left-title {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
              font-size: 11px;
              color: #666;
              text-align: left;

              span:nth-of-type(1) {
                color: #13CE66;
              }
            }
          }
        }

        .el-page-header {
          margin-top: 10px;
        }
      }
    }

    .gd-chatIm-right {
      width: 744px;
      position: relative;
      border-right: 1px solid #eee;

      .gd-chatIm-right-top {
        height: 33px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 10px;

        img {
          width: 20px;
          height: 20px;
        }
      }

      .el-tabs__header {
        margin: 0px;
        box-sizing: border-box;
        padding: 0px 20px;
        width: 100%;
        border-bottom: 1px solid #eee;

      }

      .el-tabs__content {
        height: 73.3vh;

        .el-tab-pane {
          height: 100%;
        }
      }

      .el-tabs__nav-wrap::after {
        background-color: transparent;
      }

      .el-tabs__active-bar {
        background-color: transparent;
      }

      .gd-chatIm-right-title {
        display: flex;
        justify-content: flex-start;
        font-size: 12px;
        color: #666;

        p:nth-of-type(1) {
          font-size: 15px;
          color: #333;
          border-right: 1px solid #ccc;
          padding: 0px 10px;
          margin-right: 10px;
        }
      }

      .gd-chart-center {
        width: 100%;
        height: 50.3vh !important;
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
        height: 205px !important;
        background-color: #EFEFEF;
        box-shadow: border-box;
        padding: 0.625rem 0.9375rem;
        position: absolute;
        bottom: 0px;
        width: 96%;

        form {
          background-color: #fff;
          border-radius: 5px;
          height: 153px !important;
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
        max-width: 240px;
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
        height: 128px !important;
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

    }

    .gd-dislog-main {
      position: absolute;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 17px 0px rgba(229, 229, 229, 0.92);
      border-radius: 11px;
      z-index: 99999;
      left: 321px;
      top: 20%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 20px 20px;

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

      .el-form-item__label {
        width: 72px;
      }

      .gd-el-form-item {
        width: 100%;
        margin-top: 20px;

        .el-input {
          width: 60%;
        }
      }

    }

    .el-dialog__wrapper {
      z-index: 9999999 !important;
    }

    .gd-chatIm-right-b {
      width: 252px;
      height: 100%;
      background-color: #fff;
      position: absolute;
      right: 0px;
      box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.2);
    }

    .gd-dislog-main-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        text-align: left;
        display: flex;
        justify-content: flex-start;
        color: #666;

        img {
          width: 53px;
          height: 53px;
          margin-right: 10px;
          border-radius: 50%;
        }
      }
    }

    .bgActive {
      background-color: #ccc !important;
      z-index: 999999;
      box-sizing: border-box;
      padding: 6px 0px;

    }

  }
</style>
