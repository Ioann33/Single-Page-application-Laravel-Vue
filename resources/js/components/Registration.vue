<template>
    <div>
        <form class="m-auto w-25 mt-5" v-on:submit.prevent>
            <div class="form-group row mt-3">
                <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                    <input v-model="name" type="text" class="form-control" id="inputName">
                </div>
            </div>
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
                <label for="inputPasswordConfirm" class="col-sm-2 col-form-label">Password confirm</label>
                <div class="col-sm-10">
                    <input v-model="password_confirmation" type="password" class="form-control" id="inputPasswordConfirm">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-10 mt-3">
                    <button v-on:click="registration" type="submit" class="btn btn-primary">Register</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Registration",
        data() {
            return {
                name: null,
                email: null,
                password: null,
                password_confirmation: null,
            }
        },
        methods: {
            registration(){
                axios.get('/sanctum/csrf-cookie')
                    .then(response => {
                        axios.post('/register', {
                            name: this.name,
                            email: this.email,
                            password: this.password,
                            password_confirmation: this.password_confirmation
                        })
                            .then(response => {
                                localStorage.setItem('x_xsrf_token', response.config.headers['X-XSRF-TOKEN'])
                                this.$router.push({name: 'home'})
                            })
                    })

            }
        },
    }
</script>

<style scoped>

</style>
