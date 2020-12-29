// pages/song/song.js


 import PubSub from "pubsub-js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songobj:{}
  },
   songPlay(){
     //请求歌曲地址
     const songplayId = this.data.songobj.id
    //  console.log(songplayId)
      wx.request({
       url: 'http://localhost:3000/song/url',
       data:{
         id:songplayId
       },
       success:(res)=>{
         //console.log(res.data.data[0].url)
         this.setData({
           songplayUrl: res.data.data[0].url
         })
       }
     })
     //根据请求回来的歌曲地址，创建个音频实例，让歌曲播放，使用背景音频
     //请求是异步的，确保歌曲播放的地址有了之后再创建背景音乐实例，所以用了定时器
     setTimeout(()=>{
       let backgroundAudioManager = wx.getBackgroundAudioManager();
       backgroundAudioManager.src = this.data.songplayUrl;
       backgroundAudioManager.title = this.data.songobj.name
       console.log(backgroundAudioManager.src)
     },1000)
 

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options) //{songid: "28018075"} 所以options是专门获取路由跳转时，传递的参数的
    const ids = options.songid;
    //请求歌曲详情，不包括歌曲播放地址
    wx.request({
      url:'http://localhost:3000/song/detail',
      data:{
        ids:ids
      },
      success:(res)=>{ 
        this.setData({
          songobj: res.data.songs[0]
        }) 
        let song = res.data.songs[0]
        wx.setNavigationBarTitle({
          title: song.name
        });
      }
    })
    
    

  
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