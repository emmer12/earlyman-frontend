<template>
    <div class="flex column nowrap">
        <loading v-if="this.loading"></loading>
        <div v-if="this.user">
        <div v-if="verified && this.needed" class="info text-14 mar-15">
            <i @click="offNeeded" class="flex icon material-icons noti-close">close</i>
            confirm your email a  ddress.<br>
            <div class="flex nowrap align-items-center">
                <a @click.prevent="send_confirmation" class="flex align-items-center m-link-btn " href="">
                    &nbsp;Send confirmation link.
                </a>
                <loadingSmall v-if="this.sendingConfirmationMail"></loadingSmall>
            </div>
        </div>    
        <div class="flex column nowrap" href="">
            <div>
                <img class="flex img-user" src="../assets/img/banner.jpg" alt="">
            </div>
            <div>
                <img class="flex img-user-avatar" :src="avatar" alt="">
            </div>
        </div>
        <div class="flex column mar-lr-15">
            <div class="flex">
                <div class="flex column nowrap profile-txt-holder">
                    <div class="flex col-lg-6 column nowrap">
                        <span class="flex nowrap align-items-center">
                            <p class="text-20"><b>{{fullname}}</b></p>&nbsp;&nbsp;&nbsp;&nbsp;
                             <router-link :to="{name: 'Edit profile'}">
                                <a class="flex align-items-center button-sm btn-rounded btn-hollow" href="">
                                    <p class="">&nbsp; edit</p>
                                </a>
                            </router-link>
                        </span>
                        <p class="text-14">@{{user_handle}}</p>
                        <p class="text-13">{{bio}}</p>
                        <span class="flex nowrap">
                            <p class="flex align-items-center text-13">
                                <i class="flex icon material-icons">place</i> &nbsp; {{location}}
                            </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <p class="flex align-items-center text-13">
                                <i class="flex icon material-icons">date_range</i> &nbsp; {{birthday}}
                            </p>
                        </span>
                        <div class="flex justify-content-center col-lg-6">
                            <div class="flex align-items-center col-lg-6 justify-content-space-between">
                                <a class="flex justify-content-center align-items-center pon-call" v-bind:href="'tel:'+phone">
                                    <i class="flex icon material-icons">call</i>
                                </a>
                                <p class="text-12 mar-lr-20">Place a call &nbsp;&nbsp;|&nbsp;&nbsp; Send a mail </p>
                                <a style="margin-right: 9px;" class="flex justify-content-center align-items-center pon-call" v-bind:href="'mailto:'+email">
                                    <i class="flex icon material-icons">mail</i>
                                </a>
                                
                            </div>
                        </div>              
                    </div>
                </div>
            </div>
            </div>
            <div>
                <div class="mipostholder flex align-items-center"><p class="miposthead">My posts</p></div>
                <ol v-if="this.tweets" class="tweets">
                    <tweet
                    v-for="tweet in this.tweets"
                    v-bind:key="tweet.id"
                    v-bind:isliked="tweet.is_liked"
                    v-bind:tweet="tweet"
                    ></tweet>
                </ol>
            </div> 
        </div>
    </div>
</template>
<style scoped>
.mipostholder {
    background: #EDF3FE;
    border-bottom: 1px solid rgb(206, 211, 221);
}
.miposthead {
    font-weight: bold;
    margin: 5px 15px;
}
    a.m-link-btn {
        color: rgb(13, 84, 126);
        cursor: pointer;
        font-weight: bold;
    }
    a.pon-call {
        width: 50px; height: 50px;
        border-radius: 25px;
        margin: 20px 0;
        background: #4285F4; color:#FFF;
    }
</style>

<script>
import tweet from '@/components/tweet';
import loading from '@/components/loading_blue';
import loadingSmall from '@/components/loading_blue_small';
import alertify from 'alertifyjs';
import { getProfile } from '@/mixins/getProfile.js';
import '../../node_modules/alertifyjs/build/css/alertify.min.css';
import '../../node_modules/alertifyjs/build/css/themes/default.min.css';

export default {
    mixins: [getProfile],
    components : {
        loading,
        loadingSmall,
        tweet,
    },
    data() {
        return {
            user : null,
            loading: false,
            sendingConfirmationMail: false,
            needed: true,
            tweets: null,
        }
    },
    computed: {
        avatar: function(){
           return this.user.avatar_url 
        },
        user_handle: function(){
           return this.user.username 
        },
        email: function(){
           return this.user.email 
        },
        fullname: function() {
           return this.user.firstname+ " " + this.user.lastname
        },
        bio: function() {
            if (this.user && this.user.profile) {
                return this.user.profile.bio 
            }
        },
        location: function() {
            if (this.user && this.user.profile) {
                return this.user.profile.location 
            }
        },
        birthday: function() {
            if (this.user && this.user.profile) {
                return this.user.profile.birthday 
            }
        },
        phone: function() {
            if (this.user && this.user.profile) {
                return this.user.profile.phone 
            }
        },
        verified: function() {
            if (this.user && this.user.active !== 1) {
                return true 
            }else {
                return false
            }
        },

    },
    async mounted() {
        let vm = this;
        if (!vm.$store.getters.getuserProfile) {
            await vm.getUserProfile();
        }
        vm.user = vm.$store.getters.getuserProfile;
        vm.getMyPosts();
    },
    methods: {
        getMyPosts: function(){
            let vm = this;
            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }
            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;

            let req = this.$http
            .get(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/profile/properties`)
            .then(function (response) {
                if (response.status === 200) {
                    vm.tweets = response.data.data.properties;  
                }
            })
            .catch(function (error) {
            })
            .finally(function(){
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
            .post(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/auth/signup/request/confirmation-email`, { email: vm.user.email })
            .then(function (response) {
                if (response.status === 200) {
                    alertify.notify('Link sent', 'success', 5, function(){   });  
                }
            })
            .catch(function (error) {
                alertify.notify('Unable to send confrmation link. Try again later', 'error', 5, function(){   });  
            })
            .finally(function(){
                vm.sendingConfirmationMail = false;
            });
        },
        offNeeded: function() {
            this.needed = false;
        }
    }  

}
</script>

<style scoped>
    body{
        background: #EDF3FE;
        font-family: 'PT Sans', sans-serif;
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
</style>
