<template>
<section class="vh-100">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px; margin-bottom: 20px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">My Info</p>
                <form class="mx-1 mx-md-4">
                  <div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">
                        <label class="form-label" for="id">이메일</label>
                        <div>
                          <input type="email" id="id" class="form-control" style="display:inline-block;" placeholder={{user.userid}} v-model="user.userid" readonly/>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">                      
                        <label class="form-label" for="name">이름</label>
                        <input type="text" id="name" class="form-control" placeholder="Name" v-model="user.name" required/>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">
                        <label class="form-label" for="password">비밀번호</label>
                        <input type="password" id="password" class="form-control" placeholder="Password" v-model="user.password" required/>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">
                        <label class="form-label" for="password1">비밀번호 확인</label>
                        <input type="password" id="password1" class="form-control" placeholder="Password Repeat" v-model="user.password1" @blur="passwordConfirm()" required/>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button class="btn btn-primary btn-lg" @click="submitForm()">회원정보 수정</button>
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
import { registerUser } from '@/api/index';

export default {
  components: {},
  data: function () {
  return {
    nowDate:'',
    user: {
      userid: null,
      name: null,
      password: null
    }
  }
},
  setup() {},
  created() {},
  mounted () {
    this.timer = setInterval(() => {    
    this.setNowTimes()
    this.passwordConfirm
  },1000)},
  unmounted() {},
  methods: {
    // 회원가입 submit
    async submitForm() {
      // API 요청시 전달할 userData 객체
      const userData = {
        username: this.user.userid,
        password: this.user.password,
        name: this.user.name,
        date: this.nowDate
      };
      const { data } = await registerUser(userData);
      
      this.logMessage = `${data.username} 님의 회원정보가 수정되었습니다.`;
    },
    // 비밀번호 확인
    passwordConfirm: function() {
      if(this.user.password != this.user.password1) {
        alert("비밀번호가 일치하지 않습니다.")
      }
    },
    // 현재 날짜
    setNowTimes() {
      let myDate = new Date() 
      let yy = String(myDate.getFullYear())  
      let mm = myDate.getMonth() + 1  
      let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      this.nowDate = yy + '-' + mm + '-' + dd
    },
  }
}
</script>

<style>
@import "@/css/styles.css";
body{background: #f3f3f3;}
</style>
