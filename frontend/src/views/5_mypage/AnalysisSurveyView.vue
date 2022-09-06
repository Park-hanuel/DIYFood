<template>
  <body id="page">
    <div style="margin-top: 40px; margin-bottom: 30px;">
      <span style="font-size:4em; font-weight:500; line-height:70px;">
        DIET ANALYSIS
      </span>
      <span style="font-size:1.5em; font-weight:400;">
        {{username}}님의 식단 계획 데이터를 기반으로 영양 섭취를 분석합니다.
      </span>
    </div>
    <div class="content-box">
      <div class="half-box">
        <div style="text-align: center; margin-top: 10%;">
          <img src="https://cdn-icons-png.flaticon.com/512/668/668709.png" width="50%">
          <h1 style="margin-top: 50px">나의 정보</h1>
        </div>
      </div>
      <div class="half-box">

      </div>
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
    }
  }
}
</script>

<style>
@import "@/css/styles.css";
body{
  background: #f3f3f3;
  padding-left: 3%;
  padding-right: 3%;}
.content-box{
  width:100%;
  height:fit-content;
  background-color:white;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px lightgray;
  padding: 50px;
  text-align: left;
  overflow: auto;
}
.btn-custom {
  margin-bottom: 20px;
}
.half-box {
  width: 50%;
  height: 300px;
  background-color:antiquewhite;
  padding: 50px;
}
</style>
