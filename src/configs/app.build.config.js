let config = {};

if (__DEV__) {
  config.API_ROOT = 'http://dev.mci.hujiang.com/teacher/';
  config.HJPASSPORT_PATH = '//qapass.hujiang.com/m';
  config.MY_ACCOUNT_URL = '//qamy.hujiang.com/account/m';
}

if (__QA__) {
  config.API_ROOT = 'http://qa.mci.hujiang.com/teacher/';
  config.HJPASSPORT_PATH = '//qapass.hujiang.com/m';
  config.MY_ACCOUNT_URL = '//qamy.hujiang.com/account/m';
}

if (__YZ__) {
  config.API_ROOT = 'http://yz.mci.hujiang.com/teacher/';
  config.HJPASSPORT_PATH = '//yzpass.hujiang.com/m';
  config.MY_ACCOUNT_URL = '//yzmy.hujiang.com/account/m';
}

if (__PROD__) {
  config.API_ROOT = 'http://mci.hujiang.com/teacher/';
  config.HJPASSPORT_PATH = '//pass.hujiang.com/m';
  config.MY_ACCOUNT_URL = '//my.hujiang.com/account/m';
}

export default config;

