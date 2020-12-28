//index.js
//获取应用实例
import request from '../../utils/request.js';
const app = getApp()

Page({
  data: {
    bannerList: [],
    recommendedList: [],
    topList: []
  },
  enterRecommandSongPage(){
    wx.navigateTo({
      url: '/pages/recommandSong/recommandSong',
    })
  },
  onLoad() {
    // 获取推荐列表数据
    wx.request({
      url: 'http://localhost:3000/personalized',
      success: (res) => {
        this.setData({
          recommendedList: res.data.result
        })
      }
    })

    //获取轮播图片
    wx.request({
      url: 'http://localhost:3000/banner?type=2',
      success: (res) => {
        this.setData({
          bannerList: res.data.banners
        })
        // console.log(this.data.bannerList)
      }
    })

    //获取排行榜
    let ids = [15, 20, 21, 22]
    let index = 0;
    let topList = []
    while (index < ids.length) {
      const result = request('/top/list', {
        idx: ids[index++]
      }).then((result)=>{
        let everytopData = {};
        everytopData.name = result.playlist.name
        everytopData.list = result.playlist.tracks.slice(0, 3)
        
        topList.push(everytopData)
        this.setData({
          topList: topList
        })
        // console.log(topList)
      })

    }


  }

})