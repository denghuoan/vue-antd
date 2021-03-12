const menuData = [
  {
    path: '/drag',
    title: '拖拽排序',
    icon: 'gitlab',
    children: [
      {
        path: '/drag/origin',
        title: '原生js',
        component: '/drag/origin'
      },
      {
        path: '/drag/awednd',
        title: 'awe-dnd',
        component: '/drag/awednd'
      },
      {
        path: '/drag/vuedraggable',
        title: 'vuedraggable',
        component: '/drag/vuedraggable'
      },
      {
        path: '/drag/example',
        title: '项目实战',
        component: '/drag/example'
      }
    ]
  },
  {
    path: '/fabric',
    title: 'FabricJs',
    icon: 'gitlab',
    children: [
      {
        path: '/fabric/base',
        title: '基础',
        component: '/fabric/base'
      },
      {
        path: '/fabric/text',
        title: '文本',
        component: '/fabric/text'
      },
      {
        path: '/fabric/example',
        title: '项目实战',
        component: '/fabric/example'
      }
    ]
  },
  {
    path: '/test',
    title: '测试',
    icon: 'gitlab',
    component: '/test'
  }
]
export default menuData