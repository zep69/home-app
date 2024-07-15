<template>
	<Toolbar style="background-color: var(--color-background-soft); border: none">
		<template #start>
			<Button label="Профиль" text @click="$router.push('/home/profile')"/>
			<Button label="Дом" text severity="help" @click="$router.push('/home/about')"/>
		</template>
		<template #center>
			<p>Привет, {{userData.name}}</p>
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
		...mapState(useUserStore, ['userData', 'loadingUser', 'loadingSession']),
	},
	methods:{
		...mapActions(useUserStore,['logoutUser', 'getUserInfo']),
		async logOut(){
			await this.logoutUser()
		}
	},
	async mounted(){
		await this.getUserInfo(localStorage.uid)
		console.log(this.userData)
	}
}
</script>

<style scoped>
.main-view{
  width: 780px;
  background-color: var(--color-background-soft);
  border:none;
  border-radius: 15px ;
  -webkit-box-shadow: -1px 9px 11px 0px var(--color-background-mute);
  -moz-box-shadow: -1px 9px 11px 0px var(--color-background-mute);
  box-shadow: -1px 9px 11px 0px var(--color-background-mute);

}
</style>