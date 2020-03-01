package com.bill.ema.emaServer.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bill.ema.emaCommon.response.R;
import com.bill.ema.emaServer.service.ExpireService;
import com.bill.ema.emaServer.service.FoodService;

@RestController
@RequestMapping("/expire")
public class ExpireController {

	@Autowired
	private FoodService foodService;
	
	@Autowired
	private ExpireService expireService;
	
	@RequestMapping("/list")
	public R list(@RequestParam Map<String,Object> param){
		System.out.println(param);
		return R.OK(foodService.queryPage(param));
	}
	
	@RequestMapping("/all")
	@ResponseBody
	public R all() {
		return R.OK(expireService.list());
	}
}
