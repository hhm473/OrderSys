<template>
	<div class="board-wrap">
		<WebSocket style="display: none;" v-on:IsRefresh="IsRefresh"></WebSocket>
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
		</div>
	</div>
</template>

<script>
	import WebSocket from './WebSocket.vue'
	export default {
		name: 'CallBoard',
		components: {
			WebSocket
		},
		mounted() {

			this.GetData()

		},
		data() {
			return {
				lists: [],
				customStyle: 'background: #FAFAFA;border-radius: 14px;margin-bottom: 12px;border: 0;',

			}
		},
		methods: {
			IsRefresh(e) {
				let that = this
				console.log("sss");
				if (e === '管理员发布了一条新公告') {
					console.log('执行了')
					setTimeout(function() {

						that.GetData()

					}, 2000);

				} else if (e === '有新菜品待传送') {
					this.$emit('WIsRefresh', e)
				} else {
					this.$emit('CIsRefresh', e)
				}
			},

			GetData() {
				let that = this;
				let user = JSON.parse(localStorage.getItem('role'));
				let token = user.token;
				this.axios.get("http://47.98.238.175:8080/notice/all", {
						headers: {
							'Token': token
						},
					}).then(res => {
						that.lists = res.data.map((item, i) => {
							item.isShow = false
							item.sendTime = that.formatDateTime(item.sendTime)
							return item
						})
						console.log(that.lists);
					})
					.catch(function(error) {
						console.log(error);
					});
			},

			changeShow(index) {
				let list = this.lists[index]
				list.isShow = !list.isShow
				this.$set(this.lists, index, list)
			},
			formatDateTime(date) {
				let that = this;
				let time = new Date(Date.parse(date));
				time.setTime(time.setHours(time.getHours()));
				let Y = time.getFullYear() + '-';
				let M = that.addZero(time.getMonth() + 1) + '-';
				let D = that.addZero(time.getDate()) + ' ';
				let h = that.addZero(time.getHours()) + ':';
				let m = that.addZero(time.getMinutes()) + ':';
				let s = that.addZero(time.getSeconds());
				return Y + M + D + h + m + s;
			},
			addZero(num) {
				return num < 10 ? '0' + num : num;
			}

		}
	}
</script>

<style scoped>
	.board-wrap {
		width: 90%;
		height: 650px;
		/* margin: auto; */
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		border-radius: 25px;
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
