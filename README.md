## 做点什么好呢 阿巴阿巴阿巴

### 浏览器网页是客户端，客户端通过服务器访问数据库。这是SOA架构，我们细分用到Serverless架构，并在具体提供服务Controller和用户端加上BFF。BFF就是在前端和后端中间用JavaScript写个能让前端在后端跑的东西，用Express.js框架（一个流行的Node.js web应用框架）

### 用户端⇔API网关⇔Restful API服务⇔Controller（UI服务）⇔Business Services（业务服务）⇔Data Services（数据管理模块）⇔数据接口⇔数据库


API网关：①请求路由：API网关接收来自客户端的请求，并根据配置将这些请求路由到适当的后端服务（如AWS Lambda函数）。这涵盖了RESTful API和可能的其他API模式。

        ②数据转换：它可以处理请求和响应的数据转换。      ————执行转换任务
        
        ③认证和授权：API网关常常负责处理认证（验证请求者的身份）和授权（确定请求者是否有权进行请求的操作）。        ————用户登录是是实现认证方式，这里确保调用API的是合法用户，并且该用户有权执行请求的操作
        
        ④限流和配额管理：通过限制请求的速率           ————后期考略
        
        ⑤监控和日志记录：收集关于API使用情况的数据    ————后期考虑
        

我们先约定好数据格式，可以在OpenAPI规范上看看，如API响应应该包含哪些字段，字段的数据类型是什么。        ————设计约定

再一个负责前端对用户，一个负责后端任务和数据库。这些网关结构、数据格式、通讯协议网上应该有现成的，我们找找。后端框架可以用数据库概论的，前端网上也许有模板，我们寻找寻找。
