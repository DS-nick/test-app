import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        employees: []
    },

    mutations: {
        setEmployers(state, payload) {
            state.employees = payload

            console.log('payload', payload)
        },

        deleteItem(state, payload) {
            let newArr = state.employees.filter( (el)=> {
                return el.id !== payload
            })

            state.employees = newArr

            console.log('filtered', state.employees)
        }

    },
    actions: {

        async getEmployees({ commit}){

            console.log('actions work')

            try {

                const getDataFromDB = await Vue.http.get(`https://app-test-c8a7b.firebaseio.com/employees.json`)

                const getDataFromDBJson = await getDataFromDB.json()

                commit('setEmployers', getDataFromDBJson)
                console.log(getDataFromDBJson)

            }catch(e) {
                console.log(e)
            }


        },

        async deleteItem({commit}, payload) {

            console.log('dispat', payload)

            // c базы данных firebase не удалялась временно сделал через mutations

            // const deletedItem = await Vue.http.delete(`https://app-test-c8a7b.firebaseio.com/employees/1`)

            commit('deleteItem', payload)

            

        }

    },
    getters: {

        getEmployeesArr(state) {
            return state.employees
        }

    }

    
    
})