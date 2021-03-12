<template>
  <ul class="city-list">
    <li v-for="item in china" v-dragging="{ item: item, list: china, group: 'chinaInfo' }" :key="item.code">
      {{item.name}}
      <ul>
        <li v-for='(city,index) in item.children' v-dragging="{ item: city, list: item.children, group: item.code }" :key="index">
          {{city.name}}-{{ city.code }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      china: [
        {
          name: "浙江",
          code: '33',
          children: [
            {
              code: '3301',
              name: '杭州'
            },
            {
              code: '3302',
              name: '宁波'
            },
            {
              code: '3303',
              name: '温州'
            }
          ]
        },
        {
          name: "河南",
          code: '41',
          children: [
            {
              code: '4101',
              name: '郑州'
            },
            {
              code: '4102',
              name: '开封'
            },
            {
              code: '4103',
              name: '洛阳'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.$dragging.$on('dragged', (res) => {
      console.log(res)
      // ...
    })
    this.$dragging.$on('dragend', () => {
      // ...
    })
  }
}
</script>