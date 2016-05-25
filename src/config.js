let config = {};

if (__DEV__) {
  config.API_ROOT = 'http://dev.mci.hujiang.com/teacher/';
  //'http://local.mci.hujiang.com/teacher/v1/';
  config.HJPASSPORT_PATH = '//qapass.hujiang.com/m';
  config.MY_ACCOUNT_URL = '//qamy.hujiang.com';
}

if (__QA__) {
  config.API_ROOT = 'http://dev.mci.hujiang.com/teacher/v1/';
  config.HJPASSPORT_PATH = '//qapass.hujiang.com/m';
  config.MY_ACCOUNT_URL = '//qamy.hujiang.com';
}

if (__PROD__) {
  config.API_ROOT = 'http://dev.mci.hujiang.com/teacher/v1/';
  config.HJPASSPORT_PATH = '//pass.hujiang.com/m';
  config.MY_ACCOUNT_URL = '//my.hujiang.com';
}

export default config;

