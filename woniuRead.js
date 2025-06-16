var body = $response.body;
var obj = JSON.parse(body);

obj.tradeEndTime = 2208959999000;
body = JSON.stringify(obj);
$done({body});
