<template>
<section class="vh-100">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px; margin-bottom: 20px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Welcome!</p>
                <p class="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">가입을 축하합니다!</p>
                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <button class="btn btn-primary btn-lg" onclick="location.href='/'">HOME</button>
                </div>
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
/* eslint-disable */
export default {
  components: {},
  data: function () {
    return {
      user: {
        email: null,
        name: null,
        password: null
      }
    }
  },
  setup () {},
  created () {},
  mounted () {
  },
  unmounted () {},
  methods: {
    // 회원가입 submit
    submitForm: function () {
      // API 요청시 전달할 userData 객체
      const userData = {
        username: this.user.email,
        password: this.user.password,
        name: this.user.name
      }
      const url = 'http://localhost:3000/user/signup'
      const headers = { 'Content-Type':'application/json'};
      //const response = this.axios.post(url, {headers:headers});
      //const { data } = registerUser(userData);
      this.axios.post(url,userData,{headers:headers}).then((res)=>{
      console.log(res)
})
      
      //this.logMessage = `${data.username} 님이 가입되었습니다.`;
      
      // 가입 후 폼 초기화
      //this.initForm();
    },
    initForm: function() {
      this.username = '';
      this.password = '';
      this.nickname = '';
    },
    // 비밀번호 확인
    passwordConfirm: function() {
      if(this.user.password != this.user.password1) {
        alert("비밀번호가 일치하지 않습니다.")
      }
    },
    // 아이디 중복확인
    IdCheck(){
      
      console.log('SignUpView.vue => IdCheck');
      console.log('SignUpView.vue => IdCheck', this.user.email);

      const url = `http://localhost:3000/user/checkemail?email=${this.user.email}`;
      const headers = {"Content-Type":"application/json"};
      const response = this.axios.get(url, {headers:headers});
      console.log(response);

      if(response.data.result === 1){
          alert('중복된 아이디가 존재합니다.')
          this.$refs.user.email.focus();
          return false;
      }
      if(response.data.result === 0){
          alert('사용가능한 아이디입니다')
          this.$refs.user.password.focus();
      }    
    }
  }
}
</script>

<style>
@import "@/css/styles.css";
body{background: #f3f3f3;}
</style>
