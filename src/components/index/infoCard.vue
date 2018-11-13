<style lang="css">
.infor-card-icon-con{
	height: 100%;
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
}
.infor-card-text{
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
}
.height-100{
	height: 100%;
}
.infor-intro-text{
	font-size:15px;
	font-weight:500;
	color:#c8c8c8;
}
/*
    --blue: #007bff;
    --indigo: #6610f2;
    --purple: #6f42c1;
    --pink: #e83e8c;
    --red: #dc3545;
    --orange: #fd7e14;
    --yellow: #ffc107;
    --green: #28a745;
    --teal: #20c997;
    --cyan: #17a2b8;
    --white: #fff;
    --gray: #6c757d;
    --gray-dark: #343a40;
    --primary: #1997c6;
    --secondary: #6c757d;
    --success: #1BC98E;
    --info: #9F86FF;
    --warning: #E4D836;
    --danger: #E64759;
    --light: #f8f9fa;
    --dark: #1a1c22;
    */
</style>
<template>
	<Card :padding="0"> 
		<div :style="{height: height}" class="card">
			<Col :span="iconSpan" class="infor-card-icon-con" :style="{backgroundColor: color, color: 'white'}">
				<Row class="height-100" type="flex" align="middle" justify="center">
					<Icon :type="iconType" :size="iconSize"></Icon>
				</Row>
			</Col>
			<Col :span="countSpan" class="height-100 infor-card-text">
				<Row type="flex" align="middle" justify="center" class="height-100">
					<count-up 
						class="infor-card-count user-created-count" 
					    :id-name="idName" 
					    :end-val="endVal" 
					    :color="color" 
					    :countSize="countSize" 
					    :countWeight="countWeight">
						<p class="infor-intro-text" :style="{fontSize:textSize}" slot="intro">
							{{ introText }}
						</p>
					</count-up>
				</Row>
			</Col>
		</div>
	</Card>
</template>
<script>
	import countUp from './countUp.vue';
	export default {
		name: 'infoCard',
		components: {
			countUp
		},
		props: {
			/* 唯一ID */
			idName: String,
			/* 最终数据 */
			endVal: {
				type: Number,
				default: 0
			},
			/* 颜色 */
			color: String,
			/* icon图标 */
			iconType: String,
			/* 文字 */
			introText: String,
			/* 文字大小 */
			textSize: {
				type: String,
				default: '15px'
			},
			/* 数字大小 */
			countSize: {
				type: String,
				default: '30px'
			},
			/* 数字宽度 */
			countWeight: {
				type: Number,
				default: 700
			},
			/* 图标大小 */
			iconSize: {
				type: Number,
				default: 40
			},
			/* 整个item的高度 */
			height: {
				type: String,
				default: '100px'
			},
			/* 图标部分所占的col */
			iconSpan: {
				type: Number,
				default: 8
			},
			/* 数字和文字部分所占的col */
			countSpan: {
				type: Number,
				default: 16
			}
		}
	};
</script>
