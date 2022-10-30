<template>
  <body id="page-m">
    <div>
      <div>
        <div class="mealplan-head-m">
          <div style="float: left; width:40%;">
            <img src="https://cdn-icons-png.flaticon.com/512/2906/2906476.png" alt="식단계획3" class="mealplan-head-img-m">
          </div>
          <div class="mealplan-head-title-m">
            <h1>
              이번주 뭐 먹지?
            </h1>
            <h3>
              3. 새로운 식재료 선택
            </h3>
          </div>
        </div>
        <!-- Content -->
        <section id="content-m">
          <div style="text-align:center;">
            <h1>새로운 식재료 선택</h1>
            <p>
              새롭게 구매하실 식재료를 선택해주세요.
              <br>선택한 식재료를 포함하는 레시피를 추천합니다.
            </p>
            <div>
              <input
                v-if="this.categoryCode !== '1'"
                type="button"
                class="btn btn-primary btn-md btn-custom"
                value="곡류"
                @click="searchItem('1')"
              />
              <input
                v-if="this.categoryCode === '1'"
                type="button"
                class="btn btn-clicked btn-md btn-custom"
                value="곡류"
                @click="searchItem('1')"
              />

              <input
                v-if="this.categoryCode !== '3'"
                type="button"
                class="btn btn-primary btn-md btn-custom"
                value="견과·버섯"
                @click="searchItem('3')"
              />
              <input
                v-if="this.categoryCode === '3'"
                type="button"
                class="btn btn-clicked btn-md btn-custom"
                value="견과·버섯"
                @click="searchItem('3')"
              />

              <input
                v-if="this.categoryCode !== '2'"
                type="button"
                class="btn btn-primary btn-md btn-custom"
                value="채소류"
                @click="searchItem('2')"
              />
              <input
                v-if="this.categoryCode === '2'"
                type="button"
                class="btn btn-clicked btn-md btn-custom"
                value="채소류"
                @click="searchItem('2')"
              />

              <input
                v-if="this.categoryCode !== '4'"
                type="button"
                class="btn btn-primary btn-md btn-custom"
                value="과일류"
                @click="searchItem('4')"
              />
              <input
                v-if="this.categoryCode === '4'"
                type="button"
                class="btn btn-clicked btn-md btn-custom"
                value="과일류"
                @click="searchItem('4')"
              />

              <input
                v-if="this.categoryCode !== '5'"
                type="button"
                class="btn btn-primary btn-md btn-custom"
                value="축산물"
                @click="searchItem('5')"
              />
              <input
                v-if="this.categoryCode === '5'"
                type="button"
                class="btn btn-clicked btn-md btn-custom"
                value="축산물"
                @click="searchItem('5')"
              />

              <input
                v-if="this.categoryCode !== '6'"
                type="button"
                class="btn btn-primary btn-md btn-custom"
                value="수산물"
                @click="searchItem('6')"
              />
              <input
                v-if="this.categoryCode === '6'"
                type="button"
                class="btn btn-clicked btn-md btn-custom"
                value="수산물"
                @click="searchItem('6')"
              />
            </div>
            <div class="box-item">
              <p>
                <img
                  src="@/assets/shopping-cart.png"
                  width="20px"
                  style="margin-bottom: 5px"
                />
                {{ this.checkedItemName }}
              </p>
            </div>
            <table class="table table-light" style="vertical-align: middle">
              <thead class="table-bordered">
                <tr>
                  <th scope="col" style="width: 10%">순번</th>
                  <th scope="col" style="width: 15%">품목</th>
                  <th scope="col" style="width: 20%">품종</th>
                  <th scope="col" style="width: 15%">등급</th>
                  <th scope="col" style="width: 15%">가격</th>
                  <th scope="col" style="width: 15%">수량</th>
                  <th scope="col" style="width: 10%">선택</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, i) in itemList" :key="i">
                  <td>{{ i + 1 }}</td>
                  <td>{{ data.itemName }}</td>
                  <td>{{ data.detailItemName }}</td>
                  <td>{{ data.rank }}</td>
                  <td>{{ data.price }} 원</td>
                  <td>
                    <label>
                      <input
                        v-if="checkedID.includes(data.id)"
                        v-model="checkedItemQuantity[i]"
                        v-on:click="updateItemQuantity(i)"
                        type="number"
                        min="1"
                        max="10"
                        value="1"
                      />
                      <input v-else type="number" min="1" max="10" disabled />
                    </label>
                  </td>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        class="form-check-input"
                        :value="data.id"
                        v-model="checkedID"
                        @click="selectItem(i)"
                      />
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <progress
                id="progress"
                :value="totalCost"
                :max="budget"
                style="width: 100%"
              ></progress>
              <p style="width: 100%">{{ parseInt((totalCost / budget) * 100) }}%</p>
              <h6 style="width: 100%">
                선택 식재료 가격 : {{ totalCost.toLocaleString() }}원
                <br>나의 예산 : {{ budget.toLocaleString() }}원
              </h6>
            </div>
          </div>
          <div id="next-button" style="text-align: center">
            <!-- <a href="/mealplan/step4"> -->
            <input
              type="button"
              class="btn btn-primary btn-lg next-button text-uppercase"
              value="NEXT"
              @click="submitItemList()"
            />
            <!-- </a> -->
          </div>
        </section>
      </div>
    </div>
    <div>
      <button class="btn-up" @click="upClick()">
        <img
          src="https://cdn-icons-png.flaticon.com/512/130/130906.png"
          width="20px"
        />
      </button>
      <button class="btn-down" @click="downClick()">
        <img
          src="https://cdn-icons-png.flaticon.com/512/130/130907.png"
          width="20px"
        />
      </button>
    </div>
  </body>
