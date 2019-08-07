import VueRouter from 'vue-router'

import EmployeesList from './components/EmployeesList.vue'
import ObjectsList from './components/ObjectsList.vue'


export default new VueRouter({
   routes: [{
        path: '/',
        component: EmployeesList
    },
    {
        path: '/lists',
        component: ObjectsList
    },
    

],
mode: 'history'
})