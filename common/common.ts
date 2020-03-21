import * as request from "request";
import * as fs from "fs";
import * as crypto  from "crypto";
import * as path from "path";
import * as sharp from "sharp";

/**
 * 下载网络图片
 * @param opts 请求参数
 * @param path 存放路径
 */
export function downImg(opts:any = {}, path:string = '') {
  let writeStream = fs.createWriteStream(path);
  return new Promise((resolve, reject) => {
    request
      .get(opts)
      .on('response', (response) => {
        //console.log("img type:", response);
        //console.log("img type:");
      })
      .pipe(writeStream)
      .on("error", (e) => {
        console.log("pipe error", e)
        resolve('');
      })
      .on("finish", () => {
        console.log("finish");
        resolve("ok");
      })
      .on("close", () => {
        console.log("close");
      });

  })
}; 

/**
 * 加密
 * @param str 需要加密的字符串 
 * @param type 加密类型 md5 sha1 ...
 */
export function encryption(str:string,type:string = 'md5') {
  if (!str && typeof(str) !== 'string') {
    return 0;
  }
  
  let encryKey = crypto.createHash(type).update(str).digest("hex");
  
  return encryKey;
};

/**
 * 新建目录
 * @param dirname 地址 
 */
export function makedirSync(dirname:string) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (makedirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }

};

/**
 * 获取文件扩展名
 * @param filePath 文件地址 
 */
export function getFileExtname(filePath:string) {
  if (!filePath) {
    return false;
  }
  let extname:string = path.extname(filePath);
  return extname;
};

/**
 * 修改原图片并覆盖
 * @param imagePath 图片地址
 */
export function changeImgSize(imagePath:string = "") {
  if (!fs.existsSync(imagePath)) {
    return false;
  } 
  let image = this.convert2Sharp(imagePath);
  
  image.metadata().then(function(metadata) {

    let width = metadata.width;
    let height = metadata.height;
    let percent = Math.round(350/width.toFixed(2) * 100) /100;
    //console.log('percent:' + percent);
    if (percent < 1) {
      let new_width = Math.floor(width * percent);
      let new_height = Math.floor(height * percent);
      return image.resize(new_width,new_height).toBuffer();
    }
  }).then(outputBuffer => 
    {
      if (outputBuffer) {
        fs.writeFileSync(imagePath, outputBuffer);
        //console.log(outputBuffer);
      }
      
    }
  );
  
};

/**
 * 修改图片
 * @param imagePath 图片地址
 * @param outPath 图片地址
 */
export function changeImgOut(imagePath:string, outPath:string) {
  if (!fs.existsSync(imagePath)) {
    return false;
  } 
  let image = this.convert2Sharp(imagePath);
  image.metadata().then(function(metadata) {

    let width = metadata.width;
    let height = metadata.height;
    let percent = Math.round(350/width.toFixed(2) * 100) /100;
    //console.log('percent:' + percent);
    if (percent < 1) {
      let new_width = Math.floor(width * percent);
      let new_height = Math.floor(height * percent);
      return image.resize(new_width,new_height).toFile(outPath,function(err, info) {
        if (!err) console.log(info) ;
      });
    }
  });

};


export function convert2Sharp(imagePath){
  return sharp(imagePath);
};
