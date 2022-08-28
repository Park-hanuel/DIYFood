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
          <div id="side">
            <div style="text-align: center;">
              <img src="@/assets/basket.png" alt="식단계획3" height="200" width="200" >
            </div>
            <div style="margin-top: 30px; text-align: center;">
              <h3>3. 새로운 재료 선택</h3>
            </div>
          </div>
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
            <div class="box-item" style="vertical-align: middle;">
              <span><img src="@/assets/shopping-basket.png" width="20px">  {{this.checkedItemName}}</span>
              <p style="color:gray">* 선택 버튼을 두번 누르면 선택이 해제됩니다.</p>
            </div>
            <table class="table table-light" style="vertical-align: middle;">
              <thead class="table-bordered">
                <tr>
                  <th scope="col" style="width:10%">순번</th>
                  <th scope="col" style="width:40%">품목</th>
                  <th scope="col" style="width:40%">품종</th>
                  <th scope="col" style="width:10%">선택</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, i) in itemList" :key="i">
                  <td>{{i + 1}}</td>
                  <td>{{data.itemName}} {{data.itemCode}}</td>
                  <td>{{data.detailItemName}} {{data.detailItemCode}}</td>
                  <td><button class="btn" @click="selectItem(i)"><img src="@/assets/check_n.png" width="30px"></button></td>
                </tr>
              </tbody>
            </table>
            <div>
              <progress id="progress" value="24500" max="30000"></progress>
              <h6>나의 예산 : {{budget}}원, 총 가격 : {{totalCost}}원</h6>
            </div>
          </div>
          <div id="next-button" style="text-align:center;" >
            <!-- <a href="/mealplan/step3"> -->
              <input type="button" class="btn btn-primary btn-lg next-button text-uppercase" value="NEXT" @click="submitItemList()">
            <!-- </a> -->
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
      metaItemList: [],
      dividedCode: []
    }
  },
  setup () {},
  created () {
    this.getIngredientData()
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 식재료 목록 불러오기
    getIngredientData () {
      this.$axios.get('http://localhost:3000/ingredient').then(response => {
        console.log('### response: ' + JSON.stringify(response))
        this.itemList = response.data
        this.metaItemList = response.data
        this.itemList = this.metaItemList.filter(item => parseInt(item.itemCode / 100) === 1)
      }).catch(error => {
        console.log(error)
      })
    },
    // 종류 버튼 아이템 필터링 이벤트
    searchItem (code) {
      // eslint-disable-next-line
      this.itemList = this.metaItemList.filter(item => parseInt(item.itemCode / 100) == code)
    },
    // 아이템 추가/삭제
    selectItem (n) {
      if (this.checkedItemCode.includes(this.bindingCode(n)) === false) {
        this.checkedItemCode.push(this.bindingCode(n))
        this.checkedItemName.push(this.itemList[n].itemName)
        console.log(this.checkedItemCode)
      } else {
        this.checkedItemCode.splice(this.checkedItemCode.indexOf(this.bindingCode(n)), 1)
        this.checkedItemName.splice(this.checkedItemName.indexOf(this.itemList[n].itemName), 1)
        console.log(this.checkedItemCode)
      }
    },
    // 품목코드 + 품종코드 합치기
    bindingCode (n) {
      var bindedCode = this.itemList[n].itemCode + '-' + this.itemList[n].detailItemCode
      return bindedCode
    },
    // 선택한 식재료 리스트 보내기
    submitItemList () {
      this.$axios.post('http://localhost:3000/ingredient/existlist', this.checkedItemCode)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
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
  }
  .btn-custom {
    margin-bottom: 20px;
    width: 110px;
  }
  .btn-warning {
    color:black
  }
  #progress {
    appearance: none;
    width: 100%;
    height: 30px;
  }
  #progress::-webkit-progress-bar {
      background:#f0f0f0;
      border-radius:10px;
      box-shadow: inset 3px 3px 10px #ccc;
  }
  #progress::-webkit-progress-value {
      border-radius:10px;
      background: #138127;
      background: -webkit-linear-gradient(to right, #d7d000, #699900);
      background: linear-gradient(to right, #d7d000, #699900);

  }
</style>
