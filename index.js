// index pg js
let startBtn = document.querySelector("#startBtn");

let employeesData = [];
// let cpName = null;
let count = localStorage.getItem("isDataFetch") || 0;

// Event listener for Start button
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

// menu page

// <!-- add page  -->

let submittedEmpData = document.querySelector(`#submitEmpData`);
let addedEmpData = document.querySelector(`#addEmpData`);
let form = document.querySelector(`#employeeForm`);
let tblBody = document.querySelector("tbody");

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

async function makeTable(id, name, des, deprt, ems, phs) {
  let tbls = document.querySelector("table");
  // console.dir(tbls);

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
    <td>${des}</td>
    <td>${deprt}</td>
    <td>${ems}</td>
    <td>${phs}</td>`;

  if (window.location.pathname.includes("delete.html")) {
    let delBtn = document.createElement("Button");
    // delBtn.classList.add("btn");
    delBtn.classList.add("btn");
    delBtn.classList.add("btn-danger");
    delBtn.id = id;
    delBtn.innerText = "Delete";
    let td7 = document.createElement("td");
    td7.appendChild(delBtn);
    tblRow.append(td7);
    tblRow.id = id;
  }

  console.dir(tblRow);

  tblBody.append(tblRow);
}

async function addEmp() {
  if (addedEmpData != null) {
    addedEmpData.addEventListener("click", async (event) => {
      // event.stopPropagation();

      let ids = document.querySelector("#empId");
      let name = document.querySelector("#empName");
      let des = document.querySelector("#designation");
      let deprt = document.querySelector("#department");
      let ems = document.querySelector("#email");
      let phs = document.querySelector("#phone");

      if (
        ids.value === "" &&
        name.value === "" &&
        des.value === "" &&
        deprt.value === "" &&
        ems.value === "" &&
        phs.value === ""
      ) {
        return;
      } else if (
        ids.value === "" ||
        name.value === "" ||
        des.value === "" ||
        deprt.value === "" ||
        ems.value === "" ||
        phs.value === ""
      ) {
        console.log("inside isFilled: if");
        alert("Please fill all details!!");
        return; // Exit early to prevent further execution
      }

      console.log("inside addedEmpData 'if'");

      let existingData = getEmployees();
      // JSON.parse(localStorage.getItem("employeesData")) || [];

      // 🔹 Add new employee data
      let newEmployee = {
        id: ids.value,
        name: name.value,
        designation: des.value,
        department: deprt.value,
        email: ems.value,
        phno: phs.value,
      };

      existingData.push(newEmployee); // Append to the existing list

      // 🔹 Save updated list back to localStorage
      localStorage.setItem("employeesData", JSON.stringify(existingData));

      await makeTable(
        ids.value,
        name.value,
        des.value,
        deprt.value,
        ems.value,
        phs.value
      );
      console.log("Clear inputs only when successfully added");
      ids.value = "";
      name.value = "";
      des.value = "";
      deprt.value = "";
      ems.value = "";
      phs.value = "";
    });
  }

  if (submittedEmpData) {
    submittedEmpData.addEventListener("click", async (event) => {
      // event.stopPropagation();

      let ids = document.querySelector("#empId");
      let name = document.querySelector("#empName");
      let des = document.querySelector("#designation");
      let deprt = document.querySelector("#department");
      let ems = document.querySelector("#email");
      let phs = document.querySelector("#phone");

      let isFilled = false;

      if (
        ids.value === "" &&
        name.value === "" &&
        des.value === "" &&
        deprt.value === "" &&
        ems.value === "" &&
        phs.value === ""
      ) {
        isFilled = true; // Mark as filled to bypass the error alert
        // removeTblBd();
        window.location.href = "menu.html";
      } else if (
        ids.value !== "" &&
        name.value !== "" &&
        des.value !== "" &&
        deprt.value !== "" &&
        ems.value !== "" &&
        phs.value !== ""
      ) {
        let existingData = getEmployees();
        // JSON.parse(localStorage.getItem("employeesData")) || [];

        // 🔹 Add new employee data
        let newEmployee = {
          id: ids.value,
          name: name.value,
          designation: des.value,
          department: deprt.value,
          email: ems.value,
          phno: phs.value,
        };

        existingData.push(newEmployee); // Append to the existing list

        // 🔹 Save updated list back to localStorage
        localStorage.setItem("employeesData", JSON.stringify(existingData));

        await makeTable(
          ids.value,
          name.value,
          des.value,
          deprt.value,
          ems.value,
          phs.value
        );

        isFilled = true;

        window.location.href = "menu.html";
      }

      if (!isFilled) {
        // Only trigger alert when the condition is genuinely unmet
        console.log("inside isFilled: if");
        alert("Please fill all details!!");
      }
      setTimeout(() => {
        alert("Update Succesfull");
      }, 5000);
    });
  }

  // if(updateEmpData){
  //   updateEmpData.addEventListener("click", addEmp);
  // }
}

if (window.location.pathname.includes("addEmp.html")) {
  console.log("add emp");

  addEmp();
}

// Update
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

    if (searchIp.value.trim() != "") {
      // removeTblBd();
    }

    if (searchIp.value.trim() == "") {
      alert("Please enter an ID");
    } else {
      // Find the correct index of the item using findIndex()
      let idx = employeesData.findIndex((item) => item.id == searchIp.value.trim());

      if (idx !== -1) {
        console.log(idx);

        let item = employeesData[idx];
        console.log(item);

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
        let des = document.querySelector("#designation");
        let deprt = document.querySelector("#department");
        let ems = document.querySelector("#email");
        let phs = document.querySelector("#phone");

        // Assign values
        id.value = item.id;
        name.value = item.name;
        des.value = item.designation;
        deprt.value = item.department;
        ems.value = item.email;
        phs.value = item.phno;
        // makeTable(emp.id, emp.name, emp.designation, emp.department, emp.email, emp.phno);

        console.log("Before deletion:", employeesData);
        employeesData.splice(idx, 1); // Delete the found item
        console.log("After deletion:", employeesData);

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
        console.log("Item not found.");
      }
    }
    searchIp.value = ""; // Clear input field
  });
}

async function UpdateEmp() {
  let ids = document.querySelector("#empId");
  let name = document.querySelector("#empName");
  let des = document.querySelector("#designation");
  let deprt = document.querySelector("#department");
  let ems = document.querySelector("#email");
  let phs = document.querySelector("#phone");

  // let name = document.querySelector('.d2 input');
  // let des = document.querySelector('.d3 input');
  // let dep = document.querySelector('.d4 input');

  // console.log(ids.value);
  //   console.log(name.value);
  //   console.log(des.value);
  //   console.log(deprt.value);
  //   console.log(ems.value);
  //   console.log(phs.value);
  //   console.log(ids.value);

  // Check if all fields are filled
  if (
    ids.value === "" &&
    name.value === "" &&
    des.value === "" &&
    deprt.value === "" &&
    ems.value === "" &&
    phs.value === ""
  ) {
    return;
  } else if (
    ids.value === "" ||
    name.value === "" ||
    des.value === "" ||
    deprt.value === "" ||
    ems.value === "" ||
    phs.value === ""
  ) {
    console.log("inside isFilled: if");
    alert("Please fill all details!!");
    return; // Exit early to prevent further execution
  }

  console.log("inside itemAdded 'if'");
  // employeesData.push({ id: ids.value, name: name.value, designation: des.value + " " + deprt.value, email: ems.value, phno: phs.value });
  employeesData.push({
    id: parseInt(ids.value),
    name: name.value,
    designation: des.value,
    department: deprt.value,
    email: ems.value,
    phno: phs.value,
  });
  saveEmpDataToLocalStorage(); // Save to localStorage

  await makeTable(
    ids.value,
    name.value,
    des.value,
    deprt.value,
    ems.value,
    phs.value
  );
  // postAPI(option(ids.value, name.value, des.value, deprt.value, ems.value, phs.value));
  // Clear inputs only when successfully added
  console.log("Clear inputs only when successfully added");
  ids.value = "";
  name.value = "";
  des.value = "";
  deprt.value = "";
  ems.value = "";
  phs.value = "";
  updForm.classList.add("remove");
}

if (updateBtn) {
  updateBtn.addEventListener("click", UpdateEmp);
}

// search by id
employeesData = getEmployees();
console.log(employeesData);
let searchBtnForId = document.querySelector("#searchBtnForId");

function searchEmpById() {
  let isFound = false;
  if (searchIp.value.trim() == "") {
    alert("Please enter ID");
  } else {
    let tblRowdata = document.querySelector("tbody tr");
    if (tblRowdata) {
      tblRowdata.remove();
    }
    employeesData.forEach((emp) => {
      //   console.log(searchIp.value, emp.id, searchIp.value == emp.id);

      if (searchIp.value.trim() == emp.id) {
        let dnf = document.querySelector(".noRecordFound");
        if (!dnf.classList.contains("remove")) {
          dnf.classList.add("remove");
        }
        if (tblBody) {
          console.log("removeTblBd");
          tblBody.innerHTML = "";

          // removeTblBd();
        }
        makeTable(
          emp.id,
          emp.name,
          emp.designation,
          emp.department,
          emp.email,
          emp.phno
        );
        isFound = true;
        // return;
      }
    });
    if (!isFound) {
      let dnf = document.querySelector(".noRecordFound");
      let tbls = document.querySelector("table");
      let tr = document.querySelector("tbody tr");
      // console.log("before removeTblBd");

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
console.log(employeesData);

let searchBtnForName = document.querySelector("#searchBtnForName");

function searchEmpByName() {
  let isFound = false;
  if (searchIp.value.trim() == "") {
    alert("Please enter name");
  } else {
    let tblRowdata = document.querySelector("tbody tr");
    if (tblRowdata) {
      tblRowdata.remove();
    }
    employeesData.forEach((emp) => {
      if (
        searchIp.value.trim().toLowerCase() == emp.name.toLowerCase() ||
        searchIp.value.trim().toLowerCase() == emp.name.toLowerCase().split(" ")[0] ||
        searchIp.value.trim().toLowerCase() == emp.name.toLowerCase().split(" ")[1]
      ) {
        let dnf = document.querySelector(".noRecordFound");
        if (!dnf.classList.contains("remove")) {
          dnf.classList.add("remove");
        }
        if (tblBody) {
          console.log("removeTblBd");

          // removeTblBd();
          tblBody.innerHTML = "";
        }
        makeTable(
          emp.id,
          emp.name,
          emp.designation,
          emp.department,
          emp.email,
          emp.phno
        );
        isFound = true;
        // return;
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
  console.log(apiData);
  let size = employeesData.length;

  for (let i = 0; i < apiData.length; i++) {
    let data = apiData[i];
    if (!data) {
      continue;
    }

    // Randomly select a designation and department
    let random = Math.floor(Math.random() * 8);
    let [desg, dept] = Object.entries(designation_depart)[random];

    console.log(desg, dept);
    console.log(data.id, "name:", data.name);

    // Push the employee data into the array
    employeesData.push({
      id: data.id,
      name: data.name,
      designation: desg,
      department: dept,
      email: data.email,
      phno: data.phone,
    });

    // Save the employee data to localStorage
    saveEmpDataToLocalStorage();

    if (size < 5) {
      i++;
    }
  }
}

async function viewEmp() {
  console.log("Fetching inventory items...");
  // loadEmpDataFromLocalStorage();
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
    // console.dir(tbls);

    if (tbls.classList.contains("remove")) {
      tbls.classList.remove("remove");
    }
    tblBody.innerHTML = "";
    employeesData.forEach((emp) => {
      makeTable(
        emp.id,
        emp.name,
        emp.designation,
        emp.department,
        emp.email,
        emp.phno
      );
    });
    // [{"id":"12","name":"Md Tufail","designation":"Sales Manager","department":"Sales","email":"forla787@gmail.com","phno":"7667013081"}]
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
  console.log("view emp");
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
let thead = document.querySelector('thead');

if (table) {
  table.style.display = "";
}

employeesData = getEmployees();
console.log(employeesData);

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
    console.log(event);

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
        // console.dir(table);
        totRow = document.querySelectorAll("tbody tr");
        if (totRow.length == 0) {
          // table.style.display = "none";
          table.classList.add("remove");
          // thead.classList.add()

        } 
        // else {
        //   // table.style.display = "";
        //   table.classList.add();
        // }
      }
    }
  });
}
