<template>
  <div class="gd-chatlist-main">
    <div class="gd-chatlist-w">
      <div class="gd-chatlist-left">
        <div class="gd-chatlist-height">
          <p>新的朋友</p>
          <p class="gd-chatlist-height-pl" :class="{'bgActive':bgcolor==0}"  @click="handleAdd">
            <span class="icon iconfont" style="font-size: 40px;color: #FA9D3B;">&#xe60d;</span>新的朋友
          </p>
        </div>
        <div class="gd-chatlist-height gd-chatlist-height-s">
          <p>群组</p>
          <p class="gd-chatList-list"   v-for="(item,index) in groupBookList" @click="handleGroupList(item)"
             :class="{'bgActiveG':item.rcGroupId==rcGroupSelected}">
            <img :src="item.headAddr?item.headAddr:'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491929439,4106440758&fm=26&gp=0.jpg'"  onerror="this.src='https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491929439,4106440758&fm=26&gp=0.jpg'" alt="">
            <span>{{item.name}}</span>
          </p>
        </div>
        <div class="gd-chatlist-height gd-chatlist-height-s">
          <p>好友</p>
          <p class="gd-chatList-list"   v-for="(item,index) in chatFriendList" @click="handleFriendList(item)"
             :class="{'bgActives':item.rcId==chatUserSelected}">
            <img :src="item.headAddr" onerror="this.src='https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3491929439,4106440758&fm=26&gp=0.jpg'" alt="">
            <span>{{item.nickname}}</span>
          </p>
        </div>
      </div>
      <div class="gd-chatlist-right">
        <div v-show="stateFriend" class="gd-chatlist-right-add">
          <p class="gd-chatlist-right-addfre">新的朋友</p>
          <div class="gd-chatlist-right-list" v-for="(item,index) in chatFriendStateList">
            <img :src="item.sendHeadAddr" alt="">
            <div class="gd-chatlist-right-name">
              <p>{{item.sendNickname}}</p>
              <p>{{item.greetSb}}</p>
            </div>
            <el-button v-if="item.state!=2&&item.state!=3" @click="handleConsent(item)">同意</el-button>
            <el-button v-if="item.state!=3&&item.state!=2" @click="handleRefuse(item)">拒绝</el-button>
            <p style="color:#666;font-size: 13px;" v-if="item.state==2">已同意</p>
            <p style="color:#666;font-size: 13px;" v-if="item.state==3">已拒绝</p>
          </div>
        </div>
        <!--朋友信息面板-->
        <div v-show="friendList" class="gd-chatlist-right-add gd-chatlist-right-ml">
          <p class="gd-chatlist-group-name">好友</p>
          <p class="gd-chatlist-right-username">
            <img :src="chatFriendUserInfo.headAddr" alt="">
            {{chatFriendUserInfo.nickname}}
          </p>
          <p style="color: #666;margin-top: 20px;">rcId:{{chatFriendUserInfo.rcId}}</p>
          <el-button @click="handleSendMsg">发消息</el-button>
        </div>
        <!--群组人员信息面板-->
        <div v-show="groupShow" class="gd-chatlist-right-add gd-chatlist-right-ml">
          <p class="gd-chatlist-group-name">{{groupInfo.name}}({{groupInfoList.length}})</p>
          <div class="gd-chatlist-right-group" style="margin-top: 100px">
            <p class="gd-chatlist-right-group-p" v-for="(item,index) in groupInfoList">
              <img :src="item.headAddr" alt="">
              <span>{{item.nickname}}</span>
            </p>
          </div>
          <el-button @click="handleGroupSendMsg">发消息</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getFriendrecord,
    getFriendState,
    getFriends
  } from '@/api/table.js'
  import {
    mapGetters
  } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
      ...mapGetters('rongIm', ['rongUser', 'rongMessage', 'rongConversation', 'conversationUser']),
      chatFriendList: function () {
        return this.rongUser.addressBook
      },
      chatUserList: function () {
        return this.rongConversation.conversationList
      },
      rongUserInfo: function () {
        return this.rongUser.rongUser
      },
      groupBookList:function(){
        return this.rongUser.groupBook
      },
    },
    data() {
      return {
        groupShow:false,
        bgcolor:0,
        stateFriend: true,
        friendList: false,
        chatFriendStateList: [], //好友请求列表
        chatFriendUserInfo: [],
        chatUserSelected:0,
        rcGroupSelected:0,
        consentState: 0,
        groupInfoList:[],
        groupInfo:0
      }
    },
    created() {
      this.handleFriend()
      this.handleStateFriend()
    },
    methods: {
      handleGroupSendMsg(){
      let that =this
        var data = this.groupInfo
        var friendInfo = {
          targetId: data.rcGroupId,
          senderUserId: data.rcGroupId,
          type:3,
          latestMessage: {
            sentTime: new Date().getTime(),
            content: {
              content:'',
              idx:data.id,
              state:data.state,
              user: {
                id: data.rcGroupId,
                name: data.name,
                portrait: data.headAddr
              }
            }
          }
        }
        var message=this.chatUserList
        message.unshift(friendInfo)
        this.$store.dispatch('rongIm/conversation/getSendConversationList', message)
        this.$router.push({
          name: 'Chats',
          query:{
            idx:data.rcId
          }
        })
      },
      //给好友发送消息
      handleSendMsg() {
        let that = this
        var data = this.chatFriendUserInfo
        var friendInfo = {
          targetId: data.rcId,
          senderUserId: this.userInfo.rcId,
          type:1,
          latestMessage: {
            sentTime: new Date().getTime(),
            content: {
              content: data.greetSb,
              user: {
                id: data.rcId,
                name: data.nickname,
                portrait: data.headAddr
              }
            }
          }
        }
        var message=this.chatUserList
        message.unshift(friendInfo)
        this.$store.dispatch('rongIm/conversation/getSendConversationList', message)
        this.$router.push({
          name: 'Chats',
          query:{
            idx:data.rcId
          }
        })
      },
      async handleGroupList(item){
        //群组点击
        console.log(item)
        this.stateFriend = false
        this.friendList = false
        this.bgcolor=1
        this.chatUserSelected=1
        this.rcGroupSelected=item.rcGroupId
        this.groupInfo=item
        this.groupShow=true
        try {
          var result=await this.$ajax.rongCloud.getGroupInfoList(item.rcGroupId)
          this.groupInfoList=result.result
        } catch (e) {
        }
      },
      //好友请求列表
      handleFriend() {
        var that = this
        getFriendrecord().then(res => {
          var items=[]
          res.result.map(item=>{
            if(item.sendNickname!==that.rongUserInfo.nickname){
              items.push(item)
            }
          })
          console.log(items)
          that.chatFriendStateList = items
        })
      },
      handleAdd() {
        this.stateFriend = true
        this.friendList = false
        this.bgcolor=0
        this.chatUserSelected=0
        this.rcGroupSelected=0
        this.groupShow=false
      },
      //单个好友信息
      handleFriendList(item) {
        this.stateFriend = false
        this.friendList = true
        this.bgcolor=1
        this.rcGroupSelected=0
        this.chatUserSelected=item.rcId
        this.chatFriendUserInfo = item
      },
      //好友列表
      handleStateFriend() {

      },
      //同意
      handleConsent(item) {
        var id = item.id
        var state = 2
        var that = this
        console.log(item)
        getFriendState({
          receiptId: item.receiptId,
          sendId: item.sendId,
          greetSb: item.greetSb,
          id: item.id,
          receiptHeadAddr: item.receiptHeadAddr,
          receiptNickname: item.receiptNickname,
          sendHeadAddr: item.sendHeadAddr,
          sendNickname: item.sendNickname,
          state: state,
        }).then(res => {
           this.$store.dispatch('rongIm/user/getFriendList')
          that.handleFriend()
        })
      },
      //拒绝
      handleRefuse(item) {
        var that = this
        var id = item.id
        var state = 3
        getFriendState({
          receiptId: item.receiptId,
          sendId: item.sendId,
          greetSb: item.greetSb,
          id: item.id,
          receiptHeadAddr: item.receiptHeadAddr,
          receiptNickname: item.receiptNickname,
          sendHeadAddr: item.sendHeadAddr,
          sendNickname: item.sendNickname,
          state: state,
        }).then(res => {
          that.handleFriend()
        })
      }
    }
  }
