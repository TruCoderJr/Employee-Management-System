// index pg js
let startBtn = document.querySelector("#startBtn");
let employeesData = [];
let count = localStorage.getItem("isDataFetch") || 0;

if (startBtn) {
  startBtn.addEventListener("click", () => {
    localStorage.setItem("isDataFetch", count);
    window.location.href = "menu.html";
  });
}

function loadEmpDataFromLocalStorage() {
  const storedEmpName = localStorage.getItem("employeesData");
  if (storedEmpName) {
    employeesData = JSON.parse(storedEmpName);
  }
}

// <!-- add page  -->

let submittedEmpData = document.querySelector(`#submitEmpData`);
let addEmpBtn = document.querySelector(`#addEmpBtn`);
let form = document.querySelector(`#employeeForm`);
let tblBody = document.querySelector("tbody");
const alertPlaceholder = document.getElementById("alertPlaceholder");

function showAlert(message, type) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
  alertPlaceholder.innerHTML = "";
  alertPlaceholder.append(wrapper);
}

function saveEmpDataToLocalStorage() {
  localStorage.setItem("employeesData", JSON.stringify(employeesData));
}

function getEmployees() {
  return JSON.parse(localStorage.getItem("employeesData")) || [];
}

async function removeTblBd() {
  let tbls = document.querySelector("table");
  if (!tbls.classList.contains("remove")) {
    tbls.classList.add("remove");
  }
  tblBody.innerHTML = "";
}

async function makeTable(id, name, gen, sal, des, deprt, ems, phs) {
  let tbls = document.querySelector("table");

  if (tbls.classList.contains("remove")) {
    tbls.classList.remove("remove");
  }

  let tblRow = document.createElement("tr");

  if (employeesData.length % 2 == 0) {
    tblRow.classList.add("table-primary");
  } else {
    tblRow.classList.add("table-secondary");
  }

  tblRow.innerHTML = `
    <td>${id}</td>
    <td>${name}</td>
    <td>${gen}</td>
    <td>${sal}</td>
    <td>${des}</td>
    <td>${deprt}</td>
    <td>${ems}</td>
    <td>${phs}</td>`;

  if (window.location.pathname.includes("delete.html")) {
    let delBtn = document.createElement("Button");
    delBtn.classList.add("btn");
    delBtn.classList.add("btn-danger");
    delBtn.id = id;
    delBtn.innerText = "Delete";
    let td7 = document.createElement("td");
    td7.appendChild(delBtn);
    tblRow.append(td7);
    tblRow.id = id;
  }
  tblBody.append(tblRow);
}

function getFromData(id, name, gen, sal, des, deprt, ems, phs) {
  if (
    id.value === "" ||
    name.value === "" ||
    gen.value === "" ||
    sal.value === "" ||
    des.value === "" ||
    deprt.value === "" ||
    ems.value === "" ||
    phs.value === ""
  ) {
    showAlert("⚠️ Please fill all required fields correctly!", "danger");
    return false;
  }

  let newEmployee = {
    id: id.value,
    name: name.value,
    salary: sal.value,
    gender: gen.value,
    designation: des.value,
    department: deprt.value,
    email: ems.value,
    phno: phs.value,
  };
  return newEmployee;
}

function clearForm(ids, name, gen, sal, des, deprt, ems, phs) {
  ids.value = "";
  name.value = "";
  gen.value = "";
  sal.value = "";
  des.value = "";
  deprt.value = "";
  ems.value = "";
  phs.value = "";
}

if (addEmpBtn || submittedEmpData) {
  let ids = document.querySelector("#empId");
  let name = document.querySelector("#empName");
  let gen = document.querySelector("#gender");
  let sal = document.querySelector("#salary");
  let des = document.querySelector("#designation");
  let deprt = document.querySelector("#department");
  let ems = document.querySelector("#email");
  let phs = document.querySelector("#phone");

  if (addEmpBtn) {
    addEmpBtn.addEventListener("click", async (event) => {
      let emp = getFromData(ids, name, gen, sal, des, deprt, ems, phs);

      if (emp == false) return;

      employeesData.push(emp);

      saveEmpDataToLocalStorage();

      makeTable(
        emp.id,
        emp.name,
        emp.gender,
        emp.salary,
        emp.designation,
        emp.department,
        emp.email,
        emp.phno
      );

      clearForm(ids, name, gen, sal, des, deprt, ems, phs);
    });
  }

  if (submittedEmpData) {
    submittedEmpData.addEventListener("click", async (event) => {
      let isFilled = false;

      let emp = getFromData(ids, name, gen, sal, des, deprt, ems, phs);

      if (emp == false) return;

      employeesData.push(emp);

      saveEmpDataToLocalStorage();

      makeTable(
        emp.id,
        emp.name,
        emp.gender,
        emp.salary,
        emp.designation,
        emp.department,
        emp.email,
        emp.phno
      );

      isFilled = true;
      clearForm(ids, name, gen, sal, des, deprt, ems, phs);
      setTimeout(() => {}, 5000);
      window.location.href = "menu.html";
    });
  }
}

