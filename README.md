# react-blog
a blog which is made by ant-design egg.js react.js
# 结构
1. 采用前中后台分离模式，即分为`./blog`、`./admin`、`./service`，使结构更清晰。
2. 整个项目均采用React Hooks来编写component，更方便，更贴近新知识。
# 详细
- `./blog`是博客的前端界面，其中采用了marked.js和highlight.js来支持博客正文的markdown格式显示，整体的UI架构采用的是Ant-Design,其间为了方便css的引入,同时引用了next.js进行辅助开发。  
- `./admin`是博客的后台管理界面，为博客正文提供了增删改查功能，同样通过Ant-Design来进行快速UI搭建，并设置了路由守卫`service/app/middleware/adminauth`，以确定token存在的方式来判断是否登录。  
- `./service`是整个博客前后台的接口支撑，采用koa的高级框架egg.js来编写，给前后端提供所有从mysql获取数据接口。  
#数据库
本项目采用的是mysql数据库，共有3个简单表。如需更改配置，请到`service/config/plugin.js`中更改你个人的数据库连接方式
1. 管理员用户表  
`
CREATE TABLE `admin_user` (
   `userName` varchar(40) default NULL,
   `password` varchar(40) default NULL
 ) ENGINE=InnoDB DEFAULT CHARSET=gb2312
`
2. 文章表
`
CREATE TABLE `article` (
   `id` int(10) NOT NULL auto_increment,
   `type_id` int(10) NOT NULL,
   `title` varchar(200) NOT NULL,
   `article_content` text NOT NULL,
   `addTime` int(11) NOT NULL,
   `view_count` int(10) default NULL,
   `introduction` varchar(500) default NULL,
   PRIMARY KEY  (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=gb2312
`
3. 类型表
`
CREATE TABLE `type` (
   `id` int(10) NOT NULL,
   `typeName` varchar(40) NOT NULL,
   `orderNum` int(10) NOT NULL,
   `icon` varchar(40) default NULL,
   PRIMARY KEY  (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=gb2312
`
