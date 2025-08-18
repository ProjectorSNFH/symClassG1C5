// dataCenter.js

document.addEventListener("DOMContentLoaded", () => {
    const data = [
        {
            uploader: "이재원",
            uploadDate: "2025-08-19",
            fileName: "영어듣기 파일.zip",
            fileDisplay: "영어듣기 파일, 시험지, 답지 포함",
            type: "other"
        },
        {
            uploader: "조재형",
            uploadDate: "2025-08-19",
            fileName: "황재용 얼굴.png",
            fileDisplay: "와ㅏㅏㅅ따",
            type: "image"
        },
    ];

    const tbody = document.querySelector(".datacenter-table tbody");
    const filterInputs = document.querySelectorAll("input[name='file-filter']");
    const sortCriteria = document.getElementById("sort-criteria");
    const sortOrder = document.getElementById("sort-order");

    function renderTable() {
        let filtered = [...data];

        const selectedFilter = document.querySelector("input[name='file-filter']:checked").value;
        if (selectedFilter === "audio") {
            filtered = filtered.filter(item => item.type === "audio");
        } else if (selectedFilter === "image") {
            filtered = filtered.filter(item => item.type === "image");
        } else if (selectedFilter === "exclude") {
            filtered = filtered.filter(item => item.type !== "audio" && item.type !== "image");
        }

        const criteria = sortCriteria.value;
        const order = sortOrder.value;

        filtered.sort((a, b) => {
            let aVal, bVal;
            if (criteria === "created") {
                aVal = new Date(a.uploadDate);
                bVal = new Date(b.uploadDate);
                return order === "asc" ? aVal - bVal : bVal - aVal;
            } else if (criteria === "content") {
                aVal = a.fileName.toLowerCase();
                bVal = b.fileName.toLowerCase();
                return order === "asc"
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            } else if (criteria === "uploader") {
                aVal = a.uploader.toLowerCase();
                bVal = b.uploader.toLowerCase();
                return order === "asc"
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }
            return 0;
        });

        tbody.innerHTML = "";
        filtered.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${item.uploader}</td>
        <td>${item.uploadDate}</td>
        <td>
          <a href="#" class="file-link">
            ${item.fileName}<br>
            (${item.fileDisplay})
          </a>
        </td>
      `;
            tbody.appendChild(tr);
        });
    }

    filterInputs.forEach(input => input.addEventListener("change", renderTable));
    sortCriteria.addEventListener("change", renderTable);
    sortOrder.addEventListener("change", renderTable);

    sortCriteria.value = "created";
    sortOrder.value = "desc";

    renderTable();
});