// update
let searchBt = document.querySelector("#searchBt");
let searchIp = document.querySelector("#userIp");
let updForm = document.querySelector("form");
let searchBtn = document.querySelector("#searchBtn");
let updateBtn = document.querySelector("#updateEmpData");

employeesData = getEmployees();

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    let searchIp = document.querySelector(".userIp");
    let isFound = false;

    if (searchIp.value.trim() == "") {
      showAlert("⚠️ Please enter an ID!", "danger");
    } else {
      let idx = employeesData.findIndex(
        (item) => item.id == searchIp.value.trim()
      );

      if (idx !== -1) {
        let item = employeesData[idx];

        if (updForm.classList.contains("remove")) {
          updForm.classList.remove("remove");
        }

        let dnf = document.querySelector(".noRecordFound");
        if (!dnf.classList.contains("remove")) {
          dnf.classList.add("remove");
        }

        let table = document.querySelector("table");
        if (!table.classList.contains("remove")) {
          removeTblBd();
          table.classList.add("remove");
        }

        // Selecting input fields
        let id = document.querySelector("#empId");
        let name = document.querySelector("#empName");
        let gen = document.querySelector("#gender");
        let sal = document.querySelector("#salary");
        let des = document.querySelector("#designation");
        let deprt = document.querySelector("#department");
        let ems = document.querySelector("#email");
        let phs = document.querySelector("#phone");

        // Assign values
        id.value = item.id;
        name.value = item.name;
        gen.value = item.gender;
        sal.value = item.salary;
        des.value = item.designation;
        deprt.value = item.department;
        ems.value = item.email;
        phs.value = item.phno;

        employeesData.splice(idx, 1);

        isFound = true;
      }

      if (!isFound) {
        let dnf = document.querySelector(".noRecordFound");
        let tbls = document.querySelector("table");
        let tr = document.querySelector("tbody tr");

        if (!updForm.classList.contains("remove")) {
          updForm.classList.add("remove");
        }
        if (tr) {
          tr.remove();
        }
        if (!tbls.classList.contains("remove")) {
          tbls.classList.add("remove");
        }
        if (dnf.classList.contains("remove")) {
          dnf.classList.remove("remove");
        }
      }
    }
    searchIp.value = "";
  });
}

async function UpdateEmp() {
  let ids = document.querySelector("#empId");
  let name = document.querySelector("#empName");
  let gen = document.querySelector("#gender");
  let sal = document.querySelector("#salary");
  let des = document.querySelector("#designation");
  let deprt = document.querySelector("#department");
  let ems = document.querySelector("#email");
  let phs = document.querySelector("#phone");

  let emp = getFromData(ids, name, gen, sal, des, deprt, ems, phs);

  if (emp == false) return;

  employeesData.push(emp);

  saveEmpDataToLocalStorage();

  makeTable(
    emp.id,
    emp.name,
    emp.gender,
    emp.salary,
    emp.designation,
    emp.department,
    emp.email,
    emp.phno
  );

  clearForm(ids, name, gen, sal, des, deprt, ems, phs);
}

if (updateBtn) {
  updateBtn.addEventListener("click", UpdateEmp);
}

// search by id
employeesData = getEmployees();
let searchBtnForId = document.querySelector("#searchBtnForId");

function searchEmpById() {
  let isFound = false;
  if (searchIp.value.trim() == "") {
    showAlert("⚠️ Please enter an ID!", "danger");
  } else {
    let tblRowdata = document.querySelector("tbody tr");
    if (tblRowdata) {
      tblRowdata.remove();
    }
    employeesData.forEach((emp) => {
      if (searchIp.value.trim() == emp.id) {
        let dnf = document.querySelector(".noRecordFound");
        if (!dnf.classList.contains("remove")) {
          dnf.classList.add("remove");
        }
        if (tblBody) {
          tblBody.innerHTML = "";
        }
        makeTable(
          emp.id,
          emp.name,
          emp.gender,
          emp.salary,
          emp.designation,
          emp.department,
          emp.email,
          emp.phno
        );

        isFound = true;
      }
    });
    if (!isFound) {
      let dnf = document.querySelector(".noRecordFound");
      let tbls = document.querySelector("table");
      let tr = document.querySelector("tbody tr");

      if (tr) {
        tr.remove();
      }

      if (!tbls.classList.contains("remove")) {
        tbls.classList.add("remove");
      }

      if (dnf.classList.contains("remove")) {
        dnf.classList.remove("remove");
      }
    }
  }

  searchIp.value = "";
}

if (searchBtnForId) {
  searchBtnForId.addEventListener("click", searchEmpById);
}

// search by name
employeesData = getEmployees();

let searchBtnForName = document.querySelector("#searchBtnForName");