</script>

<style lang="less">
  .gd-chatlist-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    box-sizing: border-box;
    height: 81.6vh;
    padding: 0px;

    .gd-chatlist-w {
      width: 1024px;
      background-color: #fff;
      display: flex;
      height: 81.7vh;
      box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.2);
    }

    .gd-chatlist-left {
      width: 280px;
      border-right: 1px solid #eee;
      overflow-y: auto;

    }

    .gd-chatlist-right {
      width: 744px;
      position: relative;
    }

    .gd-chatlist-height {
      height: 100px;
      border-bottom: 1px solid #eee;
      margin-top: 10px;

      p:nth-of-type(1) {
        text-align: left;
        box-sizing: border-box;
        padding: 0px 10px;
        font-size: 14px;
        color: #666;
      }

      p:nth-of-type(2) {
        text-align: left;
        box-sizing: border-box;
        padding: 0px 10px;
        height: 67px;
        line-height: 67px;
      }

      .gd-chatlist-height-pl {
        display: flex;
        align-items: center;
        cursor: pointer;

        span {
          margin-right: 10px;
        }
      }
    }

    .gd-chatlist-right-add {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .gd-chatlist-right-addfre {
        width: 100%;
        border-bottom: 1px solid #eee;
        height: 50px;
        line-height: 50px;
        text-align: left;
        box-sizing: border-box;
        padding: 0px 20px;
      }

      .gd-chatlist-right-list {
        height: 80px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        width: 80%;
        box-sizing: border-box;
        padding: 20px 0px;

        img {
          display: block;
          flex: 1;
          height: 53px;
          width: 53px;
        }

        .el-button {
          padding: 0px;
          width: 50px !important;
          height: 30px;
          background-color: #E18055;
          color: #fff;
        }
        .el-button:nth-of-type(2){
          background-color: transparent;
          border: 1px solid #ccc;
          color: #666;
        }
      }

      .gd-chatlist-right-name {
        flex: 8;
        margin-left: 10px;

        p {
          text-align: left;
        }

        p:nth-of-type(2) {
          font-size: 13px;
          color: #666;
        }
      }

    }

    .gd-chatlist-height-s {
      height: auto;

      p:nth-of-type(1) {
        margin-bottom: 10px;
      }
    }

    .gd-chatList-list {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-sizing: border-box;
      padding: 10px 10px !important;
      font-size: 14px;
      height: auto !important;
      line-height: 0 !important;
      cursor: pointer;

      img {
        width: 53px;
        height: 53px;
        margin-right: 15px;
      }
      span{
        display: block;
        text-align: left;
      }
    }

    .gd-chatlist-right-username {
      display: flex;

      img {
        width: 53px;
        height: 53px;
        margin-right: 15px;
      }
    }

    .gd-chatlist-right-ml {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      height: 100%;

      .el-button {
        background-color: #E18055;
        color: #fff;
        width: 100px;
        margin-top: 30px;
      }

      .gd-chatlist-right-username {
        margin-top: 100px;
        line-height: 53px;
      }
    }
    .bgActive{
      background-color:#ccc;
    }
    .bgActives{
      background-color:#ccc;
    }
    .bgActiveG{
      background-color:#ccc;
    }
    .gd-chatlist-right-group{
      display: flex;
      width: 80%;
      flex-wrap: wrap;
      justify-content: center;
      .gd-chatlist-right-group-p{
        width: 17%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 53px;
          height: 53px;
          margin-right: 15px;
        }
        span{
          display: block;
        }
      }
    }
    .gd-chatlist-group-name{
      width: 100%;
      text-align: left;
      border-bottom: 1px solid #eee;
      color: #666;
      height: 32px;
      line-height: 32px;
      box-sizing: border-box;
      padding-left: 20px;
    }
  }
</style>
