import { Resold } from 'resold-model.js';

var resold = new Resold();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    'display':[
      'none',
      'none',
      'none',
      'none'
    ],
    'attr':{
      'pageIndex': 1,
      'location':'不限',
      'price_total': '不限',
      'type': '不限',
      'area': '不限' 
    },
    'resoldArr':[],
    'isLoadedAll': false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData: function () {
    let data = resold.getAllResoldData(this.data.attr,(res) => {

      this.setData({ 'resoldArr': res });     
    });
  },

  _reloadData:function(){
    let data = resold.getAllResoldData(this.data.attr, (res) => {
      if (res.length > 0) {
        this.data.resoldArr.push.apply(this.data.resoldArr, res);
      }
      else {
        this.data.isLoadedALL = true;
      }
      this.setData({ 'resoldArr': this.data.resoldArr });
    });   
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

  onSelectTap: function (e) {
    let index = e.currentTarget.dataset.index;
    this.onShowSelectZone(index);
  },

  onLocationTap: function (e) {
    let data = this.data.attr;
    data.location = e.currentTarget.dataset.location;
    data.pageIndex = 1;
    this.setData({
      'attr': data
    });
    this.onShowSelectZone(0);
    this._loadData();
  },

  onPriceTap: function (e) {
    let data = this.data.attr;
    data.price_total = e.currentTarget.dataset.price;
    data.pageIndex = 1;
    this.setData({
      'attr': data
    });
    this.onShowSelectZone(1);
    this._loadData();
  },

  onHouseTap: function (option) {
    let houseID = option.currentTarget.dataset.id;
    if (houseID < 100000) {
      wx.navigateTo({
        'url': '../resoldhouse/resoldhouse?id=' + houseID
      });
    }
    else {
      wx.navigateTo({
        'url': '../renthouse/renthouse?id=' + houseID
      });
    }
  },
  
  onTypeTap: function (e) {
    let data = this.data.attr;
    data.type = e.currentTarget.dataset.type;
    data.pageIndex = 1;
    this.setData({
      'attr': data
    });
    this.onShowSelectZone(2);
    this._loadData();
  },

  onAreaTap:function(e){
    let data = this.data.attr;
    data.area = e.currentTarget.dataset.area;
    data.pageIndex = 1;
    this.setData({
      'attr': data
    });
    this.onShowSelectZone(3);
    this._loadData();    
  },

  onReachBottom:function(){
    if(! this.data.isLoadedAll){
      let data = this.data.attr;
      data.pageIndex++;
      this.setData({
        'attr': data
      });

      this._reloadData();
    }
  },

  onShowSelectZone:function(index){
    let data = this.data.display;
    for (let i in data) {
      if (i == index) {
        data[i] = (data[i] == 'none') ? 'block' : 'none';
      }
      else {
        data[i] = 'none';
      }
    }

    this.setData({
      'display': data
    })
  }
})