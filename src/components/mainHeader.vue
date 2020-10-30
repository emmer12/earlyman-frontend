<template>
    <div id="mainheader" class="header flex align-items-center justify-content-center col-lg-6">
        <div class="flex align-items-center justify-content-space-between col-lg-5 col-mb-6">
            <div class="flex align-items-center">
                <div>
                    <router-link :to="{name: 'Home'}">
                        <a id="loo" class="flex header-logo" href="">
                            <img class="" src="../assets/logo.svg" alt="">
                        </a>
                    </router-link>
                </div>
                <nav class="flex align-items-center hide-for-mobile">
                    <ol class="flex mar-15 main-menu col-mb-6 justify-content-space-between">
                        <li>
                            <router-link :to="{name: 'Home'}">
                                <a class="flex align-items-center active" href="">
                                    <p class="">&nbsp; Home</p>
                                </a>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'About'}">
                                <a class="flex align-items-center" href="">
                                    <p class="">&nbsp; About</p>
                                </a>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'Privacy policy'}">
                                <a class="flex align-items-center" href="">
                                    <p class="">&nbsp; Privacy</p>
                                </a>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'Search'}">
                                <a class="flex align-items-center" href="">
                                    <p class="">&nbsp; Search</p>
                                </a>
                            </router-link>
                        </li>
                        
                    </ol>
                    <ol v-show="this.$cookies.get('pt-loggedIn') != 'true'" class="flex ">
                        <li>
                            <router-link :to="{name: 'login'}">
                                <a class="flex align-items-center button-sm btn-rounded btn-hollow" href="">
                                    <p class="">&nbsp; Login</p>
                                </a>
                            </router-link>
                        </li>
                         <li>
                            <router-link :to="{name: 'sign_up'}">
                                <a class="flex align-items-center button-sm btn-rounded btn-hollow" href="">
                                    <p class="">&nbsp; Sign up</p>
                                </a>
                            </router-link>
                        </li>
                    </ol>
                </nav>
            </div>
            
            <div class="header-search-holder ">
                <div>
                   <a class="show-for-mobile hambuger-menu" href="" @click.prevent="openMenu">
                       <i class="flex icon material-icons">menu</i>
                   </a>
                </div>
                <div v-if="this.$cookies.get('pt-loggedIn') === 'true'">
                    <a @click.prevent="toggleSidebar" id="menu-toggle" class="flex header-avatar-holder" href="">
                        <img class="header-avatar" v-show="this.$store.getters.getuserProfile" :src="this.$store.getters.getuserProfile.avatar_url" alt="">
                    </a>
                </div>
            </div>
        </div>
        <!-- mobile menu starts -->
        <div v-show="this.openMobileMenu" class="flex justify-content-center align-items-center col-lg-6 vh-100 mobile-menu-holder">
            <div @click="closeMenu" class="flex justify-content-center align-items-center col-lg-6 vh-100 absolute mobile-menu-black-bg">
                <div class="flex column justify-content-center absolute mobile-menu-w-bg">
                    <ol class="mobile-menu-ol">
                        <li>
                            <router-link :to="{name: 'Home'}">
                                <a class="flex align-items-center m-link" href="">
                                    <p class="">&nbsp; Home</p>
                                </a>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'About'}">
                                <a class="flex align-items-center m-link" href="">
                                    <p class="">&nbsp; About</p>
                                </a>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'Search'}">
                                <a class="flex align-items-center m-link" href="">
                                    <p class="">&nbsp; Search</p>
                                </a>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'Advertise'}">
                                <a class="flex align-items-center m-link" href="">
                                    <p class="">&nbsp; Advertise</p>
                                </a>
                            </router-link>
                        </li>
                        <li v-show="this.$cookies.get('pt-loggedIn') != 'true'" class="flex nowrap justify-content-space-between">
                            <router-link :to="{name: 'login'}">
                                <a class="flex align-items-center m-link-btn " href="">
                                    <p class="">&nbsp; Login</p>
                                </a>
                            </router-link>
                            <router-link :to="{name: 'sign_up'}">
                                <a class="flex align-items-center m-link-btn " href="">
                                    <p class="">&nbsp; Sign up</p>
                                </a>
                            </router-link>
                        </li>
                    </ol>
                    <div class="flex justify-content-center align-items-center mobile-menu-lower-div nowrap">
                            <router-link :to="{name: 'Privacy policy'}">
                                <a class="flex align-items-center m-link" href="">
                                    <p class="">&nbsp; Privacy policy</p>
                                </a>
                            </router-link>
                            <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</p>
                            <router-link :to="{name: 'Home'}">
                                <a class="flex align-items-center" href="">
                                    <p class="">&nbsp; Terms of service</p>
                                </a>
                            </router-link>
                    </div>
                </div>
            </div>
        </div>
        <aside v-show="this.$store.getters.getsidebarState" id="sidenav" class="flex column nowrap sidenav">
            <div class="flex column justify-content-center mar-tb-30">
                <span class="flex column mar-lr-20">
                    <p class="flex justify-content-space-between align-items-center"><b>Account info</b> <a @click.prevent="toggleSidebar"><i class="flex icon material-icons">cancel</i></a></p>
                    <h2 class="strong">{{fullname}}</h2>
                    <p style="margin:0;"><a class="flex white" href="#">@{{this.user_handle}}</a> </p>
                </span>
            </div>
            <nav>
                <ul class="flex column menu">
                    <li @click.prevent="toggleSidebar">
                        <router-link :to="{name: 'My Profile'}">
                            <i class="flex icon material-icons">person_pin</i>Profile
                        </router-link>
                    </li>
                    <li @click.prevent="toggleSidebar">
                        <router-link :to="{name: 'Search', params: {'query': 'selling'}}">
                          <i class="flex icon material-icons">loyalty</i> Selling
                        </router-link>
                    </li>
                    <li @click.prevent="toggleSidebar">
                        <router-link :to="{name: 'Search', params: {'query': 'buying'}}">
                            <i class="flex icon material-icons">local_mall</i>Buying
                        </router-link>        
                    </li>
                    <li @click.prevent="toggleSidebar">
                        <router-link :to="{name: 'My Subscription'}">
                            <i class="flex icon material-icons">local_activity</i>Property tweet ads
                        </router-link>
                    </li>
                    <li v-if="this.profile && this.profile.is_admin" @click.prevent="toggleSidebar">
                        <router-link :to="{name: 'Compose Blog post'}">
                            <i class="flex icon material-icons">create</i>Create blog post
                        </router-link>
                    </li>
                    <li @click.prevent="toggleSidebar">
                        <router-link :to="{name: 'Admin Blog'}">
                            <i class="flex icon material-icons">book</i>View blog posts
                        </router-link>
                    </li>
                    <!-- <li><a to="/about"><i class="flex icon material-icons">help</i>Help</a> </li> -->
                    <li class="flex align-items-center nowrap"><a @click.prevent="logout"><i class="flex icon material-icons">power_settings_new</i>
                    Logout <loading v-if="this.loggingout"></loading></a> 
                    </li>
                </ul> 
            </nav>
        </aside>
       
    </div>
