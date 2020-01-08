package com.bill.ema.emaServer.service;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.bill.ema.emaModel.entity.Permission;
import com.bill.ema.emaModel.entity.User;

@Service("userService")
public interface UserService extends IService<User>{
	User getByUsername(String username);
	User getByEmail(String email);
	Set<User> getByRoleId(Integer roleId);
	Set<User> getByRoleName(String roleName);
	Set<Permission> getAllPermission(Integer id);
}