function searchEmpByName() {
  let isFound = false;
  if (searchIp.value.trim() == "") {
    showAlert("⚠️ Please enter Name!", "danger");
  } else {
    let tblRowdata = document.querySelector("tbody tr");
    if (tblRowdata) {
      tblRowdata.remove();
    }
    employeesData.forEach((emp) => {
      if (
        searchIp.value.trim().toLowerCase() == emp.name.toLowerCase() ||
        searchIp.value.trim().toLowerCase() ==
          emp.name.toLowerCase().split(" ")[0] ||
        searchIp.value.trim().toLowerCase() ==
          emp.name.toLowerCase().split(" ")[1]
      ) {
        let dnf = document.querySelector(".noRecordFound");
        if (!dnf.classList.contains("remove")) {
          dnf.classList.add("remove");
        }
        if (tblBody) {
          tblBody.innerHTML = "";
        }
        makeTable(
          emp.id,
          emp.name,
          emp.gender,
          emp.salary,
          emp.designation,
          emp.department,
          emp.email,
          emp.phno
        );
        isFound = true;
      }
    });
    if (!isFound) {
      let dnf = document.querySelector(".noRecordFound");
      let tbls = document.querySelector("table");
      let tr = document.querySelector("tbody tr");
      if (tr) {
        tr.remove();
      }
      if (!tbls.classList.contains("remove")) {
        tbls.classList.add("remove");
      }

      if (dnf.classList.contains("remove")) {
        dnf.classList.remove("remove");
      }
    }
  }
  searchIp.value = "";
}

if (searchBtnForName) {
  searchBtnForName.addEventListener("click", searchEmpByName);
}

// View page
let backBtn = document.querySelector("#backBtn");
let apiData = null;

const designation_depart = {
  "Software Engineer": "IT / Information Technology",
  "Project Manager": "Operations",
  "Sales Manager": "Sales",
  "Customer Support Representative": "Customer Support",
  "HR Manager (Human Resources Manager)": "Human Resources (HR)",
  "Marketing Manager": "Marketing",
  Accountant: "Finance",
  "Product Manager": "Product Development",
};

function showData(apiData) {
  let size = employeesData.length;

  for (let i = 0; i < apiData.length; i++) {
    let data = apiData[i];
    if (!data) {
      continue;
    }

    let random = Math.floor(Math.random() * 8);
    let [desg, dept] = Object.entries(designation_depart)[random];

    let sal = Math.floor(Math.random() * 100000);
    let genArray = ["Male", "Female", "Other"];
    employeesData.push({
      id: data.id,
      name: data.name,
      salary: sal,
      gender: genArray[Math.floor(Math.random() * 3)],
      designation: desg,
      department: dept,
      email: data.email,
      phno: data.phone,
    });

    saveEmpDataToLocalStorage();

    if (size < 5) {
      i++;
    }
  }
}

async function viewEmp() {
  employeesData = getEmployees();
  if (employeesData.length != 0) {
    let isFetch = localStorage.getItem("isDataFetch");
    if (isFetch == "0" || isFetch == null) {
      try {
        let ans = await fetch("https://jsonplaceholder.typicode.com/users")
          .then((value1) => {
            return value1.json();
          })
          .then((value2) => {
            apiData = value2;
            showData(apiData);
          });
      } catch (error) {
        console.log("Error: ", error);
      }
      localStorage.setItem("isDataFetch", 1);
    }

    let tbls = document.querySelector("table");

    if (tbls.classList.contains("remove")) {
      tbls.classList.remove("remove");
    }
    tblBody.innerHTML = "";
    employeesData.forEach((emp) => {
      makeTable(
        emp.id,
        emp.name,
        emp.gender,
        emp.salary,
        emp.designation,
        emp.department,
        emp.email,
        emp.phno
      );
    });
  } else {
    let dnf = document.querySelector(".noRecordFound");
    if (dnf.classList.contains("remove")) {
      dnf.classList.remove("remove");
    }
  }
}

if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "menu.html";
  });
}

if (window.location.pathname.includes("viewEmp.html")) {
  viewEmp();
}

//delete

let searchBtnByNameForDelete = document.querySelector(
  "#searchBtnByNameForDelete"
);
let searchBtnByIdForDelete = document.querySelector("#searchBtnByIdForDelete");
let viewAllData = document.querySelector("#viewAllData");
let table = document.querySelector("table");
let tbl = document.querySelector("table");
let thead = document.querySelector("thead");

if (table) {
  table.style.display = "";
}

employeesData = getEmployees();

if (searchBtnByIdForDelete) {
  searchBtnByIdForDelete.addEventListener("click", searchEmpById);
}

if (searchBtnByNameForDelete) {
  searchBtnByNameForDelete.addEventListener("click", searchEmpByName);
}

if (viewAllData) {
  viewAllData.addEventListener("click", viewEmp);
}

if (tbl) {
  tbl.addEventListener("click", (event) => {
    if (event.srcElement.innerText == "Delete") {
      let delIdx;
      let delRow = document.getElementById(event.target.id);
      let totRow = document.querySelectorAll("tbody tr");
      let userId = parseInt(event.target.id);
      employeesData.forEach((ele, index) => {
        if (ele.id == userId) {
          delIdx = index;
        }
      });

      if (delIdx != -1) {
        employeesData.splice(delIdx, 1);
        saveEmpDataToLocalStorage();
        delRow.remove();
        totRow = document.querySelectorAll("tbody tr");
        if (totRow.length == 0) {
          table.classList.add("remove");
        }
      }
    }
  });
}
