<template>
  <body id="page-m">
    <!-- 음식명 -->
    <p style="font-size:3em; font-weight:500; line-height:70px; margin: 20px 0;">
      {{recipe[0].RCP_NM}}
    </p>
    <!-- 사진, 재료, 영양성분 -->
    <div>
      <div>
        <img :src=recipe[0].ATT_FILE_NO_MAIN :alt=recipe[0].RCP_NM style="border-radius: 5%;" width="100%"  onerror="this.src='https://ifh.cc/g/RXYY1z.png'">
      </div>
      <div class="mc-1 border-bottom">
        <h3>재료</h3>
        <p style="font-size:1.2rem;">{{recipe[0].RCP_PARTS_DTLS}}</p>
      </div>
      <div class="mc-1 border-bottom">
        <h3>영양 정보</h3>
        <p style="font-size:1.2rem">
          열량: {{recipe[0].INFO_ENG}} kcal<br>지방: {{recipe[0].INFO_FAT}} g<br>단백질: {{recipe[0].INFO_PRO}} g<br>탄수화물: {{recipe[0].INFO_CAR}} g<br>나트륨: {{recipe[0].INFO_NA}} mg
        </p>
      </div>
    </div>
    <div class="mc-1 mc-2">
      <h2>조리 순서</h2>
        <div style="font-size:1.2rem;">
          <div class="recipe-box">
            <img class="recipe-img" :src=recipe[0].MANUAL_IMG01>
            <div class="recipe-card">
              <p class="recipe-text">{{recipe[0].MANUAL01.replace('1.','')}}</p>
            </div>
          </div>
          <div class="recipe-box">
            <img class="recipe-img" :src=recipe[0].MANUAL_IMG02>
            <div class="recipe-card">
              <p class="recipe-text">{{recipe[0].MANUAL02.replace('2.','')}}</p>
            </div>
          </div>
          <div class="recipe-box">
            <img class="recipe-img" :src=recipe[0].MANUAL_IMG03>
            <div class="recipe-card">
              <p class="recipe-text">{{recipe[0].MANUAL03.replace('3.','')}}</p>
            </div>
          </div>
          <div class="recipe-box">
            <img class="recipe-img" :src=recipe[0].MANUAL_IMG04>
            <div class="recipe-card">
              <p class="recipe-text">{{recipe[0].MANUAL04.replace('4.','')}}</p>
            </div>
          </div>
          <div class="recipe-box">
            <img class="recipe-img" :src=recipe[0].MANUAL_IMG05>
            <div class="recipe-card">
              <p class="recipe-text">{{recipe[0].MANUAL05.replace('5.','')}}</p>
            </div>
          </div>
          <div class="recipe-box">
            <img class="recipe-img" :src=recipe[0].MANUAL_IMG06>
            <div class="recipe-card">
              <p class="recipe-text">{{recipe[0].MANUAL06.replace('6.','')}}</p>
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
      recipe: [],
      foodCode: null
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
    // 상세 레시피 불러오기
    async getDetailRecipe (foodCode) {
      try {
        const response = await this.$axios.get(`http://localhost:3000/recipe/list/${foodCode}`, { withCredentials: true })
        this.recipe = response.data
      } catch (err) {
        location.reload()
      }
    },
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
