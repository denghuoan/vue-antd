<template>
  <div>
    <ul id="uls" @drop="onDrop" @dragover="onDragOver">
      <li draggable="true" v-for="item in dataList" :id="'li' + item.id" :key="item.id" @dragstart="onDragStart">{{ item.name }}</li>
    </ul>
    <div @click="onSubmit">测试</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        { id: 1, name: 'aa' },
        { id: 2, name: 'bb' },
        { id: 3, name: 'cc' }
      ],
      offsetTop: 0,
      clientX: 0,
      clientY: 0,
      num: 0
    }
  },
  mounted () {
    const uls = document.getElementById('uls')
    this.offsetTop = uls.offsetTop;
  },
  methods: {
    onSubmit () {
      const uls = document.getElementById('uls')
      const arr = this.children(uls)
      console.log(arr)
    },
    onDrop (ev) {
      ev.preventDefault();
      const uls = document.getElementById('uls')
      var data = ev.dataTransfer.getData("text/plain");
      var nodes = document.getElementById(data);
      console.log(this.children(uls));
      console.log(this.num);
      uls.insertBefore(nodes, this.children(uls)[this.num]);
      ev.dataTransfer.clearData();
    },
    onDragStart (e) {
      e.dataTransfer.setData('text/plain', e.target.id)
    },
    children (node) {
      var tmp = node.childNodes;
      var arr = [];
      tmp.forEach(function (item) {
        if (item.nodeType == 1) {
          arr.push(item);
        }
      });
      return arr;
    },
    onDragOver (e) {
      e.preventDefault()
      this.clientX = e.clientX;
      this.clientY = e.clientY;
      this.num = Math.abs(Math.round((this.clientY - this.offsetTop) / 52))
      console.log(this.num, 58);
    }
  },
}
</script>

<style lang="less" scoped>
li {
  box-sizing: border-box;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  // margin-top: 20px;
  padding: 10px;
  height: 52px;
}
</style>