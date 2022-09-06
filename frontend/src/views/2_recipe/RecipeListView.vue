<template>
  <body id="page">
    <div style="margin-top: 40px; margin-bottom: 30px;">
      <span style="font-size:4em; font-weight:500; line-height:70px;">
        RECIPE
      </span>
      <span style="font-size:1.5em; font-weight:400;">
        요리법 정보를 제공합니다.
      </span>
    </div>
    <div class="content-box">
      <!-- <div v-for="(data, index) in recipeList" :key="index"> -->
        <a href="/recipe/1">
          <div name="card" class="card-custom">
            <div class="cropped" style="text-align:center; width: 100%; height: 50%; overflow: hidden; border-radius: 5%;">
              <img src='https://images.unsplash.com/photo-1662028529443-28a65ad24811?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' width="100%" style="margin: -30%;">
            </div>
            <div style="height: 7%;"><h6 style="text-align:center; margin-top: 10px;">음식 이름</h6></div>
            <div class="word" style="height: 20%;"><span>재료 : 음식 재료 fdljd slfiu dslf jdslkjf ldkjf lsdjf lskdjf sdjflds fjlskldsjflksjf;fj; ir;oi al fldkfj ldkfj kldsf jlsdjf ldskfj lsdj sd</span></div>
            <div class="word" style="height: 20%;"><span>조리법 : 조리법 dslfjdsk sdjfhksd fkh fsdhkjf skdf dskf sdkfhksdfh dskjfhdskjhf kds fds hfkdh fkjdhf lksdjfl sdjlfj sdl jflsdj flsdkj flksdjf lkdsj flksdj fsd lfksdl jflksdj lfj sdlf jsdf</span></div>
          </div>
        </a>
      <!-- </div> -->
    </div>
  </body>
</template>

<script>
/* eslint-disable */
export default {
  components: {},
  data () {
    return {
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
.card-custom {
  background-color: #f3f3f3;
  width: 23%;
  height: 400px;
  border-radius: 1rem;
  padding: 10px;
  float: left;
  margin: 1%;
}
.word {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: normal;
  word-wrap : break-word;
  text-align : left;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
a {
  color: #212121;
  text-decoration: none
}
a:hover {
  color: #1a8051;
}
</style>
