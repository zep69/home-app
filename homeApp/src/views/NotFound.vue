<template>
	<div class="nfPage">
		<div style="display: flex;justify-content:center;align-items: center;width: 480px">
			<Card>
				<template #content>
					<div style="display: flex;justify-content:center;">
						<div>
							<span style="font-size: 100px;" class="green"></span>
						</div>
						<div></div>
					</div>
				</template>
			</Card>
		</div>

	</div>
</template>

<script>
export default {
	name: "NotFound"
}
</script>

<style scoped>
.nfPage{
	height: 100vh;
}
</style>