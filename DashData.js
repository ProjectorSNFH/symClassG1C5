// DashData.js

document.addEventListener("DOMContentLoaded", () => {
  // 더미 데이터 정의
  const assessments = [
    { content: "수학 수행평가", created: "2025-08-19" }
  ];

  const duties = [
    { num: 16, name: "하 윤" },
    { num: 21, name: "황윤성" }
  ];

  const lunchMenu = ["현미밥","육개장","춘천식닭갈비","담양버섯떡갈비","배추김치",'포도'];

  const cleaning = {
    late: [3],
    sweep: [1, 2],
    wipe: [3, 4]
  };

  // 정렬: 생성일 기준 내림차순
  assessments.sort((a, b) => new Date(b.created) - new Date(a.created));

  // DOM에 삽입
  const assessmentContainer = document.getElementById("assessment-container");
  if (assessmentContainer) {
    assessments.forEach(item => {
      const div = document.createElement("div");
      div.textContent = item.content;
      assessmentContainer.appendChild(div);
    });
  }

  const dutiesContainer = document.getElementById("duties-container");
  if (dutiesContainer) {
    duties.forEach(item => {
      const div = document.createElement("div");
      div.textContent = `${item.num}번 ${item.name}`;
      dutiesContainer.appendChild(div);
    });
  }

  const lunchContainer = document.getElementById("lunch-container");
  if (lunchContainer) {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = lunchMenu.join(", ");
    lunchContainer.appendChild(div);
  }

  const cleaningContainer = document.getElementById("cleaning-container");
  if (cleaningContainer) {
    const lateDiv = document.createElement("div");
    lateDiv.innerHTML = `<b>지각:</b> ${cleaning.late.join(", ")}`;

    const sweepDiv = document.createElement("div");
    sweepDiv.innerHTML = `<b>쓸기:</b> ${cleaning.sweep.join(", ")}`;

    const wipeDiv = document.createElement("div");
    wipeDiv.innerHTML = `<b>닦기:</b> ${cleaning.wipe.join(", ")}`;

    cleaningContainer.append(lateDiv, sweepDiv, wipeDiv);
  }
});