</template>
<script>
/* eslint-disable */
export default {
  components: {},
  data() {
    return {
      itemList: [],
      checkedItemCode: [],
      checkedItemName: [],
      oldCheckedItemQuantity: [],
      checkedItemQuantity: [],
      updatedItemQuantityIdx: -1,
      metaItemList: [],
      budget: parseInt(localStorage.getItem('budget')),
      date: localStorage.getItem('date_start'),
      totalCost: 0,
      subCodeList: [],
      finalCodeList: [],
      checkedID: [],
      finalData: {},
      unit: [],
      categoryCode: '1'
    }
  },
  setup() {},
  created() {
    this.getIngredientData()
    this.checkedItemQuantity.fill(0, 0, this.itemList.length - 1)
    this.oldCheckedItemQuantity.fill(0, 0, this.itemList.length - 1)
  },
  mounted() {},
  unmounted() {},
  updated() {
    setTimeout(() => {
      const n = this.updatedItemQuantityIdx
      if (n >= 0) {
        const price = parseInt(this.itemList[n].price.replace(',', ''))
        this.totalCost =
          this.totalCost -
          price * this.oldCheckedItemQuantity[n] +
          price * this.checkedItemQuantity[n]
        this.oldCheckedItemQuantity[n] = this.checkedItemQuantity[n]
        this.updatedItemQuantityIdx = -1
      }
    }, 300)
  },
  methods: {
    updateItemQuantity(n) {
      this.updatedItemQuantityIdx = n
    },
    // 식재료 목록 불러오기
    async getIngredientData () {
      try {
        const response = await this.$axios.get('http://localhost:3000/ingredient/userlist', { withCredentials: true })
        this.itemList = response.data
        this.metaItemList = response.data
        this.itemList = this.metaItemList.filter(
          (item) => parseInt(item.itemCode / 100) === 1
        )
      } catch (err) {
        location.reload()
      }
      
    },
    // 종류 버튼 아이템 필터링 이벤트
    searchItem(code) {
      // eslint-disable-next-line
      this.itemList = this.metaItemList.filter(
        (item) => parseInt(item.itemCode / 100) == code
      )
      this.categoryCode = code
    },
    // 1. 아이템 추가/삭제
    // binding코드(품목코드+품종코드+가격)와 품목이름 push, 가격 계산
    selectItem(n) {
      if (this.checkedItemCode.includes(this.bindingCode(n)) === false) {
        this.checkedItemCode.push(this.bindingCode(n))
        this.checkedItemName.push(this.itemList[n].itemName)
        this.checkedItemQuantity[n] = 1
        this.oldCheckedItemQuantity[n] = 1

        if (this.itemList[n].price === '-') {
          return this.totalCost
        } else {
          this.totalCost =
            this.totalCost +
            parseInt(this.itemList[n].price.replace(',', '')) *
              this.checkedItemQuantity[n]
        }
      } else {
        this.checkedItemCode.splice(
          this.checkedItemCode.indexOf(this.bindingCode(n)),
          1
        )
        this.checkedItemName.splice(
          this.checkedItemName.indexOf(this.itemList[n].itemName),
          1
        )
        if (this.itemList[n].price === '-') {
          return this.totalCost
        } else {
          this.totalCost =
            this.totalCost -
            parseInt(this.itemList[n].price.replace(',', '')) *
              this.checkedItemQuantity[n]
          this.checkedItemQuantity[n] = 0
          this.oldCheckedItemQuantity[n] = 0
        }
      }
    },
    // 1-1. 품목코드 + 품종코드 + 가격 합치기
    bindingCode(n) {
      var bindedCode =
        this.itemList[n].itemCode +
        '-' +
        this.itemList[n].detailItemCode +
        '-' +
        this.itemList[n].price.replace(',', '')
      return bindedCode
    },
    // 2. bindingCode를 품목 / 품종 / 가격 나눠서 object로 배열에 추가하기
    codeSplit() {
      for (var i = 0; i < this.checkedItemCode.length; i++) {
        this.subCodeList.push(this.checkedItemCode[i].split('-'))
        var obj = {
          itemCode: this.subCodeList[i][0],
          detailItemCode: this.subCodeList[i][1],
          price: this.subCodeList[i][2]
        }
        this.finalCodeList.push(obj)
      }
      this.finalData = {
        finalCodeList: this.finalCodeList,
        date: this.date
      }
    },
    // 3. 선택한 식재료 리스트 보내기 (식재료 가격이 예산보다 높으면 확인창 뜸)
    async submitItemList() {
      if (this.totalCost > this.budget) {
        if (
          confirm(
            '선택한 식재료의 총 가격이 설정한 예산보다 많습니다. 계속 진행하시겠습니까?'
          )
        ) {
          this.codeSplit()
          try {
            await this.$axios.post('http://localhost:3000/ingredient/userlist', this.finalData, { withCredentials: true })
            location.href = '/mealplan/step4/m'
          } catch (err) {
            alert('다시 시도해주세요.')
          }
          
        } else {
          alert('예산과 식재료를 다시 한번 확인해주세요.')
        }
      } else {
        this.codeSplit()
        try {
          await this.$axios.post('http://localhost:3000/ingredient/userlist', this.finalData, { withCredentials: true })
        } catch (err) {
          alert('다시 시도해주세요')
        }
        location.href = '/mealplan/step4/m'
      }
      localStorage.setItem('newItem', this.checkedItemName)
    },
    upClick() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    downClick() {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }
}
</script>
<style>
@import '@/css/styles.css';
body {
  background: #f3f3f3;
}
.btn-custom {
  margin-bottom: 10px;
  margin-left: 1%;
  margin-right: 1%;
  width: 30%;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
}
.btn-warning {
  color: black;
}
#progress {
  appearance: none;
  width: 93%;
  height: 30px;
  float: left;
}
#progress::-webkit-progress-bar {
  background: #f0f0f0;
  border-radius: 10px;
  box-shadow: inset 3px 3px 10px #ccc;
}
#progress::-webkit-progress-value {
  border-radius: 10px;
  background: #138127;
  background: -webkit-linear-gradient(to right, #d7d000, #699900);
  background: linear-gradient(to right, #d7d000, #699900);
}
</style>
