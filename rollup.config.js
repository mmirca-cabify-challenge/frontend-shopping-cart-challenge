import { getRollupConfig } from 'cap-rollup-config';

const buildConfig = {
  outputDir: 'dist'
};

export default getRollupConfig({
  outputDir: buildConfig.outputDir,
  extender: (pluginConfig, configName) => {
    switch(configName) {
      case 'copy':
        return {
          ...pluginConfig,
          targets: pluginConfig.targets.concat({
            src: [
              './manifest.json'
            ],
            dest: buildConfig.outputDir,
            copyOnce: true
          })
        };
      default:
        return pluginConfig;
    }
  }
});