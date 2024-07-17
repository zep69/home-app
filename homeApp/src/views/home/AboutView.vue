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
					<h3 style="display: flex;justify-content:center;">Выберите комнату</h3>
				</div>
				<div v-else-if="typeToggle == 'kitchen'">
					<div v-for="item in userFamily.kitchen" class="item-room">
						<div >
							<div><span>{{item.name}}</span></div>
						</div>
						<div>
							<InputText v-model="item.count" @change="updateCount" type="number" style="width: 60px"/>
						</div>
					</div>
				</div>
				<div v-else-if="typeToggle == 'bathroom'" >
					<div v-for="item in userFamily.bathroom" class="item-room">
						<div >
							<div><span>{{item.name}}</span></div>
						</div>
						<div>
							<InputText v-model="item.count" @change="updateCount" type="number" style="width: 60px"/>
						</div>
					</div>
				</div>
			</template>
			<template #footer>
				<div style="display:flex;justify-content:center;align-items: center; margin-top: 10px;" v-if="typeToggle !=null">
					<Button label="Добавить" severity="success" icon="pi pi-plus" @click="dialogAddItem = true"/>
				</div>
			</template>
		</Card>
		<Dialog :modal="true" :draggable="false" v-model:visible="dialogAddItem" class="add-dialog">
			<template #header>
				<div v-if="typeToggle == 'bathroom'">
					<h3>Добавить вещь в ванную</h3>
				</div>
				<div v-else>
					<h3>Добавить продукты на кухню</h3>
				</div>
			</template>

				<div style="display:flex;justify-content: center; align-items:center ">
					<InputText placeholder="Название" type="text" v-model="addItem.name"/>
					<InputText placeholder="Кол-во" type="number" v-model="addItem.count"/>
				</div>

				<div style="display:flex;align-items: center; justify-content:center;margin-top: 15px;">
					<div>
						<Button severity="success" label="Добавить" @click="addItemSelf"/>
					</div>

				</div>


		</Dialog>
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
			dialogAddItem:false,
			addItem:{
				name:null,
				count:0
			}
		}
	},
	async mounted(){
		await this.getUserInfo(localStorage.uid)
		//await this.getUserFamily(this.userData.family)
		await this.getUserRealtimeFamily()
	},
	computed:{
		...mapState(useUserStore, ['userData','userFamily'])
	},
	methods:{
		...mapActions(useUserStore,['getUserInfo', 'getUserFamily','getUserRealtimeFamily', 'updateFamily']),
		checkRoom(item){
			console.log(item)
			this.typeToggle = item.type
		},
		async updateCount(){
			await this.updateFamily()
		},
		async addItemSelf(){
			if(this.typeToggle == 'bathroom'){
				this.userFamily.bathroom.push(this.addItem)
				await this.updateCount()
				this.addItem={
					name:null,
							count:0
				}
				this.dialogAddItem = false

			}else if(this.typeToggle == 'kitchen'){
				this.userFamily.kitchen.push(this.addItem)
				await this.updateCount()
				this.addItem={
					name:null,
					count:0
				}
				this.dialogAddItem = false
			}
		}
	}
}
</script>

<style scoped>
.about{
	display: flex;
	justify-content: center;
}
.item-room{
	display:flex;
	margin-top: 10px;
	justify-content: space-between;
	padding: 15px;
	align-items: center;
	background-color: var(--color-background-soft);
	border-radius: 20px;
	-webkit-box-shadow: -1px 9px 11px 0px var(--color-shadow);
	-moz-box-shadow: -1px 9px 11px 0px var(--color-shadow);
	box-shadow: -1px 9px 11px 0px var(--color-shadow);
}
.add-dialog{
	width:480px;
}
@media  screen and (max-width: 768px){
	.add-dialog{
		width:280px;
	}
}
</style>
