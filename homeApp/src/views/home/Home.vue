<template>
	<Toolbar>
		<template #start>
			<Button label="Профиль" text/>
			<Button label="Дом" text severity="help"/>
		</template>
	</Toolbar>
	<Card>
		<template #header>
			Jopa piska
		</template>
	</Card>
</template>

<script>
export default {
	name: "HomeView"
}
</script>

<style scoped>

</style>