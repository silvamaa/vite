import "./style.css";
import { fetchData } from "./fetch.js";

//
// LOGOUT
const logoutButton = document.querySelector(".logout a");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

//
// GET ALL USERS
const allButton = document.querySelector(".get_users");
allButton.addEventListener("click", getUsers);

async function getUsers() {
  console.log("Getting all users");
  const url = "http://127.0.0.1:3001/api/users";
  let token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer: " + token,
    },
  };

  fetchData(url, options).then((data) => {
    createTable(data);
  });
}

function createTable(data) {
  console.log(data);

  // Get the tbody element
  const tbody = document.querySelector(".tbody");
  tbody.innerHTML = "";

  // Iterate through each user data and create table rows
  data.forEach((user) => {
    // Create a table row
    const tr = document.createElement("tr");

    // Create a table cell for user name
    const tdName = document.createElement("td");
    tdName.textContent = user.username;

    // Create a table cell for "Info" button
    const tdInfo = document.createElement("td");
    const btnInfo = document.createElement("button");
    btnInfo.textContent = "Info";
    btnInfo.className = "check";
    btnInfo.setAttribute("data-id", user.user_id);

    // Add event listener to the "Info" button
    btnInfo.addEventListener("click", () => openUserInfo(user.user_id));
    tdInfo.appendChild(btnInfo);

    // Create a table cell for "Delete" button
    const tdDelete = document.createElement("td");
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";
    btnDelete.className = "del";
    btnDelete.setAttribute("data-id", user.user_id);

    // Add event listener to the "Delete" button
    btnDelete.addEventListener("click", deleteUser);
    tdDelete.appendChild(btnDelete);

    // Append all cells to the row
    tr.appendChild(tdName);
    tr.appendChild(tdInfo);
    tr.appendChild(tdDelete);

    // Append the row to the tbody
    tbody.appendChild(tr);
  });
}

//
// GET USER INFO BY ID
async function getUser(id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User token not found. Please log in.");
    }

    const url = `http://localhost:3001/api/users/${id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch user information.");
    }

    const userData = await response.json();
    console.log("User Information:", userData);

    displayUserInfo(userData);

    return userData;
  } catch (error) {
    console.error("Error:", error);
    alert(
      "Failed to fetch user information. Error details can be found in the console."
    );
    return null;
  }
}

function displayUserInfo(userData) {
  const userInfoContainer = document.getElementById("userInfo");
  const idElement = document.getElementById("id");
  const usernameElement = document.getElementById("username");
  const emailElement = document.getElementById("email");
  const levelElement = document.getElementById("level");
  // const dateElement = document.getElementById("date");

  idElement.innerHTML = `${userData.user_id}`;
  usernameElement.innerHTML = `${userData.username}`;
  emailElement.innerHTML = `${userData.email}`;
  levelElement.innerHTML = `${userData.user_level}`;
  // dateElement.innerHTML = `<strong>Date Created:</strong> ${userData.created_at}`;

  userInfoContainer.style.display = "block";
}

function openUserInfo(userId) {
  getUser(userId);
}

//
// DELETE USER
function deleteUser(evt) {
  console.log("Deleting information.");

  // Get the ID of the user to be deleted
  const id = evt.target.closest("tr").querySelector("td:last-child").innerText;
  console.log("User ID: ", id);

  const url = `http://127.0.0.1:3001/api/users/${id}`;
  const token = localStorage.getItem("token");
  const options = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const answer = confirm(`Are you sure you want to delete user ID: ${id} `);
  if (answer) {
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          console.log("User deleted successfully");
          getUsers();
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch((error) => {
        console.error("Error deleting user: ", error);
      });
  }
}
