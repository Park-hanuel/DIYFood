<template>
  <body id="page">
    <!-- 음식이름, 재료, 영양성분 -->
    <div style="margin-top: 40px; margin-bottom: 30px;">
      <div style="float:left; margin-bottom: 30px; margin-right: 30px; width: 25%;">
        <img :src=recipe[0].ATT_FILE_NO_MAIN :alt=recipe[0].RCP_NM style="border-radius: 5%; float: left;" width="100%">
      </div>
      <div style="float: left; width: 70%;">
        <p style="font-size:4em; font-weight:500; line-height:70px; margin-bottom: 40px;">
          {{recipe[0].RCP_NM}}
        </p>
        <h3>재료</h3>
        <p style="font-size:1.2rem; margin-bottom: 30px;">{{recipe[0].RCP_PARTS_DTLS}}</p>
        <h3>영양 정보</h3>
        <p style="font-size:1.2rem">
          열량: {{recipe[0].INFO_ENG}} | 나트륨: {{recipe[0].INFO_NA}} | 지방: {{recipe[0].INFO_FAT}} | 단백질: {{recipe[0].INFO_PRO}} | 칼슘: {{recipe[0].INFO_CAR}}
        </p>
      </div>
    </div>
    <!-- 조리법 -->
    <div class="content-box">
      <div style="float:left;">
        <h3>조리 순서</h3>
          <div style="font-size:1.2rem">
            <p class="recipe-text">{{recipe[0].MANUAL01}}</p>
            <img class="recipe-img" :src=recipe[0].MANUAL_IMG01>
            <p class="recipe-text">{{recipe[0].MANUAL02}}</p>
            <img class="recipe-img" :src=recipe[0].MANUAL_IMG02>
            <p class="recipe-text">{{recipe[0].MANUAL03}}</p>
            <img class="recipe-img" :src=recipe[0].MANUAL_IMG03>
            <p class="recipe-text">{{recipe[0].MANUAL04}}</p>
            <img class="recipe-img" :src=recipe[0].MANUAL_IMG04>
            <p class="recipe-text">{{recipe[0].MANUAL05}}</p>
            <img class="recipe-img" :src=recipe[0].MANUAL_IMG05>
            <p class="recipe-text">{{recipe[0].MANUAL06}}</p>
            <img class="recipe-img" :src=recipe[0].MANUAL_IMG06>
            <p class="recipe-text">{{recipe[0].MANUAL07}}</p>
            <img class="recipe-img" :src=recipe[0].MANUAL_IMG07>
          </div>
      </div>
    </div>
  </body>
</template>
<script>
/* eslint-disable */
export default {
  name: 'DetailRecipe',
  components: {},
  data () {
    return {
      recipe: [],
      num: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20']

    }
  },
  setup () {},
  created () {
    this.getDetailRecipe(412)
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 상세 레시피 불러오기
    getDetailRecipe (foodCode) {
      this.$axios.get(`http://localhost:3000/recipe/list?foodCode=${foodCode}`, { withCredentials: true }).then(response => {
        console.log('### response: ' + JSON.stringify(response))
        this.recipe = response.data
      }).catch(error => {
        console.log(error)
      })
    },
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
  white-space: normal;
}
.recipe-text {
  margin-top:50px;
}
.recipe-img {
  width: 250px;
}
</style>
