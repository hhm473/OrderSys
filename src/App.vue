<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
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
		overflow: hidden;
	}
</style>
