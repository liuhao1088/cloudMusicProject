var commom = require('../../utils/request')
const PubSub = require('pubsub-js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '', //天
    month: '', //月
    songList: '',//歌曲列表
    songIndex: 0//点击音乐的下标
  },
  songDetail(even) {
    let songId = even.currentTarget.id;
    let songIndex = even.currentTarget.dataset.index;
    this.setData({
      songIndex
    })
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

    //订阅来自songDetail页面发布的消息
    PubSub.subscribe('switchType',(msg,type) =>{
      let {songList,songIndex} = this.data;
      if(type === 'pre'){//上一首
        (songIndex === 0) && (songIndex = songList.length);
        songIndex -= 1;
      }else{//下一首
        (songIndex === songList.length -1) && (songIndex = -1)
        songIndex += 1;
      }
      //更新下标
      this.setData({
        songIndex
      })
      let songId = songList[songIndex].id;
      //将songId回传给songDetail页面
      PubSub.publish('songId',songId);
      console.log(songId)
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