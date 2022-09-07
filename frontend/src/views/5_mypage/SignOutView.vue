<template>
  <body id="page" style="text-align: center;">
    <div style="margin-top: 40px; margin-bottom: 30px;">
      <p style="font-size:2em; font-weight:500; line-height:70px;">
        회원 탈퇴
      </p>
    </div>
    <section class="content-box">
      <div style="margin-top:30px;">
        <p>회원 탈퇴 시, 회원님의 <b>모든 개인정보 및 이용정보가 삭제</b>되며 <b>복구가 불가능</b>합니다.</p>
        <p>회원님의 <b>기존 보유 식재료 목록, 레시피 목록, 식단 계획 정보, 식단 분석 기록</b>이 삭제됩니다.</p>
        <p>탈퇴 이후 언제든 재가입이 가능합니다.</p>
        <img src="@/assets/logo.png" alt="" width="30%">
      </div>
    </section>
    <div style="display: inline-block;">
      <a href="/">
        <input type="button" class="btn btn-lg next-button" value="돌아가기" style="color:#326b23; font-weight:500">
      </a>
      <!-- <a href="/"> -->
        <input type="button" class="btn btn-lg next-button" value="탈퇴하기" style="color:grey" @click="signOut()">
      <!-- </a> -->
    </div>
  </body>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      user: {
        email: '',
        name: ''
      }
    }
  },
  setup () {},
  created () {
    this.getUserInfo()
  },
  mounted () {},
  unmounted () {},
  methods: {
    getUserInfo () {
      const url = 'http://localhost:3000/user/info'
      this.$axios.get(url, { withCredentials: true })
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            this.user.email = res.data.email
            this.user.name = res.data.name
          } else if (res.data.message) {
            alert(res.data.message)
          }
        })
    },
    signOut () {
      if (confirm('탈퇴 처리는 취소할 수 없습니다. 정말 탈퇴하시겠습니까?')) {
        const url = 'http://localhost:3000/user/info'
        this.$axios.delete(url, { withCredentials: true })
        alert('회원 탈퇴 처리가 완료되었습니다.')
        location.href = '/'
      } else {
        console.log('다행 휴..')
      }
    }
  }
}
</script>

<style>
body{background: #f3f3f3;}
.content-box{
  float: left;
  width: 60%;
  height: auto;
  background-color:white;
  margin-bottom: 10px;
  margin-right:20%;
  margin-left: 20%;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
}
.next-button {
  height: 50px;
  border-radius: 10px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  margin: 20px;
  margin-top:40px;
  background-color: #ffffff;
  float: left;
}
.next-button:hover {
  background-color: #f3f3f3;
}
.next-button:focus {
  background-color: #f3f3f3;
}
</style>
