import { Config } from 'config.js';

class Base {
  constructor() {
    this.baseUrl = Config.restURL;
  }

  request(params) {
    if (!params.type) {
      params.type = 'GET';
    }
    console.log(params.data);
    wx.request({
      url: this.baseUrl + params.url,
      // header: {
      //   'content-type': 'application/jsom',
      //   'token': wx.getStorageSync('token')
      // },
      data: params.data,
      method: params.type,
      //这里是收到服务器的参数后，被回调的地方，其调用params带入的回调函数
      success: function (res) {
        console.log(res.data);
        params.sCallBack && params.sCallBack(res.data);
      },
      fail: function (err) {
        console.log(err);
        params.eCallBack && params.eCallBack(res.data);
      }
    })
  }

  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }
}

export { Base };