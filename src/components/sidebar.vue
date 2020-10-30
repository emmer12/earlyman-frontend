<template>
    <aside id="sidenav" class="flex column nowrap sidenav">
        <div class="flex column justify-content-center mar-tb-30">
            <span class="flex column mar-lr-20">
                <p class="flex justify-content-space-between align-items-center"><b>Account info</b> <a><i class="flex icon material-icons menu-close">cancel</i></a></p>
                <h2 class="strong">{{fullname}}</h2>
                <p style="margin:0;"><a class="flex white" href="#">@{{this.user_handle}}</a> </p>
            </span>
        </div>
        <nav>
            <ul class="flex column menu">
                <li>
                    <router-link :to="{name: 'My Profile'}">
                        <i class="flex icon material-icons">person_pin</i>Profile
                    </router-link>
                </li>
                <li><a to="/"><i class="flex icon material-icons">loyalty</i> Selling</a> </li>
                <li><a to="/"><i class="flex icon material-icons">local_mall</i>Buying</a> </li>
                <li><a to="/about"><i class="flex icon material-icons">assessment</i>Analytics</a> </li>
                <li><a to="/about"><i class="flex icon material-icons">local_activity</i>Property tweet ads</a> </li>
                <li><a to="/about"><i class="flex icon material-icons">help</i>Help</a> </li>
                <li><a to="/"><i class="flex icon material-icons">help</i>Admin</a> </li>
                <li><a to="/about"><i class="flex icon material-icons">help</i>Create blog post</a> </li>
                <li><a to="/about"><i class="flex icon material-icons">help</i>View Blog posts</a> </li>
                <li><a to="/about"><i class="flex icon material-icons">power_settings_new</i>Logout</a> </li>
            </ul> 
        </nav>
    </aside>
</template>
<script>
export default {
    data() {
        return {
            profile : JSON.parse(localStorage.getItem('pt-profile'))
        }
    },
    computed: {
        user_handle: function(){
            if(this.profile == null){
                return '' 
            }else{
                return this.profile.username 
            }
        },
        fullname: function() {
            if (this.profile == null) {
                return ''
            } else {
                return this.profile.firstname+ " " + this.profile.lastname
            }
        }
    } 

}
</script>

