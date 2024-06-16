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
