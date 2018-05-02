
import { Index } from 'index-model.js';
import { Config } from '../../utils/config.js';
var index = new Index();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backColor:[
      '#000000',
      'RGB(231,247,253)',
      'RGB(231,247,253)',
      'RGB(231,247,253)',
      'RGB(231,247,253)',
      'RGB(241,253,244)',
      'RGB(241,253,244)',
      'RGB(241,253,244)',
      'RGB(241,253,244)',
      'RGB(253,241,250)',
      'RGB(253,241,250)',
      'RGB(253,241,250)',
      'RGB(253,241,250)',
      'RGB(247,250,214)',
      'RGB(247,250,214)',
      'RGB(247,250,214)', 
      'RGB(247,250,214)',
      'RGB(245,245,245)',
      'RGB(245,245,245)',
      'RGB(250,234,230)',
      'RGB(250,234,230)',
      'RGB(232,230,242)',
      'RGB(232,230,242)',
      'RGB(232,230,242)',
      'RGB(232,230,242)',
      'RGB(245,245,245)',
      'RGB(245,245,245)'
    ], 
    fontColor: [
      '#000000',
      'RGB(108,160,205)',
      'RGB(108,160,205)',
      'RGB(108,160,205)',
      'RGB(108,160,205)',
      'RGB(95,206,145)',
      'RGB(95,206,145)',
      'RGB(95,206,145)',
      'RGB(95,206,145)',
      'RGB(241,158,101)',
      'RGB(241,158,101)',
      'RGB(241,158,101)',
      'RGB(241,158,101)',
      'RGB(191,144,0)',
      'RGB(191,144,0)',
      'RGB(191,144,0)',
      'RGB(191,144,0)',
      'RGB(59,56,56)',
      'RGB(59,56,56)',
      'RGB(197,90,17)',
      'RGB(197,90,17)',
      'RGB(198,165,215)',
      'RGB(198,165,215)',
      'RGB(198,165,215)',
      'RGB(198,165,215)',
      'RGB(59,56,56)',
      'RGB(59,56,56)'
    ]
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
        if(res[i]){
          for (let j in res[i].image){
            res[i].image[j].url = Config.house_prefix + res[i].image[j].url;
          }
        }
      }
      this.setData({ 'recommendArr': res });
      console.log(this.data.recommendArr);
    });

    
  }

  // onProductsItemTap: function (option) {
  //   wx.navigateTo({
  //     'url': '../product/product?id=' + option.currentTarget.dataset.id
  //   });
  // },

  // onTheme: function (option) {
  //   wx.navigateTo({
  //     'url': '../theme/theme?id=' + option.currentTarget.dataset.id + '&name=' + option.currentTarget.dataset.name
  //   });
  // }
})