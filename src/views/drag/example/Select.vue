<template>
  <div class="select_page">
    <a-drawer title="选择数据字段" placement="right" width="900" :closable="false" :bodyStyle="bodyStyle" :visible="visible" :after-visible-change="afterVisibleChange" @close="onClose">
      <div class="select_drag">
        <div class="select_box">
          <div v-for="(item, idx) in dataDict" :key="item.value" class="group_item">
            <a-checkbox class="check_all" :indeterminate="item.indeterminate" v-model="item.checkAll" @change="e => {onCheckAll(e, item)}">{{ item.label }}：</a-checkbox>
            <a-checkbox-group class="check_group" v-model="item.checkList" @change="e => {onCheckGroup(e, idx)}">
              <a-checkbox class="checkbox_item" v-for="check in item.children" :key="check.value" :value="check.value" @click="e => {onCheckItem(e, check)}">{{ check.label }}</a-checkbox>
            </a-checkbox-group>
          </div>
        </div>
        <div class="drag_box">
          <div class="drag_title"> 自定义字段 <span>可拖动排序</span> </div>
          <div class="drag_btn">
            <div>
              <span @click="onReset">恢复默认</span>
            </div>
            <div>
              <span @click="onClean">清空</span>
            </div>
          </div>
          <div class="draggable_box">
            <draggable v-model="sortDict" chosenClass="chosen" forceFallback="true" group="letter" animation="1000">
              <transition-group>
                <div class="draggable_item" v-for="item in sortDict" :key="item.value">{{ item.label }}</div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </div>
      <div class="footer">
        <a-button :style="{ marginRight: '8px' }" @click="onClose"> 取 消 </a-button>
        <a-button type="primary" @click="onOk"> 确 定 </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    sortData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      bodyStyle: {
        padding: 0
      },
      dataDict: [
        {
          value: '100',
          label: '基础指标',
          children: [
            { label: '观看次数', value: '101' },
            { label: '观看成本', value: '102' },
            { label: '花费', value: '103' },
          ]
        },
        {
          value: '200',
          label: '互动表现',
          children: [
            { label: '互动量', value: '201' },
            { label: '互动率', value: '202' },
            { label: '平均观看时长', value: '203' },
            { label: '直播点赞量', value: '204' },
            { label: '直播分享量', value: '205' },
            { label: '直播评论量', value: '206' },
          ]
        },
        {
          value: '300',
          label: '引导访问',
          children: [
            { label: '引导进店量', value: '301' },
            { label: '引导进店率', value: '302' }
          ]
        },
        {
          value: '400',
          label: '粉丝获取',
          children: [
            { label: '粉丝关注量', value: '401' }
          ]
        },
        {
          value: '500',
          label: '成交转化',
          children: [
            { label: '成交订单量', value: '501' },
            { label: '成交金额', value: '502' },
            { label: '收藏宝贝量', value: '503' },
            { label: '商品加购数', value: '504' },
            { label: '投资回报率', value: '505' },
            { label: '预售订单量', value: '506' },
            { label: '预售成交金额', value: '507' },
            { label: '购物金充值笔数', value: '508' },
            { label: '购物金充值金额', value: '509' }
          ]
        }
      ],
      sortDict: []
    }
  },
  methods: {
    onOk () {
      this.$emit('ok', this.sortDict)
    },
    handleCheckBySort (sortData) {
      this.dataDict.forEach(item => {
        item.checkList = []
        sortData.forEach(sort => {
          const idx = item.children.findIndex(child => child.value === sort.value)
          if ((idx !== -1) && !item.checkList.includes(sort.value)) item.checkList.push(sort.value)
        })
        if (item.checkList.length === 0) {
          this.$set(item, 'checkAll', false)
          this.$set(item, 'indeterminate', false)
        } else if (item.checkList.length === item.children.length) {
          this.$set(item, 'checkAll', true)
          this.$set(item, 'indeterminate', false)
        } else {
          this.$set(item, 'checkAll', false)
          this.$set(item, 'indeterminate', true)
        }
      })
    },
    onReset () {
      const originData = [
        { label: '观看次数', value: '101' },
        { label: '互动量', value: '201' },
        { label: '引导进店量', value: '301' },
        { label: '粉丝关注量', value: '401' },
        { label: '成交订单量', value: '501' },
        { label: '成交金额', value: '502' }
      ]
      this.sortDict = originData
      this.handleCheckBySort(originData)
    },
    onClean () {
      this.sortDict = []
      this.dataDict.map(item => {
        item.checkList = []
        item.checkAll = false
        item.indeterminate = false
      })
    },
    afterVisibleChange (val) {
      console.log('visible', val)
      if (!val) {
        this.sortDict = []
        this.handleCheckBySort([])
      }
    },
    onClose () {
      this.$emit('close')
    },
    onCheckAll (e, item) {
      const checked = e.target.checked
      if (checked) item.checkList = item.children.map(item => item.value)
      else item.checkList = []
      this.$set(item, 'indeterminate', false)
      if (checked) this.handleCheckAll(item)
      else this.handleDelAll(item)
    },
    handleCheckAll (data) {
      const arr = this.sortDict.concat(...data.children)
      this.sortDict = this.handleUniqueArr(arr)
    },
    handleDelAll (data) {
      data.children.forEach(item => {
        const idx = this.sortDict.findIndex(sort => sort.value === item.value)
        if (idx !== -1) this.sortDict.splice(idx, 1)
      })
    },
    onCheckGroup (checkedList, idx) {
      const item = this.dataDict[idx]
      item.indeterminate = !!checkedList.length && checkedList.length < item.children.length;
      item.checkAll = checkedList.length === item.children.length;
      this.dataDict.splice(idx, 1, item)
    },
    onCheckItem (e, item) {
      const checked = e.target.checked
      if (checked) this.handleAddSort(item)
      else this.handleDelSort(item)
    },
    handleAddSort (data) {
      this.sortDict.push(data)
    },
    handleDelSort (data) {
      const idx = this.sortDict.findIndex(item => item.value === data.value)
      this.sortDict.splice(idx, 1)
    },
    handleUniqueArr (arr) {
      const res = new Map();
      return arr.filter((a) => !res.has(a.value) && res.set(a.value, 1))
    }
  },
  beforeMount () {
    var h = document.documentElement.clientHeight || document.body.clientHeight
    this.bodyStyle = { padding: 0, height: h - 55 + 'px' }
  },
  watch: {
    sortData: {
      handler (newValue) {
        if (newValue) this.sortDict = [...newValue]
        this.handleCheckBySort(newValue)
      },
      immediate: true,
    }
  },
}
</script>
<style scoped lang="less">
.select_drag {
  display: flex;
  width: 100%;
  height: 100%;
}
.select_box {
  width: 100%;
  padding: 25px;
  .group_item {
    margin-bottom: 50px;
    display: flex;
    .check_all {
      width: 140px;
    }
    .check_group {
      width: 100%;
    }
    .checkbox_item {
      width: 150px;
      margin-left: 0;
      margin-bottom: 20px;
    }
  }
}
.drag_box {
  width: 224px;
  min-width: 224px;
  background-color: #f3f5f7;
  height: 100%;
  .drag_title {
    border-left: 1px solid #f0f0f0;
    height: 40px;
    line-height: 40px;
    padding-left: 16px;
    background-color: #fff;
    span {
      color: #909090;
      font-size: 12px;
      margin-left: 10px;
    }
  }
  .drag_btn {
    display: flex;
    justify-content: space-between;
    color: #1890ff;
    margin: 15px 0;
    padding: 0 15px;
    div {
      width: 50%;
      text-align: center;
      span {
        cursor: pointer;
      }
    }
  }
  .draggable_box {
    padding: 0 15px;
    .draggable_item {
      background-color: #fff;
      border: 1px solid #e4e8ee;
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      margin-bottom: 6px;
      border-radius: 2px;
      cursor: move;
    }
  }
}
.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: #fff;
  text-align: right;
  z-index: 1;
}
// .goup_list {
//   display: flex;
//   .group_item
// }
</style>
