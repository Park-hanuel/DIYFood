<template>
  <body id="page">
    <!-- Side -->
    <div id="side">
      <div style="margin-top: 30px; " id="head">
        <h1>
          MEAL PLAN
        </h1>
      </div>
      <div style="text-align: center;">
        <img src="https://cdn-icons-png.flaticon.com/512/1039/1039373.png" alt="식단계획5" height="50%" width="50%">
      </div>
      <div style="margin-top: 30px; text-align: center;">
        <h3>5. 식단 계획 완성</h3>
      </div>
    </div>
    <!-- Content -->
    <section id="content">
      <div style="text-align:center;">
        <h1>식단 계획 완성</h1>
        <p>식단 계획이 완성되었습니다. 계획을 다시 한번 확인해주세요.</p>
      </div>
      <div>
        <table class="table" style="vertical-align: middle;">
          <thead class="thead-dark">
            <tr>
              <th scope="col" style="width:15%;">분류</th>
              <th scope="col" style="width:80%">내가 선택한 항목</th>
              <th scope="col" style="width:5%; text-align: center;">수정</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">예산 및 기간</th>
              <td>예산 : {{budget}}원 | 기간: {{date}}</td>
              <td><button class="btn" @click="modifyPlan('1')"><img src="https://cdn-icons-png.flaticon.com/512/5328/5328208.png" style="width:35px; text-align: center;"></button></td>
            </tr>
            <tr>
              <th scope="row">보유 식재료</th>
              <td>{{haveItem.replace(/,/gi,", ")}}</td>
              <td><button class="btn" @click="modifyPlan('2')"><img src="https://cdn-icons-png.flaticon.com/512/5328/5328208.png" style="width:35px; text-align: center;"></button></td>
            </tr>
            <tr>
              <th scope="row">새로운 식재료</th>
              <td>{{newItem.replace(/,/gi,", ")}}</td>
              <td><button class="btn" @click="modifyPlan('3')"><img src="https://cdn-icons-png.flaticon.com/512/5328/5328208.png" style="width:35px; text-align: center;"></button></td>
            </tr>
            <tr>
              <th scope="row">레시피</th>
              <td>{{recipe.replace(/,/gi,", ")}}</td>
              <td><button class="btn" @click="modifyPlan('4')"><img src="https://cdn-icons-png.flaticon.com/512/5328/5328208.png" style="width:35px; text-align: center;"></button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="text-align:center; width:100%">
        <a href="/user/mymealplan">
          <input type="button" class="btn btn-primary btn-lg next-button text-uppercase" value="나의 식단 보러가기" style="margin-left:30%; margin-right: 30%">
        </a>
      </div>
    </section>
  </body>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      budget: parseInt(localStorage.getItem('budget')).toLocaleString(),
      date: localStorage.getItem('date_start') + ' 부터  ' + localStorage.getItem('date_end') + ' 까지',
      haveItem: localStorage.getItem('haveItem'),
      newItem: localStorage.getItem('newItem'),
      recipe: localStorage.getItem('recipe')
    }
  },
  methods: {
    // 수정 버튼 클릭 이벤트
    modifyPlan (index) {
      if (index === '1') {
        if (confirm('1단계(예산 및 기간 설정)부터 다시 시작합니다. 수정하시겠습니까?')) {
          location.href = '/mealplan/step1'
        } else {
          console.log(index)
        }
      } else if (index === '2') {
        if (confirm('2단계(기존 보유 식재료 선택)부터 다시 시작합니다. 수정하시겠습니까?')) {
          location.href = '/mealplan/step2'
        } else {
          // pass
        }
      } else if (index === '3') {
        if (confirm('3단계(새로운 식재료 선택)부터 다시 시작합니다. 수정하시겠습니까?')) {
          location.href = '/mealplan/step3'
        } else {
          // pass
        }
      } else if (index === '4') {
        if (confirm('4단계(레시피 선택)부터 다시 시작합니다. 수정하시겠습니까?')) {
          location.href = '/mealplan/step4'
        } else {
          // pass
        }
      }
    }
  }
}
</script>

<style>
@import "@/css/styles.css";
body{background: #f3f3f3;}
#content-box{
  float: left;
  width: 200px;
  height: 300px;
  background-color:white;
  margin-right: 50px;
  margin-top: 10px;
  margin-bottom: 0px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px lightgray;
  padding-top: 30px;
  padding-bottom: 10px;
}
.img_style {
  height: 150px;
  width: 150px;
  text-align: center;
}
.next-button {
  height: 70px;
  width: 250px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px lightgray;
  border: none;
}
  </style>
