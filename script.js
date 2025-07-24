//script.js

//const userButton = document.getElementById('userButton');
const userMenu = document.getElementById('userMenu');

let isLocked = false;

// 호버로 열림
userButton.addEventListener('mouseenter', () => {
  if (!isLocked) {
    userMenu.classList.add('visible');
  }
});
userButton.addEventListener('mouseleave', () => {
  if (!isLocked) {
    setTimeout(() => {
      if (!userMenu.matches(':hover')) {
        userMenu.classList.remove('visible');
      }
    }, 100);
  }
});

// 메뉴 안에 있을 때도 유지
userMenu.addEventListener('mouseenter', () => {
  if (!isLocked) {
    userMenu.classList.add('visible');
  }
});
userMenu.addEventListener('mouseleave', () => {
  if (!isLocked) {
    userMenu.classList.remove('visible');
  }
});

// 클릭 시 고정
userButton.addEventListener('click', (e) => {
  e.stopPropagation();
  isLocked = !isLocked;
  if (isLocked) {
    userMenu.classList.add('visible');
  } else {
    userMenu.classList.remove('visible');
  }
});

// 다른 곳 클릭 시 닫기
document.addEventListener('click', (e) => {
  if (isLocked && !userMenu.contains(e.target) && !userButton.contains(e.target)) {
    isLocked = false;
    userMenu.classList.remove('visible');
  }
});