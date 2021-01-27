const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

promise1
  .then((value) => {
    console.log(value);
    throw "o Jezu error!";
  })
  .catch((ex) => {
    console.log(ex);
  });

console.log(promise1);

const cezar = (string) => {
    let str = string.toLowerCase();
    let coded = "";
    for(i=0; i < str.length; i++) { 
        if(str[i] === " ") {
          coded += ' ';
          continue
        }
        let letter = str.charCodeAt(i);
        let position = letter % (123 - 3);
        (position < 97) ? letter =  97 + position : letter += 3;
        coded += String.fromCharCode(letter);
    }
    return coded;
}
console.log(cezar("Zebra")); 
console.log(cezar("Zebra w Zanzibarze"));
console.log(cezar("Ala ma kota!"));

