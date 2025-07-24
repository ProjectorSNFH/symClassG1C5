//manage_bdm2.ls

document.addEventListener("DOMContentLoaded", () => {
  const defaultData = {
    duties: "",
    meals: "",
    late: "",
    sweep: ["1", "2"],
    wipe: ["1", "2"]
  };

  const elements = {
    dutiesInput: document.getElementById("dutiesInput"),
    mealsInput: document.getElementById("mealsInput"),
    lateInput: document.getElementById("lateInput"),
    sweep1: document.getElementById("sweep1"),
    sweep2: document.getElementById("sweep2"),
    wipe1: document.getElementById("wipe1"),
    wipe2: document.getElementById("wipe2"),
    applyDuties: document.getElementById("applyDuties"),
    applyMeals: document.getElementById("applyMeals"),
    applyLate: document.getElementById("applyLate"),
    applySweep: document.getElementById("applySweep"),
    applyWipe: document.getElementById("applyWipe")
  };

  // 드롭박스 채우기 및 기본값 설정
  function fillSelect(select, selectedVal) {
    for (let i = 1; i <= 23; i++) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = `${i}번`;
      if (i.toString() === selectedVal) opt.selected = true;
      select.appendChild(opt);
    }
  }

  fillSelect(elements.sweep1, defaultData.sweep[0]);
  fillSelect(elements.sweep2, defaultData.sweep[1]);
  fillSelect(elements.wipe1, defaultData.wipe[0]);
  fillSelect(elements.wipe2, defaultData.wipe[1]);

  elements.dutiesInput.value = defaultData.duties;
  elements.mealsInput.value = defaultData.meals;
  elements.lateInput.value = defaultData.late;

  function clearAllUnsavedMarks() {
    document.querySelectorAll(".btn-apply").forEach(btn => btn.classList.remove("unsaved"));
  }
  clearAllUnsavedMarks();

  // 텍스트 인풋 변경 감지
  function monitorInput(input, button, key) {
    input.addEventListener("input", () => {
      if (input.value.trim() !== defaultData[key]) {
        button.classList.add("unsaved");
      } else {
        button.classList.remove("unsaved");
      }
    });
  }

  monitorInput(elements.dutiesInput, elements.applyDuties, "duties");
  monitorInput(elements.mealsInput, elements.applyMeals, "meals");
  monitorInput(elements.lateInput, elements.applyLate, "late");

  // 드롭박스 감지
  function monitorSelects(sel1, sel2, button, key) {
    const check = () => {
      if (sel1.value !== defaultData[key][0] || sel2.value !== defaultData[key][1]) {
        button.classList.add("unsaved");
      } else {
        button.classList.remove("unsaved");
      }
    };
    sel1.addEventListener("change", check);
    sel2.addEventListener("change", check);
  }

  monitorSelects(elements.sweep1, elements.sweep2, elements.applySweep, "sweep");
  monitorSelects(elements.wipe1, elements.wipe2, elements.applyWipe, "wipe");

  // 적용 버튼 → 기본값 업데이트
  function handleApply(button, key, getValue) {
    button.addEventListener("click", () => {
      defaultData[key] = getValue();
      button.classList.remove("unsaved");
      // TODO: 서버 저장
      console.log(`[저장됨] ${key}:`, defaultData[key]);
    });
  }

  handleApply(elements.applyDuties, "duties", () => elements.dutiesInput.value.trim());
  handleApply(elements.applyMeals, "meals", () => elements.mealsInput.value.trim());
  handleApply(elements.applyLate, "late", () => elements.lateInput.value.trim());
  handleApply(elements.applySweep, "sweep", () => [elements.sweep1.value, elements.sweep2.value]);
  handleApply(elements.applyWipe, "wipe", () => [elements.wipe1.value, elements.wipe2.value]);

  // 새로고침 경고
  window.addEventListener("beforeunload", (e) => {
    const unsaved = document.querySelector(".btn-apply.unsaved");
    if (unsaved) {
      e.preventDefault();
      e.returnValue = "저장되지 않은 변경사항이 있습니다.";
    }
  });
});