# 推箱子

## 功能列表

### v1.0 版本功能

- [x] 完全基于canvas，支持浏览器、小程序
- [x] 支持手机端
- [x] 通过键盘上下左右键，控制人物移动
- [x] 通过手指触摸滑动，控制人物移动
- [x] 上一关、下一关
- [x] 前100关的数据初始化

### v1.1 版本功能

- [x] 重置关卡
- [x] 本地缓存通关进度
- [x] UI优化
- [x] 自由选择关卡，新的页面

### v1.2 版本功能

- [x] 回退一步
- [x] 关卡上下滚动
- [x] UI优化

### v1.3 版本功能

- [x] 增加登录功能，数据保存到服务端
- [x] 增加更多关卡数据
- [x] UI优化

### v1.4 版本功能

- [ ] 显示步数

### 未来版本计划

- [x] 查看答案，自动播放
- [ ] 支持鼠标、手指点击自动寻路，并移动到目标位置
- [ ] 游戏介绍、玩法说明
- [ ] 获取用户信息，记录用时、解答步骤，计算分数
- [ ] 查看排行
- [ ] 支持多种主题
- [ ] 支持自定义主题（自己上传图片）
- [ ] 支持设计关卡
- [ ] 关卡分享
- [ ] 支持回放解答步骤并进行分享
- [ ] 步骤生成动图或视频保存至本地

### 优化方案

- [ ] 界面显示优化，各种设备适配
- [ ] 不同朝向的人物图片
- [ ] 用canvas实现各种弹窗
- [ ] 增加过渡、动画效果

### 广告投放时机

- 解锁更多关卡
- 回退一步
- 查看答案
- 保存动图或视频

## 灵感来源

- https://github.com/akira-cn/boxbox

## 其他

### 显示如何优化

1. 寻找常用手机屏幕支持的最大行、列数量，比如 9 * 11
2. 不到最大行、列的，用空白填充占位
3. 避免图像太大或者太小

