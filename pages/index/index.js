
import { Index } from 'index-model.js';

var index = new Index();
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

    var data = index.getBannerData((res) =>{

      this.setData({ 'bannerArr': res });
   
    });

    data = index.getRecommendData((res) => {
 
      this.setData({ 'recommendArr': res });
  
    });

    
  },

  onHouseTap: function (option) {
    let houseID = option.currentTarget.dataset.id;
    if (houseID < 100000){
      wx.navigateTo({
        'url': '../resoldhouse/resoldhouse?id=' + houseID
      });
    }
    else{
      wx.navigateTo({
        'url': '../renthouse/renthouse?id=' + houseID
      });
    }
  },
  onShareAppMessage: function (res) {
    console.log(res);
    return {
      title:'玛雅房屋',
      path: '/pages/index/index',
      imageUrl: '/image/forwardTitle.jpg',
      success: function (res) {
        console.log('seccess');
        // 转发成功
      },
      fail: function (res) {
        console.log('fail');
      }
    }
  }
})