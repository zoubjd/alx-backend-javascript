let p = new Promise((resolve, reject) => {
    let a = 1+1;
    if (a == 2) {
        resolve("Success");
    } else {
        reject('Failed');
    }
})

p.then((message) => {
    console.log('this is in the then ' + message + ' aka the promise succeded');
}).catch((message) => {
    console.log('this is in the catch ' + message + ' aka the promise failed');
})
