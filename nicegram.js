var modifiedHeaders = $response.headers;
var modifiedStatus = 'HTTP/1.1 200 OK';
var body1={"premiumAccess": true};
console.log(modifiedHeaders,modifiedStatus,body1);
$done({status: modifiedStatus, headers : modifiedHeaders, body : body1});
