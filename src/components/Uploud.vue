<template>
	<div class="uploud-wrap">
		<input class="fileinput" type="file" :before-upload="beforeUpload" @change="handleChange">
		<div class="imgbutton" v-if="!imageUrl">
			<div style="font-size: 30px;">+</div> 
			<div>上传</div> 
		</div>
		<img style="height: 85px; width: 85px;" v-if="imageUrl" :src="imageUrl" alt="avatar" />
			
	</div>
</template>

<script>
	
	function getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}
	
	export default{
		name: 'Uploud',
		props:{
			'dishPic': {
				type: String,
			},
		},
		data(){
			return{
				loading: false,
				imageUrl: '',
				profilePic:""
			}
		},
		mounted(){
			console.log(this._props.dishPic);
			this.imageUrl = this.dishPic
		},
		methods: {
			handleChange(e) {
				let that = this
				console.log(e.target.files[0]);

					getBase64(e.target.files[0], imageUrl => {
						this.imageUrl = imageUrl;
						this.loading = false;
					});
					const formData = new FormData()
					
					formData.append('photo', e.target.files[0])
					this.axios.post("http://47.98.238.175:8080/user/uploadFile", formData,{
					  headers:{
					    'Content-Type':'multipart/form-data'
					  }
					})
					  .then(res => {
						  console.log(res)
						  this.$emit('profilePic', "http://diancan.drbxsj.top/"+res.data)
					  }).catch(err => {
					  console.log(err)
					})
			},
			beforeUpload(file) {
				const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
				if (!isJpgOrPng) {
					// this.$message.error('You can only upload JPG file!');
					this.$message.error('请上传JPG文件！');
				}
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					// this.$message.error('Image must smaller than 2MB!');
					this.$message.error('图片的大小需小于2M！');
				}
				return isJpgOrPng && isLt2M;
			},
			
		},
		
	}
	
</script>

<style scoped>
	.uploud-wrap{
		margin: 5px 0;
		position: relative;
	}
	.fileinput{
		position: absolute;
		width: 85px;
		height: 85px;
		opacity: 0;
	}
	.imgbutton{
		width: 85px;
		height: 85px;
		border: 1px dashed #d9d9d9;
		background-color: #fafafa;
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
	}
	.imgbutton:hover{
		border: 1px dashed #1890ff;
	}
</style>
