/**将网路请求封装成方法：*/
import {request} from './request';


//注册
export function _register (phone,password) {
  return request ({
    url: '/user/register',
    method: 'post',
    data: {
      phone: phone,
      password: password
    }
  })
}

//登录
export function _login (phone,password) {
  return request ({
    url: '/user/login',
    method: 'post',
    data: {
      phone:phone,
      password:password
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



