var commom = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: [], //轮播图
    recommendList: [], //推荐歌单
    topList: [], //排行榜
  },
  recommendSong(){
    wx.navigateTo({
      url: '/pages/recommendation/recommendation',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let imgUrlDataLsit = await commom.request('/banner', {
      type: 2
    }, 'GET');
    this.setData({
      imgUrl: imgUrlDataLsit.banners
    })
    let recommendData = await commom.request('/personalized', {
      limit: 10
    }, 'GET');
    this.setData({
      recommendList: recommendData.result
    })
    let index = 0;
    let resultArr = [];
    while (index < 5) {
      let topData = await commom.request('/top/list', {
        idx: index++
      }, 'GET');
      let topDataItem = {
        name: topData.playlist.name,
        tracks: topData.playlist.tracks.slice(0, 3)
      }
      resultArr.push(topDataItem);
      this.setData({
        topList: resultArr
      })
    }

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