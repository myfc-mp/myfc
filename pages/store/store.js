import { Store } from 'store-model.js';

var store = new Store();
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
    this._loadData();
  },
  _loadData: function () {
    let data = store.getStoreData((res) => {
      for(let i in res){
        res[i].markers = [{
          id: 1+i,
          latitude: res[i].lat,
          longitude: res[i].lng,
        }];
      }
      this.setData({ 'storeArr': res });

      // this.mapCtx = wx.createMapContext('myMap');
    });
  },
  onCallTap: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.number,
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})