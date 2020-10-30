<template>
  <div class="o-content">
    <header class="content-header">
      <menu>
        <ul class="flex nowrap align-items-center content-menu">
          <li>
            <router-link :to="{name: 'Home'}">
                <a href="/">Home</a>
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'About'}">
                <a href="About">About</a>
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'Blog'}">
                <a href="/blog">Blog</a>
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'Privacy policy'}">
                <a href="privacy">Privacy policy</a>
            </router-link>
          </li>
        </ul>
      </menu>
    </header>
    <router-view></router-view>
    <footer class="flex flex-wrap justify-content-center">
        <div class="flex column nowrap pad-15">
          <p>&copy; 2019 Proptybox.</p>
          <p>All Rights Reserved.</p>
          <p class="flex nowrap text-25">
            <a target="_blank" href="https://www.instagram.com/proptybox/"><i class="uil uil-instagram"></i></a>
            <a target="_blank" href="https://www.linkedin.com/company/proptybox"><i class="uil uil-linkedin"></i></a>
            <a target="_blank" href="https://twitter.com/proptybox?s=20"><i class="uil uil-twitter"></i></a>
            <a target="_blank" href="https://facebook.com/Proptyboxcom-111928603706617/?view_public_for=111928603706617"><i class="uil uil-facebook"></i></a>
          </p>
        </div>
        <div>
          <menu class="flex column nowrap">
            <a href="/">Home</a>
            <a href="/career">Career</a>
            <a href="/advertise">Advertise</a>
            <a href="">Partners</a>
          </menu>
        </div>
        <div>
          <menu class="flex column nowrap">
            <a href="/privacy">Privacy policy</a>
          </menu>
        </div>
        <div class="flex column nowrap">
          <a href="tel:09043712006">09043712006</a>
          <a href="tel:08160563284">08160563284</a>
          <a href="tel:08050842473">08050842473</a>
          <a href="mailto:Hello@proptybox.com">Hello@proptybox.com</a>
        </div>
      </footer>
  </div>
</template>
<style scoped>
.o-content {
  background: #FFF;
}
.content-menu li a {
  display: flex;
  margin-top: 5px;
  color: #FFF;
  padding: 3px 9px;
}
footer {
    background: #1b1a29;
    color: #FFF;
    padding: 25px;
    font-size: 14px;
}
footer > div {
  margin: 2px 20px;
}
footer a {
  display: flex;
  color: #DCE8FD;
  padding: 3px;
}
@media only screen and (max-width: 720px) {
  footer {
    justify-content: flex-start;
    flex-flow: column nowrap;
  }
  footer > div {
    margin: 13px  20px;
  }
}
</style>
