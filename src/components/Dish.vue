<template>
	<div class="all-wrap">
		<div class="img-wrap">
			<img :src="dishPic" @click="showDetail" />
		</div>
		<div class="content-wrap">
			
			<div class="name">{{dishName}} <div v-if="tuijian" class="tuijian">推荐</div></div>
			

			<div class="jianjie">{{intro}}</div>
			<div style="display: flex; align-items: center;justify-content: space-between;">
				<div class="price">{{price}}元</div>
				<div style=" display: flex; align-items: center;">

					<a-button size="small" icon="minus" @click="minusDish" />
					<div class="number">{{dishNum}}</div>
					<a-button size="small" icon="plus" @click="plusDish" />
				</div>
			</div>
		</div>
		<!-- -->
		<a-modal :visible="visible" :closable=false>
			<template slot="footer">
				<a-button key="submit" type="primary" :loading="loading" @click="closeDetail"
						style="height:30px; font-size: 15px; width: 60px; background-color: #FDA03F; border: #FDA03F 1px solid; color: #FFFFFF; margin-left: 70px;">
					返回
				</a-button>
			</template>
			<dish-xiangqing :dishPic="dishPic" :dishName="dishName" :detail="detail" :price="price" :tuijian="tuijian">
			</dish-xiangqing>
		</a-modal>
	</div>
</template>

<script>
	import DishXiangqing from './DishXiangqing.vue'

	export default {
		name: 'Dish',

		components: {
			DishXiangqing,
		},
		props: {
			'dishPic': {
				type: String,
				default: ""
			},
			'dishName': {
				type: String,
				// default: "鱼香肉丝hhh"
			},
			'tuijian': {
				type: Boolean,
				default: true
			},
			'intro': {
				type: String,
			},
			'price': {
				type: Number,
			},
			'detail': {
				type: String,
			},
			'dishNum': {
				type: Number,
				 default: 10
			},
		},

		data() {
			return {
				visible: false,
			}
		},
		methods: {
			showDetail() {
				this.visible = true;
			},

			closeDetail(e) {
				this.visible = false;
			},
			minusDish() {
				if (this.dishNum > 0) {
					this.dishNum--;
					this.$emit('minusDish');
				}
			},
			plusDish() {
				this.dishNum++;
				this.$emit('plusDish');
			}
		}

	}
</script>

<style scoped>
	img {
		height: 100%;
		width: 100%;
	}

	.all-wrap {
		/* border: 1px solid #A4ADB3; */
		border-radius: 20px;
		height: 150px;
		width: 100%;
		/* width: 70%; */
		display: flex;
		align-items: center;
		background-color: white;
	}

	.all-wrap .img-wrap {
		padding-left: 10px;
		height: 120px;
		flex: 1;
	}
	
	.content-wrap{
		padding: 10px;
		flex: 1;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		
	}

	.name {
		font-size: 1.8em;
		position: relative;
	}

	.tuijian {
		position: absolute;
		top: 0;
		right: 10px;
		font-size: 0.50em;
		color: red;
		padding-left: 8px;
	}

	.jianjie {
		font-size: 1.0em;
		padding: 8px 0 8px 0;
	}

	.price {
		font-size: 1.5em;
	}

	.number {
		padding: 0 10px 0 10px;
	}
</style>
