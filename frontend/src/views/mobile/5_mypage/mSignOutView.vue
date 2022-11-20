<template>
  <body id="page-m" style="text-align: center;">
    <div style="margin-top: 20px;">
      <p style="font-size:2em; font-weight:500; line-height:70px;">
        회원 탈퇴
      </p>
    </div>
    <section class="content-box">
      <div>
        <p>회원 탈퇴 시, <br>회원님의 <b>모든 개인정보 및 이용정보가<br>삭제</b>되며 <b>복구가 불가능</b>합니다.</p>
        <p>회원님의 <b><br>기존 보유 식재료 목록, 식단 계획 정보,<br>식단 분석 기록, 레시피 목록</b>이 삭제됩니다.</p>
        <p>탈퇴 이후 언제든 재가입이 가능합니다.</p>
        <img src="@/assets/logo.png" alt="" width="50%">
      </div>
    </section>
    <div style="display: inline-block;">
        <input type="button" class="btn next-button" value="돌아가기" style="color:#326b23; font-weight:600; font-size: 1.3rem;" onclick="location.href='/m'">
        <input type="button" class="btn next-button" value="탈퇴하기" style="color:grey; font-size: 1.3rem;" @click="signOut()">
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
    async getUserInfo () {
      try {
        const url = 'http://localhost:3000/user/info'
        const res = await this.$axios.get(url, { withCredentials: true })
        this.user.email = res.data.email
        this.user.name = res.data.name
      } catch (err) {
        alert('사용자 정보를 불러올 수 없습니다.')
      }
    },
    async signOut () {
      try {
        if (confirm('탈퇴 처리는 취소할 수 없습니다. 정말 탈퇴하시겠습니까?')) {
          const url = 'http://localhost:3000/user/info'
          await this.$axios.delete(url, { withCredentials: true })
          alert('회원 탈퇴 처리가 완료되었습니다.')
          location.href = '/'
        }
      } catch (err) {
        alert('다시 시도해주세요')
      }
    }
  }
}
</script>

<style>
body{background: #f9f9f9;}
.content-box{
  float: left;
  width: 90%;
  height: auto;
  background-color:white;
  margin-bottom: 10px;
  margin-right:5%;
  margin-left: 5%;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
}
.next-button {
  height: 50px;
  width: 150px;
  border-radius: 10px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  margin:10px;
  margin-bottom:100px;
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
