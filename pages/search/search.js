var commom = require('../../utils/request')
let isSend = false; //函数节流
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderName: '', //默认搜索关键字
    hotList: [], //热搜榜数据
    searchContent: '', //用户输入表单下的数据
    searchList: [], //搜索关键字内容
  },

  //获取默认搜索关键字
  async getplaceholderName() {
    let searchNameData = await commom.request('/search/default', 'GET');
    this.setData({
      placeholderName: searchNameData.data.showKeyword
    })
  },
  //获取热搜榜数据
  async getHotList() {
    let hotListData = await commom.request('/search/hot/detail', 'GET');
    this.setData({
      hotList: hotListData.data
    })

  },
  async getSearchList() {
    if(!this.data.searchContent){
      this.setData({
        searchList:[]
      })
      return ;
    }
    //获取关键字内容
    let searchListData = await commom.request('/search', {
      keywords: this.data.searchContent,
      limit: 10
    }, 'GET');
    this.setData({
      searchList: searchListData.result.songs
    })
  },
  //获取input输入的内容
  handleInputChange(event) {
    console.log(event.detail.value)
    this.setData({
      searchContent: event.detail.value.trim()
    })
    //函数节流
    if (isSend) {
      return;
    }
    isSend = true;
    this.getSearchList();
    setTimeout(() => {
      isSend = false;
    }, 300)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取默认搜索关键字
    this.getplaceholderName();
    //获取热搜榜数据
    this.getHotList();
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