<template>
	<div class="login" @keydown.enter="handleSubmit">
		<div class="login-con">
			<Card :bordered="false">
				<p slot="title">
					<Icon type="log-in"></Icon>
					欢迎登录
				</p>
				<div class="form-con">
					<Form ref="loginForm" :model="form" :rules="rules">
						<FormItem prop="userName">
							<Input v-model="form.userName" placeholder="请输入用户名">
								<span slot="prepend">
									<Icon :size="16" type="person"></Icon>
								</span>
							</Input>
						</FormItem>
						<FormItem prop="password">
							<Input type="password" v-model="form.password" placeholder="请输入密码">
								<span slot="prepend">
									<Icon :size="14" type="locked"></Icon>
								</span>
							</Input>
						</FormItem>
						<FormItem>
							<Button @click="handleSubmit" type="primary" long>登录</Button>
						</FormItem>
					</Form>
					<p class="login-link" align="center">
						<font>{{form.logMsg}}</font>
					</p>
					<p class="login-tip">输入任意用户名和密码即可</p>
				</div>
			</Card>
		</div>
	</div>
</template>
<script>
// 引入非npm第三方js
import myLocalStorage from '@/model/myLocalStorage'
import mySessionStorage from '@/model/mySessionStorage'
import myAjax from '@/ajax/myAjax'
import { api } from '@/api/api'
import md5 from 'js-md5'
export default {
	data() {
		return {
			form: {
				userName: '',
				password: '',
				logMsg: this.$store.state.logMsg,
			},
			rules: {
				userName: [{
					required: true,
					message: '账号不能为空',
					trigger: 'blur'
				}],
				password: [{
					required: true,
					message: '密码不能为空',
					trigger: 'blur'
				}]
			}
		};
	},
	mounted() {
		this.form.logMsg = this.$store.state.logMsg;
	},
	methods: {
		handleSubmit() {
			this.$Spin.show();
			this.$refs.loginForm.validate((valid) => {
              // 模拟登陆token
              if (valid) {
              	var password = md5(this.form.password);
              	this.$store.commit("setPassword",password);
              	$.ajax({
                      url: api.loginApi, //请求url
                      async: false,
                      dataType: "json",
                      timeout:10000,
                      data: {
                      	loginName: this.form.userName,
                      	password: password
                      },
                      success: res => {
                      	if (res.status == 200) {
                              // 登陆成功
                              myLocalStorage.set("userInfo", res.data.userInfo);
                              myLocalStorage.set("token", res.data.token);
                              this.$store.commit("setToken", res.data.token);
                              myLocalStorage.set('locking', '0');
                              myLocalStorage.set('userInfo', res.data.userInfo);
                              this.$router.push({
                              	path: 'index'
                              });
                              this.$Spin.hide();
                          } else {
                          	this.form.logMsg = res.msg;
                          	this.$Spin.hide();
                          }
                      },
                      error: (err) => {
                          // 失败
                          this.form.logMsg = "服务器未响应，请稍后再登陆。";
                          this.$Spin.hide();
                          // 演示环境跳转至主页
                          myLocalStorage.set('locking', '0');
                          mySessionStorage.set('auth_token',"11111");
                          this.$router.push({path:'index'})
                      }
                  });
              }else{
              	this.$Spin.hide();
              	this.$Message.error('用户名或者密码不能为空~');
              }
          });
		},
	}
};
</script>
<style>
	.login {
		width: 100%;
		height: 100%;
		background-image: url('../assets/images/login_bg.jpg');
		background-size: cover;
		background-position: center;
	}
	.login-con {
		position: absolute;
		right: 160px;
		top: 50%;
		transform: translateY(-60%);
		width: 300px;
	}
	.form-con {
		padding: 10px 0 0;
	}
	.login-tip {
		font-size: 10px;
		text-align: center;
		color: #c3c3c3;
	}
	.login-link {
		color: red;
	}
</style>
