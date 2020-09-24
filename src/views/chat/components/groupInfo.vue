<template>
  <div>
    <div class="gd-group-info-main" v-if="groupInfo.length!==0">
      <div class="gd-group-info-flex">
        <p class="gd-group-info-p gd-group-info-ps">
          <span class="icon iconfont gd-group-info-icon">&#xe81a;</span>
          <span>添加</span>
        </p>
        <p class="gd-group-info-p" v-for="item in groupInfo">
          <img :src="item.headAddr" alt="">
          <span>{{item.nickname}}</span>
        </p>
      </div>
      <p class="gd-group-info-name"><span>群名</span><span></span></p>
      <p class="gd-group-info-name"><span>群公告</span><span></span></p>
      <p class="gd-group-info-remove">删除并退出</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "groupInfo",
    props: {
      groupInfo: Array,
      msgGroupInfo: Object
    },
    data() {
      return {
        groupInfoList: []
      }
    },
    methods: {
      async handleGroupInfo() {
        try {

          var result = await this.$ajax.rongCloud.getGroupInfoList(this.groupInfo.targetId)
          this.groupInfoList = result.result
          console.log('oc', this.groupInfoList)
        } catch (e) {

        }
      }
    },
    created() {
      console.log('群组信息', this.groupInfo)
      this.handleGroupInfo()
    }
  }
</script>

<style lang="less">
  .gd-group-info-main {
    box-sizing: border-box;
    padding: 0px 20px;

    .gd-group-info-flex {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    .gd-group-info-p {
      width: 50px;
      height: 70px;
      display: flex;
      align-items: center;
      margin: 10px 10px;
      flex-direction: column;

      img {
        width: 50px;
        height: 50px;
      }

      span {
        display: block;
        width: 50px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .gd-group-info-ps {
      .gd-group-info-icon {
        width: 50px;
        line-height: 53px;
        font-size: 25px;
        color: #666;
        height: 57px;
        border: 1px solid #eee;
      }
    }

    .gd-group-info-remove {
      color: red;
      font-size: 13px;
      text-align: center;
      width: 100%;
      border-top: 1px solid #eee;
      margin-top: 15px;
      line-height: 40px;
    }

    .gd-group-info-name {
      text-align: left;

      span {
        text-align: left;
        display: block;
        font-size: 14px;
        color: #666;
      }
    }
  }
</style>
