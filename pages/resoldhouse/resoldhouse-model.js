import { Base } from '../../utils/base.js';

class ResoldHouse extends Base {

  constructor() {
    super();
  }


  getResoldHouseData(id,callback) {
    let params = {
      'url': '?s=/api/Get_house/getResoldHouse',
      // 'url': 'index/addHouse?XDEBUG_SESSION_START=13250',
      'type': 'POST',
      //这里是收到服务器消息后，回调sCallBack，在sCallBack里面再次回调的地方
      //第二次回调的是真正处理数据的函数
      'data':{
        'id':id
      },
      'sCallBack': function (res) {
        callback && callback(res);
      }
    };
    //调用基类的统一request函数，避免直接调用小程序API，造成重复
    this.request(params);
  }
}

export { ResoldHouse };