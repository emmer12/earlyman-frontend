<template>
        <div class="flex vh-100 justify-content-center align-items-center" id="content">
        <section class="flex col-lg-6 vh-100 justify-content-center align-items-center login-left-section hide-for-mobile">
            <!-- <img class="img-sm-banner" src="./img/for_sale.svg" alt=""> -->
            <h1>Houses, Lannds<br>even Bridges</h1>
        </section>
        <section class="flex column absolute align-items-center col-lg-6 pad-tb-30 bg-white mobilito">
          <div class="flex col-lg-6 absolute relative loin">
                    <router-link :to="{name: 'Home'}">
                        <a id="loo" class="flex header-logo" href="">
                            <img class="" src="../assets/logo.svg" alt="">
                        </a>
                    </router-link>
                </div>
            <img class="img-sm" src="../assets/img/mention.svg" alt="">
            <p>Sign Up to ProptyBox</p>
            <form autocomplete="off" @submit.prevent="register" v-if="!success">
                <div v-if="has_error">
                    <p class="error" v-for="err in errors" v-bind:key="err.id"> {{ err[0] }}</p>
                </div>
                <div class="form-group">
                    <div class="form-icon">
                        <i class="flex icon material-icons">account_circle</i>
                        <input type="text" value="" placeholder="Firstname" v-model="firstname">
                    </div>
                    <div class="form-icon">
                        <i class="flex icon material-icons">group</i>
                        <input type="text" value="" placeholder="Lastname" v-model="lastname">
                    </div>
                    <div class="form-icon">
                        <i class="flex icon material-icons">portrait</i>
                        <input type="text" value="" placeholder="Username" v-model="username">
                    </div>
                    <div class="form-icon">
                        <i class="flex icon material-icons">mail</i>
                        <input type="text" value="" placeholder="Email" v-model="email">
                    </div>
                    <div class="form-icon">
                        <i class="flex icon material-icons">lock</i>
                        <input type="password" value="" placeholder="Password" v-model="password">
                    </div>
                    <div class="flex justify-content-space-between align-items-center">
                            <button :disabled="this.loading" class="flex nowrap justify-content-center align-items-center ripple" type="submit">
                              <loadingGif v-if="this.loading"></loadingGif>
                              Signup
                            </button>
                    </div>
                    <div class="flex justify-content-space-between align-items-center">
                      <router-link :to="{name: 'login'}">
                          <a class="text-12 blue-link mar-lr-15" href="">Already a member? Sign in</a>
                      </router-link>
                    </div>    
                </div>
            </form>
        </section>
    </div>
</template>
<style scoped>
  .loin {
    top: 0;
    margin: 9px;
  }
</style>
<script>
import loadingGif from "@/components/loading";
import Routes from '@/router.js';
import alertify from 'alertifyjs';
import '../../node_modules/alertifyjs/build/css/alertify.min.css';
import '../../node_modules/alertifyjs/build/css/themes/default.min.css';

 export default {
    components: {
        'loadingGif' : loadingGif,
    },
    data() {
      return {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        has_error: false,
        error: '',
        errors: '',
        success: false,
        loading: false,
        disableBtn: false
      }
    },
    created: function() {

    },
    methods: {
      register: async function() {
        let routerr = this.$router;
        let vm = this;
        vm.loading = true
        await this.$http.post(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/auth/signup`, {
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            password: this.password,
            email: this.email
        })
        .then(function (response) {         
            if (response.status === 200) {
                vm.$store.commit('setregstatusState', true);
                vm.send_confirmation();
                vm.has_error = false
                vm.error = '';
                alertify.notify('Registration successful', 'success', 5, function(){   });  
                vm.$router.push('/login');
            }
        })
        .catch(function (error) {
            if (error.response.status === 400) {
              vm.has_error = true;
              vm.errors = error.response.data.errors;
            }else if (error.response.status === 401) {
              vm.has_error = true;
              vm.errors = error.response.data.errors;
            } else {
              vm.has_error = true;
              vm.errors = error.response.data.errors;
            }
        }).finally(function(){
          vm.loading = false;
        });
      },
      send_confirmation: function(){
            let vm = this;
            vm.sendingConfirmationMail = true;
            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }
            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;

            let req = this.$http
            .post(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/auth/signup/request/confirmation-email`, { email: this.email })
            .then(function (response) {
                if (response.status === 200) {
                    alertify.notify('connfirmation link sent to your email. check to verify', 'success', 5, function(){   });  
                }
            })
            .catch(function (error) {
                alertify.notify('Unable to send confrmation link. Try again later', 'error', 5, function(){   });  
            })
            .finally(function(){
                vm.sendingConfirmationMail = false;
            });
        },
    }
  }
</script>
