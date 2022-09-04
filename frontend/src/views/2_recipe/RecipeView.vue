<template>
  <body id="page">
    <div style="margin-top: 40px; margin-bottom: 30px; text-align: center;">
      <p style="font-size:4em; font-weight:500; line-height:70px;">
        RECIPE
      </p>
      <p style="font-size:1.5em; font-weight:400;">
        레시피 목록과 검색 기능을 제공합니다.
      </p>
    </div>
    <div class="content-box">
      
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
@import "@/css/styles.css";
body{
  background: #f3f3f3;
  padding-left: 3%;
  padding-right: 3%;}
.content-box{
  width:90%;
  height:fit-content;
  background-color:white;
  margin-right: 5%;
  margin-left: 5%;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px lightgray;
  padding: 50px;
  padding-bottom: 10px;
  text-align: left;
}
</style>
