'use strict'

{
  const words=[
    'apple',
    'sky',
    'blue',
    'middle',
    'set',
    'cat',
    'dog',
    'important',
    'desk',
    'red',
    'elephant',
    'scientist',
    'family',
    'soccer',
    'baseball',
    'gym',
    'mother',
    'father',
    'scientist',
    'teacher',
    'engineer',
    'system',
    'guide',
    'king',
    'beach',
    'communication',
    'concert',
    'volleyball',
    'basketball',
    'action',
    'festival',
    'javascript',
    'html',
    'css',
    'java',
    'php',
    'mind',
    'silver',
    'facebook',
    'twitter',
    'sns',
    'picture',
    'instagram',
    'line',
    'ocean',
    'computer',
    'chair',
    'report',
    'football',
    'size',
    'pencil',
    'bag',
    'money',
    'tie',
    'step',
    'care',
    'list',
    'smoke',
    'wave',
    'stop',
    'sorry',
    'phone',
    'number',
    'test',
    'paper',
    'mouse',
    'shoes',
    'car',
    'taxi',
    'hair',
    'catalog',
    'book',
    'sushi',
    'address',
    'damage',
    'download',
    'install',
    'point',
    'model',
    'weather',
    'power',
    'site',
    'type',
    'host',
    'price',
    'pair',
    'case',
    'face',
    'fact',
    'cheese',
    'reason',
    'menu',
    'page',
    'rainbow',
    'room',
    'cup',
    'glass',
    'bed',
    'floor',
    'table',
    'door',
    'body',
    'tennis',
    'sports',
  ];

  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 60*1000;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  function updateTarget(){
    let placeholder = '';
    for(let i=0; i<loc; i++){
      placeholder +='_';
    }
    target.textContent=placeholder+word.substring(loc);
  }

  function updateTimer(){
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft/1000).toFixed(2);

    const timeoutId = setTimeout(() =>{
      updateTimer();
    },10);

    if(timeLeft < 0){
      isPlaying = false;

      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      setTimeout(() => {
        // alert('Game Over')
        showResult();
      },100);

      target.textContent = 'リプレイ';
    }
  }

  function showResult(){
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    alert(`入力したスコア ${score}, 打ち間違え ${miss}, 正答率 ${accuracy.toFixed(2)}%`);
  }

  window.addEventListener('click',() =>{
    if(isPlaying === true){
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word;
    startTime=Date.now();
    updateTimer();
  });

  // window.addEventListener('keydown'(e) => (
  window.addEventListener('keydown',e => {
    if(isPlaying !== true){
      return;
    }
    // console.log(e.key);
    if (e.key === word[loc]){
      // console.log('score');
      loc++;
      if(loc ===word.length){
        word = words[Math.floor(Math.random() * words.length)];
        loc=0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    }else{
      // console.log('miss');
      miss++;
      missLabel.textContent = miss;
    }
  });

}