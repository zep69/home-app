<template>
  <h1 style="display:flex; justify-content:center;"> Мой профиль</h1>
  <div style="padding: 10px">
    <div style="display: flex;justify-content:center;">
      <span>Имя: {{userData.name}}</span>
    </div>
    <div style="display:flex; justify-content:center;">
      <span>
        email: {{userData.email}}
      </span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'pinia'
import {useUserStore} from "@/stores/counter";
export default {
  name: "Profile",
  data(){
    return{

    }
  },
  async mounted(){
    await this.getUserInfo()
  },
  computed:{
    ...mapState(useUserStore, ['userData',])
  },
  methods:{
    ...mapActions(useUserStore,['getUserInfo']),

  }
}
</script>

<style scoped>

</style>