<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="container">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <router-link v-if="token" :to="{ name: 'home' }" class="nav-link nav-item">Home<span class="sr-only">(current)</span></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="token" :to="{ name: 'desks' }" class="nav-link nav-item">Desks</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="!token" :to="{ name: 'login' }" class="nav-link nav-item">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="!token" :to="{ name: 'registration' }" class="nav-link nav-item">Registration</router-link>
                    </li>
                    <li class="nav-item">
                        <a href="#" v-if="token" v-on:click.prevent="logout" class="nav-link nav-item">Log out</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "App",

        data(){
            return {
                token: null
            }
        },
        mounted() {
            this.getToken()
        },
        updated() {
            this.getToken()
        },
        methods: {
            getToken() {
                this.token = localStorage.getItem('x_xsrf_token')
            },
            logout() {
                axios.post('/logout')
                    .then(response => {
                        localStorage.removeItem('x_xsrf_token');
                        this.$router.push({name: 'login'})
                    })
            }
        }
    }
</script>

<style scoped>

</style>
