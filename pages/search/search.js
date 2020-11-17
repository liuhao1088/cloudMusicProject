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
    historyList: [], //搜索历史记录
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
    if (!this.data.searchContent) {
      this.setData({
        searchList: [],
      })
      return;
    }
    let {
      searchContent,
      historyList
    } = this.data;
    //获取关键字内容
    let searchListData = await commom.request('/search', {
      keywords: searchContent,
      limit: 10
    }, 'GET');
    this.setData({
      searchList: searchListData.result.songs
    })

    //将搜索的关键字添加到搜索记录中
    if (historyList.indexOf(searchContent) === -1) {
      historyList.splice(historyList.indexOf(searchContent), 1);
    }
    historyList.unshift(searchContent);
    this.setData({
      historyList
    })
    //把历史记录存在本地
    wx.setStorageSync('searchHistory', historyList)
  },
  //获取input输入的内容
  handleInputChange(event) {
    
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

  //获取历史记录
  getHistoryList() {
    let historyList = wx.getStorageSync('searchHistory');
    this.setData({
      historyList
    })
  },
  //清空搜索内容
  clearSearhContent() {
    this.setData({
      searchContent: '',
      searchList: []
    })
  },
  //删除历史记录
  deleteSearchHistory() {
    let that = this;
    wx.showModal({
      content: '确认删除吗？',
      success(res) {
        if (res.confirm) {
          //清空data中historyList
          that.setData({
            historyList: []
          })
          //移除本地historyList
          wx.removeStorageSync('searchHistory');
        } 
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取默认搜索关键字
    this.getplaceholderName();
    //获取热搜榜数据
    this.getHotList();
    //获取历史记录
    this.getHistoryList();
    // if(this.data.historyList === ''){
    //   console.log("111111")
    //   this.setData({
    //     historyList:[]
    //   })
    // }
    
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