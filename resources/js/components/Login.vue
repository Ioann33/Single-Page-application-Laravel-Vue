<template>
    <div>
        <form class="m-auto w-25 mt-5" v-on:submit.prevent>
            <div class="form-group row mt-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input v-model="email" type="email" class="form-control" id="inputEmail3">
                </div>
            </div>
            <div class="form-group row mt-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input v-model="password" type="password" class="form-control" id="inputPassword3">
                </div>
            </div>
            <div class="form-group row mt-3">
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary" v-on:click="login">Sign in</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        methods: {
            login(){
                axios.get('/sanctum/csrf-cookie')
                    .then(response => {
                        axios.post('/login', {
                            email: this.email,
                            password: this.password
                        })
                        .then(response => {
                            localStorage.setItem('x_xsrf_token', response.config.headers['X-XSRF-TOKEN']);
                            this.$router.push({name: 'home'})
                        })


                })

            }
        },
        data() {
            return {
                email: null,
                password: null
            }
        }
    }
</script>

<style scoped>

</style>
