var commom = require('../../utils/request')
const PubSub = require('pubsub-js');
const moment = require('moment');
var  appInstance  = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false, //音乐是否播放
    musicDetail: {}, //音乐详情
    songId: '', //音乐id
    musicUrl:'',//音乐的链接
    currentTime:'00:00',//实时时间
    durationTime:'00:00',//总时间
    width:0//实时进度条的宽度
  },

  //获取音乐详情
  async getMusicDetail(songId) {
    let musicDetailData = await commom.request('/song/detail', {
      ids: songId
    }, 'GET');
    //时间转换毫秒转换成分钟
    let time = musicDetailData.songs[0].dt;
    let durationTime = moment(time).format('mm:ss')
    //更新数据
    this.setData({
      musicDetail: musicDetailData.songs[0],
      durationTime
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
      songId,musicUrl
    } = this.data;
    this.musicControl(isPlay, songId,musicUrl);
  },

  //控制音乐播放/停止的功能
  async musicControl(isPlay, songId,musicUrl) {
    if (isPlay) { //音乐播放
      if(!musicUrl){
        let musicUrlData = await commom.request('/song/url', {
          id: songId
        }, 'GET');
        musicUrl = musicUrlData.data[0].url;
        this.setData({
          musicUrl
        })
      }
      //获取音乐链接
      this.backgroundAudioManager.src = musicUrl;
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
     //修改全局音乐播放状态
    appInstance.globaData.isMusicPlay = isPlay;
  },

  //点击切歌的功能
  handleSwitch(event){
    //获取切歌的类型
    let type = event.currentTarget.id;
    //关闭当前播放的音乐
    this.backgroundAudioManager.stop();
    //订阅来自recommendation页面发布的songId消息
    PubSub.subscribe('songId',(msg,songId) =>{
      //获取音乐详情信息
      this.getMusicDetail(songId);
      //自动播放当前的音乐
      this.musicControl(true,songId);
      //取消订阅
      PubSub.unsubscribe(songId);
    })
    //发布消息数据给recommdndSong页面
    PubSub.publish('switchType',type)
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let songId = options.ids;
    this.setData({
      songId
    })
    this.getMusicDetail(songId)
    //判断当前页面音乐是否播放
    if(appInstance.globaData.isMusicPlay && appInstance.globaData.musicId === songId){
      //修改当前页面音乐播放状态
      this.setData({
        isPlay : true
      })
    }
    //创建控制音乐播放的实例
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    //监听音乐播放/暂停
    this.backgroundAudioManager.onPlay(() => {
      this.playState(true);
      //修改全局正在播放音乐的id
      appInstance.globaData.musicId = songId;
    })
    this.backgroundAudioManager.onPause(() => {
      this.playState(false);
    })
    //监视暂停播放音乐
    this.backgroundAudioManager.onStop(() => {
      this.playState(false);
    })

     //监视音乐播放自然介绍
     this.backgroundAudioManager.onEnded(() => {
      //自动切换至下一首音乐，并且自动播放
      PubSub.publish('switchType','next')
      //将实时进度条的长度变成0
      this.setData({
        width:0,
        currentTime:'00:00'
      })
    })

    //监听音乐实时播放的进度
    this.backgroundAudioManager.onTimeUpdate(() =>{
      //格式化实时的播放时间
      let currentTime = moment(this.backgroundAudioManager.currentTime*1000).format('mm:ss')
      //求进度条的长度 实时长度=实时的时长（this.backgroundAudioManager.currentTime）/总时长（this.backgroundAudioManager.duration）*总长度（450）
      let width = this.backgroundAudioManager.currentTime/this.backgroundAudioManager.duration * 450
      this.setData({
        currentTime,
        width
      })
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