</template>
<style scoped>
    
    .mobile-menu-holder {
        position: fixed;
        top: 0; left: 0;
    }
    .mobile-menu-black-bg {
        background: rgba(0, 0, 0, 0.3);
        z-index: 99;
    }
    .mobile-menu-w-bg {
        background: #FFF;
        padding: 0px;
        border-radius: 7px;
        min-width: 300px;
        z-index: 99999;
        margin-top: -55px;
        z-index: 999;
    }
    .mobile-menu-ol {
        padding: 0;
        margin: 20px 0;
    }
    .mobile-menu-ol li a {
        cursor: pointer;
    }
    .mobile-menu-ol li a.m-link {
        color: #404040;
        padding: 5px 20px;
        margin: 0;
        cursor: pointer;
    }
    .mobile-menu-ol li a.m-link-btn {
        color: #FFF;
        padding: 5px 20px;
        cursor: pointer;
        border: 1px solid #4285F4;
        background: #4285F4;
        margin: 9px 25px;
        border-radius: 30px;
        font-weight: 500;

    }
    .mobile-menu-lower-div {
        border-top: 1px solid #CCC;
        font-size: 13px;
        padding: 5px 5px;
    }
    .hambuger-menu {
        font-size: 30px;
        margin:  0 15px;
    }
    .hambuger-menu i {
        font-size: 35px;
    }
</style>

<script>
import { getProfile } from '@/mixins/getProfile.js';
import loading from '@/components/loading_blue_small'
export default {
    name: 'mainheader',
    props: ['avatarUrl'],
    mixins: [getProfile],
    components: {
        loading,
    },
    data() {
        return {
            profile : null,
            openMobileMenu: false,
            loggingout:false,
            avatar: null,
        }
    },
    async mounted() {
        let vm = this;
        vm.profile = vm.$store.getters.getuserProfile;
        vm.avatar = this.profile.avatar_url;
    },
    computed: {
        avatar2: function(){
            let vm = this;
            if (this.profile) {
                return this.profile.avatar_url;
            }
        },
        user_handle: function(){
            if(this.profile){
                return this.profile.username 
            }
        },
        fullname: function() {
            if (this.profile) {
                return this.profile.firstname+ " " + this.profile.lastname
            }
        }

    },
    methods: {
        openMenu: function() {
            this.openMobileMenu = true;
        },
        closeMenu: function() {
            this.openMobileMenu = false;
        },
        toggleSidebar: function() {
            let vm = this;
            if (!vm.$store.getters.getuserProfile) {
                vm.getUserProfile();
            }
            vm.profile = vm.$store.getters.getuserProfile;
            if (this.$store.getters.getsidebarState) {
                this.$store.commit('setsidebarState', false)
            } else {
                this.$store.commit('setsidebarState', true)
            }
        },
        logout: function() {
            let vm = this;
            vm.loggingout = true;
            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }else{
                console.log('Youre acccessing this page as a guest');
            }
            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;
            let req = this.$http
            .get(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/auth/logout`)
            .then(function (response) {
                if (response.status === 200) {
                    window.$cookies.remove('auth-token')  
                    vm.$cookies.set('pt-loggedIn', false)   
                    localStorage.removeItem('pt-profile')                
                    vm.$router.push('/login');
                }
            })
            .catch(function (error) {
            }).finally(function (){
                vm.loggingout = false;
            })
        }
    } 
}
</script>
