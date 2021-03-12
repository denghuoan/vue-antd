<template>
  <div>
    <ul class="color-list">
      <li :style="{ 'background-color': item.color }" v-for="item in colorList" v-dragging="{ item: item, list: colorList, group: 'colorInfo' }" :key="item.color">
        {{item.color}}
      </li>
    </ul>
    <button @click="onReset">重置</button>
  </div>

</template>

<script>
export default {
  data () {
    return {
      colorList: [
        { color: "#2ec7c9" },
        { color: "#b6a2de" },
        { color: "#5ab1ef" },
        { color: "#ffb980" },
        { color: "#d87a80" },
        { color: "#8d98b3" }
      ],
      originData: [
        { color: "#2ec7c9" },
        { color: "#b6a2de" },
        { color: "#5ab1ef" },
        { color: "#ffb980" },
        { color: "#d87a80" },
        { color: "#8d98b3" }
      ],
      result: []
    }
  },
  methods: {
    onReset () {
      this.$set(this, 'colorList', [...this.originData])
    }
  },
  mounted () {
    this.$dragging.$on('dragged', (res) => { // 拖拽时触发，回调里面有一个参数
      this.result = res.value.list
    })
    this.$dragging.$on('dragend', () => { // 停止拖拽后触发，回调无参数
      console.log(this.result, 41)
    })
  }
}
</script>
<style scoped lang="less">
.color-list {
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  // border: 1px solid #ccc;
  li {
    width: 50%;
    list-style: none;
    height: 52px;
    line-height: 52px;
    padding: 0 10px;
    border: 1px solid #ccc;
    margin-top: 10px;
    color: #fff;
  }
}
</style>