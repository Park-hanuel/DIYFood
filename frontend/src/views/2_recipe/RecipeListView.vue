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
      <div class="pagination-wrapper">
        <div class="pagination">
          <a class="prev page-numbers" href="javascript:;">prev</a>
          <span aria-current="page" class="page-numbers current">1</span>
          <a class="page-numbers" href="javascript:;">2</a>
          <a class="page-numbers" href="javascript:;">3</a>
          <a class="page-numbers" href="javascript:;">4</a>
          <a class="page-numbers" href="javascript:;">5</a>
          <a class="next page-numbers" href="javascript:;">next</a>
        </div>
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
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    getRecipeData () {
      // eslint-disable-next-line
      this.$axios.get(`http://localhost:3000/recipe/list?date=${date}&category=${code}`, { withCredentials: true }).then(response => {
        console.log('### response: ' + JSON.stringify(response))
        this.recipeList = response.data
      }).catch(error => {
        console.log(error)
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
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
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
.pagination-wrapper {
  text-align: center;
  margin: 40px 0;
  display: inline-block;
  width:80%;
  margin-left:10%
}

.pagination {
	display: inline-block;
	height: 70px;
	margin-top: 70px;
	padding: 0 25px;
	border-radius: 35px;
	background-color: #f3f3f3;

	@include breakpoint(1199px) {
		height: 50px;
		margin-top: 50px;
		padding: 0 10px;
		border-radius: 25px;
	}
}

.page-numbers {
	display: block;
	padding: 0 25px;
	float: left;
	transition: duration easing;
	color: rgb(0, 0, 0);
	font-size: 1rem;
	letter-spacing: 0.1em;
	line-height: 70px;
  }
	.page-numbers:hover,
	.page-numbers.current {
		background-color: rgb(88, 169, 88);
		color: white;
	}

	.page-numbers.prev:hover,
	.page-numbers.next:hover {
		background-color: transparent;
    color: green;
	}

	@include breakpoint(1199px) {
		padding: 0 15px;
		font-size: 16px;
		line-height: 50px;
	}

	@include breakpoint(touch) {
		padding: 0 14px;
		display: none;

		.page-numbers:nth-of-type(2) {
			position: relative;
			padding-right: 50px;

			::after {
				content: '...';
				position: absolute;
				font-size: 25px;
				top: 0;
				left: 45px;
			}
		}

		.page-numbers:nth-child(-n+3),
		.page-numbers:nth-last-child(-n+3) {
			display: block;
		}

		.page-numbers:nth-last-child(-n+4) {
			padding-right: 14px;

			::after {
				content: none;
			}
		}
	}
</style>
