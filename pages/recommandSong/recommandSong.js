// pages/recommandSong/recommandSong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
       day:'',
       month:'',
       recommandSongs:[]
  },
  //点击某推荐歌曲，进入该歌曲的播放页面song
  enterSongPage(){
    wx.navigateTo({
      url: '/pages/song/song',
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
    //显示的时候先判断有无登录时设置的cookie，没有的话，弹出模态框，要么去首页，要么去登录页面
    if(!wx.getStorageSync('cookies')){
        wx.showModal({
          title: '请登录',
          content: '推荐歌曲页面需要登录才能访问',
          cancelText:'返回首页',
          confirmText:'去登录',
          success (res){
            if(res.cancel){
              wx.switchTab({
                url: '/pages/index/index',
              })
            }if(res.confirm){
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          }

        })
    }
    //获取当前月份和日期
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1
    this.setData({
      day,
      month,
    })
    //显示的时候，立刻请求推荐歌曲
    let getcookies = wx.getStorageSync('cookies')
    let cookies;
    if(getcookies){
      cookies = JSON.parse(getcookies)
    }
    
    console.log(cookies)
    wx.request({
      url: 'http://localhost:3000/recommend/songs',
      header:{
        cookie:cookies     //header里必须写cookie而不是cookies
      },
      success:(res)=>{
        this.setData({
          recommandSongs: res.data.recommend.slice(0,10)
        })
      }
    })
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