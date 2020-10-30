import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tweets: '',
    promotedTweets: '',
    sidebarState: false,
    regstatusState: false,
    userProfile: null,
    userAvatar: null,
  },
  mutations: {
    //changes the loading state
    setTweets(state, tweets){
      state.tweets = tweets
    },
    setPromotedTweets(state, tweets){
      state.promotedTweets = tweets
    },
    setsidebarState(state, newstate){
      state.sidebarState = newstate
    },
    setregstatusState(state, newstate){
      state.regstatusState = newstate
    },
    setuserProfile(state, newstate){
      state.userProfile = newstate
    },
  },
  getters: {
    getTweets: state => state.tweets,
    getPromotedTweets: state => state.promotedTweets,
    getsidebarState: state => state.sidebarState,
    getregstatusState: state => state.regstatusState,
    getuserProfile: state => state.userProfile,
  },
  actions: {

  }
})
