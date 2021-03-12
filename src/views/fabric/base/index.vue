<template>
  <div class="hello">
    <div class="menu_btn">
      <div class="btn_item" @click="onLine">直线</div>
      <div class="btn_item" @click="onLineDash">虚线</div>
      <div class="btn_item" @click="onRect">方形</div>
      <div class="btn_item" @click="onCircle">圆形</div>
      <div class="btn_item" @click="onTriangle">三角形</div>
      <div class="btn_item" @click="onPath">不规则图形Path</div>
      <div class="btn_item" @click="onText">文字</div>
      <div class="btn_item" @click="onGroup">Group</div>
      <div class="btn_item" @click="onImg">本地图片</div>
      <div class="btn_item" @click="onImgNet">网络图片</div>
      <div class="btn_item" @click="onImgUpload">上传文件</div>
    </div>
    <div class="menu_btn">
      <div class="btn_item" @click="onDel">删除Object</div>
      <div class="btn_item" @click="onForward">上移</div>
      <div class="btn_item" @click="onBackward">下移</div>
      <div class="btn_item" @click="onDownload">生成图片并下载</div>
      <div class="btn_item" @click="onUpload">生成图片并上传</div>
    </div>
    <div class="main_box">
      <div class="jsonstr_box">
        <textarea :autocomplete="true" v-model="loadJsonStr" class="text_area" wrap="hard" placeholder="请输入jsonStr..."></textarea>
        <div style="marginTop: 10px;" class="btn_item" @click="onParse">反序列化</div>
      </div>
      <div class="canvas_box">
        <canvas id="canvas" width="500" height="500"></canvas>
      </div>
      <div class="jsonstr_box">
        <div class="btn_item" @click="onStringfy">序列化</div>
        <div class="stringfy_str">{{ jsonStr }}</div>
        <div class="copy_btn" @click="onCopy">复制</div>
      </div>
    </div>

  </div>
</template>

