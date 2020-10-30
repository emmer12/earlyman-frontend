<template>
  <div class="about">
    <div class="flex col-lg-6 column nowrap justify-content-center align-items-center conent">
        <loading v-if="this.loading"></loading>
        <section class="flex justify-content-center">
            <ul v-if="this.posts" class="flex flex-wrap justify-content-center col-lg-5 blogpost-ul">
                <li class="flex column nowrap"> 
                  <div class="flex column nowrap align-items-center justify-content-center col-lg-6">
                    <p class="flex strong">BLOG</p>
                    <p class="strong blog-title">{{this.posts.title}}</p>
                    <p class="blog-time"><i class="uil uil-clock"></i> {{this.posts.date_posted}} ago</p>
                  </div>
                    <div>
                        <img class="featured-image-full" :src="posts.images[0].image_url" alt="">
                    </div>
                    <div class="flex column nowrap blog-details-holder">
                        <p>
                          {{this.posts.body}}
                        </p>
                    </div>
                </li>
           </ul>
        </section>
      </div>
  </div>
</template>
<style scoped>
.blog-title {
  font-size: 35px;
  margin: 9px;
}
.blog-time {
    color: rgb(145, 145, 145);
    margin-bottom: 9px;
}
.blogpost-ul li {
    width: 100%;
    overflow: hidden;
    margin: 20px;
    background: #fdfdfd;
}
.blogpost-ul li img.featured-image-full {
    width: 100%;
    height: 300px;
    object-fit: cover;
}
.blog-details-holder {
    padding: 20px;
    font-size: 20px;
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
    height: 300px;
}
@media only screen and (max-width: 720px) {
  .col-lg-3, .col-lg-4, .col-lg-5 {
    width: 95%;
  } 
  .blogpost-ul li {
    margin: 9px;
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
import loading from '@/components/loading_blue'

export default {

    components : {
      'loading' : loading,
    },
    data: function() {
        return {
            empty: false,
            loading: false,
            error: false,
            result: '',
            posts : null,
        }
    },
    mounted() {
        this.get_post();
    },
    computed: {
        
    },
    methods: {
        get_post: function() {
            let vm = this
            this.loading = true
            if (window.$cookies.get('auth-token')) {
                this.bearerToken = window.$cookies.get('auth-token');
            }else{
                console.log('Youre acccessing this page as a guest');
            }
            this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.bearerToken;
            
            let req = this.$http
            .get(`${process.env.VUE_APP_API_ENDPOINT}/api/v1/blog/${vm.$route.params.id}`)
            .then(function (response) {
                // Check if response status returns 200. (request is completed)
                if (response.status === 200) {
                    if (response.data.data.blog.length < 1) {
                        vm.empty = true
                    }
                    vm.posts = response.data.data.blog;
                    console.log(vm.posts);
                }else{
                    vm.error = true
                    // console.log(response);
                }
            })
            .catch(function (error) {
                // console.log(error)
                vm.error = true
            })
            .finally(function (){
                vm.loading = false
            })
        }
    }
}
</script>

