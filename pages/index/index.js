
import { Index } from 'index-model.js';
import { Config } from '../../utils/config.js';
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
      for (let i in res) {
        res[i].url = Config.carousel_prefix + res[i].url;
      }
      this.setData({ 'bannerArr': res });
   
    });

    data = index.getRecommendData((res) => {
      for (let i in res) {        
        for (let j in res[i].image){
          res[i].image[j].url = Config.house_prefix + res[i].image[j].url;             
        }
        res[i].recommendLabel = Config.recommendLogo_prefix + res[i].recommendLabel;
      }
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

      path: '/pages/index/index',
      imageUrl: Config.recommendLogo_prefix + 'forwardTitle.jpg',
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