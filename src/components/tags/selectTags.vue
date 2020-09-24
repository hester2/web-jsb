<template>
  <div class="select-tags">
    <div v-show="!select" class="select-tags-content" :style="{height:isShowMore && more ?'auto':'40px' }">

      <div
        v-for="(item,index) in localOptions"

        :key="index"
        class="select-tags-item gd-text"
        @click="localChange(item.value || item.id)"
      >
        <span
          :class="localValue.includes(item.value || item.id) ? 'select-tags-item-action':''"
        >
          {{ item.label || item.name }}
        </span>
      </div>

    </div>
    <el-checkbox-group v-show="select" v-model="localValue" class="select-tags-content" :style="{height:isShowMore && more ?'auto':'40px' }">
      <el-checkbox
        v-for="(item,index) in localOptions"
        :key="index"
        :style="{height: '40px',lineHeight: '40px'}"
        :label="item.value || item.id"
        text-color="#ED7B51"
      > {{ item.label || item.name }}</el-checkbox>
    </el-checkbox-group>
    <div class="gd-button-content">
      <div :style="{visibility: isShowMore?'visible':'hidden' }" class="gd-more-button" @click="()=>{ more = !more}">
        <i :class=" more ? 'el-icon-caret-top':'el-icon-caret-bottom'" />更多
      </div>
      <div
        :style="{visibility: isSelect?'visible':'hidden' }"
        class="gd-more-button"
        @click="()=>{
          select = !select
          more = !more
        }"
      >
        <i :class=" select ? 'el-icon-minus':'el-icon-plus'" />多选
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'SelectTags',

  components: {},

  mixins: [],

  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: [Array, Number, String],
    // eslint-disable-next-line vue/require-default-prop
    options: Array,
    isShowMore: {
      type: Boolean,
      default: false
    },
    isSelect: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      more: false,
      select: false,
      localValue: [],
      localOptions: []
    }
  },

  computed: {},

  watch: {
    value(val) {
      this.localValue = val || []
    },
    options(val) {
      this.localOptions = val || []
    },
    localValue(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },

  created() {
    this.localValue = this.value || []
    if (Array.isArray(this.options)) {
      this.localOptions = this.options
    }
  },

  mounted() {
  },

  destroyed() {
  },

  methods: {
    localChange(val) {
      console.log(val)
      if (this.localValue.includes(val)) {
        this.localValue = []
      } else {
        this.localValue = [val]
      }
    },
    computedClass() {

    }
  }
}
</script>

<style scoped lang="less">
  .select-tags {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .select-tags-content {
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;

      .select-tags-item {
        margin-right: 30px;
        box-sizing: border-box;
        width: 50px;
        height: 40px;
        line-height: 40px;
        font-size: 13px;
        cursor: pointer;

        &.gd-text {
          color: #666666;
        }

        .select-tags-item-action {
          color: #ED7B51 !important;
          font-weight: bold;
        }
      }
    }

    .gd-button-content {
      flex-shrink: 0;
      display: flex;
      width: 120px;

      .gd-more-button {
        cursor: pointer;
        font-size: 13px;
        color: #666;
        height: 40px;
        width: 60px;
        line-height: 40px;
      }
    }

  }
</style>
