<template>
  <div class="flex column nowrap col-lg-6 editProfile">
        <loading v-if="this.loading"></loading>
        <div v-if="this.user">
        <div class="flex column nowrap" href="">
            <div class="flex justify-content-center align-items-center nowrap banner_holder">
                <img class="flex img-user" id="blah"  v-if="this.banner" :src="this.banner" alt="">
            </div>
            <div class="flex">
                <div class="flex justify-content-center align-items-center nowrap avt_holder">
                    <img class="flex img-user-avatar" id="blah"  v-if="this.avatar" :src="this.avatar" alt="">
                    <div class="camera_icon_ ne-mar">
                        <input id="profile_image" type="file" @change="save_avatar">
                        <loadingGif v-if="this.loading_avatar"></loadingGif>
                        <label v-else for="profile_image" class="flex justify-content-center align-items-center banner-label">
                            <i class="flex justify-content-center align-items-center icon material-icons ">camera_alt</i>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <form class="flex col-lg-6" autocomplete="off" @submit.prevent="save" v-if="!success">
            <div class="col-lg-6 form-group">   
                <div class="flex text-center">
                    <p>{{this.message}}</p>
                </div>
                <div class="align-items-center form-icon">
                    <i class="flex icon material-icons">account_circle</i>
                    <input class="input-normal" type="text" value="" placeholder="Firstname" v-model="firstname">
                </div>
                <div class="align-items-center form-icon">
                    <i class="flex icon material-icons">group</i>
                    <input class="input-normal" type="text" value="" placeholder="Lastname" v-model="lastname">
                </div>
                <div class="align-items-center form-icon">
                    <i class="flex icon material-icons">portrait</i>
                    <input class="input-normal" type="text" value="" placeholder="Username" v-model="username">
                </div>
                <div class="align-items-center form-icon">
                    <i class="flex icon material-icons">mail</i>
                    <input class="input-normal" type="text" value="" placeholder="Email" v-model="email">
                </div>
                <div class="align-items-center form-icon">
                    <i class="flex icon material-icons">call</i>
                    <input class="input-normal" type="text" value="" placeholder="Phone number" v-model="phone">
                </div>
                <div class="align-items-center form-icon">
                    <i class="flex icon material-icons">person_pin_circle</i>
                    <input class="input-normal" type="text" value="" placeholder="Address" v-model="address">
                </div>
                <div class="align-items-center form-icon">
                    <i class="flex icon material-icons">person_pin_circle</i>
                    <input class="input-normal" type="text" value="" placeholder="Location" v-model="location">
                </div>
                <div class="align-items-center form-icon">
                    <i class="flex icon material-icons">date_range</i>
                    <input class="input-normal" type="text" value="" placeholder="DOB" v-model="birthday">
                </div>
                <div class="form-icon-textarea">
                    <i class="flex icon material-icons">info</i>
                    <textarea placeholder="About" class="input-normal" name="" id="" cols="30" rows="10" v-model="bio"></textarea>
                </div>

                <div class="flex justify-content-space-between align-items-center">
                    <button :disabled="this.loading" class="flex nowrap justify-content-center align-items-center ripple" type="submit">
                        <loadingGif v-if="this.loading"></loadingGif>
                        Save
                    </button>
                </div>                               
            </div>
        </form>
        </div>
    </div>
</template>
<style scoped>
    body{
        background: #EDF3FE;
        font-family: 'PT Sans', sans-serif;
    }
    .ne-mar {
        margin-top: -25px; 
        margin-left: 5px;
    }
    .banner-label {
        padding: 0px;
    }
    .banner-label i {
        font-size: 25px;
        background: rgba(43, 43, 43,0.5);
        color: rgb(233, 233, 233);
        border-radius: 25px;
        width: 50px; height: 50px; overflow: hidden;
        text-align: center;
        padding: 0;
    }
    .profile-txt-holder {
        margin: 5px 10px;
    }
    .img-user {
        width: 100%;
        object-fit: cover;
        height: 200px;
    }
    .user-left-aside {
        width: 288px;
        background: #FFF;
    }
    .banner_holder, .avt_holder{
        position: relative;
    }
    .camera_icon_ {
        position: absolute;

    }
</style>
<script>
import loadingGif from "@/components/loading";
import loading from '@/components/loading_blue';
import alertify from 'alertifyjs';
import { getProfile } from '@/mixins/getProfile.js';
import '../../node_modules/alertifyjs/build/css/alertify.min.css';
import '../../node_modules/alertifyjs/build/css/themes/default.min.css';

