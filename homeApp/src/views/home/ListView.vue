<template>
	<div style="padding: 15px">
		<div style="display:flex;justify-content: end;">
			<Button severity="success" rounded icon="pi pi-plus" @click="dialogAdd = true"/>
		</div>
	</div>
	<Dialog v-model:visible="dialogAdd" :modal="true" :draggable="false" header="Добавить новый список">
		<div style="padding: 10px">
			<div style="display:flex;align-items: start">
				<InputText placeholder="Название списка" v-model="list.name"/>
				<Button text icon="pi pi-plus" severity="success" @click="statusNewItem=true"/>
			</div>
			<Card style="border: 1px solid black; margin-top: 10px;" v-if="statusNewItem">
				<template #content>
					<div style="display:flex; align-items: center">
						<InputText placeholder="Item" v-model="newItem.name"/>
						<Button v-if="newItem.name != null" style="margin-left: 5px;" @click="addItem" severity="success" icon="pi pi-check" rounded/>
					</div>

				</template>
			</Card>

			<div v-if="list.arr.length != 0">
				<div style="display:flex;justify-content: center;margin-top: 10px">
					<h2>Список:</h2>
				</div>
				<div v-for="item in list.arr">
					<div><h4>{{item.name}}</h4></div>
				</div>
			</div>

			<div style="display:flex;justify-content:center;margin-top: 15px">
				<Button severity="success" label="Сохранить" @click="addListToLists"/>
				<Button @click="deleteList" style="margin-left: 5px ;" severity="danger" label="Удалить"/>
			</div>

		</div>
	</Dialog>
	<div style="display:flex;justify-content:center;">
		<h2>Списки</h2>
	</div>
	<div v-if="userFamily.lists.length == 0" style="display:flex;justify-content:center;">
		<span>Списков пока что нет...</span>
	</div>
	<div v-else>
		<div v-for="item in userFamily.lists" style="padding: 10px" >
			<Fieldset :legend="item.name + returnDate(item.date)" :toggleable="true" :collapsed="true">
				<div v-for="(i, index) in item.arr">
					<div style="display:flex;">
						<Checkbox v-model="i.status" :binary="true" @change="updateLists"/>
						<span>{{i.name}}</span>
					</div>
				</div>
			</Fieldset>
		</div>
	</div>
</template>

<script>
import {mapActions, mapState} from 'pinia'
import {useUserStore} from "@/stores/counter";
export default {
	name: "ListView",
	data(){
		return{
			dialogAdd:false,
			statusNewItem:false,
			newItem:{
				name:null,
				status:false
			},
			list:{
				name:null,
				date:new Date(),
				arr:[]
			}
		}
	},
	async mounted(){
		await this.getUserInfo(localStorage.uid)
		await this.getUserFamily(this.userData.family)
		await this.getUserRealtimeFamily()
		console.log(this.userFamily)
	},
	computed:{
		...mapState(useUserStore, ['userData','userFamily'])
	},
	methods:{
		...mapActions(useUserStore,['getUserInfo', 'getUserFamily','getUserRealtimeFamily', 'updateFamily', 'updateLists']),
		addItem(){
			this.list.arr.push(this.newItem)
			this.newItem={
				name:null,
						status:false
			}
			this.statusNewItem = false
		},
		deleteList(){
			this.dialogAdd = false
			this.list = {
				name:null,
				date:new Date(),
				arr:[]
			}
		},
		returnDate(date){
			let temp = new Date(date.seconds * 1000).toLocaleDateString().substr(0,10)
			temp = ' от '+temp
			return temp
		},
		async addListToLists(){
			this.userFamily.lists.push(this.list)
			await this.updateLists()
			this.dialogAdd = false
			this.list = {
				name:null,
				date:new Date(),
				arr:[]
			}
		}
	}
}
</script>

<style scoped>

</style>