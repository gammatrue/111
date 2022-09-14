/*

公众号：搞鸡玩家

苹果商店下载: 轻颜相机 蒸汽波相机 （二合一解锁VIP）

修改内容：解锁永久会员 

注意事项：每次解锁需启动圈叉



本地重写

https://(commerce-.*api|pay).(faceu|wecut).(com|mobi)/(commerce|apple)/(iosAppVerifyReceipt.php|v1/subscription/user_info) url script-response-body qyxj.js



主机名MITM

commerce-i18n-api.faceu.mobi,commerce-api.faceu.mobi, pay.wecut.com


*/

const path1 = "/commerce/v1/subscription/user_info";
const path2 = "/apple/iosAppVerifyReceipt.php";

let obj = JSON.parse($response.body);

if ($request.url.indexOf(path1) != -1){
obj.data.start_time = 1584674770;
obj.data.end_time = 4077660370;
obj.data.is_cancel_subscribe = true;
obj.data.flag = true;
}
if ($request.url.indexOf(path2) != -1){
 obj.data = {
    "isValid": 1,
    "expiresTs": 4077660370
}
}
$done({body: JSON.stringify(obj)});