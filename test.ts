import { download } from './download';

class test {

    public async test() {
        let sid = 0;
        let roomId = 0;
        let url = "https://tx2.a.yximgs.com/uhead/AB/2019/08/20/17/BMjAxOTA4MjAxNzAyNDNfOTY3Mzk5MjI3XzNfaGQyNzZfMA==.jpg";
        let obj  = new download();
        await obj.run(sid, url, roomId);
    
      }
}

new test().test();
