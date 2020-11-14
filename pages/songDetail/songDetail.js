var commom = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false, //音乐是否播放
    musicDetail: {}, //音乐详情
    songId: '' //音乐id
  },

  //获取音乐详情
  async getMusicDetail(songId) {
    let musicDetailData = await commom.request('/song/detail', {
      ids: songId
    }, 'GET');
    this.setData({
      musicDetail: musicDetailData.songs[0]
    })
    //动态显示标题
    wx.setNavigationBarTitle({
      title: this.data.musicDetail.name
    })
  },
  //点击播放/停止
  musicPlay() {
    let isPlay = !this.data.isPlay;
    let {
      songId
    } = this.data;
    this.musicControl(isPlay, songId);
  },

  //控制音乐播放/停止的功能
  async musicControl(isPlay, songId) {
    if (isPlay) { //音乐播放
      //获取音乐链接
      let musicUrl = await commom.request('/song/url', {
        id: songId
      }, 'GET');
      this.backgroundAudioManager.src = musicUrl.data[0].url;
      this.backgroundAudioManager.title = this.data.musicDetail.name

    } else { //音乐暂停
      this.backgroundAudioManager.pause();
    }
  },
  //封装代码
  playState(isPlay) {
    //修改音乐是否播放的状态
    this.setData({
      isPlay
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let songId = options.ids;
    this.setData({
      songId
    })
    console.log(songId)
    this.getMusicDetail(songId)
    //创建控制音乐播放的实例
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    //监听音乐播放/暂停
    this.backgroundAudioManager.onPlay(() => {
      this.playState(true)
    })
    this.backgroundAudioManager.onPause(() => {
      this.playState(false)
    })
    //监视暂停播放音乐
    this.backgroundAudioManager.onStop(() => {
      this.playState(false)
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