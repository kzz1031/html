## 项目介绍

### 功能及展示效果

#### 主界面翻译

![image-20240610222603676](C:\Users\15027\AppData\Roaming\Typora\typora-user-images\image-20240610222603676.png)

- slider进行翻译风格的调整（正式、口语）
- 语言选择（中译英、英译中）
- 下方button支持字体放大缩小，复制翻译结果，收藏，翻译偏好设置
- 数据面板显示查询总次数，当前用户数，剩余tokens
- 动态背景板（vantas）

#### 历史记录

![image-20240610223657617](C:\Users\15027\AppData\Roaming\Typora\typora-user-images\image-20240610223657617.png)

- 支持搜索，按时间排序的功能
- 点击navigate button可跳转至主界面，并打开该内容

#### 收藏

![image-20240610223917457](C:\Users\15027\AppData\Roaming\Typora\typora-user-images\image-20240610223917457.png)

- 采用折叠面板显示
- button功能同历史记录界面

#### 长文本

![image-20240610224048147](C:\Users\15027\AppData\Roaming\Typora\typora-user-images\image-20240610224048147.png)

- 支持万字文本翻译
- 进度条显示翻译进度
- 学习者button打开学习面板，大语言模型归纳重点单词
- 点击加号跳转到单词本

![image-20240610225506852](C:\Users\15027\AppData\Roaming\Typora\typora-user-images\image-20240610225506852.png)

- 文本比对，鼠标hover，对应句子高亮

![image-20240610225715934](C:\Users\15027\AppData\Roaming\Typora\typora-user-images\image-20240610225715934.png)

#### 单词本

![image-20240611112603371](C:\Users\15027\AppData\Roaming\Typora\typora-user-images\image-20240611112603371.png)

- 可实现自定义等级，词性，评级

#### 注册
- 点击方框会加粗，失焦后会判断加粗变红或变绿（验证格式），避免出现一个空填完剩下空都变红的情况，让用户更舒服
<img width="270" alt="image" src="https://github.com/kzz1031/html/assets/131990346/a0fbf70b-5ce7-41c5-a49a-f423a7dc5a43">

#### 登录
- 动态背景，同理注册设置
<img width="415" alt="image" src="https://github.com/kzz1031/html/assets/131990346/dcfbebf8-8e80-448e-b5be-1ea5d7ca0e52">

#### 个人偏好
- 可以添加按钮设置（检查重复词），可以自己在无限滚动栏目里加，可以之间在原文右滑再右键添加
<img width="415" alt="image" src="https://github.com/kzz1031/html/assets/131990346/0c0fd710-3161-4567-b8d0-032518735c52">
<img width="415" alt="image" src="https://github.com/kzz1031/html/assets/131990346/d435c7c3-193a-4bbe-b009-b1266f4e681d">

- 可以删除和修改记录
 <img width="415" alt="image" src="https://github.com/kzz1031/html/assets/131990346/140395cd-5861-4d5f-8545-c4c9d38083a0">


#### 页面设置
- 可以更改抽屉弹出位置，和翻译框之间的距离
<img width="415" alt="image" src="https://github.com/kzz1031/html/assets/131990346/36f4fc75-1360-4dfd-bbfa-bbcc4dcb9f5c">

#### 查看用户信息
<img width="415" alt="image" src="https://github.com/kzz1031/html/assets/131990346/781795a7-8cbe-44a4-8d8c-3714e3b38770">

#### 管理员
-可查看用户信息，需要密钥
<img width="415" alt="image" src="https://github.com/kzz1031/html/assets/131990346/51eaecd1-8084-4a94-8ac4-596ea1fd104a">

### 整体框架

 ```mermaid
graph LR;
vue3 --> bserve --> postgreSQL
bserve --> vue3 
 ```

- 前端采用vue3，组件页面分开编写，提高组件的复用率
- 后端用bserve，创建端口localhost：8080进行监听，与后端postgreSQL进行交互

![image-20240611184436936](C:\Users\15027\AppData\Roaming\Typora\typora-user-images\image-20240611184436936.png)

### 部署

- 后端: 点击打开bserv文件中的`WebApp.sln` 点击运行，创建端口8080

  >需要安装postgreSQL，自建table

![image-20240611185006858](C:\Users\15027\AppData\Roaming\Typora\typora-user-images\image-20240611185006858.png)

- 前端命令中运行`npm run dev`，部署vue项目
- 两个都部署好了以后即可正常使用
