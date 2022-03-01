<template>
	<div class="all-wrap">
		<div class="img-wrap">
			<img :src="dishPic" @click="showDetail" />
		</div>
		<div>
			<div style="display: flex;">

				<div class="name">{{dishName}}</div>
				<div v-if="tuijian" class="tuijian">推荐</div>
			</div>
			<div class="jianjie">{{intro}}</div>
			<div style="display: flex;">
				<div class="price">{{price}}元</div>
				<div style="padding-top: 10px; display: flex;">

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
			<dish-xiangqing :dishPic="dishPic" :dishName="dishName" :detail="detail" :price="price">
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
				// default: 0
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
		width: 450px;
		/* width: 70%; */
		display: flex;
		align-items: center;
		background-color: white;
	}

	.all-wrap .img-wrap {
		height: 110px;
		width: 110px;
		margin: 0 20px 0 10px;
	}

	.name {
		font-size: 2.2em;
	}

	.tuijian {
		font-size: 0.75em;
		color: red;
		padding-left: 8px;
	}

	.jianjie {
		font-size: 1.2em;
		padding: 8px 0 8px 0;
	}

	.price {
		font-size: 1.5em;
		padding-right: 150px;
	}

	.number {
		padding: 0 20px 0 20px;
	}
</style>
