<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		mounted() {
			console.log("ssss" + performance.navigation.type);
			let user = localStorage.getItem('role')
			if (user && performance.navigation.type == 0) {
				if (user.roleId == 3) {
					this.$router.push({
						path: "/waiterindex"
					})
				} else if (user.roleId == 2) {
					this.$router.push({
						path: "/ChefIndex"
					})
				} else {
					console.log("hhhh");
					this.$router.push({
						path: "/AdministratorIndex"
					})
				}
			}
		},
		beforeDestroy() {
			localStorage.clear()
		}
	}
</script>

<style lang="less">
	@import './assets/css/theme.less';
	#app {
		min-width: 1200px;
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
