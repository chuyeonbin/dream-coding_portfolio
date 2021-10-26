'use strict';

//스크롤시 navbar 배경색 변경
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if(link == null) {
    return;
  }
  console.log(event.target.dataset.link);
  scrollIntoView(link);
});

const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth'});
}

//내가 만든 코드
// //navbar__menu 클릭시 해당 section으로 이동
// const navbarMenu = document.querySelector('.navbar__menu');
// navbarMenu.addEventListener('click', (e) => {
//   if(e.target.tagName !== 'LI') {
//     return;
//   }
//   const menuItem = e.target;
//   const sectionElem = document.querySelector(`#${menuItem.dataset.item}`);
//   const sectionElemTop = sectionElem.getBoundingClientRect().top;
//   for(let i = 0; i < navbarMenu.children.length; i++) {
//     if(navbarMenu.children[i].classList.contains('active')) {
//       navbarMenu.children[i].classList.remove('active');
//       break;
//     }
//   }
//   menuItem.classList.add('active');
//   scrollTo({
//     behavior: 'smooth',
//     top: (sectionElemTop + window.scrollY) - 88
//   });
// });

// //버튼 클릭시 contact section으로 이동
// const contactBtn = document.querySelector('.home__contact');
// const contact = document.querySelector('#contact');
// contactBtn.addEventListener('click', () => {
//   contact.scrollIntoView({
//     behavior: 'smooth',
//     block: 'start'
//   });
// });