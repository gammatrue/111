var resp ={};
resp.headers =$response.headers;
resp.body =$response.body;
resp.status=200;
console.log(resp.headers);
console.log(resp.status);
resp.body={"data": {"premiumAccess": true}};
$done(resp);
