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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/me");
    if (!res.ok) throw new Error("not logged in");
    const user = await res.json();

    const { role, name, number } = user;
    localStorage.setItem("userRole", role);
    localStorage.setItem("userName", name);
    localStorage.setItem("userNumber", number);

    console.log(`로그인 성공: ${number}번 ${name} (${role}) 접속함`);

    window.userRole = role;
  } catch {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userNumber");

    window.userRole = "";
  }

  const adminLink = document.getElementById("adminLink");

  const roleDisplay = {
    ADM: "총관리자",
    DTM_A: "데이터센터-오디오",
    DTM_I: "데이터센터-이미지",
    DTM_O: "데이터센터-기타",
    BDM: "대시보드 및 게시판 관리자",
    NAS: "일반 사용자"
  };

  const roleEl = document.getElementById("roleCode");
  if (roleEl) {
    const rawCode = localStorage.getItem("userRole") || "";
    roleEl.textContent = roleDisplay[rawCode] || "없음";
  }

  const roleTextEl = document.getElementById("roleText");
  if (roleTextEl && window.userRole) {
    roleTextEl.textContent = roleDisplay[window.userRole] || window.userRole;
  }

  const allowedAdminRoles = ["ADM", "DTM_A", "DTM_I", "DTM_O", "BDM"];
  const allAllowedRoles = [...allowedAdminRoles, "NAS"];

  const isAdminPage = location.pathname.includes("adminpanel") ||
    location.pathname.includes("manage_");

  if (isAdminPage) {
    if (!allowedAdminRoles.includes(window.userRole)) {
      alert("접근 권한이 없습니다.");
      location.href = "/";
    }
  } else {
    if (!allAllowedRoles.includes(window.userRole)) {
      alert("로그인이 필요한 서비스입니다.");
      location.href = "/";
    }
  }

  const number = localStorage.getItem("userNumber");
  const name = localStorage.getItem("userName");
  const userButton = document.getElementById("userButton");
  if (number && name && userButton) {
    userButton.firstChild.textContent = `${number}번 ${name} ▾`;
  }
});
