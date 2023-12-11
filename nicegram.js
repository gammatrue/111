$response.status=200;
$response.body={"data": {"premiumAccess": true}};
const resp ={};
resp.headers =$response.headers;
resp.body =$response.body;
$done(resp);
