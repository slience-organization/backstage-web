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

