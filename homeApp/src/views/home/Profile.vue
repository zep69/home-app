<template>
	<div style="padding: 10px">
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
			<div style="display:flex;justify-content:center;">
				<Button label="Редактировать профиль" icon="pi pi-pencil" @click="dialogVisible = true"/>
			</div>
		</div>
		<div style="margin-top: 15px;">
			<div style="display:flex;justify-content: center;">
				<h1>Моя семья</h1>
			</div>
			<div v-if="userData.family" style="display:flex;justify-content:center;">
				<span>Ваша семья: <span class="green">{{userFamily.name}}</span></span>
			</div>
			<div v-else>
				<h3 style="display:flex;justify-content:center;">Вы не принадледжите к семье</h3>
				<div style="display:flex;justify-content:center;">
					<Button severity="warn" icon="pi pi-exclamation-circle" label="Посмотреть приглашения"/>
				</div>
			</div>
		</div>
	</div>


	<Dialog v-model:visible="dialogVisible" header="Редактирование профиля" :draggable="false" :modal="true" style="background-color: var(--color-background-soft); width: 480px">
		<div style="padding: 0 15px 0 15px">
			<InputText style="background-color: var(--color-background);width: 100%"></InputText>
		</div>

	</Dialog>
</template>

<script>
import {mapActions, mapState} from 'pinia'
import {useUserStore} from "@/stores/counter";
export default {
  name: "Profile",
  data(){
    return{
			dialogVisible:false
    }
  },
  async mounted(){
    await this.getUserInfo(localStorage.uid)
		await this.getUserFamily(this.userData.family)
  },
  computed:{
    ...mapState(useUserStore, ['userData','userFamily'])
  },
  methods:{
    ...mapActions(useUserStore,['getUserInfo', 'getUserFamily']),

  }
}
</script>

<style scoped>

</style>