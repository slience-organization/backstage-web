/**将网路请求封装成方法：*/
import {request} from './request';

//登录
export function _login (user) {
  return request ({
    url: '/user/login',
    method: 'post',
    data: {
      phone: user.phone,
      password: user.password
    }
  })
}

//添加用户
export function _addUser (user) {
  return request ({
    url: '/user/addUser',
    method: 'post',
    data: {
      phone: user.phone,
      password: user.password
    }
  })
}

//获取用户
export function _getAllUsers () {
  return request ({
    url: '/user/getAllUsers'
  })
}

//添加角色
export function _addRole (role) {
  return request ({
    url: '/role/addRole',
    method: 'post',
    data: role
  })
}

//获取角色
export function _getAllRoles () {
  return request ({
    url: '/role/getAllRoles'
  })
}



