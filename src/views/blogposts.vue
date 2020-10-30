<template>
  <div class="about">
    
    <div class="flex col-lg-6 column nowrap justify-content-center align-items-center conent">
        <loading v-if="this.loading"></loading>
        <section class="flex column nowrap col-lg-4">
          <div class="flex column nowrap col-lg-6 nowrap justify-content-center align-items-center conent">
            <p class="text-25 strong">Blog</p>
          </div>
          
        </section>
        <section class="flex justify-content-center">
            <ul class="flex flex-wrap justify-content-center col-lg-6 blog-ul">
                <li class="flex column nowrap"
                    v-for="post in this.posts"
                    v-bind:key="post.id"
                    v-bind:post="post"
                    > 
                    <div>
                        <router-link v-if="post.images.length > 0" :to="{name: 'Blog Post', params: {'id': post.id}}">
                            <img class="featured-image" :src="post.images[0].image_url" alt="">
                        </router-link> 
                    </div>
                        <router-link :to="{name: 'Blog Post', params: {'id': post.id}}">
                        <div class="flex column nowrap blog-details-holder">
                            <p class="strong blog-title">{{post.title}}</p>
                            <p> {{post.body.substring(0, 250)}} ... </p>
                        </div>
                        </router-link>
                        <p class="blog-time">
                            <i class="uil uil-clock"></i>
                            {{post.date_posted}} ago</p>
                </li>
            </ul>
        </section>
      </div>
     
  </div>
</template>
<style>
.blog-title {
    font-size: 25px;
}
.blog-time {
    font-size: 13px;
    margin-top: 9px;
    margin-left: 10px;
    color: rgb(145, 145, 145);
}
.blog-ul li {
    width: 375px;
    overflow: hidden;
    margin: 10px;
    border-radius: 2px;
    background: #fdfdfd;
}
.blog-ul li img.featured-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
.blog-details-holder {
    padding: 15px 9px;
    font-size: 14px;
}
.about {
  background: #FFF;
}
.about-img-1 {
    width: 100%;
    object-fit: contain;
    height: 200px;
    margin-top: 20px;
    margin-bottom: 9px;
}
.img-holder-2 {
  position: relative;
}
.overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 500px;
  background:rgba(0,0,0,0.5) url("../assets/img/pattern_1.png") repeat;
}
.overlay-text {
  position: absolute;
}
.about-img-2 {
    width: 100%;
    object-fit: cover;
    height: 500px;
}
@media only screen and (max-width: 720px) {
  .col-lg-3, .col-lg-4 {
    width: 90%;
  }   
  .blog-ul li {
    width: 90%;
    border: none;
}
  .text-45 {
    font-size: 25px;
  }
  .about-img-2 {
    height: auto;
  }
  .overlay {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 270px;
    background:rgba(0,0,0,0.5) url("../assets/img/pattern_1.png") repeat;
  }
}
</style>
<script>
// @ is an alias to /src
import loading from '@/components/loading_blue';

export default {
    components : {
        'loading' : loading,
    },
    data : function() {
        return {
           has_post: false,
           posts : '',
           loading: false,
           error: false,
           empty: false,
        }
    },
    computed: {
        
        Tbody: function () {
            let vm = this
            let body = this.body.body
            if (vm.$route.name == 'Post') {
                return body
            }else {
                if (vm.tweet.body.length > 300) {
                return body.substring(0, 250) //+'...more'
                }else {
                    return body
                }
            }
        },
    },
    created() {
            let vm = this;
            this.loading = true;
            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }
            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;

            let req = this.$http
            .get(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/blog`)
            .then(function (response) {
                // Check if response status returns 200. (request is completed)
                if (response.status === 200) {
                    
                    if (response.data.data.blog.length < 1) {
                        vm.empty = true
                    }
                    vm.posts = response.data.data.blog;
                    vm.has_posts = true
                }else{
                    vm.error = true
                }
            })
            .catch(function (error) {
                vm.error = true
            })
            .finally(function (){
                vm.loading = false
            })

    },
    methods: {
        deletePost(id) {
            let vm = this;
            this.loading = true
            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }
            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;

            let req = this.$http
            .get(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/blog/${id}/delete`)
            .then(function (response) {
                console.log(response);
                
                // Check if response status returns 200. (request is completed)
                if (response.status === 200) {
                    
                  
                }else{
                    vm.error = true
                }
            })
            .catch(function (error) {
                console.log(error)
                vm.error = true
            })
            .finally(function (){
                vm.loading = false
            })

        },
    }
}
</script>
