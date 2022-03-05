<template>
	<div>
		<a-upload name="avatar" list-type="picture-card" class="avatar-uploader"
			:show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
			:before-upload="beforeUpload" @change="handleChange">
			<img style="height: 85px; width: 85px;" v-if="imageUrl" :src="imageUrl" alt="avatar" />
			<div v-else>
				<a-icon :type="loading ? 'loading' : 'plus'" />
				<div class="ant-upload-text">
					Upload
				</div>
			</div>
		</a-upload>
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
			handleChange(info) {
				let that = this
				if (info.file.status === 'uploading') {
					this.loading = true;
					return;
				}
				if (info.file.status === 'done') {
					// Get this url from response in real world.
					getBase64(info.file.originFileObj, imageUrl => {
						this.imageUrl = imageUrl;
						this.loading = false;
					});
					const formData = new FormData()
					
					formData.append('photo', info.file.originFileObj)
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
				}
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

<style>
</style>
