const data = [
  { id: 1, mall: "V R mall", address: "Surat", rating: "A" },
  { id: 2, mall: "Rahul Raj Mall", address: "Vadodara", rating: "B" },
  {
    id: 3,
    mall: "Raj Imperial",
    address: "Mumbai",
    category: "one",
    rating: "B",
  },
  { id: 4, mall: "jane", address: "Rajasthan", category: "two", rating: "C" },
];

function convertJsonToTable(data) {
  // Check if data is valid and in the expected format (array of objects)
  if (
    !Array.isArray(data) ||
    data.length === 0 ||
    typeof data[0] !== "object"
  ) {
    throw new Error("Invalid JSON data");
  }

  // Get all unique keys
  const uniqueKeys = [...new Set(data.flatMap(Object.keys))];

  // Collect unique values for each key
  const uniqueValues = {};
  uniqueKeys.forEach((key) => {
    uniqueValues[key] = [
      ...new Set(data.map((entry) => entry[key] || "undefined")),
    ];
  });

  // Start the HTML table
  let html = '<table id="tblSales">\n';

  // Create table headers with select dropdowns
  html += "  <tr>\n";
  uniqueKeys.forEach((key) => {
    console.log(key.charCodeAt);
    html += `    <th class="tblColText" col-index = ${key.charCodeAt + 1}>\n`;
    //   html += `      <label for="${key}">${key}</label>\n`;
    //   html += `      <select id="${key}" name="${key}" class="table-filter" onchange="filter_rows()>\n`;
    //   html += `        <option value="all">-</option>\n`; // Default blank option
    //   uniqueValues[key].forEach(value => {
    //       html += `        <option value="${value}">${value}</option>\n`;
    //   });
    //   html += '      </select>\n';
    html += "    </th>\n";
  });
  html += "  </tr>\n";

  // Create table rows
  data.forEach((entry) => {
    html += "  <tr>\n";
    uniqueKeys.forEach((key) => {
      html += `    <td>${
        entry[key] !== undefined ? entry[key] : "undefined"
      }</td>\n`;
    });
    html += "  </tr>\n";
  });

  // End the HTML table
  html += "</table>";

  return html;
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = convertJsonToTable(data);
  } catch (error) {
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
});

// --------------------TABLE Drop down filter

document.addEventListener("DOMContentLoaded", function (event) {
  let colHeaders = document.querySelectorAll(".tblColText");

  colHeaders.forEach((colHeader, index) => {
    console.log("index is: " + index + ", " + colHeader.textContent);
    colHeader.appendChild(generateDropdown(index));
  });
});

function generateDropdown(index) {
  let columnData = [];
  let rows = document.querySelectorAll("tr");
  rows.forEach((row, i) => {
    if (i == 0) {
      columnData.push("");
      return;
    }
    let cells = row.getElementsByTagName("td");
    columnData.push(cells[index].innerText);
  });
  // REMOVE DUPLICATES
  let uniqColumnData = [...new Set(columnData)];
  // GENERATE THE SELECT OPTION
  let select = document.createElement("select");

  uniqColumnData.map((data, i) => {
    let option = document.createElement("option");
    option.setAttribute("value", data);

    let optionText = document.createTextNode(data);
    option.appendChild(optionText);

    select.appendChild(option);
  });

  select.setAttribute("id", index);
  select.addEventListener("change", function () {
    filterTable(this.value);
    clearSelect(select.id);
  });

  return select;
}

function clearSelect(id) {
  let selects = document.querySelectorAll("select");
  selects.forEach((select, i) => {
    if (id != i) {
      select.value = "";
    }
  });
}

function filterTable(filter) {
  console.log(filter);
  const table = document.querySelector("#tblSales");
  const rows = table.getElementsByTagName("tr");

  // LOOP THROUGH ALL ROWS EXCEPT FOR HEADERS
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    let found = false;

    // LOOP THROUGH ALL CELLS WITHIN THE ROW
    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].textContent || cells[j].innerText;
      if (cellText == filter || cellText.includes(filter)) {
        found = true;
        break;
      }
    }
    rows[i].style.display = found ? "" : "none";
  }
}
