import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    dailyGoal: 2, // 每日摸鱼目标（小时）
    tempGoal: 2, // 临时目标值（用于弹窗）
    showGoalDialog: false, // 是否显示目标设置弹窗
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    calendarDays: [],
    fishingRecords: {} // 摸鱼记录 {date: hours}
  },

  onLoad() {
    this.loadData();
    this.generateCalendar();
    
    // 检查是否首次进入
    const isFirstTime = wx.getStorageSync('isFirstTime');
    if (isFirstTime) {
      setTimeout(() => {
        this.showGoalPopup();
        wx.setStorageSync('isFirstTime', false);
      }, 500);
    }
  },

  onShow() {
    this.loadData();
    this.generateCalendar();
  },

  // 加载本地存储数据
  loadData() {
    const dailyGoal = wx.getStorageSync('dailyGoal') || 2;
    const fishingRecords = wx.getStorageSync('fishingRecords') || {};
    
    this.setData({
      dailyGoal,
      tempGoal: dailyGoal,
      fishingRecords
    });
  },

  // 生成日历
  generateCalendar() {
    const { currentYear, currentMonth, fishingRecords, dailyGoal } = this.data;
    const firstDay = new Date(currentYear, currentMonth - 1, 1);
    const lastDay = new Date(currentYear, currentMonth, 0);
    const daysInMonth = lastDay.getDate();
    const startWeekday = firstDay.getDay();
    
    const calendarDays = [];
    
    // 添加空白占位符（上个月的位置）
    for (let i = 0; i < startWeekday; i++) {
      calendarDays.push({
        day: '',
        isCurrentMonth: false,
        progress: -1,
        hours: 0,
        isEmpty: true
      });
    }
    
    // 只添加当前月的日期
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hours = fishingRecords[dateKey] || 0;
      const progress = Math.min((hours / dailyGoal) * 100, 100);
      
      calendarDays.push({
        day,
        isCurrentMonth: true,
        progress,
        hours: hours.toFixed(1),
        isEmpty: false
      });
    }
    
    this.setData({ calendarDays });
  },

  // 上一个月
  prevMonth() {
    let { currentYear, currentMonth } = this.data;
    
    if (currentMonth === 1) {
      currentMonth = 12;
      currentYear--;
    } else {
      currentMonth--;
    }
    
    this.setData({ currentYear, currentMonth });
    this.generateCalendar();
  },

  // 下一个月
  nextMonth() {
    let { currentYear, currentMonth } = this.data;
    
    if (currentMonth === 12) {
      currentMonth = 1;
      currentYear++;
    } else {
      currentMonth++;
    }
    
    this.setData({ currentYear, currentMonth });
    this.generateCalendar();
  },

  // 显示目标设置弹窗
  showGoalPopup() {
    this.setData({ 
      showGoalDialog: true,
      tempGoal: this.data.dailyGoal
    });
  },

  // 隐藏目标设置弹窗
  hideGoalPopup() {
    this.setData({ showGoalDialog: false });
  },

  // 目标值改变
  onGoalChange(event) {
    this.setData({ tempGoal: event.detail });
  },

  // 确认目标设置
  confirmGoal() {
    const { tempGoal } = this.data;
    
    this.setData({ 
      dailyGoal: tempGoal,
      showGoalDialog: false 
    });
    
    // 保存到本地存储
    wx.setStorageSync('dailyGoal', tempGoal);
    
    // 重新生成日历以更新进度
    this.generateCalendar();
    
    Toast.success('目标设置成功！');
  },

  // 添加摸鱼时间
  addFishingTime() {
    const today = new Date();
    const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    let { fishingRecords } = this.data;
    const currentHours = fishingRecords[dateKey] || 0;
    const newHours = currentHours + 0.5; // 每次增加0.5小时
    
    fishingRecords[dateKey] = newHours;
    
    this.setData({ fishingRecords });
    
    // 保存到本地存储
    wx.setStorageSync('fishingRecords', fishingRecords);
    
    // 重新生成日历
    this.generateCalendar();
    
    // 检查是否达成目标
    if (newHours >= this.data.dailyGoal) {
      Toast.success(`恭喜！今日摸鱼目标已达成 🎉`);
    } else {
      Toast.success(`+0.5小时！当前已摸鱼${newHours}小时`);
    }
  }
}); 