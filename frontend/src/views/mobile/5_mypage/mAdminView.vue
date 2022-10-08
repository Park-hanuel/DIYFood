<template>
  <div>
    <section class="justify-content-center align-items-center">
      <div class="text-black" style="border-radius: 25px; margin-bottom: 20px;">
        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Admin Page</p>
        <table class="table table-light">
          <thead class="table-bordered">
            <tr>
              <th scope="col">번호</th>
              <th scope="col">이메일</th>
              <th scope="col">이름</th>
              <th scope="col">가입일자</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(data,index) in boardList">
              <td>{{index+1}}</td>
              <td>{{ data.email }}</td>
              <td>{{ data.name }}</td>
              <td>{{ data.createdAt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      boardList: []
    }
  },
  setup () {},
  created () {
    this.getUserData()
  },
  mounted () {},
  unmounted () {},
  methods: {
    async getUserData () {
      try {
        const response = await this.$axios.get('http://localhost:3000/user/admin', { withCredentials: true })
        this.boardList = response.data
        for (let i = 0; i < this.boardList.length; i++) {
          this.boardList[i].createdAt = this.getDateWithoutTime(this.boardList[i].createdAt)
        }
      } catch (err) {
        location.reload()
      }
    },
    getDateWithoutTime (createdAt) {
      return require('moment')(createdAt).format('YYYY-MM-DD')
    }
  }
}
</script>

<style>
@import "@/css/styles.css";
.table {
  width: 700px;
  margin: auto;
}
</style>
