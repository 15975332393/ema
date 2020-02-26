package com.bill.ema.emaServer.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bill.ema.emaCommon.response.R;
import com.bill.ema.emaCommon.response.Statuscode;
import com.bill.ema.emaCommon.util.Constant;
import com.bill.ema.emaServer.service.UserService;
import com.bill.ema.emaServer.service.ValidateService;

@Service
public class ValidateServiceImpl implements ValidateService{

	@Autowired
	private UserService userService;
	
	

	@Override
	public R verifyUseranme(String username) {
		if(userService.getByUsername(username)!=null)
			return R.ERROR(Statuscode.UserNameExist);
		System.out.println(username);
		return R.OK();
	}

	@Override
	public R verifyEmail(String email) {
		if(userService.getByEmail(email)!=null)
			return R.ERROR(Statuscode.EmailExist);
		System.out.println(email);
		return R.OK();
	}

	@Override
	public R verifyPhone(String phone) {
		if(userService.getByPhone(phone)!=null)
			return R.ERROR(Statuscode.PhoneExist);
		System.out.println(phone);
		return R.OK();
	}
}
