// 封装的核心思想
// 封装函数
// 1.保留什么?保留重复出现的代码
// 2.提取什么?动态的数据由外部传入,将动态数据提取成形参
// 3.谁调用谁动态传入数据

// 封装组件
// 1.保留什么?  template+style(组件公共部分)
// 2.提取什么?  动态的数据由外部传入,通过标签属性->props
// 3.谁调用谁动态传入数据
// let host = "http://localhost:3000";
import config from './config.js';
export default function (url, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      header: {
        cookie: JSON.parse(wx.getStorageSync("cookies") || "[]").toString()
      },
      success: (res) => {
        // console.log(res)
        //获取请求头中的cookies
        let cookies = res.cookies;
        // console.log(res.cookies)
        let { isLogin } = data;
        //cookies只有在登录接口中才会返回
        if (isLogin) {
          wx.setStorageSync("cookies", JSON.stringify(cookies.slice(1)));
        }
        resolve(res.data)
        // return res;
        // result = res;
        // console.log("res", res)
        // this.setData({
        //   bannerList: res.data.banners
        // })
        // console.log(res.data.banners)
      }
    })
  });
}