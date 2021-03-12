<template>
  <div>
    <a-button type="primary" @click="onShow">选择</a-button>
    <ul>
      <li v-for="item in sortDict" :key="item.value">{{ item.value }}-{{ item.label }}</li>
    </ul>
    <Select :sortData="sortDict" :visible="visible" @close="onClose" @ok="onOk" />
  </div>
</template>

<script>
import Select from './Select'
export default {
  components: { Select },
  data () {
    return {
      visible: false,
      sortDict: []
    }
  },
  methods: {
    onShow () {
      this.visible = true
      this.sortDict = [...this.sortDict]
    },
    onClose () {
      this.visible = false
    },
    onOk (sortDict) {
      this.sortDict = sortDict
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>