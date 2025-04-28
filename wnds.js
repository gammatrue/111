var body = $response.body;
var obj = JSON.parse(body);

obj.tradeEndTime = 2195218090000;
body = JSON.stringify(obj);
$done({body});
