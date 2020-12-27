// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveDistance: 0,
    back: 'null',
    userMessage: {},
    weekData: []
  },
  handleClick() {
    //redirect很关键
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },

  start(event) {
    this.startPoint = event.touches[0].clientY
    this.setData({
      back: "none"
    })

  },
  move(event) {
    this.endPoint = event.touches[0].clientY;
    const distance = this.endPoint - this.startPoint;
    if (distance < 0 || distance > 120) return;
    this.setData({

      moveDistance: distance,
    })
  },
  end() {
    this.setData({
      moveDistance: 0,
      back: 'transform 1s linear'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {

    const userMessage =await  wx.getStorageSync('userMessage')
    console.log(userMessage)
    if (userMessage) {
      this.setData({
        userMessage: JSON.parse(userMessage)
      })
    }


    // this.setData({
    //   userMessage: JSON.parse(userMessage)
    // })

    wx.request({
      url: 'http://39.108.253.253:3000/user/record?uid=4017133696&type=1',
      success: (res) => {
        if (!userMessage) return  //如果没有登录（没有头像和昵称），就return，不发听歌历史的请求
        this.setData({
          weekData: res.data.weekData
        })
      }
    })


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