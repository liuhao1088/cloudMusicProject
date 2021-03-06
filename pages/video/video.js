var commom = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    navId: '', //标识
    videoList: [], //获取视频列表
    videoId : '',//视频的id
    videoUpdateTime:[],//记录视频播放的时长
    isTriggered: false//标识下拉刷新是否被触发
  },

  //获取导航数据
  async getNavList() {
    let navListData = await commom.request('/video/group/list', 'GET');
    this.setData({
      navList: navListData.data.slice(0, 14),
      navId: navListData.data[0].id
    })

    this.getVideoList(this.data.navId);
  },

  //获取视频列表
  async getVideoList(id) {
    let videoListData = await commom.request('/video/group', {
      id: id
    }, 'GET');
    wx.hideLoading();
    this.setData({
      videoList: videoListData.datas,
      isTriggered:false//关闭下拉刷新

    })
  },

  //点击切换导航
  changNav(event) {
    let navId = event.currentTarget.dataset.id;
    this.setData({
      navId,
      videoList: []
    })
    wx.showLoading({
      title: '正在加载...',
    })

    this.getVideoList(navId);
  },

  //点击播放/继续播放
  handlePlay(event) {
    let vid = event.currentTarget.id;
    //关闭上一个播放的视频
    // this.vid !== vid && this.videoContext && this.videoContext.stop();
    // this.vid = vid;
    //更新data中videoId的状态数据
    this.setData({
      videoId:vid
    })
    //创建控制video标签的实例对象
    this.videoContext = wx.createVideoContext(vid);
    //播放视频
    //判断当前的视频是否有播放过
    let {videoUpdateTime} = this.data;
    let vdeioItem = videoUpdateTime.find(item => item.vid === vid);
    if(vdeioItem){
      this.videoContext.seek(vdeioItem.currentTiem);
    }
    this.videoContext.play();

  },
  //监听视频播放时长
  updateTime(event){
    let videoTimeObj = {vid:event.currentTarget.id,currentTiem:event.detail.currentTime}
    let {videoUpdateTime} = this.data;
    //判断记录播放时长的数组中是否有当前视频的记录
    let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid);
    if(videoItem){//之前有
      videoItem.currentTiem = event.detail.currentTime
    }else{
      videoUpdateTime.push(videoTimeObj);
    }
    this.setData({
      videoUpdateTime
    })
    console.log(this.data.videoUpdateTime)
  },
 //监听视频播放结束
  ended(event){
    //移除记录播放时长数组中的对象
    let {videoUpdateTime} = this.data;
    videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id),1);
    this.setData({
      videoUpdateTime
    })
  },

  //下拉刷新
  herrefresh(event){
    this.getVideoList(this.data.navId);
   
  },

  //跳转搜索页
  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavList();

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