<script>
import { fabric } from 'fabric'
var canvasId = null
export default {
  name: 'HelloWorld',
  data () {
    return {
      jsonStr: '',
      loadJsonStr: '',
      imageIns: null
    }
  },
  mounted () {
    canvasId = new fabric.Canvas('canvas', { preserveObjectStacking: true })
    // 画布监听事件: mouse:down mouse:move mouse:up：鼠标抬起时
    // 对象监听事件: 
    // after:render：画布重绘后
    // object:selected：对象被选中
    // object:moving：对象移动
    // object:rotating：对象被旋转
    // object:added：对象被加入
    // object:removed：对象被移除
    canvasId.on('mouse:up', function (options) {
      // console.log(options)
      console.log(options.e.clientX, options.e.clientY)
    })
    canvasId.on('mouse:down', options => {
      // 删除
      document.onkeydown = e => {
        if (e.keyCode === 8) {
          canvasId.remove(options.target)
        }
      }
    })
  },
  methods: {
    onLine () {
      const line = new fabric.Line([10, 10, 100, 100], {
        fill: 'green',
        stroke: 'green', //笔触颜色
        strokeWidth: 2, //笔触宽度
      })
      canvasId.add(line)
    },
    onLineDash () {
      const line = new fabric.Line([10, 10, 100, 100], {
        fill: 'green',
        stroke: 'green',
        strokeDashArray: [3, 1] // strokeDashArray[a,b] ==> 每隔a个像素空b个像素
      })
      canvasId.add(line)
    },
    onRect () {
      const rect = new fabric.Rect({
        left: 10,
        top: 10,
        fill: 'red',
        width: 50,
        height: 50
      })
      canvasId.add(rect)
    },
    onCircle () {
      const circle = new fabric.Circle({
        radius: 100,
        fill: 'yellow',
        stroke: 'green',
        strokeWidth: 3,
        originX: 'center', // 调整中心点的X轴坐标
        originY: 'center', // 调整中心点的Y轴坐标
        top: 200,
        left: 200
      })
      circle.on('selected', function () {
        console.log('selected a circle')
      })
      canvasId.add(circle)
    },
    onTriangle () {
      const triangle = new fabric.Triangle({
        width: 20,
        height: 30,
        fill: 'blue',
        left: 50,
        top: 50
      })
      canvasId.add(triangle)
    },
    onPath () {
      // M => 移动命令  L => 线   z => 让图形闭合路径
      // 'M 0 0': 把画笔移动到(0, 0)点坐标
      // 'L 200 100': 从画笔的坐标画到(200, 100)坐标
      const path = new fabric.Path('M 0 0 L 200 100 L 170 200 z')
      path.set({
        left: 120,
        top: 120,
        fill: 'red'
      })
      canvasId.add(path)
    },
    onText () {
      const textStr1 = new fabric.Text('元!', {
        fill: 'red',
        fontSize: 40,
        // fontStyle: 'italic',  // 斜体
        // underline: 'true',
        shadow: 'rgba(0,0,0,0.2) 5px 5px 5px',
        stroke: '#5566ff',  // 描边
        strokeWidth: 1,
        textAlign: 'right',
        textBackgroundColor: 'yellowgreen'
      })
      const textStr2 = new fabric.Text('元!Times New Roman', {
        fill: 'red',
        top: 50,
        fontFamily: 'Times New Roman',
        // fontWeight: 'bold',
        fontSize: 40,
        // fontStyle: 'italic',  // 斜体
        // underline: 'true',
        shadow: 'rgba(0,0,0,0.2) 5px 5px 5px',
        stroke: '#5566ff',  // 描边
        strokeWidth: 1,
        textAlign: 'right',
        textBackgroundColor: 'yellowgreen'
      })
      const textStr3 = new fabric.Text('元!!sans-serif', {
        fill: 'red',
        top: 100,
        fontFamily: 'sans-serif',
        // fontWeight: 'bold',
        fontSize: 40,
        // fontStyle: 'italic',  // 斜体
        // underline: 'true',
        shadow: 'rgba(0,0,0,0.2) 5px 5px 5px',
        stroke: '#5566ff',  // 描边
        strokeWidth: 1,
        textAlign: 'right',
        textBackgroundColor: 'yellowgreen'
      })
      const textStr4 = new fabric.Text('元!!!PingFang SC', {
        fill: 'red',
        top: 150,
        fontFamily: 'PingFang SC',
        // fontWeight: 'bold',
        fontSize: 40,
        // fontStyle: 'italic',  // 斜体
        // underline: 'true',
        shadow: 'rgba(0,0,0,0.2) 5px 5px 5px',
        stroke: '#5566ff',  // 描边
        strokeWidth: 1,
        textAlign: 'right',
        textBackgroundColor: 'yellowgreen'
      })
      canvasId.add(textStr1)
      canvasId.add(textStr2)
      canvasId.add(textStr3)
      canvasId.add(textStr4)
    },
    onGroup () {
      const text = new fabric.Text('HELLO WORLD.', {
        fontSize: 30,
        fill: 'red',
        originX: 'center',
        originY: 'center'
      })
      const circle = new fabric.Circle({
        radius: 100,
        fill: 'yellow',
        stroke: 'green',
        strokeWidth: 3,
        originX: 'center',
        originY: 'center',
        scaleY: 0.5,
      })
      const group = new fabric.Group([circle, text], {
        left: 150,
        top: 150,
        angle: 10
      })
      canvasId.add(group)
    },
    onImgNet () {
      fabric.Image.fromURL('https://qn.antdv.com/vue.png', oImg => {
        oImg.scaleToHeight(90, false);  //缩放图片的高度到400
        oImg.scaleToWidth(90, false);
        canvasId.add(oImg);
      }, { crossOrigin: 'anonymous' })
    },
    handleImg (img) {
      fabric.Image.fromURL(img, function (oImg) {
        // oImg.scale(0.5)//图片缩小5倍
        oImg.scaleToHeight(300, false);  //缩放图片的高度到400
        oImg.scaleToWidth(300, false);
        canvasId.add(oImg);
        oImg.on('selected', function () {
          console.log('selected an image')
        })
      })
    },
    onImgUpload () {
      const _this = this
      var input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()
      input.onchange = function () {
        var file = this.files[0]
        // console.log(file)
        if (!file.type.match('image.*')) {
          console.log('只允许图片格式的文件，如 jpg png gif')
          return false
        }
        var reader = new FileReader();
        reader.onload = (function () {
          return function (e) {
            _this.handleImg(e.target.result)
          }
        })(file)
        reader.readAsDataURL(file);
      }
    },
    onImg () {
      fabric.Image.fromURL(require('@/assets/fabricjs/logo.jpg'), function (oImg) {
        // oImg.scale(0.5)//图片缩小5倍
        oImg.scaleToHeight(300, false);  //缩放图片的高度到300
        canvasId.add(oImg);
        oImg.myText = 'Hello'
        oImg.on('selected', function () {
          console.log('selected an image')
        })
      })
    },
    onStringfy () {
      const jsonStr = JSON.stringify(canvasId.toJSON(['myText']))
      this.jsonStr = jsonStr
    },
    onParse () {
      canvasId.loadFromJSON(this.loadJsonStr)
    },
    onCopy () {
      const input = document.createElement('input')
      input.value = this.jsonStr  // 要复制的内容
      document.body.appendChild(input)
      input.select()  // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      document.body.removeChild(input)
    },
    onDel () {
      const acObj = canvasId.getActiveObject()
      if (acObj.isType('activeSelection')) {	// 多个object
        acObj.forEachObject(item => {
          canvasId.remove(item)
        })
      } else {	// 单个object
        canvasId.remove(acObj)
      }
    },
    onForward () {
      const obj = canvasId.getActiveObject()
      canvasId.bringForward(obj)
      canvasId.renderAll()
    },
    onBackward () {
      const obj = canvasId.getActiveObject()
      canvasId.sendBackwards(obj)
      canvasId.renderAll()
    },
    onDownload () {
      const url = canvasId.toDataURL()
      const blob = this.dataURLtoBlob(url)
      // const file = this.blobToFile(blob, '截图.png')
      // a标签下载
      const elink = document.createElement('a')
      elink.download = '截图.png'
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      document.body.removeChild(elink)
    },
    onUpload () {
      const url = canvasId.toDataURL()
      const blob = this.dataURLtoBlob(url)
      // const file = new window.File([blob], 'tmp.png', { type: blob.type })
      const file = this.blobToFile(blob, 'tmp.png')
      console.log(file, 290)
    },
    /**
 * 将base64转换为blob
 * @param {*} dataurl 
 */
    dataURLtoBlob (dataurl) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    /**
     * 将blob转换为file
     * @param {*} theBlob 
     * @param {*} fileName 
     */
    blobToFile (theBlob, fileName) {
      theBlob.lastModifiedDate = new Date()
      theBlob.name = fileName
      return theBlob
    }
  }
}
</script>

<style scoped lang="less">
.menu_btn {
  margin-top: 20px;
  display: flex;
  justify-content: center;
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
.main_box {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  height: 500px;
  .canvas_box {
    margin: 0 20px;
    #canvas {
      border: 1px solid #ccc;
      margin: auto;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .jsonstr_box {
    box-sizing: border-box;
    padding: 5px;
    width: 300px;
    height: 100%;
    border: 1px solid #ccc;
    .stringfy_str {
      margin: auto;
      word-break: break-all;
      height: 450px;
      width: calc(100% - 20px);
      overflow: auto;
    }
    .copy_btn {
      // margin-top: 10px;
      text-align: right;
      color: green;
      cursor: pointer;
    }
    .text_area {
      margin: auto;
      height: 450px;
      width: calc(100% - 20px);
      border: none;
      display: flex;
      justify-content: left;
      align-items: top;
      word-break: break-all;
      // padding: 5px;
      outline: none;
      background-color: transparent;
    }
  }
}
</style>
