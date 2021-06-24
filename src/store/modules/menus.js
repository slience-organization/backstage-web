import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    menuList: [],
    permList: [],
    editableTabsValue: 'sysIndex',
    editableTabs: [{
      title: '首页',
      name: 'sysIndex',
    }]
  },
  mutations: {
    setMenuList (state, menus) {
      state.menuList = menus
    },
    setPermList (state, perms) {
      state.permList = perms
    },
    addTab(state, tab) {
      let index = state.editableTabs.findIndex(i => i.name === tab.name)
      if(index === -1) {
        state.editableTabs.push({
          title: tab.title,
          name: tab.name,
        });
        state.editableTabsValue = tab.name;
      }else {
        state.editableTabsValue = tab.name;
      }
      
    },
  },
  actions: {

  }
}