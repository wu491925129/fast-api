<template>
	<div class="login" @keydown.enter="handleSubmit">
        <Select v-model="language" class="langSelect" @on-change="changeLang">
	        <Option v-for="item in langs" :value="item.code" :key="item.name">
	        	{{ item.name }}
	        </Option>
	    </Select>
		<div class="login-con">
			<Card :bordered="false">
				<p slot="title">
					<Icon type="log-in"></Icon>
					{{$t("loginPage").login}}
				</p>
				<div class="form-con">
					<Form ref="loginForm" :model="form" :rules="rules">
						<FormItem prop="userName">
							<Input v-model="form.userName"
								   :placeholder="$t('loginPage').userNamePlaceholder">
								<span slot="prepend">
								<Icon :size="16" type="ios-person-outline" slot="prepend"></Icon>
								</span>
							</Input>
						</FormItem>
						<FormItem prop="password">
							<Input type="password" 
								   v-model="form.password" 
								   :placeholder="$t('loginPage').passwordPlaceholder">
								<span slot="prepend">
									<Icon :size="16" type="ios-lock-outline" slot="prepend"></Icon>
								</span>
							</Input>
						</FormItem>
						<FormItem>
							<Row :gutter="8">
								<Col span="12">
									<Button @click="handleSubmit" type="primary" long>
										{{$t("loginPage").login}}
									</Button>
								</Col>
	        					<Col span="12">
	        						<Button @click="registDrawer = true" type="primary" long>
										{{$t("loginPage").regist}}
	        						</Button>
	        					</Col>
							</Row>
						</FormItem>
					</Form>
					<p class="login-link" align="center">
						<font>{{form.logMsg}}</font>
					</p>
					<p class="login-tip">输入任意用户名和密码即可</p>
				</div>
			</Card>
		</div>
		<Drawer :title="$t('loginPage').regist" 
			    :closable="false" 
			    v-model="registDrawer"
			    placement="left"
			    width="30">
	        <Form ref="registForm" :model="registForm" :rules="rules">
				<FormItem :label="$t('loginPage').userName" prop="userName">
		            <Input v-model="registForm.userName" 
		            	   :placeholder="$t('loginPage').userNamePlaceholder"
		            	   clearable>
		            	<Icon :size="16" type="ios-person-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem :label="$t('loginPage').password" prop="password">
		            <Input type="password" 
		                   v-model="registForm.password" 
		                   :placeholder="$t('loginPage').passwordPlaceholder"
		                   clearable>
		            	<Icon :size="16" type="ios-lock-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem :label="$t('loginPage').email" prop="email">
		            <Input v-model="registForm.email" 
		            	   :placeholder="$t('loginPage').emailPlaceholder"
		            	   clearable>
		            	<Icon :size="16" type="ios-mail-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
			</Form>
			<div class="regist-drawer-footer">
                <Button style="margin-right: 8px" @click="registDrawer = false">{{$t('cancel')}}</Button>
                <Button type="primary" @click="regist">{{$t('loginPage').regist}}</Button>
            </div>
	    </Drawer>
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
			langs:[
                {name:'简体中文',code:"zh"},
                {name:'繁体中文',code:"hk"},
                {name:'English',code:"en"},
                {name:'日本語',code:"jp"}
            ],
            language:'',
			rules:{
				userName: [{
					required: true,
					message: this.$t("loginPage").userName + this.$t("loginPage").notEmpty,
					trigger: 'blur'
				}],
				password: [{
					required: true,
					message: this.$t("loginPage").password + this.$t("loginPage").notEmpty,
					trigger: 'blur'
				}],
				email:[
					{
						required: true,
						message: this.$t("loginPage").email + this.$t("loginPage").notEmpty,
						trigger: 'blur' 
					},
                    {
                    	type: 'email', 
                    	message: this.$t("loginPage").emailFormat, 
                    	trigger: 'blur' 
                    }
                ]
			},
			registDrawer:false,
			registForm:{
				userName:'',
				password:'',
				email:''
			},
			data2: []
		};
	},
	computed:{
		userNameComputed(){
            // 计算属性使用闭包的方法缓解不能传参的尴尬
            return (data) => {
                return this.$t("loginPage").data;
            }
        },
	},
	mounted() {
		this.form.logMsg = this.$store.state.logMsg;
		// 初始化从store中拿数据
        var code = myLocalStorage.get("language");
        this.language = code;
        this.$i18n.locale = code;
	},
	methods: {
		changeLang(code){
			this.$i18n.locale = code;
            this.getLanguageByCode(code);
            localStorage.setItem('language',code)
		},
		getLanguageByCode(code){
            // 根据语言代码获取语言名称
            this.langs.forEach((info,index) => {
                if (info.code == code) {
                    this.language = code;
                }
            });
        },
		// 邮箱提示
		emailTips(value) {
		    this.data2 = !value || value.indexOf('@') >= 0 ? [] : [
		        value + '@qq.com',
		        value + '@sina.com',
		        value + '@163.com'
		    ];
		},
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
		regist(){
			this.$Spin.show();
			this.$refs.registForm.validate((valid) => {
				 if (valid) {
				 	var password = md5(this.form.password);
              		this.$store.commit("setPassword",password);
              		var registJson = this.registForm;
              		registJson.password = password;
              		// 注册
					myAjax.post({
						url:api.registApi,
						data:JSON.stringify(registJson),
						success:(res)=>{  // 成功
		                    if (res.code == 200) {
		                    	this.$Message.success('注册成功！');
		                    }else{
		                    	this.$Message.error('注册失败，'+res.message);
		                    }
		                },
		                fail:(err)=>{     // 失败
		                    console.log(err);
		                }
					})
					this.$Spin.hide();
				}else{
					this.$Spin.hide();
					this.$Message.error('用户名、密码、邮箱不能为空~');
				}
			});
			
		}
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
	.langSelect{
		margin:20px;
		width:85px;
		float: right
	}
	.regist-drawer-footer{
	    margin-top:20px; 
	    width: 100%;
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    border-top: 1px solid #e8e8e8;
	    padding: 10px 16px;
	    text-align: right;
	    background: #fff;
	}
</style>
