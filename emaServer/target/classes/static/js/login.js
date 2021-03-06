var vm = new Vue({
	el:'#loginForm',
	data:{
		username:"",
		password:"",
		captcha:"",
		src:"captcha.jpg"
	},created(){
		this.submit();
		this.validate();
	},
	methods:{
		submit(){
			form.on('submit(login)', data=>{				
				$.ajax({
					url:baseURL + "/login",
					type:"POST",
					data:data.field,
					success(r){
						layer.msg(r.msg);
						console.log(r)
						if(r.code==0)
							window.location.href="./index.html";
						else
							vm.refreshCode();
					},
				})
			})
		},
		validate(){
			form.verify({
				username(value,item){
					var username = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
					if(!username.test(value)){
						vm.refreshCode();	
						return "账号不正确";
					}
				},
				password(value,item){
					var password = /^[a-zA-Z]\w{5,17}$/;
					
					if(!password.test(value)){
						vm.refreshCode();
						return "密码错误";
						
					}
				},captcha(value,item){
					var captcha = /^[(a-zA-Z)+0-9+]{5}$/;
					if(!captcha.test(value)){
						vm.refreshCode();
						return "验证码错误";
					}
				}
			})
		},
		refreshCode(){
			this.src="captcha.jpg?t="+$.now();
		}
	}
})