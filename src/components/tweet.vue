<template>
    <li v-if="!this.deleted" class="flex nowrap">
        <div class="flex nowrap mar-lr-15">
        <div>
            <!-- tweet image -->
            <router-link :to="{name: 'Profile', params: {'username': tweet.user.username }}">
                <a class="tweet-avatar" href=""> <img :src="tweet.user.avatar_url" alt=""> </a>
            </router-link>
        </div>
        <div class="flex column tweet-tweet">
            <span class = "flex nowrap col-lg-6 justify-content-space-between align-items-center">
                <span class="flex align-items-center">
                    <b>
                        <router-link :to="{name: 'Profile', params: {'username': tweet.user.username } }">
                            <a class="text-14 tweet-author" href=""> {{author}} </a>
                        </router-link>
                    </b> 
                    <!-- <p class="text-14">&nbsp;
                        <router-link :to="{name: 'Profile', params: {'username': tweet.user.username}}">
                            <a href="">@{{tweet.user.username}}</a>
                        </router-link>
                    </p> -->
                </span>
                <div class="flex align-items-center nowrap">
                    <p class="flex align-items-center nowrap text-14"><i class="flex icon material-icons">access_time</i> {{tweet.date_posted}}</p>
                    <div v-if="this.profile && this.profile.id === tweet.user.id" class="more-tab">
                        <i @click.prevent="open_menu" class='material-icons cursor'>expand_more</i>
                        <div v-show="opensmallmenu" class="flex column men">
                            <nav class="flex alig-items-center column nowrap">
                                <router-link :to="{name: 'Promotion', params: {'postid': tweet.id}}">
                                <a class="flex align-items-center nowrap" href=""><i class='material-icons'>style</i> Promote</a>
                                </router-link>
                                <a @click.prevent="deletethis" class="flex align-items-center nowrap" href=""><i class='material-icons'>delete</i> Delete <loading v-if="this.deleting"></loading></a>
                                <!-- <a class="flex align-items-center nowrap" href=""><i class='material-icons'>backspace</i> Close Post</a> -->
                            </nav>
                        </div>
                    </div>
                </div>
            </span>
            <router-link :to="{name: 'Post', params: {'id': tweet.id}}">
                <a class="flex column nowrap" href="">
                    <p><b>{{tweet.title}} </b> </p>
                    <p class="text-14">{{Tbody}}</p>        
                </a>
            </router-link>
           <div class="flex flex-wrap">
                <span class="flex justify-content-center text-13 align-items-center tag-tag " href=""
                v-for="tags in tweet.tags"
                v-bind:key="tags.id"
                v-bind:tweet="tags" >
                    <router-link :to="{name: 'Search', params: {'query': tags.title}}">
                    {{tags.title}}
                    </router-link>
                </span>
           </div>
           <div v-if="img.length > 0">
                <router-link :to="{name: 'Post', params: {'id': tweet.id}}">
                    <img class="tweet-img"
                    v-for="im in img"
                    v-bind:key="im.id"
                    v-bind:tweet="im"
                    :src="im.image_url">
                </router-link>
           </div>
            <span class="flex nowrap tweet-activity text-14">
                <a v-bind:class="has_comment" class="tweet-action-comment" href=""><i class="flex icon material-icons">chat_bubble_outline</i> {{tweet.comments.length}}</a>
                <a @click.prevent="decide" class="tweet-action-like" v-bind:class="{ liked: this.isliked }" href=""><i class="flex icon material-icons">{{like_icon}}</i> {{tweet.likes_count}}</a>
                <!-- <a class="tweet-action-share" href=""><i class="flex icon material-icons">share</i></a> -->
            </span>
            <p v-if="promoted" class="flex nowrap align-items-center promoted"><i class="flex icon material-icons">poll</i>Promoted</p>
        </div>
        </div>
    </li>
