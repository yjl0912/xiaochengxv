// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
    currentId: 58100,
    keywordsVideoList: [],
    triggered: true,
    flag:false,
    whichisToLeft:58100
  },
  //播放当前视频之后通过videocontext上下文控制上个视频的暂停
  viedeoplay(event){
    let {id} = event.currentTarget
    let lastVideoId = this.lastVideoId //当时漏写了这一句，导致lastVideoId为undefined
    // console.log(lastVideoId)
    if(lastVideoId &&lastVideoId!=id){
      const videContext = wx.createVideoContext(lastVideoId)
      videContext.pause();
    }
         this.lastVideoId = id;
  },
  
  //上推触底加载更多视频
  scrollviewPush(){
    //由于上推触底很容易触发，所以做一个简单的节流
    if(this.data.flag)return;
    //进来之后立即为true（进不来），3秒之后再改为false才能再进来
    this.setData({
      flag: true
    })
    setTimeout(()=>{
     //3秒之后如果还在触底，那么把flag改为true。为true的时候才工作
     
      //由于网易云没有上推触底时加载更多视频的接口，所以用深拷贝把当前的视频数据复制一份，再展开，加入到原来的视频里面，数量翻倍(实现视频数据更多的效果)
      let NEWkeywordsVideoList = JSON.parse(JSON.stringify(this.data.keywordsVideoList))
      //把新得到的数据推到原来的keywordsVideoList里面
      this.setData({
        keywordsVideoList: [...this.data.keywordsVideoList, ...NEWkeywordsVideoList]
      })
      this.setData({
        flag: false
      })
    },3000)

   
  },
  //scrollview下拉事件的回调，请求最新的数据（即再在当前关键字下再请求一次）
  scrollviewPull() {
    //下拉之后发请求，请求视频
    //加载中...效果
    wx.showToast({
      title: '加载中,请稍后',
      icon: 'loading'
    })
    //白屏效果
    this.setData({
      keywordsVideoList: []
    })
    //下拉刷新请求一次。即当前关键字下重新请求一次
    wx.request({
      url: 'http://localhost:3000/video/group',
      data: {
        id: this.data.currentId
      },
      header: {
        cookie: this.data.cookies
      },
      success: (res) => {
        this.setData({
          keywordsVideoList: res.data.datas
        })
      },

    })
    //请求成功之后。将data中的trigger改为false，关闭scrollview的下拉状态
    this.setData({
      triggered: false
    })
  },
  changeCurrentId(event) {
    this.setData({
        currentId: event.target.dataset.id
      }),
      //点击关键字，请求视频,需要使用cookie，由于关键字的点击事件回调函数写在读取onshow上面，显示cookies为undefined,所以在下面storage读取cookies把cookies定义到this.data上面了，方便点击关键字时发请求使用cookies
      //加载中...效果
      wx.showToast({
        title: '加载中,请稍后',
        icon: 'loading'
      })
    //白屏效果
    this.setData({
      keywordsVideoList: []
    })
    wx.request({
      url: 'http://localhost:3000/video/group',
      data: {
        id: this.data.currentId
      },
      header: {
        cookie: this.data.cookies
      },
      success: (res) => {
        this.setData({
          keywordsVideoList: res.data.datas
        })

      }
    })
    // wx.hideToast()
    
    //点击关键字，让该关键字走到最左边的效果。由scrollview控制，在scrollview身上加一个属性，值为某关键字的id。下面就是改变scrollview那个属性身上的id值。
    this.setData({
      whichisToLeft: event.target.dataset.id
    })
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
    //请求视频的关键字（视频导航列表的数据）
    wx.request({
      url: 'http://localhost:3000/video/group/list',
      success: (res) => {

        this.setData({
          videoList: res.data.data.slice(0, 15)
        })

      }
    })
    //请求每个关键字对应的所有视频,必须携带cookie才能请求成功
    let Getcookies = wx.getStorageSync('cookies')
    let cookies
    if (Getcookies) {
      cookies = JSON.parse(Getcookies)
      this.setData({
        cookies: cookies //把cookies定义到this.data里面，方便点击关键字时请求视频需要用到cookie
      })
    }


    //加载中...效果
    wx.showToast({
      title: '加载中,请稍后',
      icon: 'loading'
    })
    //白屏效果
    this.setData({
      keywordsVideoList: []
    })
    //刚进来，请求一次视频
    wx.request({
      url: 'http://localhost:3000/video/group',
      data: {
        id: this.data.currentId
      },
      header: {
        cookie: this.data.cookies
      },
      success: (res) => {
        this.setData({
          keywordsVideoList: res.data.datas
        })

      }
    })

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
  onShareAppMessage: function({from,target}) {
     if(from ==="menu"){
          return{
            title:'小程序中随意一张图片',
            path:'/pages/personal/personal',  //转发路径
            imageUrl:'/static/images/video/3.jpg'
          }
     }else if(from==="button"){
       //button的分享必须从自定义属性里面得到   如data-title='美女图片'，从target.dataset里面解构出title
       const {imgurl,title} = target.dataset
       console.log(target)
         return{
           title :title,
           imgUrl:imgurl,
           path:'/pages/video/video'
         }
     }
  }



})