<template>
  <div class="about">
    <div class="flex col-lg-6 column nowrap justify-content-center align-items-center conent">
        <section class="flex column nowrap col-lg-4">
          <img class="about-img-1" src="../assets/img/career.svg" alt="">
          <div class="flex column nowrap col-lg-6 nowrap justify-content-center align-items-center conent">
            <p class="text-25 strong">Career</p>
            <p class="flex column justify-content-center col-lg-4 text-center pad-15 text-20">
              At PROPTYBOX, we aim to help people make better decisions about where they live. We believe that helping people optimize their choices around this key life decision, we make the world a better place to living.
            </p>
            <p class='strong'> Careers and Opportunities </p>
            <p>⦁	Accounting and Finance</p>
            <p>⦁	Administration and Business</p>
            <p>⦁	Project Development</p>
            <p>⦁	Customer service </p>
            <p>⦁	Data science and Analytics</p>
            <p>⦁	Sales</p>
            <p>⦁	Training</p>
            <p>⦁	Marketing and communications</p>
            <p>⦁	Human resources</p>
            <p>⦁	Facilities</p>
            <p>⦁	Executives</p>
            <p>⦁	Real estate</p>

          </div>
        </section>
      </div>
  </div>
</template>
<style scoped>
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
.owto li{
  max-width: 500px;
  overflow: hidden;
  margin: 15px;
}
.owto li.lond {
  max-width: auto;
}
.owto li p.eadin, p.eadin {
  font-weight: 500;
  font-size: 20px;
}
.outo-mar {
  margin: 50px;
}
.owto-im {
  width: 390px;
  object-fit: contain;
  margin: 50px;
}
.bii {
  font-weight: 700;
  font-size: 25px;
}
.safety-ul{
  list-style: disc;
  margin: 15px;
}
@media only screen and (max-width: 720px) {
  .col-lg-3, .col-lg-4 {
    width: 90%;
  }   
  .outo-mar {
  margin: 5px;
}
  .text-45 {
    font-size: 25px;
  }
  .about-img-2 {
    height: auto;
  }
  .momm {
    flex-flow: column nowrap;
    margin-bottom: 50px;
  }
  .momm-rev {
    flex-flow: column-reverse nowrap;
    margin-bottom: 50px;
  }
  .owto-im {
    width: 95%;
    object-fit: contain;
    margin: 10px;
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
