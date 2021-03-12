<template>
  <div>
    <div class="menu_btn">
      <!-- <div class="btn_item" @click="onAddText">添加文字</div> -->
    </div>
    <div class="canvas_box">
      <div class="tools">
        <input type="color" v-model="textColor" @change="onColorChange">
        <select class="font_size" @change="onSizeChange" v-model="textSize">
          <option :value="20">20</option>
          <option :value="30">30</option>
          <option :value="40">40</option>
        </select>
        <!-- <div class="tool">上移</div> -->
        <!-- <div class="tool">下移</div> -->
      </div>
      <canvas id="canvas" width="600" height="600"></canvas>
    </div>
  </div>
</template>

<script>
import { fabric } from 'fabric'
var canvasId = null
export default {
  data () {
    return {
      count: 0,
      activeIndex: null,
      textColor: '#0000ff',
      textSize: 40
    }
  },
  mounted () {
    canvasId = new fabric.Canvas('canvas')
    this.onMouseDown()
  },
  methods: {
    /**
     * 点击事件：
     * 1.画布上无选中元素，点击空白处添加文字
     * 2.画布上有选中元素，点击空白处，选中元素失去焦点
     * 3.画布上有选中元素，点击选中元素，进行文字编辑
     */
    onMouseDown () {
      canvasId.on('mouse:down', opt => {
        const pos = opt.absolutePointer
        // 点击空白处添加文字
        if (this.activeIndex === null) {
          this.addText(pos)
        } else {
          // 获取当前激活对象
          const obj = canvasId.getActiveObject()
          if (!obj) {
            this.activeIndex = null
          }
        }
      })
    },
    addText (pos) {
      // let _this = this
      const text = new fabric.IText('', {
        borderColor: '#ff0000', // 激活状态时的边框颜色
        editingBorderColor: '#ff0000', // 文本对象的边框颜色，当它处于编辑模式时
        left: pos.x,
        top: pos.y - 10,
        transparentCorners: true,
        fontSize: this.textSize,
        fill: this.textColor,
        padding: 5,
        cornerSize: 2, // Size of object's controlling corners
        cornerColor: '#ff0000',
        rotatingPointOffset: 20, // Offset for object's controlling rotating point
        lockScalingFlip: true, // 不能通过缩放为负值来翻转对象
        lockUniScaling: true // 对象非均匀缩放被锁定
      })
      text.id = this.count
      // 绑定选中事件
      text.on('selected', () => {
        this.activeIndex = text.id
      })
      canvasId.add(text).setActiveObject(text)
      text.enterEditing() // 将文字置为编辑状态
    },
    // 设置字体颜色
    onColorChange () {
      // 获取当前激活对象
      const obj = canvasId.getActiveObject()
      if (obj) {
        obj.set('fill', this.textColor)
        canvasId.renderAll()
      }
    },
    // 设置字体
    onSizeChange () {
      const obj = canvasId.getActiveObject()
      if (obj) {
        obj.set('fontSize', this.textSize)
        canvasId.renderAll()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.canvas_box {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  height: 600px;
  #canvas {
    border: 1px solid #ccc;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.menu_btn {
  margin-top: 20px;
  display: flex;
  // justify-content: center;
}
.btn_item {
  margin: 0 10px;
  padding: 0px 10px;
  border: 1px solid #000000;
  border-radius: 3px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}
.tools {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  .font_size {
    width: 50px;
    height: 30px;
    margin-top: 10px;
  }
  .tool {
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>