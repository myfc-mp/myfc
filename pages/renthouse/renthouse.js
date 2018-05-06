import { RentHouse } from 'renthouse-model.js';

var rentHouse = new RentHouse();
// pages/house/house.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'id': options.id
    });

    this._loadData();
  },

  _loadData: function () {
    let data = rentHouse.getRentHouseData(this.data.id, (res) => {
      this.setData({ 'houseArr': res });
      wx.setNavigationBarTitle({
        title: this.data.houseArr.name,
      });
      this.setData({
        'latitude': res.lat,
        'longitude': res.lng,
        'markers': [{
          id: 1,
          latitude: res.lat,
          longitude: res.lng,
        }]
      });
      this.mapCtx = wx.createMapContext('myMap')
    });
  },

  onShareAppMessage: function (res) {
    console.log(res);
    return {
      title: this.data.houseArr.name,
      path: '/pages/renthouse/renthouse?id=' + this.data.id,
      success: function (res) {
        console.log('seccess');
        // 转发成功
      },
      fail: function (res) {
        console.log('fail');
      }
    }
  },
  onCallTap: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.houseArr.agency.phone,
      success: function () {
        console.log("成功拨打电话")
      }
    })
  }
})