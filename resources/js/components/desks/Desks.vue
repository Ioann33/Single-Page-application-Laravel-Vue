<template>
     <div class="container">
         <h2>Desks</h2>
         <form v-on:submit.prevent="addNewDesk">
             <div class="form-group">
                 <label for="exampleInputEmail1">Add note name</label>
                 <input type="text" v-model="name" class="form-control" id="exampleInputEmail1" placeholder="Text bord name" required>
             </div>
             <button type="submit" class="btn btn-primary mt-3">Create</button>
         </form>
         <div class="row">
            <div class="col-lg-4" v-for="desk in desks">
                <div class="card mt-3">
                    <router-link :to="{ name: 'showDesk', params: { deskID: desk.id } }" class="card-body" style="text-decoration: none">
                        <h4 class="card-title">{{ desk.name }}</h4>
                    </router-link>
                    <button type="button" class="btn btn-danger mt-3" v-on:click="deleteDesk(desk.id)">Delete</button>
                </div>
            </div>
         </div>
         <div class="alert alert-danger" role="alert" v-if="errored">
             <div v-if="status === 422">
                 <div v-for="error in errors">
                     {{ error }}
                 </div>
             </div>
             <div v-else>Loading data error!</div>
         </div>
         <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status" v-if="loading">
             <span class="sr-only"></span>
         </div>
     </div>
</template>

<script>
    export default {
        data(){
            return{
                desks:[],
                errored: false,
                loading: true,
                name: null,
                errors:[],
                status: null
            }
        },
        methods: {
            addNewDesk() {
                axios.post('/api/save', {
                    name: this.name,
                })
                    .then(response => {
                        this.name = ''
                        this.status = ''
                        this.errors = ''
                        this.errored = false
                        this.desks = []
                        this.getAllDesks()


                    })
                    .catch(error => {
                        this.errored = true
                        this.status = error.response.status
                        console.log(error.response);
                        if (error.response.data.errors.name[0]){
                            this.errors.push(error.response.data.errors.name[0])
                        }
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },
            getAllDesks(){
                axios.get('/api/all')
                    .then(response => {
                        this.desks = response.data
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },
            deleteDesk(id){
                if(confirm('Do you realy want delete this desk?')){
                    axios.post('/api/del/'+id, {
                        _method: 'DELETE'
                    })
                        .then(response => {

                            this.desks = []
                            this.getAllDesks()
                        })
                        .catch(error => {
                            console.log(error)
                            this.errored = true
                        })
                        .finally(() => {
                            this.loading = false
                        })
                }
            }
        },
        mounted() {
            this.getAllDesks()
        }
    }
</script>

<style scoped>

</style>
