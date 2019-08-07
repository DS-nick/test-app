import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import router from './router'
import Vuex from 'vuex'
import store from './store/index'


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

Vue.config.productionTip = false

Vue.prototype._window = window

var vm = new Vue({
  render: h => h(App),
  router,
  store,
  mounted() {
    this.$el.addEventListener('click', this.unSelect)
  },
  methods: {
    unSelect(e) {
      console.log(vm)
      let selected = e.target.querySelectorAll('.selected-row')
            for(let elem of selected) {
                elem.classList.remove('selected-row')
                elem.classList.remove('contextMenu')
            }
      let contex = e.target.querySelectorAll('.contextMenu')

      for(let elem of contex) {
        
        // elem.classList.remove('contextMenu')
        elem.style.display = 'none'
    }

    let askModal = e.target.querySelectorAll('.delete-ask__modal')

      for(let elem of askModal) {
        
        // elem.classList.remove('contextMenu')
        elem.style.display = 'none'
    }
    }
  }
}).$mount('#app')
