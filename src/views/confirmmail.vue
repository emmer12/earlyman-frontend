<template>
    <div class="flex col-lg-6 vh-100 justify-content-center">
        <div class="flex column nowrap mar-t-100 col-lg-3 col-mb-6 align-items-center">
            <img class="confirm-mail-img" src="../assets/img/mail.svg" alt="">
            <p class="text-13" style="margin-top:20px;">We have sent you a confirmation email.</p>
            <p class="text-13">Didn't receive it?</p>
            <div v-if="has_error">
                <p class="error"  v-for="err in error"> {{ err[0] }}</p>
            </div>
            <div v-if="success">
                <p class="success"  v-for="suc in message"> {{ suc[0] }}</p>
            </div>
            <button @click="sendmail" :disabled="this.$store.getters.disableBtn" class="flex nowrap justify-content-center align-items-center ripple" type="submit">
                <loadingGif v-if="this.$store.getters.loading"></loadingGif>
                Resend
            </button>       
        </div>
    </div>
</template>
<style lang="css" scoped>
.confirm-mail-img {
  width: 250px; height: auto;
  object-fit: contain;
}
</style>
<script>
import loadingGif from "@/components/loading";
  export default {
    components: {
        'loadingGif' : loadingGif,
    },
    data() {
      return {
        email: null,
        success: false,
        message: '',
        has_error: false,
        error: '',
        loading: false,
        disableBtn: false
      }
    },
    mounted() {
      //
    },
    methods: {
      sendmail() {
        this.$store.commit('btnState', true)
        this.$store.commit('change', true)
        let routerr = this.$router;
        let that = this;
         
        let req = this.$http.get('http://localhost:8000/api/auth/signup', {
            email: this.email,
                })
                .then(function (response) {
                  // Disable button and loading state using Vuex
                    that.$store.commit('btnState', false);
                    that.$store.commit('change', false);
                    // Check if response status returns 200. (request is completed)
                    if (response.status === 200) {
                      // Set error to false if there was any previous errors
                      that.has_error = false
                      that.error = '';
                     // Check if the response data is empty. it's not suppose to be empty though...
                      if (response.data) {
                        that.success = true;
                        that.message = response.data
                        // Change the vue login state using vuex to show user is logged in
                        that.$store.commit('login', true)
                        that.$router.push('/');
                      }
                    }
                })
                .catch(function (error) {
                    that.$store.commit('btnState', false);
                    that.$store.commit('change', false);
                    if (error.response.status === 400) {
                      that.has_error = true;
                      that.error = 'All Fields are Required';
                    }else if (error.response.status === 401) {
                      that.has_error = true;
                      that.error = error.response.data.errors;
                    } else {
                      that.has_error = true;
                      that.error = error.response.data.errors  
                    }
                });
      }

    }
  }
</script>