export default {
    mixins: [getProfile],
    components: {
        loadingGif,
        loading,
    },
    data() {
      return {
        success: false,
        has_error: false,
        error: '',
        message: '',
        loading_banner: false,
        loading_avatar: false,
        loading: false,
        disableBtn: false,
        banner : '/img/banner.jpg',
        user : null
      }
    },
    async mounted() {
        let vm = this;
        if (!vm.$store.getters.getuserprofile) {
            await vm.getUserProfile();
        }
    },
    computed: {
        avatar: {
            get: function(){ return this.user.avatar_url },
            set: function(newValue){ this.user.avatar = newValue }
        },
        username: {
            get: function(){ return this.user.username },
            set: function(newValue){ this.user.username = newValue }
        },
        firstname: {
            get: function(){ return this.user.firstname },
            set: function(newValue){ this.user.firstname = newValue }
        },
        lastname: { 
            get: function(){ return this.user.lastname },
            set: function(newValue){ this.user.lastname = newValue }
        },
        email: {
            get: function(){ return this.user.email },
            set: function(newValue){ this.user.email = newValue }
        },
        location: {
            get: function(){ return this.user.profile.location },
            set: function(newValue){ this.user.profile.location = newValue }
        },
        address: {
            get: function(){ return this.user.profile.address },
            set: function(newValue){this.user.profile.address = newValue }
        },
        phone: {
            get: function(){ 
                if (!this.user.profile.phone) {
                    return ' ';
                } else {
                    return this.user.profile.phone;   
                }
             },
            set: function(newValue){this.user.profile.phone = newValue }
        },
        birthday: {
            get: function(){ return this.user.profile.birthday },
            set: function(newValue){this.user.profile.birthday = newValue}
        },
        bio: {
            get: function(){
                if (this.user.profile.bio == null) {
                    return this.user.profile.bio = ""
                }else {
                    return this.user.profile.bio
                }           
            },
            set: function(newValue){
                this.user.profile.bio = newValue
            }
        }

    },
    methods: {
      save() {
        let router = this.$router;
        let vm = this;
        vm.loading = true;
      
        if (window.$cookies.get('auth-token')) {
            this.bearerToken = window.$cookies.get('auth-token');
        }
        this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;
        let data = {
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            email: this.email,
            phone: this.phone,
            address: this.address,
            location: this.location,
            bio: this.bio,
            birthday: this.birthday
        };
        let req = this.$http.post(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/profile`, data)
            .then(function (response) {
                if (response.status === 200) {
                    vm.user = response.data.data.user;
                    vm.$store.commit('setuserProfile', response.data.data.user);
                    alertify.notify('Profile updated', 'success', 5, function(){   });  
                }
            })
            .catch(function (error) {
                if (error.response.status === 400) {
                    vm.has_error = true;
                    vm.error = 'All Fields are Required';
                }else if (error.response.status === 401) {
                    vm.has_error = true;
                //   console.log(error.response);
                } else {
                    vm.has_error = true;
                    console.log(error.response);
                }
            }).finally(function(){
                vm.loading = false;
            });
        },
        save_avatar: function(input) {
            let vm = this
            this.loading_avatar = true;
            let file = input.target.files || input.dataTransfer.files;
            
            let formData = new FormData();
            formData.append('username', this.username)
            formData.append('profile_image', file[0])

            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }else{
                console.log('Youre acccessing this page as a guest');
            }

            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;
 
            let req = this.$http.post(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/profile/image`, formData)
                .then(function (response) {
                    if (response.status === 200) {
                        vm.message = "Profile picture updated"                           
                      if (response.data) {
                            console.log(response.data);
                      }
                    }
                })
                .catch(function (error) {
                    console.log(error.response);
                }).finally(function() {
                    vm.loading_avatar = false;
                })
        },
        readURL: function(input) {
            let files = input.target.files  || input.dataTransfer.files;
            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.onload = function(e) {
                    this.banner = e.target.result;                        
                }
                reader.readAsDataURL(files[i]);
            }
        },
        removeImage: function(img) {
            var imgArray = this.image;
            for (let i = 0; i < imgArray.length; i++) {
                if (imgArray[i] === img) {
                    imgArray.splice(i,1);
                }
            }
        },
    }
}
</script>
