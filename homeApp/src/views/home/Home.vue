<template>
	<Toolbar style="background-color: var(--color-background-soft); border: none">
		<template #start>
			<Button label="Профиль" text/>
			<Button label="Дом" text severity="help" @click="$router.push('/home/about')"/>
		</template>
		<template #center>
			<p>Привет</p>
		</template>
		<template #end>
			<Button icon="pi pi-sign-out" rounded outlined severity="danger" @click="logOut"/>
		</template>
	</Toolbar>
	<Card>
		<template #header>
			Jopa piska
		</template>
	</Card>
	<RouterView/>
</template>

<script>
import {mapActions, mapState} from 'pinia'
import {useUserStore} from "@/stores/counter";
export default {
	name: "HomeView",
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

</style>