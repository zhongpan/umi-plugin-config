# umi-plugin-config

[![NPM version](https://img.shields.io/npm/v/umi-plugin-config.svg?style=flat)](https://npmjs.org/package/umi-plugin-config) [![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-config.svg?style=flat)](https://npmjs.org/package/umi-plugin-config)

对 umi 插件进行一些全局配置。

1. v1.0.0

- skip 某些插件

2. v1.0.1

- 将 umi-plugin-antd-theme 的配置文件用 js 文件定义

## Install

```bash
# or yarn
$ npm install
```

```bash
$ npm run build --watch
$ npm run start
```

## Usage

- umi 2 修改配置文件

```js
{
  plugins: [
    'umi-plugin-config',
  ],
}
```

- umi 3 自动识别

## Options

umi 配置文件增加：

```js
{
    pluginsConfig: {
    skipPlugins: {
      development: ['umi-plugin-antd-theme']
    },
  },
}
```

可以指定环境包括 development，production 和 test。

## LICENSE

MIT
