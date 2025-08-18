//manage_other.js

document.addEventListener("DOMContentLoaded", () => {
  const data = [
    {
      fileDisplay: "2학기 안내문",
      fileName: "Q3Q4info.zip",
      uploader: "이재원",
      uploadDate: "2025-08-19"
    }
  ];

  const tbody = document.querySelector(".data-table tbody");
  const deleteSelectedBtn = document.querySelector(".delete-selected");
  const toggleSelectBtn = document.querySelector("button:nth-child(2)");
  const addBtn = document.querySelector("button:nth-child(1)");

  let selectMode = false;
  let unsavedEdits = new Set();
  let isNewRow = false;
  let newUnsavedRowIndex = null;

  function removeEmptyNewRows() {
    if (
      newUnsavedRowIndex !== null &&
      data[newUnsavedRowIndex] &&
      (data[newUnsavedRowIndex].fileDisplay.trim() === "" || data[newUnsavedRowIndex].fileName.trim() === "")
    ) {
      data.splice(newUnsavedRowIndex, 1);
      newUnsavedRowIndex = null;
      renderTable();
    }
  }

  function renderTable() {
    tbody.innerHTML = "";
    data.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="checkbox" data-index="${index}" disabled></td>
        <td>${item.fileDisplay}</td>
        <td>${item.fileName}</td>
        <td>${item.uploader}</td>
        <td>${item.uploadDate}</td>
        <td>
          <button class="delete" data-index="${index}">삭제</button>
          <button class="edit" data-index="${index}">수정</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    if (data.length > 0 && data[0].fileDisplay === "" && data[0].fileName === "") {
      newUnsavedRowIndex = 0;
    } else {
      newUnsavedRowIndex = null;
    }
    attachEvents();
  }

  function exitAllEditModes() {
    unsavedEdits.clear();
    isNewRow = false;
    renderTable();
  }

  function exitSelectMode() {
    selectMode = false;
    deleteSelectedBtn.hidden = true;
    toggleSelectBtn.textContent = "선택 모드";
    tbody.querySelectorAll("input[type='checkbox']").forEach(cb => {
      cb.checked = false;
      cb.disabled = true;
    });
  }

  function enterEditMode(index, isNew = false) {
    exitAllEditModes();
    exitSelectMode();

    const row = tbody.children[index];
    const item = data[index];

    row.children[1].innerHTML = `<input type="text" value="${item.fileDisplay}">`;
    row.children[2].innerHTML = `<span>${item.fileName}</span> <input type="file" style="display:none" /> <button class="upload-btn">업로드</button>`;

    const deleteBtn = row.querySelector(".delete");
    deleteBtn.textContent = "취소";
    deleteBtn.addEventListener("click", () => {
      if (isNew) {
        data.splice(index, 1);
      }
      renderTable();
    });

    const editBtn = row.querySelector(".edit");
    editBtn.textContent = "적용";

    const uploadBtn = row.querySelector(".upload-btn");
    const fileInput = row.querySelector("input[type='file']");

    uploadBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (file) {
        row.children[2].querySelector("span").textContent = file.name;
      }
    });

    editBtn.addEventListener("click", () => {
      const newDisplay = row.querySelector("input[type='text']").value.trim();
      const newFile = row.querySelector("span").textContent.trim();

      if (newDisplay === "" || newFile === "") {
        alert("파일명과 파일은 모두 입력되어야 합니다.");
        return;
      }

      item.fileDisplay = newDisplay;
      item.fileName = newFile;
      item.uploadDate = item.uploadDate || new Date().toISOString().split("T")[0];

      unsavedEdits.delete(index);
      isNewRow = false;
      newUnsavedRowIndex = null;
      renderTable();
    });

    if (!isNew) unsavedEdits.add(index);
  }

  function attachEvents() {
    tbody.querySelectorAll(".delete").forEach(btn => {
      const index = btn.dataset.index;
      btn.addEventListener("click", () => {
        if (btn.textContent === "취소") {
          renderTable();
          return;
        }
        if (confirm("이 항목을 삭제할까요?")) {
          data.splice(index, 1);
          renderTable();
        }
      });
    });

    tbody.querySelectorAll(".edit").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = btn.dataset.index;
        enterEditMode(index);
      });
    });
  }

  toggleSelectBtn.addEventListener("click", () => {
    removeEmptyNewRows();
    if (selectMode) {
      exitSelectMode();
    } else {
      exitAllEditModes();
      selectMode = true;
      deleteSelectedBtn.hidden = false;
      toggleSelectBtn.textContent = "모드 취소";
      tbody.querySelectorAll("input[type='checkbox']").forEach(cb => cb.disabled = false);
    }
  });

  deleteSelectedBtn.addEventListener("click", () => {
    removeEmptyNewRows();
    const checked = [...tbody.querySelectorAll("input[type='checkbox']")].filter(cb => cb.checked);
    if (checked.length === 0) return;
    if (confirm("선택한 항목들을 삭제할까요?")) {
      const toDelete = checked.map(cb => parseInt(cb.dataset.index)).sort((a, b) => b - a);
      toDelete.forEach(i => data.splice(i, 1));
      renderTable();
      exitSelectMode();
    }
  });

  addBtn.addEventListener("click", () => {
    removeEmptyNewRows();
    exitAllEditModes();
    exitSelectMode();
    const newItem = {
      fileDisplay: "",
      fileName: "",
      uploader: "3번 이재원",
      uploadDate: ""
    };
    data.unshift(newItem);
    newUnsavedRowIndex = 0;
    renderTable();
    enterEditMode(0, true);
  });

  window.addEventListener("beforeunload", e => {
    if (unsavedEdits.size > 0 && !isNewRow) {
      e.preventDefault();
      e.returnValue = "수정된 내용이 저장되지 않았습니다.";
    }
  });

  renderTable();
});