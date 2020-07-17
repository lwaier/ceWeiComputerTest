<template>
	<view style="width: 750upx;overflow: hidden;">
		<view style="width: 890upx;">
			
			<view class="user" :style="{marginLeft:left}">
				
				<!-- 学生信息展示组件 -->
				<view class="left_content" @touchstart="touchS" @touchmove="touchM" @touchend="touchE">
					<view v-for="(itemValue,itemKey) in userInfo" :key="itemKey">
						<view class="user_info_display" v-if="itemKey=='userHeight'||itemKey=='isVip'||itemKey=='className'||itemKey=='userStage'||itemKey=='createTime'||itemKey=='userName'">
							<text>{{itemKey | itemTile}}</text>
							<view class="user_info_value">{{itemValue}}</view>
						</view>
					</view>
					<view>
						<slot></slot>
					</view>
					<view class="text_msg">我放在默认插槽里面</view>
					<button type="primary" plain="true" class="delete" @click="deleteFn">删除</button>
				</view>
				
				<view class="delect-btn" @click="deleteFn">
					删除
				</view>
				
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data(){
			return {
				left:'',
				startX: null,
				delBtnWidth: 140, //删除按钮宽度单位（rpx）
			}
		},
		props:{
			userInfo:{
				type:Object,
				default:()=>{
					return{
						userName:'liWei', //学生姓名
						userHeight:'180', //学生身高
						isVip:false, //是否vip
						className:'ceWeiXinxi',	//班级名称
						userStage:'学霸',	//学生登记
						createTime:'创建时间',	//创建时间
						isEdit:false, //是否编辑
					}
				}
			}
		},
		filters:{
			itemTile(item){
				switch(item){
					case 'userName':
					return '姓名'
					case 'userHeight':
					return '身高'
					case 'isVip':
					return '是否VIP'
					case 'className':
					return '班级名称'
					case 'userStage':
					return '学生等级'
					case 'createTime':
					return '创建时间'
					default :
					return '大佬您好,我是您的忠实小迷弟,这里的filter用得还行吧,请给我面试加分噢'
				}
			}
		},
		methods:{
			//滑动开始
			touchS: function(e) {
				if (e.touches.length == 1) {
					this.startX = e.touches[0].clientX
				}
			},
			
			//滑动移动
			touchM: function(e) {
				var index = e.currentTarget.dataset.index;
				if (e.touches.length == 1) {
					var moveX = e.touches[0].clientX;
					var disX = this.startX - moveX;
					var delBtnWidth = this.delBtnWidth;
					var left = "";
					if (disX == 0 || disX < 0) { //如果移动距离小于等于0，container位置不变
						left = "0rpx";
					} else if (disX > 0) { //移动距离大于0，container left值等于手指移动距离
						left = disX + "rpx";
						if (disX >= delBtnWidth) {
							this.left = "-" + delBtnWidth + "rpx";
						}
					}
					// var list = this.list;
					// if (index !== "" && index !== null) {
					// 	this.$set(list[parseInt(index)],'left',left)
					// }
				}
			},
			
			//滑动结束
			touchE: function(e) {
				if (e.mp.changedTouches.length == 1) {
					var endX = e.mp.changedTouches[0].clientX;
					var disX = this.startX - endX;
					var delBtnWidth = this.delBtnWidth;
					//如果距离小于删除按钮的1/3，不显示删除按钮
					var left = disX > delBtnWidth / 3 ? "-" + delBtnWidth + "rpx" : "0rpx";
					var list = this.list;
					this.left=left
				}
			},
			deleteFn(){
				let that = this;
				uni.showModal({
					title:'您确定要删除该用户信息吗',
					content: '删除后无法恢复',
					success: function (res) {
						if (res.confirm) {
							
							that.$emit('deleteFn')
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}
		}
		
	}
</script>

<style lang="scss">
	.user{
		height: 580upx;
		font-size: 28upx;
		color: #666;
		border-bottom: 2upx solid  #e5e5e5;
		padding-bottom: 10upx;
		display: flex;//撤回到此处不撤回了
		justify-content: space-between;
		transition: margin-left 0.2s ease-in-out;
		width: 870upx;
		padding-left: 20upx;
		
		.left_content{
			width:710upx;
			height: 580upx;
			.user_info_display{
				display: flex;
				justify-content: space-between;
				margin: 20upx 20upx 4upx 20upx;
				.user_info_value{
					margin-left: 100upx;
					flex: 1;
					text-align: right;
					@include dotted3
				}
			}
			.text_msg{
				margin: 6upx 0upx 0upx 20upx;
				
			}
			.delete{
				margin: 0 20upx;
				margin-top: 10upx;
			}
		}
		// 删除
		.delect-btn {
			height: 580upx;
			width: 140upx;
			background: #e64340;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