</template>
<style scoped>
    p.promoted, p.promoted > i {
        font-size: 14px;
    }
    p.promoted > i {
        color:#2471ff;
    }
    .more-tab {
        position: relative;
    }
    .cursor {
        cursor: pointer;
    }
    .more-tab .men {
        border-radius: 3px;
        position: absolute;
        right: 2px;
        background: #FFF;
        min-width: 190px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 2px 5px;
    }
    .more-tab .men nav a {
        padding: 2px 5px;
        color: #404040;
        font-size: 14px;
        border-bottom: 1px solid rgb(233, 233, 233);
    }
    .more-tab .men nav a i {
        padding: 0 15px;
        height: auto;
        width: auto;
    }
    .xm-icon{
        font-size: 15px;
    }
    .tag-tag a{
        color: #FFF; 
        padding: 2px 5px; margin: 3px;
        background: rgb(252, 80, 80);
        border-radius: 5px;  
    }
    .tweet-action-like.like-am, .tweet-action-like.liked i {
        color: rgb(252, 80, 80);
    }
    .tweet-action-like.liked > i{
        animation: skale-in .3s;
    }
    .tweet-action-comment.has-comment > i {
        color: rgb(117, 80, 160);
    }
    .tweet-action-like:hover {
        color: rgb(252, 80, 80);
    }
    .skale-enter-active {
        animation: skale-in .5s;
    }
    .skale-leave-active {
        animation:  skale-in .5s;
    }
    @keyframes skale-in {
        0% { transform: scale(0.9);}
        20% { transform: scale(0.7);}
        40% { transform: scale(0.5);}
        60% { transform: scale(0.2);}
        80% { transform: scale(0.5);}
        100% { transform: scale(1);}
    }
</style>

<script>
import alertify from 'alertifyjs';
import '../../node_modules/alertifyjs/build/css/alertify.min.css';
import '../../node_modules/alertifyjs/build/css/themes/default.min.css';
import loading from '@/components/loading_blue';

export default {
    data: function () {
        return {
            opensmallmenu: false,
            profile : null,
            deleting: false,
            deleted: false,
        }
    },
    props: ['tweet','isliked', 'promoted'],
    components: {
        loading,        
    },
    mounted() {
        this.profile = this.$store.getters.getuserProfile;
    },
    computed: {
        img: function () {
            let u = this.tweet.images
            let v = u.length
            if (v > 0) {
                if (this.$route.name == 'Post') {
                   return u
                } else {
                    let i = []
                    i.push(u[0])
                  return i
                }
            } else {
                return ''
            }
            return false;
        },
        author: function(){
            return this.tweet.user.firstname+ " "+ this.tweet.user.lastname
        },
       
        //liked changes the color of the icon if the use likes the post
        liked: function () {
            return {
                'like-am': this.isliked
            }
        },
        like_icon: function () {
            if (this.isliked) {
                return 'favorite';
            } else {
                return 'favorite_border';
            }
        },
        has_comment: function () {
            if (this.tweet.is_commented) {
                return 'has-comment';
            }
        },
        Tbody: function () {
            let vm = this
            let body = this.tweet.body
            if (vm.$route.name == 'Post') {
                return body
            }else {
                if (vm.tweet.body.length > 300) {
                return body.substring(0, 250) //+'...more'
                }else {
                    return body
                }
            }
        }
    },
    created() {
    },
    methods: {
        decide: function() {
            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }
            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;
            if (this.isliked) {
                this.isliked = false
                this.unlike()
            } else {
               this.isliked = true 
               this.like()
            }
        },
        like: function() {
            let vm = this; 
            vm.tweet.likes_count += 1;
            let req = this.$http
            .get(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/properties/${this.tweet.id}/like`)
            .then(function (response) {
                // Check if response status returns 200. (request is completed)
                if (response.status === 200) {
                    this.isliked = true
                }
            })
            .catch(function (error) {
                console.log(error.response)
            });
        },
        unlike: function() {
            let vm = this;
            vm.tweet.likes_count -= 1;
            let req = this.$http
            .get(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/properties/${this.tweet.id}/unlike`)
            .then(function (response) {
                // Check if response status returns 200. (request is completed)
                if (response.status === 200) {
                    this.isliked = false
                }
            })
            .catch(function (error) {
                console.log(error.response)
            });
        },
        deletethis: function() {
            const vm = this;
            vm.deleting = true;
            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }
            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;
            let req = this.$http
            .get(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/properties/${this.tweet.id}/delete`)
            .then(function (response) {
                if (response.status === 204) {
                    alertify.notify('Post Deleted', 'success', 5, function(){   });
                    vm.$router.push('/');
                }
            })
            .catch(function (error) {
                alertify.notify('an error occured', 'error', 5, function(){   });  
            }).finally(function(){
                vm.deleting = false;
                vm.deleted = true;
            })
        },
        open_menu: function () {
            if (this.opensmallmenu == false) {
                this.opensmallmenu = true
            } else {
                this.opensmallmenu = false
            }
        }
    }
}
</script>

