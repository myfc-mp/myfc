class Config {
  constructor() {

  }
}

//内部调试使用该地址
// Config.restURL = 'http://z.cn/';
//服务器使用该地址
Config.restURL = 'https://myfc.xyz/';

//图片完整路径前缀(服务器)
// Config.avatar_prefix = 'https://myfc.xyz/myfcBackEnd/public/static/personal/';
//图片完整路径前缀(本地)
Config.avatar_prefix = 'http://z.cn/static/personal/';
//图片完整路径前缀(服务器)
Config.house_prefix ='https://myfc.xyz/myfcBackEnd/public/static/houseImage/';
//图片完整路径前缀(本地)
// Config.house_prefix = 'http://z.cn/static/houseImage/';
//图片完整路径前缀(服务器)
Config.carousel_prefix= 'https://myfc.xyz/myfcBackEnd/public/static/carousel/';
//图片完整路径前缀(本地)
// Config.carousel_prefix = 'http://z.cn/static/carousel/';
export { Config };