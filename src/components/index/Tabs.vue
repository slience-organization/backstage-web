<template>
  <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
    <el-tab-pane
      v-for="(item, index) in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'Tabs',
  data() {
    return {
      
    }
  },
  computed: {
    editableTabsValue: {
      get() {
        return this.$store.state.menus.editableTabsValue
      },
      set(newVal) {
        this.$store.state.menus.editableTabsValue = newVal
      }
      
    },
    editableTabs: {
      get() {
        return this.$store.state.menus.editableTabs
      },
      set(newVal) {
        this.$store.state.menus.editableTabs = newVal
      }
    }
  },
  methods: {
    clickTab(target) {
      let activeName = this.editableTabsValue;
      if(activeName === target.name) {
        return
      }else {
        this.$router.push({name: target.name})
      }
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if(targetName === 'sysIndex') {
        return
      }
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      if(this.$router.name !== activeName) {
        this.$router.push({name: activeName})
      }
      
    }
  }
}
</script>

<style  scoped>
 >>>  .el-tabs__nav-scroll  .el-tabs__nav  .el-tabs__item.is-active{
  border-bottom: 2px solid #409EFF;
}
</style>
