<template>
  <div>
    <el-row class="demo-autocomplete">
      <el-col :span="12">
        <div class="sub-title"></div>
        <el-autocomplete class="inline-input" v-model="searchAll" :fetch-suggestions="querySearch" placeholder="请输入内容"
          @select="handleSelect"></el-autocomplete>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'chatSearch',
    data() {
      restaurants: [],
      searchAll: '',
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      loadAll(){
        return []
      }
    },
    created() {
      this.restaurants = this.loadAll();
    }
  }
</script>

<style>
</style>
