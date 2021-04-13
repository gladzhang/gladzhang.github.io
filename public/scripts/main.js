function readTextFile(file, callback) {  
    var rawFile = new XMLHttpRequest();  
    rawFile.overrideMimeType("application/json");  
    rawFile.open("GET", file, true);  
    rawFile.onreadystatechange = function() {  
        if (rawFile.readyState === 4 && rawFile.status == "200") {  
          callback(rawFile.responseText);  
      }  
    }  
    rawFile.send(null);  
 }  
  
document.querySelector('h1').onclick = function() {
    alert('我爱你啊宝宝');
}
// console.log("I am here.");
let myButton = document.querySelector('button2');
let myButton1 = document.querySelector('button1');
let myHeading = document.querySelector('h3');
// var feeltoday = '今天宝宝还没有记录心情';
function setUserName() {
    let said = prompt('说说今天的心情怎样吧，选个数字, 1:开心 2:郁闷 3:惊喜 4:忧愁 5:愤怒 6:想你了 7:自定义')
    let feeling = ''
    var time = new Date()
    var timenow = time.toLocaleString()
    switch(said){
      case '1': feeling = '今天宝宝很开心，一切都会慢慢好起来'+ '       ' + timenow;break;
      case '2': feeling = '今天宝宝有点郁闷，要多照顾宝宝一点' + '       '+ timenow;break;
      case '3': feeling = '今天宝宝遇到了惊喜，嘻嘻，不知道是不是与我有关' + '       '+ timenow;break;
      case '4': feeling = '今天宝宝在为某件事情发愁，可以去问一下'+ '       ' + timenow;break;
      case '5': feeling = '今天不宜招惹宝宝，宝宝可能会拿酒瓶子粹你' + '       ' + timenow;break;
      case '6': feeling = '今天宝宝想我了，我一直都在，很爱你呀' + '       '+ timenow;break;
      case '7': feeling =  '今天宝宝心情无法描述，要自己说出来，如下'+'\n'+prompt('心情无法准确描述，来说说呗')+ '       ' + timenow;break;
    }
    console.log(feeling)
    window.s = said
    readTextFile("/scripts/answer.json", function(text){  
      var data = JSON.parse(text);   
      console.log(data)
      var tag = window.s
      var idx = Math.floor(Math.random()*3)
      switch(tag){
        case '1': alert(data.happy[idx]);break;
        case '2': alert(data.unhappy[idx]);break;
        case '3': alert(data.surprise[idx]);break;
        case '4': alert(data.worry[idx]);break;
        case '5': alert(data.anger[idx]);break;
        case '6': alert(data.miss[idx]);break;
        case '7': alert(data.owns[idx]);break;
      }
    })
    localStorage.setItem('feeling', feeling);
  }

  function saideveryday() {
    let daystory = prompt('今日份宣言');
    localStorage.setItem('daystory', daystory);
    myHeading.textContent = daystory;
  }
  if(!localStorage.getItem('daystory')) {
    saideveryday();
  } else {
    let storedstory = localStorage.getItem('daystory');
    myHeading.textContent = storedstory;
  }
  document.querySelector('h4').onclick = function() {
    if(!localStorage.getItem('feeling')) {
      setUserName();
    } else {
      let storedfeeling = localStorage.getItem('feeling');
      // myHeading.textContent = storedstory;
      alert(storedfeeling);
    }
  }

myButton.onclick = function() {
    setUserName();
 }
myButton1.onclick = function() {
  saideveryday();
}
 setInterval(function(){
  window.location.href=window.location.href;
},30000);
