<template>
        <section class="flex column col-lg-6 pad-tb-30 mobilito">
            <form autocomplete="off" @submit.prevent="changePassword" v-if="!success">
                <div v-if="has_error">
                    <p class="error"  v-for="err in errors" v-bind:key="err.id"> {{ err[0] }}</p>
                    <p v-if="has_message">{{this.message}}</p>
                </div>
                <div class="form-group">
                    <div class="form-icon">
                        <i class="flex icon material-icons">lock</i>
                        <input type="password" value="" placeholder="Current password" v-model="current_password">
                    </div>
                    <div class="form-icon">
                        <i class="flex icon material-icons">lock</i>
                        <input type="password" value="" placeholder="New password" v-model="new_password">
                    </div>
                    <div class="form-icon">
                        <i class="flex icon material-icons">lock</i>
                        <input type="password" value="" placeholder="Confirm password" v-model="confirm_password">
                    </div>
                    <div class="flex justify-content-space-between align-items-center">
                        <button :disabled="this.loading" class="flex nowrap justify-content-center align-items-center ripple" type="submit">
                            <loadingGif v-if="this.loading"></loadingGif>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </section>
</template>
<style scoped>
  .loin {
    top: 0;
    margin: 9px;
  }
</style>
<script>
import alertify from 'alertifyjs';
import '../../node_modules/alertifyjs/build/css/alertify.min.css';
import '../../node_modules/alertifyjs/build/css/themes/default.min.css';
import loadingGif from "@/components/loading";
import Routes from '@/router.js';

 export default {
    components: {
        'loadingGif' : loadingGif,
    },
    data() {
      return {
        current_password: '',
        new_password: '',
        confirm_password: '',

        has_error: false,
        error: '',
        errors: '',
        success: false,
        loading: false,
        disableBtn: false,
        has_message: false,
        message: '',
        bearerToken: null,
      }
    },
    created: function() {

    },
    methods: {
      changePassword: function() {
        this.loading = true
        let vm = this;
        if (window.$cookies.get('auth-token')) {
            this.bearerToken = window.$cookies.get('auth-token');
        }else{
            console.log('Youre acccessing this page as a guest');
        }
        this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;

        this.$http.post(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/auth/password/change`, {
            old_password: this.current_password,
            new_password: this.new_password,
            new_password_confirmation: this.confirm_password,
        })
        .then(function (response) {
            if (response.status === 200) {
                // Set error to false if there was any previous errors
                vm.has_message = true
                alertify.notify('Password changed', 'success', 5, function(){   });  
            }
        })
        .catch(function (error) {
            if (error.response.status === 400) {
              vm.has_error = true;
              alertify.notify('All fields are required', 'error', 5, function(){   });  
            }else if (error.response.status === 401) {
              vm.has_error = true;
              vm.errors = error.response.data.errors;
            } else {
              vm.has_error = true;
              vm.errors = error.response.data.errors;
            }
        })
        .finally(function(){
            vm.loading = false
        });
      }
    } 
  }
</script>
