App({
  onLaunch() {
    // 初始化本地存储
    const dailyGoal = wx.getStorageSync('dailyGoal');
    if (!dailyGoal) {
      wx.setStorageSync('dailyGoal', 2); // 默认2小时
    }
    
    const fishingRecords = wx.getStorageSync('fishingRecords');
    if (!fishingRecords) {
      wx.setStorageSync('fishingRecords', {});
    }
    
    const isFirstTime = wx.getStorageSync('isFirstTime');
    if (isFirstTime === '') {
      wx.setStorageSync('isFirstTime', true);
    }
  },
  
  globalData: {
    userInfo: null
  }
}) 