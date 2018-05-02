import { Base } from '../../utils/base.js';

class Index extends Base {

  constructor() {
    super();
  }


  getBannerData(callback) {
    let params = {
      'url': '?s=/index/advertising/getAllCarousel',
      'type': 'GET',
      //这里是收到服务器消息后，回调sCallBack，在sCallBack里面再次回调的地方
      //第二次回调的是真正处理数据的函数
      'sCallBack': function (res) {
        callback && callback(res);
      }
    };
    //调用基类的统一request函数，避免直接调用小程序API，造成重复
    this.request(params);
  }

  getRecommendData(callback) {
    let params = {
      'url': '?s=/api/Manage_Recommend/getRecommendInfo',
      'type': 'GET',
      //这里是收到服务器消息后，回调sCallBack，在sCallBack里面再次回调的地方
      //第二次回调的是真正处理数据的函数
      'sCallBack': function (res) {
        callback && callback(res);
      }
    };
    //调用基类的统一request函数，避免直接调用小程序API，造成重复
    this.request(params);
  }

  getRecentProductsData(callback) {
    let params = {
      'url': 'product/getRecentProduct/15',
      'type': 'GET',
      //这里是收到服务器消息后，回调sCallBack，在sCallBack里面再次回调的地方
      //第二次回调的是真正处理数据的函数
      'sCallBack': function (res) {
        callback && callback(res);
      }
    };
    //调用基类的统一request函数，避免直接调用小程序API，造成重复
    this.request(params);
  }
}

export { Index };