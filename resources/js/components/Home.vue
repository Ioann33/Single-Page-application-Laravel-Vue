<template>
    <div class="container">
        <h1>Main page</h1>
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status" v-if="loading">
            <span class="sr-only"></span>
        </div>
        <div v-if="!loading">
            <h2 class="alert-success" v-if="right === 'Ioann'">This is private page , you can see it if you are Ioann</h2>
            <h2 class="alert-danger" v-else>You have no rights for watching this page because you are not Ioann</h2>
        </div>

    </div>

</template>

<script>
    export default {
        data(){
            return {
                right: null,
                loading: true,
                errored: false,
            }
        },
        mounted() {
            this.getUser()
        },
        methods: {
            getUser(){
                axios.get('/api/user')
                    .then(response => {
                        this.right = response.data.data.name
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
    }
</script>

<style scoped>

</style>
