var commom = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '', //手机号
    password: '' //密码
  },

  handleInput(even) {
    let type = even.currentTarget.id;
    console.log(type, even.detail.value);
    this.setData({
      [type]: even.detail.value,
    })
  },
  login: async function (even) {
    let {
      phone,
      password
    } = this.data;
    if (!phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    //定义正则表达式
    let phoenReg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
    if (!(phoenReg.test(phone))) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    let login = await commom.request('/login/cellphone', {
      phone,
      password
    }, 'GET');
    if (login.code === 200) {
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })

      //将用户的信息存储至本地
      wx.setStorageSync('userInfo',JSON.stringify(login.profile))
      console.log(login.profile)
      wx.reLaunch({
        url: "/pages/personal/personal"
      })
      return;

    } else if (login.code === 400) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none',
        duration: 2000
      })
      return;

    } else if (login.code === 502) {
      wx.showToast({
        title: '密码错误',
        icon: 'none',
        duration: 2000
      })
      return;
    } else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none',
        duration: 2000
      })
      return;
    }

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