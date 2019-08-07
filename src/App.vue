<template>
  <div class="myapp">
    <!-- <h1>Список сотрудников</h1> -->
    <router-view></router-view>
    <!-- <compEmployeesList/> -->
    <compPagination/>
  </div>
</template>

<script>

import compEmployeesList from './components/EmployeesList'
import compPagination from './components/Pagination'
export default {

  components: {
    compEmployeesList,
    compPagination
  }
  
}


</script>


<style lang="scss">
@import './libs/bootstrap-4.0.0-dist/css/bootstrap-grid.min.css';

.myapp {
height: 100vh;
}
</style>


