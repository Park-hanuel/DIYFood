<template>
<body id="page">
  <div>
    <!-- Head -->
    <div style="margin-top: 30px; " id="head">
      <span style="margin-left: 100px; font-size:4em; font-weight:500;">
        MEAL PLAN
      </span>
      <span style="margin-left: 20px; font-size:1.5em; font-weight:400;">
        설정된 예산에 맞춰 건강하고 신선한 식단을 추천합니다.
      </span>
    </div>
    <div>
      <!-- Side -->
      <aside id="side">
        <div style="text-align: center;">
          <img src="@/assets/freezer.png" alt="식단계획2" height="200" width="200" >
        </div>
        <div style="margin-top: 30px; text-align: center;">
          <h3>2. 보유 재료 선택</h3>
        </div>
      </aside>
      <!-- Content -->
      <section id="content">
        <div style="text-align:center;">
          <h1>기존 보유 재료 선택</h1>
          <p>이미 보관 중인 재료를 선택해주세요. 선택하신 재료는 식재료 가격을 계산할 때 제외됩니다.</p>
          <div>
            <input type="button" class="btn btn-primary btn-lg btn-custom" value="곡류" @click="searchItem('1')">
            <input type="button" class="btn btn-primary btn-lg btn-custom" value="견과·버섯" @click="searchItem('3')">
            <input type="button" class="btn btn-primary btn-lg btn-custom" value="채소류" @click="searchItem('2')">
            <input type="button" class="btn btn-primary btn-lg btn-custom" value="과일류" @click="searchItem('4')">
            <input type="button" class="btn btn-primary btn-lg btn-custom" value="축산물" @click="searchItem('5')">
            <input type="button" class="btn btn-primary btn-lg btn-custom" value="수산물" @click="searchItem('6')">
          </div>
          <h6>선택한 식재료: {{checkedItemName}}</h6>
          <table class="table table-light" style="vertical-align: middle;">
            <thead class="table-bordered">
              <tr>
                <th scope="col" style="width:10%">ID</th>
                <th scope="col" style="width:40%">품목</th>
                <th scope="col" style="width:40%">품종</th>
                <th scope="col" style="width:10%">선택</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, i) in itemList" :key="i">
                <td>{{data.id}}</td>
                <td>{{data.itemName}} {{data.itemCode}}</td>
                <td>{{data.detailItemName}} {{data.detailItemCode}}</td>
                <td><button class="btn" @click="clickBtn(data.id-1)"><img src="@/assets/check_n.png" width="25px"></button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="next-button" style="text-align:center;" >
          <a href="/mealplan/step3">
            <input type="button" class="btn btn-primary btn-lg next-button text-uppercase" value="NEXT" @click="submitItemList()">
          </a>
        </div>
      </section>
    </div>
  </div>
</body>

</template>
<script>
export default {
  components: {},
  data () {
    return {
      itemList: [],
      checkedItemCode: [],
      checkedItemName: [],
      btnCodeList: [],
      btnCodeCount: {},
      metaItemList: []
    }
  },
  setup () {},
  created () {
    this.getGroceryData()
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 식재료 목록 불러오기
    getGroceryData () {
      this.$axios.get('http://localhost:3000/grocery').then(response => {
        console.log('### response: ' + JSON.stringify(response))
        this.itemList = response.data
        this.metaItemList = response.data
        this.itemList = this.metaItemList.filter(item => parseInt(item.itemCode / 100) === 1)
      }).catch(error => {
        console.log(error)
      })
    },
    // 선택한 식재료 배열에 추가
    itemSelection (n) {
      if (Object.values(this.btnCodeCount)[n] % 2 === 1) {
        this.checkedItemCode.push(this.itemList[n].itemCode, this.itemList[n].detailItemCode)
        this.checkedItemName.push(this.itemList[n].itemName)
        this.chunk(this.checkedItemCode, 2)
      } else {
        this.checkedItemCode.splice(Object.keys(this.btnCodeCount)[n] - 1, 2)
      }
    },
    // 배열 2개씩 묶기([itemcode, detailItemCode])
    chunk (data = [], size = 1) {
      const items = [...data]
      const arr = []
      while (items.length) {
        arr.push(items.splice(0, size))
      }
      console.log(arr)
      return arr
    },
    // 선택한 버튼 배열에 추가 & count 함수 포함
    clickBtn (n) {
      this.btnCodeList.push(this.itemList[n].id)
      console.log(this.btnCodeList)
      this.countClickBtn(this.btnCodeList)
      console.log(this.btnCodeCount)
    },
    // 각 버튼 클릭 횟수 count
    countClickBtn (array) {
      this.btnCodeCount = array.reduce((pv, cv) => {
        pv[cv] = (pv[cv] || 0) + 1
        return pv
      }, {})
    },
    // 선택한 식재료 리스트 보내기
    submitItemList () {
      this.$axios.post('http://localhost:3000/grocery/existlist', this.checkedItemCode)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 종류 버튼 아이템 필터링 이벤트
    searchItem (code) {
      console.log('hi')
      // eslint-disable-next-line
      this.itemList = this.metaItemList.filter(item => parseInt(item.itemCode / 100) == code)
    },
    // 두번 누르면 배열 값 삭제
    deleteItem (n) {
      if (Object.values(this.btnCodeCount)[n] % 2 === 0) {
        this.checkedItemCode.splice(Number(Object.keys(this.btnCodeCount)[n]) - 1, 2)
      }
    }
  }
}
</script>

<style>
  @import "@/css/styles.css";
  body{background: #f3f3f3;}
  .btn-custom {
    margin-bottom: 20px;
    width: 110px;
  }
  .btn-warning {
    color:black
  }
</style>
