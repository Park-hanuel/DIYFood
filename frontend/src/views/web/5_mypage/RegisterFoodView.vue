<template>
  <body id="page">
    <div style="margin-top: 40px; margin-bottom: 30px;">
      <p style="font-size:4em; font-weight:500; line-height:70px;">
        REGISTER FOOD
      </p>
      <p style="font-size:1.5em; font-weight:400;">
        식단 분석을 위해 식단 계획 이외에 섭취한 음식을 등록합니다.
      </p>
    </div>
    <div class="content-box">
        <div class="half-box text-center">
          <div class="mt-5">
            <img src="https://cdn-icons-png.flaticon.com/512/668/668709.png" width="50%">
            <h1 class="mt-5">나의 정보</h1>
          </div>
        </div>
        <div class="half-box">
          <div>
            <span class="me-3" style="width: 40%">먹은 날짜</span>
            <input type="date" class="inputbox-date" style="width: 60%" v-model="date">
          </div>
          <div class="col-12 text-center">
            <button class="btn btn-primary btn-lg next-button btn-custom" @click="submitForm()">NEXT</button>
          </div>
        </div>
    </div>
    <div>
        <button class="btn-up" @click="upClick()"><img src="https://cdn-icons-png.flaticon.com/512/130/130906.png" width="20px"></button>
        <button class="btn-down" @click="downClick()"><img src="https://cdn-icons-png.flaticon.com/512/130/130907.png" width="20px"></button>
    </div>
  </body>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      date: ''
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
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: auto;
}
.btn-custom {
  margin-bottom: 30px;
}
.half-box {
  width: 50%;
  padding: 50px;
  display: inline-block;
  float: left;
  font-size: 1.3rem;
  font-weight: 500;
  vertical-align: middle;
}
</style>
