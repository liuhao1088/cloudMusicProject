//发送ajax请求
import config from './config'
function request(url, data = {}, method) {
  return new Promise((resolve, reject) => {
    //1、new Promise初始化Promise实例的状态为pending
    wx.request({
      url: config.moelHots + url,
      data,
      method,
      success: (res) => {
        // console.log("请求成功：", res);
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