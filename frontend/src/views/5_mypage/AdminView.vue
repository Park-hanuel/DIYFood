<template>
  <div>
    <section class="justify-content-center align-items-center">
      <div class="text-black" style="border-radius: 25px; margin-bottom: 20px;">
        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Admin Page</p>
        <table class="table table-light">
          <thead class="table-bordered">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">이메일</th>
              <th scope="col">이름</th>
              <th scope="col">가입일자</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(userData, index) in userData" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ userData.email }}</td>
              <td>{{ userData.name }}</td>
              <td>{{ userData.regDate }}</td>
              <td><input type="checkbox" name="checkedUser" class="form-check-input"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
<script>
import { getUserData } from '@/api/index'

export default {
  components: {},
  data () {
    return {
      index: 0,
      userData: {
        email: '',
        name: '',
        regDate: ''
      }
    }
  },
  setup () {},
  created () {
    getUserData()
  },
  mounted () {},
  unmounted () {},
  methods: {}
}
</script>

<style>
@import "@/css/styles.css";
.table {
  width: 700px;
  margin: auto;
}
</style>
