<template>
    <div class="container">
        <div class="form-group">
            <label for="exampleInputEmail1">Note name</label>
            <input type="text" v-model="name" v-on:blur="update" class="form-control" id="exampleInputEmail1">
        </div>
        <div class="alert alert-danger" role="alert" v-if="errored">
            Error loading data!
        </div>
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status" v-if="loading">
            <span class="sr-only"></span>
        </div>
    </div>
</template>

<script>

    export default {
        props: [
            'deskID'
        ],
        data(){
            return {
                name: null,
                errored: false,
                loading: true
            }
        },
        methods: {
            update(){

                axios.post('/api/update/'+this.deskID, {
                    _method: 'PUT',
                    name: this.name,
                })
                    .then(response => {
                        // this.name = response.data.name
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        },
        mounted() {
            axios.get('/api/get/'+this.deskID)
            .then(response => {
                this.name = response.data.name
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
</script>

<style scoped>

</style>
