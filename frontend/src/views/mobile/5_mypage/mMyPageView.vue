<template>
  <body id="page-m" style="text-align: center;">
    <div style="margin-top: 40px; margin-bottom: 30px;">
      <p style="font-size:4em; font-weight:500; line-height:70px;">
        MY PAGE
      </p>
      <p style="font-size:1.5em"><b>{{username}}</b> 님 환영합니다!</p>
    </div>
    <div>
      <a href="/user/info/m">
        <section class="content-box-m">
          <img src="https://cdn-icons-png.flaticon.com/512/6082/6082867.png" alt="" class="img_style">
          <div style="float: right; width: 72%; height: 100%; padding-top: 6%;">
            <span class="text_style">회원정보 수정</span>
          </div>
        </section>
      </a>
      <a href="/user/mymealplan/m">
        <section class="content-box-m">
          <img src="https://cdn-icons-png.flaticon.com/512/5223/5223850.png" alt="" class="img_style">
          <div style="float: right; width: 72%; height: 100%; padding-top: 6%;">
            <span class="text_style">나의 식단 계획</span>
          </div>
        </section>
      </a>
      <a href="/analysis/survey/m">
        <section class="content-box-m">
          <img src="https://cdn-icons-png.flaticon.com/512/1162/1162489.png" alt="" class="img_style">
          <div style="float: right; width: 72%; height: 100%; padding-top: 6%;">
            <span class="text_style">나의 식단 분석</span>
          </div>
        </section>
      </a>
      <a href="/user/signout/m">
        <section class="content-box-m2">
          <span class="text_style2">회원 탈퇴</span>
        </section>
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
    async getUserInfo () {
      try{
        const url = 'http://localhost:3000/user/info'
        const res = await this.$axios.get(url, { withCredentials: true })
        this.username = res.data.name
      } catch(err){
        console.log(err)
        alert('사용자 정보를 불러올 수 없습니다')
      }
    },
  }
}
</script>

<style>
@import "@/css/styles.css";
body{background: #f9f9f9;}
.content-box-m{
  display: inline-block;
  float: left;
  width: 90%;
  height: 100px;
  background-color:white;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding:10px;
  text-align: left;
}
.content-box-m2{
  display: inline-block;
  float: left;
  width: 40%;
  height: 55px;
  background-color:white;
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 30px;
  margin-bottom: 130px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding:10px;
  text-align: center;
  align-items: center;
}
.img_style {
  height: 80%;
  margin: 2.5%;
  margin-left: 15px;
}
.text_style {
  color: rgb(50, 50, 50);
  font-size: 1.5rem;
  margin-left: 50px;
  font-weight: 500;
}
.text_style2 {
  color: #5f5f5f;
  font-size: 1.5rem;
}
</style>
