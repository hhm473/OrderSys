<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		mounted() {
			let user = localStorage.getItem('role')
			if(user){
				if (user.roleId === 3) {
				
					this.$router.push({
						path: "/waiterindex"
					})
				} else if (user.roleId === 2) {
					this.$router.push({
						path: "/ChefIndex"
					})
				} else {
					this.$router.push({
						path: "/AdministratorIndex"
					})
				}
			}
		},
		beforeDestroy(){
			localStorage.clear()
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* background-color: #e8e8e8; */
		background-image: url(assets/img/bk.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;

		height: 100%;
		overflow: auto;
	}
</style>
