# 推箱子

## 功能列表

### 当前版本功能

- [x] 完全基于canvas，支持浏览器、小程序
- [x] 支持手机端
- [x] 通过键盘上下左右键，控制人物移动
- [x] 通过手指触摸滑动，控制人物移动
- [x] 上一关、下一关
- [x] 前100关的数据初始化
- [x] 重置关卡
- [ ] 本地缓存通关进度
- [ ] 界面显示优化，各种设备适配
- [ ] 回退一步

### 未来版本计划

- [ ] 显示时长、步数
- [ ] 自由选择关卡，新的页面
- [ ] 支持鼠标、手指点击自动寻路，并移动到目标位置
- [ ] 加动画效果
- [ ] 游戏介绍、玩法说明
- [ ] 获取用户信息，记录用时、解答步骤，计算分数
- [ ] 查看排行
- [ ] 不同朝向的人物图片
- [ ] 支持多种主题
- [ ] 支持自定义主题（自己上传图片）
- [ ] 支持设计关卡
- [ ] 关卡分享
- [ ] 支持回放解答步骤并进行分享
- [ ] 步骤生成动图或视频保存至本地

### 广告投放时机

- 解锁更多关卡
- 回退一步
- 保存动图或视频
-

## 灵感来源

- https://github.com/akira-cn/boxbox

## 其他

### 显示如何优化

1. 寻找常用手机屏幕支持的最大行、列数量，比如 9 * 11
2. 不到最大行、列的，用空白填充占位
3. 避免图像太大或者太小

