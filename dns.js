var dns = require('native-dns');
var server = dns.createServer();

function sleep(ms){
  return new Promise(resolve=>{
    setTimeout(resolve,ms)
  });
}

server.on('request', function (request, response) {
  console.log(request.question[0].name + '@' + request.address.address);
  //console.log(request)
  response.answer.push(dns.A({
    name: request.question[0].name,
    address: '127.0.0.1',
    ttl: 600,
  }));
  response.answer.push(dns.A({
    name: request.question[0].name,
    address: '127.0.0.2',
    ttl: 600,
  }));
  response.additional.push(dns.A({
    name: 'hostA.example.org',
    address: '127.0.0.3',
    ttl: 600,
  }));
  response.send();
});

server.on('error', function (err, buff, req, res) {
  console.log(err.stack);
});

async function serve(){
  server.serve(53);
  await sleep(60000);
}

serve().then(result=>{
  console.log('FINISHED');
}).catch(error => {
  console.log(error);
});
