import * as Ut from './common/common';
import { existsSync } from 'fs';


export class  download{
  
  public imageDownPath = "./image/";
  
  constructor() {
    
  }

  public async run(sid:number = 0, url:string = "", key:number = 0) {
    if (!url) {
      console.error("下载地址不存在！");
      return;
    }
    let imagePath = this.imageDownPath + sid + '/';
    let flag = false;
    let name = sid + '_' + key;
    if (!existsSync(imagePath)) {
      flag = Ut.makedirSync(imagePath);
    }else {
      flag = true;
    }
    if (!flag) {
      console.log(imagePath + " 目录不存在！");
      return;
    }
    this.download_img(url, imagePath, name);

  }

  /**
   * 下载图片
   * @param url 图片地址 
   */
  public async download_img(url:string, imagePath:string, name:string){
    let opts = {
      url: url,
      timeout:3000
    };
    let imageName = Ut.encryption(name)
    let paths = imagePath + imageName +".jpg";
    try {
      let r1 = await Ut.downImg(opts, paths);
      await Ut.changeImgSize(paths);
      console.log('_____________' + r1);
    }
    catch (e) {
      console.log(e);
    }

  }

}

