<template>
  <div class="gd-el-dialog-main">
    <el-dialog
      title="请勾选需要添加的联系人"
      :visible.sync="dialogGroup"
      width="60%"
      :before-close="handleClose">
      <div style="text-align: center">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="options"
          filterable
          :render-content="renderFunc"
          :titles="['Source', 'Target']"
          :button-texts="['删除', '添加']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          @change="handleChange"
          :data="generateData">
        </el-transfer>
      </div>
        <div slot="footer" class="dialog-footer">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="群组名称">
              <el-input v-model="form.groupName"></el-input>
            </el-form-item>
          </el-form>
          <div>
                <el-button @click="dialogGroup = false">取 消</el-button>
                <el-button type="primary" @click="handleSendGroup">确 定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "addGroups",
    props: {
      dialogGroup: Boolean
    },

    computed: {
      ...mapGetters([
        'userInfo'
      ]),
      ...mapGetters('rongIm', ['rongUser', 'rongMessage', 'rongConversation', 'conversationUser']),
      chatFriendList: function () {
        return this.rongUser.addressBook
      },
      generateData: function () {
        var data = []
        this.chatFriendList.map(item => {
          data.push({
            key: item.rcId,
            label: item.nickname,
            disabled: item.disabled
          });
        })
        return data
      }
    },
    data() {
      return {
        form:{
          groupName:'',
        },
        options: [],
        renderFunc(h, option) {
          return <span > {option.label} < /span>;
        },
      };
    },

    methods: {
      handleChange(value, direction, movedKeys) {
        console.log(value);

      },
      handleSendGroup() {
        var data = {
          name: '花开了',
          rcIdList: this.options
        }
        if(this.form.groupName==''){
          this.$message.error('请输入群组名称')
          return;
        }else if(this.options.length<3){
          this.$message.error('请选择3个以上联系人')
          return;
        }else {
          this.$ajax.rongCloud.createGroup(data)
        }
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
    },
    created() {

    }
  }
</script>

<style lang="less">
  .gd-el-dialog-main {
    .el-transfer-panel__header {
      padding-top: 10px;
    }

    .el-transfer-panel__item {
      display: flex !important;
    }

    .el-checkbox__label {
      text-align: left;
    }

    .el-transfer-panel .el-transfer-panel__header .el-checkbox {
      display: flex !important;
    }

    .el-button {
      padding: 0px 10px;
      height: 35px;
    }

    .el-button:hover {
      background-color: #EE7C51 !important;
      border: 1px solid #EE7C51 !important;
    }
    .dialog-footer{
      display: flex;
      justify-content: space-between;
    }
  }

</style>
