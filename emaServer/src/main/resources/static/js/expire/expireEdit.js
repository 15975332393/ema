var vm = new Vue({
	el:'#addForm',
	data:{
		expire:{
			id:'',
			name:'',
			quantity:'',
			unitId:'',
			description:''
		},
		units:''
	},
	mounted(){
		this.initForm();
		this.validate();
		this.submit();
	},
	methods:{
		async initForm(){
			await this.initData();
			await this.initSelect();
			await form.render(null,'addexpire');			
		},
		async initData(){
			this.expire.id = $("#id").val();
			if(this.expire.id!=""){
				await $.post(baseURL+"/expire/info/"+this.expire.id,r=>{
					this.expire = r.data;
				})
			}	
			await $.post(baseURL + '/unit/all',r=>{
				this.units = r.data
				console.log(r.data)
			})
		},
		submit(){
			form.on('submit(confirm)',data=>{
					var param = data.field;
					if(data.field.id=='')
							this.create(param);
						else
							this.edit(param);
						return false;
				})
		},
		initSelect(){
			xmSelect.render({
				el:'#unitIds',
				name:'unitId',
				radio: true,
				clickClose: true,	
				paging:true,
				pageSize:5,
				data:vm.units,
				layVerify: 'required',
				initValue:[vm.expire.unitId],
				// pageRemote: true,
				pageEmptyShow: false,
				filterable:true,
				prop:{
					value:'id'
				},
				theme:{
					color:'#1E9FFF'
				}
			});	
		},
		create(param){
			$.post(baseURL+'/expire/create',param,r=>{
				if(r.code==0){
					parent.layer.msg("保存成功")
					var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
					parent.layer.close(index); // 再执行关闭
				}
			});
		},
		edit(param){
			$.post(baseURL+'/expire/edit',param,r=>{
				if(r.code==0){
					parent.layer.msg("保存成功")
					var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
					parent.layer.close(index); // 再执行关闭
				}
			});
		},
		cancel(){
			var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
			parent.layer.close(index); // 再执行关闭
		},
		validate(){
			form.verify({
				isexpirenameExist(value,item){
					$.ajaxSettings.async = false;
					var msg = "";
					if(!value==vm.expire.name)
					$.get(baseURL + "/verify/isexpirenameExist/"+value,r=>{				
						if(r.code!=0){
							msg = r.msg;
						}
					})
					return msg;
				}
			})
		}
	}
})