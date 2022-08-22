<template>
  <div id="page">
    <section class="page-section padding" id="MyPage" style="height:700px">
          <div class="container">
              <div class="text-center">
                  <h2 class="section-heading text-uppercase" style="color:white ;">My Page</h2>
                  <h3 class="section-subheading " style="color: white ;">로그인 | 회원가입</h3>
              </div>
              <form id="MyPageForm">
                  <div class="row align-items-stretch mb-5">
                      <div class="text-center">
                          <button class="btn btn-primary btn-xl text-uppercase" type="button" onclick="location.href='/user/login'">Log In</button>
                          <button class="btn btn-primary btn-xl text-uppercase" type="button" onclick="location.href='/user/signup'">Sign Up</button>
                      </div>
                  </div>
              </form>
          </div>
      </section>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>

<style>
@import "@/css/styles.css";
</style>
