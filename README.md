# Smart Employee Management System (SEMS) 👨‍💼

A simple, powerful, and intuitive web application designed to streamline employee operations by providing **C**reate, **R**ead, **U**pdate, and **D**elete (CRUD) functionality. This project is built using vanilla **HTML**, **CSS**, and **JavaScript**, with **Bootstrap 5** for a responsive and modern user interface.

## ✨ Features

* **Complete CRUD Functionality:** Easily add, view, update, and delete employee records.
* **Data Persistence:** Employee data is stored locally using **`localStorage`**, ensuring data remains even after closing the browser.
* **Dynamic Data Seeding:** Automatically fetches and seeds initial employee data from a public API (`jsonplaceholder.typicode.com`) on first run to populate the system.
* **Search Options:** Employees can be searched by their **ID** or **Name**.
* **Modern UI:** A clean, responsive interface thanks to **Bootstrap 5** integration.

---

# Live 
https://employee-management-system-umber-delta.vercel.app/

## 🚀 Technologies Used

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla JS)**
* **Bootstrap 5.3.3**
* **Local Storage** (for primary data storage)
* **JSONPlaceholder API** (for initial data seeding)

---

## 💻 Installation and Setup

This project is a pure frontend application and doesn't require any backend setup or server to run.

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/YourUsername/Employee-Management-System.git](https://github.com/YourUsername/Employee-Management-System.git)
    cd Employee-Management-System
    ```

2.  **Open in Browser:**
    Simply open the **`index.html`** file in your web browser.

    Alternatively, you can use a Live Server extension (like the one in VS Code) for easier development.

---

## 🛠️ Usage

The main navigation starts from the landing page (`index.html`) by clicking the **"Get Started"** button, which leads to the **Main Menu** (`menu.html`).

| Feature | Description | File(s) |
| :--- | :--- | :--- |
| **Add Employee** | Create and add new employee records. Allows bulk entry before final submission. | `addEmp.html` |
| **Update Employee** | Search by Employee ID, pre-fill the form, modify details, and save. | `updateEmp.html` |
| **Search by ID** | Quickly retrieve a single employee record by their unique ID. | `searchById.html` |
| **Search by Name** | Find employees by entering their full or partial name. | `searchByName.html` |
| **View All** | Display a complete table of all stored employee records. | `viewEmp.html` |
| **Delete Employee** | Search by ID/Name or view all, then delete individual records via a button in the table. | `delete.html` |

***Note:** All employee data is stored in your browser's **Local Storage** under the key **`employeesData`**. Clearing your browser data will wipe the employee records.*

---

## 📂 Project Structure

Employee-Management-System/
├── index.html           # Landing Page
├── menu.html            # Main Operation Selection Menu
├── addEmp.html          # Page to add new employees
├── updateEmp.html       # Page to update employee details
├── searchById.html      # Page to search employee by ID
├── searchByName.html    # Page to search employee by Name
├── viewEmp.html         # Page to view all employees
├── delete.html          # Page to delete employee records
├── style.css            # Custom CSS styles
└── index.js             # Core JavaScript logic for all pages

## 🤝 Contribution

Contributions are welcome! If you have any suggestions or find any bugs, feel free to:

1.  **Fork** the repository.
2.  Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

---

## 👤 Developed By

**Md Tufail**

* **GitHub:** [Your GitHub Profile Link] (e.g., `https://github.com/MdTufail`)
* **Contact:** support@ems.com (as seen in the footer)

*(If you like this project, consider giving it a star! ⭐)*
