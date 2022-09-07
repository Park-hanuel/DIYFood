<template>
  <body id="page" style="text-align: center;">
    <div style="margin-top: 40px; margin-bottom: 30px;">
      <p style="font-size:4em; font-weight:500; line-height:70px;">
        MY PAGE
      </p>
      <p style="font-size:1.5em"><b>{{username}}</b> 님 환영합니다!</p>
    </div>
    <div style="display: inline-block;">
      <a href="/user/info/">
        <section class="content-box">
          <img src="https://cdn-icons-png.flaticon.com/512/668/668709.png" alt="" class="img_style">
          <div style="margin-top:30px;">
            <h4 style="color:black">회원정보 수정</h4>
          </div>
        </section>
      </a>
      <a href="/user/mymealplan">
        <section class="content-box">
          <img src="https://cdn-icons-png.flaticon.com/512/735/735742.png" alt="" class="img_style">
          <div style="margin-top:30px;">
            <h4 style="color:black">나의 식단 계획</h4>
          </div>
        </section>
      </a>
      <a href="/analysis/survey">
        <section class="content-box">
          <img src="https://cdn-icons-png.flaticon.com/512/2041/2041643.png" alt="" class="img_style">
          <div style="margin-top:30px;">
            <h4 style="color:black">나의 식단 분석</h4>
          </div>
        </section>
      </a>
    </div>
    <div style="display: inline-block;">
      <a href="/user/signout">
        <input type="button" class="btn btn-lg next-button" value="회원 탈퇴" style="color:dimgrey">
      </a>
    </div>
  </body>
</template>
<script>
/* eslint-disable */

export default {
  components: {},
  data () {
    return {
      username: ''
    }
  },
  setup () {},
  created () {
    this.getUserInfo()
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 사용자 정보 가져오기
    getUserInfo () {
      const url = 'http://localhost:3000/user/info'
      this.$axios.get(url, { withCredentials: true })
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            this.username = res.data.name
          } else if (res.data.message) {
            alert(res.data.message)
          }
        })
    },
  }
}
</script>

<style>
@import "@/css/styles.css";
body{background: #f3f3f3;}
.content-box{
  float: left;
  width: 300px;
  height: 400px;
  background-color:white;
  margin: 30px;
  margin-bottom: 10px;
  margin-top:10px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding-top: 30px;
  padding-bottom: 10px;
}
.img_style {
  height: 200px;
  width: 200px;
  text-align: center;
  margin-top: 30px;
}
.next-button {
  height: 50px;
  width: 150px;
  border-radius: 10px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  margin: 20px;
  margin-left: 500px;
  margin-right:500px;
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
