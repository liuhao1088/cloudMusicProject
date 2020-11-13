let startY = 0;//手指起始的坐标
let moveY = 0;//手指移动的坐标
let moveDistance = 0;//手指移动的距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform:'0rpx',
    coveTransition:''
  },
  handleTouchStart(even){
    this.setData({
      coveTransition:""
    })
    startY = even.touches[0].clientY;//获取手指起始的坐标
  },
  handleTouchMove(even){
    moveY = even.touches[0].clientY;//获取手指移动的坐标
    moveDistance = moveY - startY;
    if(moveDistance<0){
      return ;
    }else if(moveDistance >= 80){
      moveDistance = 80;
    }
    this.setData({
      coverTransform: moveDistance+"rpx"
    })
    console.log(this.data.coverTransform)
  },
  handleTouchEnd(even){
    this.setData({
      coverTransform: "0rpx",
      coveTransition:"transform 1s linear"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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