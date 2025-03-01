function timeNewYear() {
  const newYear = new Date(`January 1, ${new Date().getFullYear() + 1} 00:00:00`).getTime();

  setInterval(() => {
    const todayData = new Date().getTime();
    const numberOf = newYear - todayData;

    const days = Math.floor(numberOf / (1000 * 60 * 60 * 24));
    const hours = Math.floor((numberOf % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((numberOf % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((numberOf % (1000 * 60)) / 1000);

    document.querySelector('.days').textContent = days;
    document.querySelector('.hours').textContent = hours;
    document.querySelector('.minutes').textContent = minutes;
    document.querySelector('.seconds').textContent = seconds;
  }, 1000);
}

timeNewYear();

document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () =>
      backToTop.classList.toggle('visible', window.scrollY > 100)
  );

  backToTop.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
  );
});

document.addEventListener('DOMContentLoaded', () => {
  const burgerCheckbox = document.getElementById('burger-checkbox');
  const scroll = document.body;
  const menuLinks = document.querySelectorAll('.menu-box a');

  burgerCheckbox.addEventListener('change', () => {
    if (burgerCheckbox.checked) {
      scroll.classList.add('no-scroll');
    } else {
      scroll.classList.remove('no-scroll');
    }
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerCheckbox.checked = false;
      scroll.classList.remove('no-scroll');
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('./gifts.json')
    .then(response => response.json())
    .then(data => {
      const shuffledGifts = shuffleArray(data);
      const cardElements = document.querySelectorAll('.card-container');

      function displayCategory(category) {
        cardElements.forEach(cardElement => {
          const categoryTag = cardElement.querySelector('.slider-text-tag');
          const giftCategory = categoryTag.textContent;

          if (category === 'all' || giftCategory === category) {
            cardElement.style.display = 'block'
          } else {
            cardElement.style.display = 'none';
          }
        });
      }

      cardElements.forEach((cardElement, index) => {
        const gift = shuffledGifts[index % shuffledGifts.length];

        const categoryTag = cardElement.querySelector('.slider-text-tag');
        cardElement.querySelector('.card-image').src = gift.imagePath;
        cardElement.querySelector('.card-image').alt = gift.name;
        categoryTag.textContent = gift.category;
        cardElement.querySelector('.slider-text-title').textContent = gift.name;

        switch (gift.category) {
          case 'For Health':
            categoryTag.style.color = '#06a44f';
            break;
          case 'For Work':
            categoryTag.style.color = '#4361ff';
            break;
          case 'For Harmony':
            categoryTag.style.color = '#ff43f7';
            break;
          default:
            categoryTag.style.color = 'black';
        }
      });

      document.querySelectorAll('.garland-btn').forEach(button => {
        button.addEventListener('click', () => {
          const category = button.dataset.category || 'all';
          displayCategory(category);
        });
      });

      displayCategory('all');
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let offset = 0;
const sliderLine = document.querySelector('.slider-line');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slideWidth = 332;

function returnMaxOffset() {
  return -(slideWidth * (window.innerWidth >= 768 ? 2 : 5));
}

let maxOffset = returnMaxOffset();

function updateSlider() {
  sliderLine.style.transform = `translateX(${offset}px)`;
  prevButton.disabled = offset === 0;
  nextButton.disabled = offset === maxOffset;
}

prevButton.addEventListener('click', () => {
  offset = Math.min(offset + slideWidth, 0);
  updateSlider();
});

nextButton.addEventListener('click', () => {
  offset = Math.max(offset - slideWidth, maxOffset);
  updateSlider();
});

window.addEventListener('resize', () => {
  maxOffset = returnMaxOffset();
  offset = Math.max(offset, maxOffset);
  updateSlider();
});

updateSlider();
