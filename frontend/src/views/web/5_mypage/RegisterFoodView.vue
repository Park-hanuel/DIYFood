/* eslint-disable */
<template>
  <body id="page">
    <div style=" margin-bottom: 30px;">
      <p style="font-size:4em; font-weight:500; line-height:70px;">
        REGISTER FOOD {{date}}
      </p>
      <p style="font-size:1.5em; font-weight:400;">
        식단 분석을 위해 식단 계획 이외에 섭취한 음식을 등록합니다.
      </p>
    </div>
    <div class="content-box">
      <DraggableCal
      :prependedMonths="1"
      :accentColor="'#48a238'"
      :pastIsDisabled="false"
      style="width:70%; padding: 30px 0px 0px; margin-bottom: 30px;"
      onclick="selectDate(months)"
      ></DraggableCal>
      <div class="w-100 text-center">
        <div class="half-box w-30 text-center">

          <div v-if="selectedTime == '1'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-clicked" value="아침" @click="selectTime(1)">
          </div>
          <div v-if="selectedTime != '1'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-meal" value="아침" @click="selectTime(1)">
          </div>

          <div v-if="selectedTime == '2'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-clicked" value="점저" @click="selectTime(2)">
          </div>
          <div v-if="selectedTime != '2'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-meal" value="점저" @click="selectTime(2)">
          </div>

          <div v-if="selectedTime == '3'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-clicked" value="점심" @click="selectTime(3)">
          </div>
          <div v-if="selectedTime != '3'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-meal" value="점심" @click="selectTime(3)">
          </div>

          <div v-if="selectedTime == '4'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-clicked" value="간식" @click="selectTime(4)">
          </div>
          <div v-if="selectedTime != '4'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-meal" value="간식" @click="selectTime(4)">
          </div>

          <div v-if="selectedTime == '5'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-clicked" value="저녁" @click="selectTime(5)">
          </div>
          <div v-if="selectedTime != '5'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-meal" value="저녁" @click="selectTime(5)">
          </div>

          <div v-if="selectedTime == '6'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-clicked" value="야식" @click="selectTime(6)">
          </div>
          <div v-if="selectedTime != '6'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-meal" value="야식" @click="selectTime(6)">
          </div>

        </div>
        <div class="half-box w-70 text-center">
          <div v-if="selectedTime != ''">
            <!-- 검색창 -->
            <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4 search-box w-70 m-15 mt-1">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button id="button-addon2" class="btn btn-link text-warning" @click="searchRecipe(keyword, 1)" disabled><img src="https://cdn-icons-png.flaticon.com/512/151/151773.png" width="25px"></button>
                </div>
                <input type="search" placeholder="검색어를 입력해주세요" aria-describedby="button-addon2" class="form-control border-0 bg-light" v-model="keyword">
                <button id="button-addon2" class="search-btn">검색</button>
              </div>
            </div>
            <!-- 검색 음식 리스트 -->
            <table class="table table-light" style="vertical-align: middle">
              <thead class="table-bordered">
                <tr>
                  <th scope="col" style="width: 25%">품목명</th>
                  <th scope="col" style="width: 25%">제조사</th>
                  <th scope="col" style="width: 10%">칼로리</th>
                  <th scope="col" style="width: 10%">탄수화물</th>
                  <th scope="col" style="width: 10%">단백질</th>
                  <th scope="col" style="width: 10%">지방</th>
                  <th scope="col" style="width: 10%">나트륨</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>하하</td>
                  <td>ㅁㄴ이</td>
                  <td>ㅁㄴㅇ</td>
                  <td>123</td>
                  <td>234</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="w-100 mt-5 text-center">
        <button class="btn btn-primary btn-lg next-button" @click="submitForm()">NEXT</button>
      </div>
    </div>
  </body>
</template>
<script>
/* eslint-disable */
import DraggableCal from 'vue-draggable-cal'

export default {
  components: {
    DraggableCal
  },
  data () {
    return {
      date: '',
      formatedDate: '',
      selectedTime: ''
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    selectTime (time) {
      this.selectedTime = time
    },
    
  }
}
</script>
<style>
body{
  background: #f3f3f3;
  padding-left: 3%;
  padding-right: 3%;}
.content-box{
  display: inline-block;
  width:100%;
  padding: 50px;
  height:fit-content;
  background-color:white;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: auto;
}
.half-box {
  display: inline-block;
  height: 500px;
  padding: 30px;
  font-size: 1.3rem;
  font-weight: 500;
  vertical-align: center;
}
.w-30 {
  width: 30%;
  border-right: 1px solid lightgray;
  float: left;
}
.w-70 {
  width: 70%;
  float: left;
}
.w-100 {
  width: 100%;
}
.m-15 {
  margin: 0% 15%
}
.btn-meal {
  width: 50%;
  height: 50px;
  background: #f0f0f0;
  border: none;
  color: rgb(61, 61, 61);
  font-size: 100%;
  padding: auto;
  margin:5px;
}
.btn-clicked {
  width: 50%;
  height: 50px;
  font-size: 100%;
  padding: auto;
  margin:5px;
}
.search-btn {
  border-radius: 10px;
  margin-right: 10px;
  border:none;
  font-size: 1rem;
  color:#1a8051;
  background-color: transparent;
}
.table {
  font-size: 1rem;
}
</style>
