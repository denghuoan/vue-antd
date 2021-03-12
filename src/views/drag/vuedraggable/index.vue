<template>
  <div>
    <div>{{drag?'拖拽中':'拖拽停止'}}</div>
    <div class="container">
      <div class="show_box">
        <div v-for="item in letterList" :key="item.letter">{{ item.index }} --> {{item.letter}}</div>
      </div>
      <!--使用draggable组件-->
      <draggable v-model="letterList" chosenClass="chosen" forceFallback="true" group="letter" animation="1000" @start="onStart" @end="onEnd">
        <transition-group class="draggable_box">
          <div class="item" v-for="item in letterList" :key="item.letter">{{ item.index }} --> {{item.letter}}</div>
        </transition-group>
      </draggable>
    </div>

    <a-button @click="onReset">重置</a-button>

  </div>
</template>
<script>
//导入draggable组件
import draggable from 'vuedraggable'
export default {
  //注册draggable组件
  components: {
    draggable,
  },
  data () {
    return {
      drag: false,
      //定义要被拖拽对象的数组
      letterList: [
        { letter: "A", index: 1 },
        { letter: "B", index: 2 },
        { letter: "C", index: 3 },
        { letter: "D", index: 4 },
        { letter: "E", index: 5 },
        { letter: "F", index: 6 }
      ],
      originList: [
        { letter: "A", index: 1 },
        { letter: "B", index: 2 },
        { letter: "C", index: 3 },
        { letter: "D", index: 4 },
        { letter: "E", index: 5 },
        { letter: "F", index: 6 }
      ]
    };
  },
  methods: {
    //开始拖拽事件
    onStart () {
      this.drag = true;
    },
    //拖拽结束事件
    onEnd (e) {
      console.log(e);
      this.drag = false;
    },
    onReset () {
      this.letterList = [...this.originList]
    }
  },
};
</script>
<style scoped lang="less">
.container {
  display: flex;
  .show_box {
    margin-right: 30px;
    cursor: default;
  }
}
/*被拖拽对象的样式*/
.item {
  width: 300px;
  padding: 6px;
  background-color: #fdfdfd;
  border: solid 1px #eee;
  margin-bottom: 10px;
  cursor: move;
}
/*选中样式*/
.chosen {
  border: solid 2px #3089dc !important;
}
</style>