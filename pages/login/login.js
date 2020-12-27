// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },
  getMessage(event) {
    // console.log(event)
    this.setData({
      [event.target.id]: event.detail.value
    })
  },
  async handleLogin() {

    const {
      phone,
      password
    } = this.data;
    //验证手机号和密码，非空才可以提交
    if (!phone) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'null'
      })
      return;
    }

    if (!password) {
      wx.showToast({
        title: '请填写密码',
        icon: 'null'
      })
    }
    const result = await wx.request({
      url: 'http://39.108.253.253:3000/login/cellphone?phone=17320167476&password=yjl123456.',
      success: (res) => {
        //先设置storage
        wx.setStorage({
          key: 'userMessage',
          data: JSON.stringify(res.data.profile)
        })
        //截取出登录时的cookies
        const cookies = res.cookies.find((item)=>{
          return item.indexOf("MUSIC_U") >-1;
        })
        //保存登录的时候服务器返回的cookies，后面请求视频会用到。其他请求的cookies不用保存，没啥用
        wx.setStorage({
          key: 'cookies',
          data: JSON.stringify(cookies),
        })
        console.log(111) 
      }
    })
    //设置定时器，确保有storage之后。再跳到个人中心。不然没有storage，登录不上，
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/personal/personal',

      })
    }, 1000)







  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})