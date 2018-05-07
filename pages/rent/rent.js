import { Rent } from 'rent-model.js';

var rent = new Rent();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    'display': [
      'none',
      'none',
      'none',
      'none'
    ],
    'attr': {
      'pageIndex': 1,
      'location': '不限',
      'rental': '不限',
      'type': '不限',
      'area': '不限'
    },
    'rentArr': [],
    'isLoadedAll': false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData: function () {
    let data = rent.getAllRentData(this.data.attr, (res) => {

      this.setData({ 'rentArr': res });
    });
  },

  _reloadData: function () {
    let data = rent.getAllRentData(this.data.attr, (res) => {
      if (res.length > 0) {
        this.data.rentArr.push.apply(this.data.rentArr, res);
      }
      else {
        this.data.isLoadedALL = true;
      }
      this.setData({ 'rentArr': this.data.rentArr });
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

  onRentalTap: function (e) {
    let data = this.data.attr;
    data.rental = e.currentTarget.dataset.rental;
    data.pageIndex = 1;
    this.setData({
      'attr': data
    });
    console.log(data);
    this.onShowSelectZone(1);
    this._loadData();
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

  onAreaTap: function (e) {
    let data = this.data.attr;
    data.area = e.currentTarget.dataset.area;
    data.pageIndex = 1;
    this.setData({
      'attr': data
    });
    this.onShowSelectZone(3);
    this._loadData();
  },

  onReachBottom: function () {
    if (!this.data.isLoadedAll) {
      let data = this.data.attr;
      data.pageIndex++;
      this.setData({
        'attr': data
      });

      this._reloadData();
    }
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
  
  onShowSelectZone: function (index) {
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