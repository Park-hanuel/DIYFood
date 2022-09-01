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
    <div style="display: inline-block; width:100%;">
      <a href="/user/signout">
        <input type="button" class="btn btn-lg next-button" value="탈퇴하기">
      </a>
    </div>
  </body>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      sampleData: ''
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {}
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
  box-shadow: 5px 5px 5px 5px lightgray;
  padding-top: 30px;
  padding-bottom: 30px;
}
.next-button {
  height: 50px;
  width: 10%;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px lightgray;
  margin: 40px;
  margin-left:45%;
  margin-right:45%;
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
