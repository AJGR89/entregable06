function getRandomArbitrary(min, max) {
  const num = Math.random() * (max - min) + min;
  return Math.trunc(num);
}

process.on("message", (cant) => {
  const total = cant.cant;
  let objrandoms = {};
  let arrayR = [];
  let num = 0;
  let strnum = "";
  let aux = 0;
  console.log("cant", total);
  for (let index = 0; index < total; index++) {
    num = getRandomArbitrary(1, 1000);
    strnum = toString(num);
    if(objrandoms.hasOwnProperty(String(num))){
        aux=objrandoms[String(num)];
        aux++;
        objrandoms[String(num)] = aux;
    }else{
        objrandoms[String(num)] = 1;
    }
  }
//   console.log(JSON.parse(JSON.stringify(objrandoms)))
  process.send(objrandoms);
});
