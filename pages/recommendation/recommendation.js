var commom = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '', //天
    month: '', //月
    songList: '' //歌曲列表
  },
  songDetail(even) {
    let songId = even.currentTarget.id;
    wx.navigateTo({
      url: '/pages/songDetail/songDetail?ids=' + songId,
    })
  },
  //获取歌曲列表
  async getSongList() {
    let songsListData = await commom.request('/recommend/songs', 'GET');
    this.setData({
      songList: songsListData.recommend
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //更新日期的状态数据
    this.setData({
      day: new Date().getDate(), //获取本月的天数
      month: new Date().getMonth() + 1, //获取月份
    })
    //获取用户信息
    let userInfo = wx.getStorageSync('userInfo');
    //判断用户是否登陆
    if (!userInfo) {
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        success: () => {
          //跳转至登陆界面
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      })
    }
    //获取歌曲列表
    this.getSongList();
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