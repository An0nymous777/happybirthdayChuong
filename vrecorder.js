
var trials = 0;
var instructionboolean = true;
navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  })
  .then(stream => {
      window.localStream = stream;
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
  
      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;
  
      microphone.connect(analyser);
      scriptProcessor.connect(audioContext.destination);
      scriptProcessor.onaudioprocess = function() {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        const average = arraySum / array.length;
        console.log(Math.round(average));
        // colorPids(average);
        const square = document.querySelector('.square');
        if(Math.round(average)>= 40 && trials ==0) {
            playVideo2();
            setTimeout(playVideo1, 2000);
            trials ++;
            console.log(console)
        } else if (Math.round(average)>= 50 && trials ==2) {
            playVideo3();
            setTimeout(stopVoice, 5100);
            setTimeout(startLetter, 4500);
            trials ++;
        }
      };
    })
    .catch(function(err) {
      /* handle the error */
      console.error(err);
    });


function playVideo2() {
    video1 = document.getElementById('video1')
    video2 = document.getElementById('video2')
    video1.pause();
    ontop(video2);
    video2.play();
}
    
function playVideo1() {
    video1 = document.getElementById('video1')
    video2 = document.getElementById('video2')
    video2.pause();
    ontop(video1);
    video1.play();
    trials ++;
}

function playVideo3() {
    video1 = document.getElementById('video1')
    video2 = document.getElementById('video2')
    video3 = document.getElementById('video3')
    video1.pause();
    video2.pause();
    ontop(video3);
    video3.play();
}

function ontop(cake){
    var elements = document.getElementsByClassName("cake");
    var highest_index = 0;

    for (var i = 0; i < elements.length - 1; i++) 
    {
        if (parseInt(elements[i].style.zIndex) > highest_index) 
        {        
            highest_index = parseInt(elements[i].style.zIndex);
        }
    }

    cake.style.zIndex = highest_index + 1;
}

function stopVoice() {
    localStream.getTracks().forEach( (track) => {
        track.stop();
        });
    console.log("work"); 
    }


// var start_btn = document.querySelector('.start_btn');
// start_btn.onclick = ()=>{
//     stopVoice();//show info box
// }


// letter animations
function startLetter() {
    var $card = $(".card"),
      $bgCard = $(".bgCard"),
      $icon = $(".icon"),
      $openGift = $(".openGift"),
      cartPageBottomP = document.querySelector(".cart-page-bottom p"),
      cartPageBottomH4 = document.querySelector(".cart-page-bottom h4");
      let textTitle = "Gửi Chương!";
      let charArrTitle = textTitle.split('');
  let text = "Happy birthday :)). Chúc mừng sinh nhật bạn. Chúc bạn càng ngày càng đẹp trai và học giỏi!"
  let charArrContent = text.split('');
  var currentIndexTitle = 0;
  var currentIndexContent = 0;
  var textIntervalTitle;
  var textIntervalContent;
  function resetText(){
      clearInterval(textIntervalTitle)
      clearInterval(textIntervalContent)
      cartPageBottomH4.textContent = "";
      cartPageBottomP.textContent = "";
      currentIndexTitle = 0;
      currentIndexContent = 0;
  }
    $card.on("click", function () {
      $(this).toggleClass("is-opened");
      if($card.hasClass("is-opened")){
          textIntervalTitle = setInterval(function(){
              if(currentIndexTitle < charArrTitle.length){
                  cartPageBottomH4.textContent += charArrTitle[currentIndexTitle];
                  currentIndexTitle++;
                  console.log(currentIndexTitle)
              }
              else{
                  clearInterval(textIntervalTitle)
                  textIntervalContent = setInterval(function(){
                      if(currentIndexContent < charArrContent.length){
                          cartPageBottomP.textContent += charArrContent[currentIndexContent];
                          currentIndexContent++;
                  console.log(currentIndexContent)
                      }
                      else{
                          clearInterval(textIntervalContent)
                          $openGift.fadeIn();
                        }
                  },50)
              }
          },50)
      }
      else{
          resetText()
      }
    });
  
    $card.fadeIn();
    $bgCard.fadeIn();
    $icon.fadeIn();

    $(".fa-xmark").on("click", function () {
      $card.fadeOut();
      $bgCard.fadeOut();
      $icon.fadeOut();
      $card.removeClass("is-opened");
      resetText()
    });
  
  };

function openGiftfunc() {
    var $wrapper = $('.wrapper');
    $wrapper.fadeOut();
    console.log("buttonwork")
}


function hideInstruction() {
    instruction = document.querySelector('.instruction');
    if(instructionboolean==false){
        instruction.style.opacity = "1";
        instructionboolean = true;
    }
    else{
        instruction.style.opacity = "0";
        instructionboolean = false;
    }
    
}

