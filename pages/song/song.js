// pages/song/song.js


 import PubSub from "pubsub-js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songobj:{},
    stopOrPlay: true,
    songplayUrl:'',
    stopOrPlay:false,
    ids:'',
  },
  //点了播放按钮
   songPlay(){
     let app = getApp()
     //请求歌曲地址
     this.setData({
       stopOrPlay:!this.data.stopOrPlay
     })
     app.lastSongIdAndStatus.playOrPaused = !app.lastSongIdAndStatus.playOrPaused;
    
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
     // stopOrPlay为true，
     
       setTimeout(() => {
         let backgroundAudioManager = wx.getBackgroundAudioManager();
         backgroundAudioManager.src = this.data.songplayUrl;
         backgroundAudioManager.title = this.data.songobj.name;
         if (this.data.stopOrPlay){
           backgroundAudioManager.play()
         }else{
           backgroundAudioManager.pause()
         }
         
       }, 500)
     

 

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options) //{songid: "28018075"} 所以options是专门获取路由跳转时，传递的参数的
    const ids = options.songid;
    //将这次播放页面的歌曲id设置到this.data上，方便存到app实例上，以后作比较要用
    this.setData({
      ids:ids
    })
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
    //查看上一次进入song页面时的是不是歌id相同，和播放状态
   let app = getApp()
   //如果上一首与这次是同一首，并且上次的播放状态是true，那么要改变data中的播放状态为true，来控制这次的样式
    if (app.lastSongIdAndStatus.id ===this.data.ids && app.lastSongIdAndStatus.playOrPaused ===true){
      this.setData({
        stopOrPlay:true
      })
    }
    console.log(app.lastSongIdAndStatus.id)
    console.log(app.lastSongIdAndStatus.playOrPaused)
    app.lastSongIdAndStatus.id = this.data.ids

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