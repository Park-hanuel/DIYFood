<template>
<section class="vh-100">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px; margin-bottom: 20px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log In</p>
                <form id="login-form" action="/user/login" method="post" class="mx-1 mx-md-4">
                  <div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">
                        <label class="form-label" for="id">이메일</label>
                        <div>
                          <input type="email" id="id" class="form-control" style="display:inline-block;" placeholder="Email" name="email" required autofocus/>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">
                        <label class="form-label" for="password">비밀번호</label>
                        <input type="password" id="password" class="form-control" placeholder="Password" name="password" required/>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button id="login" type="submit" class="btn btn-primary btn-lg">로그인</button>
                      <a id="join" href="/user/signup" class="btn btn-primary btn-lg">회원가입</a>
                    </div>
                  </div>
                </form>
              </div>

              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                class="img-fluid" style="border-radius:20px;">
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>        
</section>
</template>
<script>
export default {
  components: {},
  data: function () {
  return {
    user: {
      userid: null,
      password: null
    }
  }
},
  setup() {},
  created() {},
  mounted () {},
  unmounted() {},
  methods: {}
}
</script>

<style>
@import "@/css/styles.css";
body{background: #f3f3f3;}
</style>
