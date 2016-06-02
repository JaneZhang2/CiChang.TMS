词场进校园

## 开发说明

1. 安装 npm 依赖包
``` bash
$ npm install
```

2. 启动 app 开发调试模式
``` bash
# 开发环境
$ npm run debug:dev
# 或者
$ npm start
# 测试环境
$ npm run debug:qa
# 验证环境
$ npm run debug:yz
# 生产环境
$ npm run debug:prod
```

## 打包编译
建议每次发布前修改 package.json 中的 version
``` bash
# 打包开发环境
$ npm run build:dev
# 打包测试环境
$ npm run build:qa
# 打包验证环境
$ npm run build:yz
# 打包生产环境
$ npm run build:prod
# 或者
$ npm run build
```
