<template>
    <li class="flex column nowrap">
        <div class="flex nowrap">
            <div>
                <router-link :to="{name: 'Profile', params: {'username': comment.user.username } }">
                    <img class="comment-avatar" :src="comment.user.avatar_url" alt="">
                </router-link>
            </div>
            <div class="flex column nowrap comment-asset">
                <div class="flex">
                    <router-link :to="{name: 'Profile', params: {'username': comment.user.username } }">
                        <a class="blue-link" href="">{{author}}</a>&nbsp;&nbsp;
                    </router-link>
                    <!-- <router-link :to="{name: 'Profile', params: {'username': comment.user.username } }">
                        <a class="ash-link" href="">@{{comment.user.username}}</a>&nbsp;
                    </router-link> -->
                    <a class="ash-link" href="">- {{date}}</a>
                </div>
                <div class="flex column nowrap">
                    <p>{{comment.body}}</p>
                    <img class="tweet-img"
                        v-for="img in comment.images"
                        v-bind:key="img.id"
                        v-bind:img="img"
                        :src="img.image_url">
                </div>
            </div>
        </div>
    </li>
</template>
<script>
import moment from 'moment';

export default {
    props: ['comment'],
    computed: {
        author: function() {
            return this.comment.user.firstname+ ' '+ this.comment.user.lastname
        },
        date: function() {
            let dar = new Date(this.comment.created_at);
            return moment(dar).fromNow();
        }
    },
    methods: {
       
    } 
}
</script>

