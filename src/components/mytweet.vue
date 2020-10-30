<template>
    <li class="flex nowrap">
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
                            <a class="tweet-author" href=""> {{author}} </a>
                        </router-link>
                    </b> 
                    <p class="text-14">&nbsp;
                        <router-link :to="{name: 'Profile', params: {'username': tweet.user.username}}">
                            <a href="">@{{tweet.user.username}}</a>
                        </router-link>
                    </p>
                </span>
                <div class="flex align-items-center nowrap">
                    <p class="flex align-items-center nowrap text-14"><i class="flex icon material-icons">access_time</i> {{tweet.date_posted}}</p>
                    <div class="more-tab">
                        <i @click.prevent="open_menu" class='material-icons cursor'>expand_more</i>
                        <div v-show="opensmallmenu" class="flex column men">
                            <nav class="flex alig-items-center column nowrap">
                                <a class="flex align-items-center nowrap" href=""><i class='material-icons'>style</i> Promote</a>
                                <a class="flex align-items-center nowrap" href=""><i class='material-icons'>delete</i> Delete</a>
                                <a class="flex align-items-center nowrap" href=""><i class='material-icons'>backspace</i> Close Post</a>
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
           <div class="flex ">
                <span class="flex justify-content-center text-13 align-items-center tag-tag " href=""
                v-for="tags in tweet.tags"
                v-bind:key="tags.id"
                v-bind:tweet="tags" >
                    <router-link :to="{name: 'Search', params: {'query': tags.title}}">
                    {{tags.title}}
                    </router-link>
                </span>
           </div>
            <router-link :to="{name: 'Post', params: {'id': tweet.id}}">
                <img class="tweet-img" v-if="img" :src="img">
            </router-link>
            <span class="flex nowrap tweet-activity text-14">
                <a v-bind:class="has_comment" class="tweet-action-comment" href=""><i class="flex icon material-icons">chat_bubble_outline</i> {{tweet.comments.length}}</a>
                <transition name="skale">
                    <a @click.prevent="decide" class="tweet-action-like"  v-bind:class="{liked: this.isliked }" href=""><i class="flex icon material-icons">{{like_icon}}</i> {{tweet.likes_count}}</a>
                </transition>
                <a class="tweet-action-share" href=""><i class="flex icon material-icons">share</i></a>
            </span>
        </div>
        </div>
    </li>
</template>
<style scoped>
    .more-tab {
        position: relative;
    }
    .cursor {
        cursor: pointer;
    }
    .more-tab .men {
        border-radius: 5px;
        position: absolute;
        right: 2px;
        background: #FFF;
        min-width: 190px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 2px 5px;
    }
    .more-tab .men nav a {
        padding: 2px 9px;
        color: #404040;
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
    .tweet-action-like.like-am > i{
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
export default {
    data: function () {
        return {
            opensmallmenu: false
        }
    },
    props: ['tweet','isliked'],
    mounted() {
    },
    computed: {
        img: function () {
            let u = this.tweet.images
            let v = u.length
            if (v > 0) {
                return u[0].image_url
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
                'like-am': this.isLiked
            }
        },
        like_icon: function () {
            if (this.isliked) {
                return 'favorite'
            } else {
                return 'favorite_border'
            }
        },
        has_comment: function () {
            if (this.tweet.comments.length > 0) {
                return 'has-comment'
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
        console.log(this.isliked)

    },
    methods: {
        decide: function() {
            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }else{
                console.log('Youre acccessing this page as a guest');
            }
            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;
            if (this.isLiked) {
                this.isLiked = false
                this.unlike()
            } else {
               this.isLiked = true 
               this.like()
            }
        },
        like: function() {
            
            let vm = this; 
            let req = this.$http
            .get('http://localhost:8000/api/v1/properties/'+this.tweet.id+'/like')
            .then(function (response) {
                // Check if response status returns 200. (request is completed)
                if (response.status === 200) {
                    console.log(response.data);
                    this.isLiked = true
                }
            })
            .catch(function (error) {
                console.log(error.response)
            });
        },
        unlike: function() {
            let req = this.$http
            .get('http://localhost:8000/api/v1/properties/'+this.tweet.id+'/unlike')
            .then(function (response) {
                // Check if response status returns 200. (request is completed)
                if (response.status === 200) {
                    console.log(response.data);
                    this.isLiked = false
                }
            })
            .catch(function (error) {
                console.log(error.response)
            });
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

