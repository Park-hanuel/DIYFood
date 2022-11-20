<template>
  <body id="page-m">
    <!-- 음식명 -->
    <p style="font-size:3em; font-weight:500; line-height:70px; margin: 20px 0;">
      {{RCP_NM}}
    </p>
    <!-- 사진, 재료, 영양성분 -->
    <div>
      <div>
        <img :src=ATT_FILE_NO_MAIN :alt=RCP_NM style="border-radius: 5%;" width="100%" onerror="this.src='https://ifh.cc/g/RXYY1z.png'">
      </div>
      <div class="mc-1 border-bottom">
        <h3>재료</h3>
        <p style="font-size:1.2rem;">{{RCP_PARTS_DTLS}}</p>
      </div>
      <div class="mc-1 border-bottom">
        <h3>영양 정보</h3>
        <p style="font-size:1.2rem">
          열량: {{INFO_ENG}} kcal<br>지방: {{INFO_FAT}} g<br>단백질: {{INFO_PRO}} g<br>탄수화물: {{INFO_CAR}} g<br>나트륨: {{INFO_NA}} mg
        </p>
      </div>
      <div class="mc-1 mc-2">
        <h2>조리 순서</h2>
        <div style="font-size:1.2rem;">
          <div class="recipe-box">
            <img class="recipe-img" :src=MANUAL_IMG01>
            <div class="recipe-card">
              <p class="recipe-text">{{MANUAL01.replace('1.','')}}</p>
            </div>
          </div>
          <div v-if="MANUAL_IMG02 != ''" class="recipe-box">
            <img class="recipe-img" :src=MANUAL_IMG02>
            <div class="recipe-card">
              <p class="recipe-text">{{MANUAL02.replace('2.','')}}</p>
            </div>
          </div>
          <div v-if="MANUAL_IMG03 != ''" class="recipe-box">
            <img class="recipe-img" :src=MANUAL_IMG03>
            <div class="recipe-card">
              <p class="recipe-text">{{MANUAL03.replace('3.','')}}</p>
            </div>
          </div>
          <div v-if="MANUAL_IMG04 != ''" class="recipe-box">
            <img class="recipe-img" :src=MANUAL_IMG04>
            <div class="recipe-card">
              <p class="recipe-text">{{MANUAL04.replace('4.','')}}</p>
            </div>
          </div>
          <div v-if="MANUAL_IMG05 != ''" class="recipe-box">
            <img class="recipe-img" :src=MANUAL_IMG05>
            <div class="recipe-card">
              <p class="recipe-text">{{MANUAL05.replace('5.','')}}</p>
            </div>
          </div>
          <div v-if="MANUAL_IMG06 != ''" class="recipe-box">
            <img class="recipe-img" :src=MANUAL_IMG06>
            <div class="recipe-card">
              <p class="recipe-text">{{MANUAL06.replace('6.','')}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>

/* eslint-disable */
export default {
  name: 'DetailRecipe',
  components: { },
  data () {
    return {
      RCP_NM: localStorage.getItem('RCP_NM'),
      ATT_FILE_NO_MAIN: localStorage.getItem('ATT_FILE_NO_MAIN'),
      RCP_PARTS_DTLS: localStorage.getItem('RCP_PARTS_DTLS'),
      INFO_ENG: localStorage.getItem('INFO_ENG'),
      INFO_FAT: localStorage.getItem('INFO_FAT'),
      INFO_PRO: localStorage.getItem('INFO_PRO'),
      INFO_CAR: localStorage.getItem('INFO_CAR'),
      INFO_NA: localStorage.getItem('INFO_NA'),
      MANUAL_IMG01: localStorage.getItem('MANUAL_IMG01'),
      MANUAL_IMG02: localStorage.getItem('MANUAL_IMG02'),
      MANUAL_IMG03: localStorage.getItem('MANUAL_IMG03'),
      MANUAL_IMG04: localStorage.getItem('MANUAL_IMG04'),
      MANUAL_IMG05: localStorage.getItem('MANUAL_IMG05'),
      MANUAL_IMG06: localStorage.getItem('MANUAL_IMG06'),
      MANUAL01: localStorage.getItem('MANUAL01'),
      MANUAL02: localStorage.getItem('MANUAL02'),
      MANUAL03: localStorage.getItem('MANUAL03'),
      MANUAL04: localStorage.getItem('MANUAL04'),
      MANUAL05: localStorage.getItem('MANUAL05'),
      MANUAL06: localStorage.getItem('MANUAL06')
    }
  },
  setup () {},
  created () {
    this.foodCode = this.$route.params.foodCode
    this.getDetailRecipe(this.foodCode)
  },
  mounted () {},
  unmounted () {},
  methods: {
  }
}
</script>

<style>
@import "@/css/styles.css";
body{
  background-color: #f9f9f9;
  padding: 0 3%
}
.content-box{
  height:fit-content;
  margin-bottom: 30px;
  padding-left: 2%;
  overflow: auto;
  white-space: normal;
}
.recipe-box {
  width:100%;
  height:200px;
  display: inline-block;
}
.recipe-card {
  padding-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: fit-content;
  background-color: white;
  border-radius: 30px;
  display: inline-block;
  text-align: left;
  border: 2px solid #d0d0d0;
}
.recipe-text {
  padding: 10px;
  float: left;
  vertical-align: middle;
}
.recipe-img {
  width: 100%;
  /* margin-left: 15%;
  margin-right: 15%; */
  margin-top: 20px;
  margin-bottom: 20px;
  float:left;
  border-radius: 30px;
}
.border-bottom {
  border-bottom: 1px solid lightgray;
}
.mc-1 {
  margin: 20px 0px;
}
.mc-2 {
  margin-bottom: 100px;
}
</style>
