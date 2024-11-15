//
//function timeNewYear() {
//  const newYear = new Date(`January 1, ${new Date().getFullYear() + 1} 00:00:00`).getTime();

//  setInterval(() => {
//    const todayData = new Date().getTime();
//    const numberOf = newYear - todayData;

//    const days = Math.floor(numberOf / (1000 * 60 * 60 * 24));
//    const hours = Math.floor((numberOf % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//    const minutes = Math.floor((numberOf % (1000 * 60 * 60)) / (1000 * 60));
//    const seconds = Math.floor((numberOf % (1000 * 60)) / 1000);

//    document.querySelector('.days').textContent = days;
//    documnt.querySelector('.hours').textContent = hours;
 //   document.querySelector('.minutes').textContent = minutes;
//    document.querySelector('.seconds').textContent = seconds;


//  }, 1000);
//}

//timeNewYear();
