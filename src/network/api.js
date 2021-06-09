/**将网路请求封装成方法：*/
import {request} from './request';


//注册
export function _register () {
  return request ({
    url: '/user/register',
    method: 'post',
    data: {
      phone,
      password
    }
  })
}

