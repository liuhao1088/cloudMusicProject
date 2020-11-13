//发送ajax请求
import config from './config'
function request(url, data = {}, method) {
  return new Promise((resolve, reject) => {
    //1、new Promise初始化Promise实例的状态为pending
    wx.request({
      url: config.host + url,
      data,
      method,
      header:{
        cookie :wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''//动态获取cookie值
      },
      success: (res) => {
        if(data.isLogin){//登录请求
          wx.setStorage({//将用户的cookie存入本地
            key: 'cookies',
            data: res.cookies, 
          })
        }
        resolve(res.data);//resolve修改Promise的状态为成功状态resolved
      },
      fail: (err) => {
        // console.log("请求失败：", err)
        reject(err);//reject修改Promise的状态为失败状态rejected
      }
    })
  })

}
module.exports.request = request