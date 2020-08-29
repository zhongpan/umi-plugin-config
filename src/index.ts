// ref:
// - https://umijs.org/plugins/api
import { IApi } from '@umijs/types';

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
}
