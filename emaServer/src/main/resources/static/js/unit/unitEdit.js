var vm = new Vue({
	el:'#addForm',
	data:{
		unit:{
			id:'',
			name:'',
			license:'',
			addressId:'',
			description:''
		},
		addresss:''
	},
	mounted(){
		this.initForm();
		this.validate();
		this.submit();
	},
	methods:{
		async initForm(){
			await this.initData();
			//await this.initSelect();
			await form.render(null,'addunit');			
		},
		async initData(){
			this.unit.id = $("#id").val();
			if(this.unit.id!=""){
				await $.post(baseURL+"/unit/info/"+this.unit.id,r=>{
					this.unit = r.data;
				})
			}	
			/*await $.post(baseURL + '/address/all',r=>{
				console.log(r.data)
				this.addresss = r.data
			})*/
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
				el:'#addressIds',
				name:'addressId',
				radio: true,
				clickClose: true,	
				paging:true,
				pageSize:5,
				data:vm.addresss,
				layVerify: 'required',
				initValue:[vm.unit.addressId],
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
			$.post(baseURL+'/unit/create',param,r=>{
				if(r.code==0){
					parent.layer.msg("保存成功")
					var index = parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
					parent.layer.close(index); // 再执行关闭
				}
			});
		},
		edit(param){
			$.post(baseURL+'/unit/edit',param,r=>{
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
				isunitnameExist(value,item){
					$.ajaxSettings.async = false;
					var msg = "";
					if(!value==vm.unit.name)
					$.get(baseURL + "/verify/isunitnameExist/"+value,r=>{				
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