<template>
	<div class="board-wrap">

		<div class="big-title">
			实时公告
		</div>
		<div class="item-wrap" id="wrap">
			<!-- customStyle自定义样式 -->
			<a-collapse v-for="(item, i) in lists" v-bind:key="i">
				<a-collapse-panel :key="i" :header="item.title" :style="customStyle">
					<p>{{ item.contents }}</p>
					<p>{{ item.sendTime }}</p>
				</a-collapse-panel>
			</a-collapse>
			<!-- 找了一个ant的组件把下面的代码替换了 -->
			<!-- <div v-for="(item, i) in lists" v-bind:key="i"
				v-bind:class="item.isShow == false? 'citem': 'citem itemplus'" @click="changeShow(i)">
				<div class="header-wrap">
					<div class="call-title">{{item.title}}</div>
					<div class="send-time">{{item.sendTime}}</div>
				</div>
				<div class="call-content" v-if="item.isShow">
					{{item.contents}}
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CallBoard',

		mounted: function() {

			this.axios.get("http://47.98.238.175:8080/notice/all").then(res => {

					this.lists = res.data.map((item, i) => {
						item.isShow = false
						return item
					})
					console.log(this.kind);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		data() {
			return {
				lists: [],
				customStyle: 'background: #FAFAFA;border-radius: 14px;margin-bottom: 12px;border: 0;',
			}
		},
		methods: {
			changeShow(index) {
				let list = this.lists[index]
				list.isShow = !list.isShow
				this.$set(this.lists, index, list)

			}
		}
	}
</script>

<style scoped>
	.board-wrap {
		width: 90%;
		height: 650px;
		/* margin: auto; */
		border-radius: 20px;
		padding-top: 10px;
		background-color: rgba(255, 255, 255, 0.5);
	}


	.big-title {
		width: 95%;
		height: 70px;
		margin: auto;
		border-radius: 25px;
		font-size: 30px;
		font-weight: bold;
		line-height: 70px;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.6);
	}


	.item-wrap {
		width: 95%;
		margin: auto;
		border-radius: 25px;
		margin-top: 20px;
		padding: 10px;
		margin-bottom: 10px;
		background-color: rgba(255, 255, 255, 0.6);
		height: 540px;
		overflow: auto;
	}

	.item-wrap .title-wrap {
		height: 50px;
	}

	.citem {
		width: 100%;
		height: 50px;
		border-radius: 3px;
		background-color: white;
		overflow: hidden;
		padding: 3px 5px;
		font-size: 16px;
		font-weight: bold;
		margin-top: 10px;
		line-height: 50px;
		cursor: pointer;
	}

	.itemplus {
		min-height: 100px;
	}

	.call-title {
		float: left;
		font-size: 18px;
	}

	.send-time {
		float: right;
		font-weight: 500;
		color: #707070;
	}

	.citem .call-content {
		font-weight: normal;
		margin-top: 50px;
		text-align: left;
	}
	#wrap::-webkit-scrollbar {
    width: 5px;
    background-color: #F5F5F5;
	}
	#wrap::-webkit-scrollbar-thumb {
	    background-color: #F90;
	    
	}
	#wrap::-webkit-scrollbar-track {
	    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
	    background-color: #F5F5F5;
	}
</style>
