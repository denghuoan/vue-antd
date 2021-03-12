<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider style="background: #fff" v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <a-icon type="gitlab" style="fontSize: 30px;" />
      </div>
      <a-menu mode="inline" :style="{ borderRight: 0 }" :open-keys="openKeys" :selectedKeys="selectedKeys" @click="onSelectMenu" @openChange="onOpenChange">
        <template v-for="item in menuData">
          <a-menu-item v-if="!item.children" :key="item.path">
            <span class="anticon">
              <a-icon :type="item.icon" />
            </span>
            <span>{{ item.title}}</span>
          </a-menu-item>
          <a-sub-menu v-else :key="item.path">
            <span slot="title">
              <span class="anticon">
                <a-icon :type="item.icon" />
              </span>
              <span>{{ item.title}}</span>
            </span>
            <a-menu-item v-for="jtem in item.children" :key="jtem.path">
              <span>{{ jtem.title }}</span>
            </a-menu-item>
          </a-sub-menu>
        </template>

      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import menuData from '@/utils/menuData.js'
export default {
  data () {
    return {
      menuData,
      collapsed: false,
      selectedKeys: [],
      openKeys: []
    }
  },
  computed: {
    rootSubmenuKeys () {
      return this.menuData.map(item => item.path)
    }
  },
  methods: {
    onSelectMenu ({ key }) {
      this.$router.push({ path: key })
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    routeChange () {
      const path = this.$route.path
      this.selectedKeys = [path]
      // if (path === '/market/coupon/gift/settings') {
      //   this.selectedKeys = ['/market/coupon/gift']
      // }
      const keysItem = this.rootSubmenuKeys.find(item => {
        return path.indexOf(item) !== -1
      })
      if (keysItem) {
        this.openKeys = [keysItem]
      }
    }
  },
  created () {
    this.routeChange()
  },
  watch: {
    $route: 'routeChange'
  }
}
</script>
<style>
#components-layout-demo-custom-trigger {
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  text-align: center;
}
</style>
