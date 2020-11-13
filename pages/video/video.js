var commom = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    navId:'',//标识
    videoList:[]//获取视频列表
  },

  //获取导航数据
  async getNavList(){
    let navListData = await commom.request('/video/group/list', 'GET');
    this.setData({
      navList:navListData.data.slice(0, 14),
      navId:navListData.data[0].id
    })

    this.getVideoList(this.data.navId);
  },

  //获取视频列表
  async getVideoList(id){
    let videoListData = await commom.request('/video/group',{id:id} ,'GET');
    wx.hideLoading();
    this.setData({
      videoList:videoListData.datas

    })
  },

  //点击切换导航
  changNav(event){
    let navId = event.currentTarget.dataset.id;
    this.setData({
      navId,
      videoList:[]
    })
    wx.showLoading({
      title: '正在加载...',
    })
    
    this.getVideoList(navId);
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