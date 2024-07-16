<template>
  <div class="about">
    <h1>Что у нас осталось?</h1>
  </div>
	<div style="display:flex;justify-content:space-around; padding: 15px">
		<div>
			<div v-for="item in roomsItems"  style="display: flex; justify-content: start;" >
				<div>
					<Button :label="item.label" text @click="checkRoom(item)"/>
				</div>

			</div>
		</div>

		<Card style="width: 400px;background-color: var(--color-background-mute)">
			<template #title><div style="display:flex;justify-content:center;">Что имеем?</div></template>
			<template #content>
				<div v-if="typeToggle == null">
					<h3>Выберите комнату</h3>
				</div>
				<div v-else-if="typeToggle == 'kitchen'">
					<h3>Kitchen</h3>
				</div>
				<div v-else-if="typeToggle == 'bathroom'">
					<h3>bathroom</h3>
				</div>
			</template>
		</Card>
	</div>
</template>

<script>
import {mapActions, mapState} from 'pinia'
import {useUserStore} from "@/stores/counter";
export default {
	name:'About',
	data(){
		return{
			roomsItems:[
				{label:'Кухня', type:'kitchen'},
				{label:'Ванная', type:'bathroom'},
			],
			typeToggle:null,
		}
	},
	async mounted(){

	},
	computed:{

	},
	methods:{
		checkRoom(item){
			console.log(item)
			this.typeToggle = item.type
		}
	}
}
</script>

<style scoped>
.about{
	display: flex;
	justify-content: center;
}
</style>
