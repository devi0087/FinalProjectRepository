async function f(){
    let sum = await 2 + 4;
    //await new promise (reslove => { resolve(2=4) });x
    let reponse = await fetch(url);
    let data =  await reponse.json();
    console.log(reponse);
    console.log(data); //Promise <pending>

}