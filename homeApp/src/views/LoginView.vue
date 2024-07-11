<template>
	<div class="login">
		<Card style="width: 300px; background-color: var(--color-background-soft)" :class="loginClass" v-if="!registerCard">
			<template #title>
				<div style="display: flex; justify-content:center;">
					Войти в систему
				</div>
			</template>
			<template #content>
				<div style="display: flex; justify-content:center;">
					<InputText type="email" size="large" style="background-color: var(--color-background); width: 260px" v-model="email" placeholder="Email"></InputText>
				</div>
				<div style="display: flex; justify-content:center; margin-top: 10px;">
					<IconField>
						<InputText v-model="password" :type="type" size="large" style="background-color: var(--color-background); width: 260px" placeholder="Password"></InputText>
						<InputIcon :class="returnIcon" @click=" clickEye"></InputIcon>
					</IconField>
				</div>
				<div style="display: flex; justify-content:center;margin-top: 5px;">
					<Button link label="Зарегистрироваться" @click="changeCard"/>
				</div>
			</template>
			<template #footer>
				<div style="display: flex; justify-content:center;margin-top: 5px;">
					<Button label="Войти" @click="loginInSystem"/>
				</div>
			</template>
		</Card>
			<Card v-if="registerCard" :class="registerClass" style="width: 300px; background-color: var(--color-background-soft)" >
				<template #title>
					<div style="display: flex;justify-content:center;">
						Регистрация
					</div>
				</template>
				<template #content>
					<div style="display: flex; justify-content:center;">
						<InputText v-model="registrationForm.name" type="text" size="large" style="background-color: var(--color-background); width: 260px" placeholder="Name"></InputText>
					</div>
					<div style="display: flex; justify-content:center;margin-top: 10px;">
						<InputText v-model="registrationForm.email" type="email" size="large" style="background-color: var(--color-background); width: 260px" placeholder="Email"></InputText>
					</div>
					<div style="display: flex; justify-content:center; margin-top: 10px;">
						<IconField>
							<InputText v-model="registrationForm.password" :type="type" size="large" style="background-color: var(--color-background); width: 260px" placeholder="Password"></InputText>
							<InputIcon :class="returnIcon" @click=" clickEye"></InputIcon>
						</IconField>
					</div>
				</template>
				<template #footer>
					<div style="display: flex;justify-content:center; margin-top: 5px;">
						<Button severity="success" label="Ок"/>
						<Button style="margin-left: 5px;" severity="danger" label="Отменить" @click="changeCard"/>
					</div>
				</template>
			</Card>
	</div>


</template>

<script>
import {mapActions, mapState} from 'pinia'
import {useUserStore} from "../stores/counter";

export default {
	name: "LoginView",
	data(){
		return{
			eyeIcon:false,
			type:'password',
			password:null,
			email:null,
			loginClass: 'animate__animated animate__zoomIn',
			registerCard:false,
			registerClass:'animate__animated animate__zoomIn',
			registrationForm:{
				name:null,
				email:null,
				password:null
			}
		}
	},
	computed:{
		...mapState(useUserStore, ['userData', 'loadingUser', 'loadingSession']),
		returnIcon(){
			if(!this.eyeIcon){
				return 'pi pi-eye'
			}else{
				return 'pi pi-eye-slash'
			}
		},
		returnType(){
			if(!this.eyeIcon){
				return 'password'
			}else{
				return 'text'
			}
		}
	},
	methods:{
		...mapActions(useUserStore,['loginUser', 'registerUser']),
		async loginInSystem(){
			await this.loginUser(this.email, this.password)
		},
		clickEye(){
			this.eyeIcon = !this.eyeIcon
			if(!this.eyeIcon){
				this.type = 'password'
			}else{
				this.type = 'text'
			}
		},
		changeCard(){
			if(this.registerCard){
				this.registerClass = 'animate__animated animate__zoomOut'
				setTimeout(()=>{
					this.registerCard  = !this.registerCard
					this.loginClass = 'animate__animated animate__zoomIn'
				},500)

			}else{
				this.loginClass = 'animate__animated animate__zoomOut'
				setTimeout(()=>{
					this.registerCard  = !this.registerCard
					this.registerClass = 'animate__animated animate__zoomIn'
				},500)

			}

		}
	}
}
</script>

<style scoped>
	.iconEye{
		background: none;
		transition: 500ms;
	}
	.login{
		display: flex;
		justify-content: center;
		height: 100vh;
		align-items: center;
	}
	.iconEye:hover{

		background-color: var(--color-background-soft);
	}
</style>