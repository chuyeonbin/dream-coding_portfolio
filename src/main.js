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
  navbarMenu.classList.remove('open');
  console.log(target.dataset.link);
  scrollIntoView(link);
});

//navbar toggle 버튼 클릭시 메뉴 띄우기
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

//스크롤 내릴시 home 페이드효과 
const homeContainer = document.querySelector('.home__container');
const homeContainerHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  homeContainer.style.opacity = (homeContainerHeight - window.scrollY) / homeContainerHeight;
});

//arrow-button 클릭시 home으로 이동
const arrowButton = document.querySelector('.arrow-button');
arrowButton.addEventListener('click', () => {
  scrollIntoView('#home');
});

document.addEventListener('scroll', () => {
  if(window.scrollY > homeContainerHeight / 2) {
    arrowButton.classList.add('visible');
  } else {
    arrowButton.classList.remove('visible');
  }
});

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (event) => {
  const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if(filter == null) {
    return;
  }

  //이전 아이템에 액티브 상태 지우고 새로운 아이템에 액티브 상태 
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');

  const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach(project => {
      if(filter === '*' || filter === project.dataset.item) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth'});
}

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact'
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
}
const observerCallback = entries => {
  entries.forEach(entry => {
    if(!entry.isIntersecting && entry.intersectionRatio > 0) {
      console.dir(`target: ${entry.target.id}, isIntersecting: ${entry.isIntersecting}, intersectionRatio: ${entry.intersectionRatio}, bounding: ${entry.boundingClientRect.y}`);
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
        selectNavItem(navItems[selectedNavIndex]);
      } else {
        selectedNavIndex = index - 1;
        selectNavItem(navItems[selectedNavIndex]);
      }
    }
  });
}
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

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

// //home이 위로 올라갈수록 페이드현상 만들기
// const fade = document.querySelector('.fade');
// const fadeHeight = fade.getBoundingClientRect().height;
// window.addEventListener('scroll', () => {
//   const opacity = (fadeHeight - window.scrollY) / fadeHeight
//   fade.style.opacity = opacity;
//   console.log(opacity);
// });