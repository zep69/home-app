<template>
	<Toolbar style="background-color: var(--color-background-soft); border: none">
		<template #start>
			<Button label="Профиль" text @click="$router.push('/home/profile')"/>
			<Button label="Дом" text severity="help" @click="$router.push('/home/about')"/>
			<Button label="Списки" text severity="info" @click="$router.push('/home/list')"/>
		</template>
		<template #center>
		</template>
		<template #end>
			<Button icon="pi pi-sign-out" rounded outlined severity="danger" @click="logOut"/>
		</template>
	</Toolbar>
  <div style="width: 100vw; display:flex;justify-content:center; margin-top: 10px;">
    <div class="main-view ">
      <router-view v-slot="{ Component }">
        <transition name="">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>



</template>

<script>
import {mapActions, mapState} from 'pinia'
import {useUserStore} from "@/stores/counter";
export default {
	name: "HomeView",
  data(){
    return{

    }
  },
	computed:{
		...mapState(useUserStore, ['userData', 'loadingUser', 'loadingSession', 'userFamily']),
	},
	methods:{
		...mapActions(useUserStore,['logoutUser', 'getUserInfo', 'getUserFamily']),
		async logOut(){
			await this.logoutUser()
		}
	},
	async mounted(){
		await this.getUserInfo(localStorage.uid)
		console.log(this.userData)
		await this.getUserFamily(this.userData.family)
	}
}
</script>

<style scoped>
.main-view{
  width: 780px;
  background-color: var(--color-background-soft);
  border:none;
  border-radius: 15px ;
  -webkit-box-shadow: -1px 9px 11px 0px var(--color-shadow);
  -moz-box-shadow: -1px 9px 11px 0px var(--color-shadow);
  box-shadow: -1px 9px 11px 0px var(--color-shadow);
}
@media  screen and (max-width: 768px){
	.main-view{
		width: 420px;
	}
}
</style>