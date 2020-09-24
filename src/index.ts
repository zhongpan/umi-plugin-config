// ref:
// - https://umijs.org/plugins/api
import { IApi } from '@umijs/types';
import fs from 'fs';

export default function(api: IApi) {
  api.describe({
    key: 'pluginsConfig',
    config: {
      default: { skipPlugins: {} },
      schema(joi) {
        return joi.object({
          skipPlugins: joi.object({
            development: joi.array().items(joi.string()),
            production: joi.array().items(joi.string()),
            test: joi.array().items(joi.string()),
          }),
        });
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
    enableBy: api.EnableBy.register,
  });

  if (api.userConfig.pluginsConfig) {
    const skipPlugins = api.userConfig.pluginsConfig.skipPlugins;
    for (let key of Object.keys(skipPlugins)) {
      if (api.env === key) {
        api.skipPlugins(skipPlugins[key]);
        api.logger.info(`skipPlugins: ${skipPlugins[key].join(',')}`);
      }
    }
  }

  api.onGenerateFiles(() => {
    // 将umi-plugin-antd-theme的配置文件用js文件定义
    const themeConfigJsFilePath = api.utils.winPath(
      api.cwd + '/config/theme.config.js',
    );
    const themeConfigJsonFilePath = api.utils.winPath(
      api.cwd + '/config/theme.config.json',
    );
    if (fs.existsSync(themeConfigJsFilePath)) {
      const theme = require(themeConfigJsFilePath);
      fs.writeFileSync(themeConfigJsonFilePath, JSON.stringify(theme, null, 2));
      api.logger.info('auto generate umi-plugin-antd-theme config');
    }
  });
}
