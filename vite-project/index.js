import "./style.css";
import { fetchData } from "./fetch.js";

//
// USER CREATION / LOGIN
document.getElementById("signupButton").addEventListener("click", () => {
  document.getElementById("signupForm").style.display = "block";
  document.getElementById("loginForm").style.display = "none";
});

document.getElementById("loginButton").addEventListener("click", () => {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("signupForm").style.display = "none";
});

//
// CREATE USER
const createUser = document.querySelector(".createuser");

createUser.addEventListener("click", async (evt) => {
  evt.preventDefault();
  console.log("Creating user");

  const url = "http://127.0.0.1:3001/api/users";

  const form = document.querySelector(".create_user_form");
  const username = form.querySelector("input[name=username]").value;
  const password = form.querySelector("input[name=password]").value;

  const data = {
    username: username,
    password: password,
    email: form.querySelector("input[name=email]").value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (response.ok) {
      // Store the token in localStorage
      localStorage.setItem("token", responseData.token);
      alert("User created successfully!");

      // Automatically log in the newly created user
      const loginData = {
        username: username,
        password: password, // Use the same password
      };

      const loginOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      };

      const loginResponse = await fetch(
        "http://127.0.0.1:3001/api/auth/login",
        loginOptions
      );
      const loginResponseData = await loginResponse.json();

      if (loginResponse.ok) {
        localStorage.setItem("token", loginResponseData.token);
        window.location.href = "tracking.html"; // Redirect to logged-in page
      } else {
        throw new Error(`HTTP error! status: ${loginResponse.status}`);
      }
    } else {
      // Handle other status codes (e.g., server error)
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating user:", error);
    alert(
      "Failed to create user. Check your user information and please try again."
    );
  }
});

//
// LOG IN USER
const loginUser = document.querySelector(".loginuser");

loginUser.addEventListener("click", async (evt) => {
  evt.preventDefault();
  console.log("Logging in user");

  const url = "http://localhost:3001/api/auth/login";

  const form = document.querySelector(".login_form");

  const data = {
    username: form.querySelector("input[name=username]").value,
    password: form.querySelector("input[name=password]").value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (response.ok) {
      // Store the token in localStorage
      localStorage.setItem("token", responseData.token);
      // alert("Login successful!");
      window.location.href = "tracking.html"; // Redirect to logged-in page
    } else {
      // Handle login failure
      console.error("Login failed:", responseData.error);
      alert("Unauthorized: username or password incorrect!");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Error logging in. Please try again later.");
  }
});

// Define logResponse function
function logResponse(codeblock, text) {
  document.getElementById(codeblock).innerText = text;
}
