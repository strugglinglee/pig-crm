<template>
  <a-layout
    id="components-layout-demo-side"
    style="min-height: 100vh"
  >
    <a-layout-sider
      v-model="collapsed"
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
      collapsible
    >
      <div class="logo" >
        <img src="../assets/logo.png" alt="">
        <span v-if="!collapsed">文案猪猪</span>
      </div>
      <a-menu
        theme="dark"
        :selectedKeys="[defaultSelectedKeys]"
        mode="inline"
      >
        <a-menu-item
          v-for="item in routes"
          :key="item.name"
          @click="handleRoute(item)"
        >
          <a-icon :type="item.icon" />
          <span>{{item.text}}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout  :style="{ marginLeft: collapsed?'80px':'200px' }">
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <!-- <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item> -->
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <slot name="content"></slot>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        文案猪猪 ©2020 Created by StrugglingLee
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      routes: [
        {
          text: "分类管理",
          name: "category",
          icon: "appstore"
        },
        {
          text: "文案管理",
          name: "text",
          icon: "file-text"
        }
      ]
    };
  },
  computed: {
    defaultSelectedKeys() {
      return this.$route.name||''
    }
  },
  methods: {
    handleRoute(item){
      this.$router.push({
        name:item.name
      })
    }
  }
};
</script>

<style lang="scss" scoped>
#components-layout-demo-side {
  .logo {
    display: flex;
    align-items: center;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;

    span{
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      margin-left: 8px;
    }

    img {
      width: 50px;
    }
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }
}
</style>
