<template>
	<div class="board-wrap">
		<div class="big-title">
			实时公告
		</div>
		<div  class="item-wrap">
			<div v-for="(item, i) in lists" v-bind:key="i" v-bind:class="item.isShow == false? 'citem': 'citem itemplus'"  @click="changeShow(i)">
				<div class="header-wrap">
					<div class="call-title">{{item.title}}</div>
					<div class="send-time">{{item.sendTime}}</div>
				</div>
				<div class="call-content" v-if="item.isShow">
					{{item.contents}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'CallBoard',
  
  mounted: function() {
  	
	this.axios.get("http://47.98.238.175:8080/notice/all").then(res => {
		
		this.lists = res.data.map((item,i) => {
						item.isShow = false
						return item
					})
		console.log(this.kind);
	})
	.catch(function (error) {
	  console.log(error);
	});
	
  },
  data() {
  	return {
  		lists:[]
  	}
  },
  methods:{
	  changeShow(index){
		let list =  this.lists[index]
		list.isShow = !list.isShow 
		this.$set(this.lists,index, list)
		  
	  }
  }
}
</script>

<style>
	.board-wrap{
		width: 90%;
		margin: auto;
	}
	.big-title{
		width: 100%;
		height: 70px;
		font-size: 30px;
		font-weight: bold;
		line-height: 70px;
		text-align: center;
	}
	.item-wrap .title-wrap{
		height: 50px;
	}
	.citem{
		width: 100%;
		height: 50px;
		border-radius: 3px;
		background-color: #CFD8DC;
		overflow: hidden;
		padding: 3px 5px;
		font-size: 16px;
		font-weight: bold;
		margin-top: 10px;
		line-height: 50px;
		cursor: pointer;
	}
	.itemplus{
		min-height: 100px;
	}
	 .call-title{
		float: left;
		font-size: 18px;
	}
	 .send-time{
		float: right;
		font-weight: 500;
		color: #707070;
	}
	.citem .call-content{
		font-weight: normal;
		margin-top: 50px;
		text-align: left;
	}
	.item-wrap{
		border-top: 2px solid #616161;
		height: 500px;
		overflow: scroll;
	}
</style>
