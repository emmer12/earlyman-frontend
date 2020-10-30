<template>
    <div class="flex column nowrap">
        <loading v-if="this.loading"></loading>
        <div v-if="this.user">

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
                        <p class="text-20"><b>{{fullname}}</b></p>
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
                        <div class="flex col-lg-6">
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
      </div>
    </div>
</template>
<style scoped>
    a.pon-call {
        width: 50px; height: 50px;
        border-radius: 25px;
        margin: 20px 0;
        background: #4285F4; color:#FFF;
    }
</style>

<script>
import loading from '@/components/loading_blue';
import { getProfile } from '@/mixins/getProfile.js';

export default {
    mixins: [getProfile],
    components : {
        loading,
    },
    data() {
        return {
            user : null,
            loading: false
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

    },
    mounted() {
        this.getUserProfile()
    },
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
