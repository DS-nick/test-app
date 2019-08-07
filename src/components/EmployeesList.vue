<template>
    <div class="container tables-container">
        <h2>Список сотрудников</h2>
        <input type="text" class="filter-input"
        v-model="inputData"
        @input="filter"
        >
        <table ref="table"
        @mousedown.prevent="deleteDefaultSelection"
        >
            <tr>
                <th>ФИО</th>
                <th>Кол-во</th>
                <th>Общая стоимость</th>
            </tr>
            <tr v-for="(employer, index) in employees" 
            :key="index"
            
            @click="selectRow"
            @dblclick.prevent="showEmployees"
            @contextmenu.prevent="deleteItem(employer.id, $event)"
            >
                <td>{{ employer.name}}</td>
                <td>{{ employer.count}}</td>
                <td>{{ employer.amount}}</td>
            </tr>
        </table>
        

        <div ref = 'contex' class="contextMenu" :style="menuDisplay">
            <p @click="deleteItemQuestion">Удалить</p>
        </div>

        <div ref = 'askModal' class="delete-ask__modal">
            Вы действитетельно хотите удалить строку ?
            <div>
            <button class="yes-btn" @click="yesClick">Да</button>
            <button class="no-btn" @click="noClick">Нет</button>
            </div>
        </div>
    </div>
</template>

<script>

import store from '../store/index'
export default {

    data() {
        return {
            employees: [],

            visibleVal: this.employees,

            inputData: '',

            isVisibleMenu: false,

            menuDisplay: {
                display: 'none',
                top: '',
                left: ''
            },
            itemToDelete: '',
            deletedItemIndex: '',
            deletedAnswer: false

            
            
        }
    },

    methods: {
        selectRow(e) {

            // console.dir(e.currentTarget)

            // this.$refs.$el.focus()
            
            let selected = this.$refs.table.querySelectorAll('.selected-row')
            for(let elem of selected) {
                elem.classList.remove('selected-row')
            }

            
            
            



            e.currentTarget.classList.toggle('selected-row')
        },

        showEmployees() {
            console.log('Double click')
            router.push('/lists')
        },

        deleteItem(id, e) {
            console.log('delete items')
            console.log(id)

            this.itemToDelete = id
            console.log(e.clientX, e.clientY)

            this.menuDisplay.display = 'block'
            this.$refs.contex.style.display = 'block'

            this.menuDisplay.top = e.clientY + 'px'
            this.menuDisplay.left = e.clientX + 'px'


        },
        yesClick() {
            this.deletedAnswer = true
            console.log('ues', this.deletedAnswer)
            const idx = this.employees.findIndex((el) => el.id === this.itemToDelete)
            console.log('index', idx, this.employees[idx])
            this.deletedItemIndex = +idx
            if(this.deletedAnswer) {

                this.$store.dispatch('deleteItem', this.itemToDelete)
                // this.employees.splice(this.idx, 1)
            
            }

            this.$refs.askModal.style.display = 'none'

            this.employees = this.$store.state.employees

        },
        noClick() {
            this.deletedAnswer = false
            this.$refs.askModal.style.display = 'none'
            console.log('No btn')
        },

        deleteItemQuestion() {
            // alert('Вы действительно хотите удалить значение?')

            this.$refs.askModal.style.display = 'block'
            console.log('question')

            
            
            this.$refs.contex.style.display = 'none'
            // console.log(this.employees[idx].name)
        },

        deleteDefaultSelection() {
            
        },

        filter() {

            if(this.inputData.length === 0) {
                this.employees = this.getData
                console.log('pusto', this.visibleVal)
            }
          this.employees = this.employees.filter( (el)=> {
              return el.name.toLowerCase().indexOf(this.inputData) > -1
                 console.log('pppp', el.name) 
            })

            console.log(this.visibleVal)

            
        },

        
    },

    computed: {
        getData() {
            console.log('iiii', this.$store.getters.getEmployeesArr)
            return this.$store.getters.getEmployeesArr
        }, 

        deletedName() {
            
            if(this.deletedItemIndex) {
                return this.employees[this.deletedItemIndex].name
            }

            return ''
        }

        

        
    },

    created() {
        console.log('created')
        this.$store.dispatch('getEmployees')
            .then(()=> {
                console.log('----------', this.$store.getters.getEmployeesArr)
                this.employees = this.getData
                console.log('rr', this.visibleVal)
            })
    }
    
}
</script>

<style scoped>
table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}

.tables-container {
    text-align: center;
}

.tables-container table{
    margin: 0 auto;
    
}

.selected-row {
    background: blue;
}

.contextMenu {
    position: absolute;
    background: rgb(247, 244, 244);
    color: black;
    padding: 10px 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    z-index: 100;

    
    
}

.filter-input {
    margin: 0 auto;
}



.contextMenu p {
    margin: 0;
    padding: 0;
    border-bottom: 1px solid transparent;
}

.contextMenu p:hover {
    cursor: pointer;
    border-color: black;

}

.filter-input {
    padding: 5px;
    width: 30%;
    margin-bottom: 30px;
}


.delete-ask__modal {
    position: fixed;
    left: 50%;
    top: 50%;
    display: none;
    width: 200px;
    height: 80px;
    color: red;
    margin: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
    background: #fff;
}


.yes-btn {
    color: green;
    margin: 5px
}

.no-btn {
    color: red;
    margin: 5px;
}




</style>

