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
// POST ENTRIES
document
  .getElementById("moodForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const mood = formData.get("mood");
    const sleep_hours = formData.get("sleep_hours");
    const notes = formData.get("notes");

    // DEBUG: Check if form data is captured correctly
    console.log("Form Data:", mood, sleep_hours, notes);

    // Get user information from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User information not found. Please log in again.");
      return;
    }

    // Construct request body
    const data = {
      mood: mood,
      sleep_hours: sleep_hours,
      notes: notes,
    };

    // DEBUG: Check if request body is constructed correctly
    console.log("Request Body:", data);

    // Send data to backend
    const url = "http://localhost:3001/api/entries";
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      const responseDataText = await response.text(); // Log the response text
      console.log("Response text:", responseDataText); // Log the response text

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Entry added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add data. Error details can be found in the console.");
    }
  });

//
// GET USER ENTRIES
const getEntriesButton = document.querySelector(".get_entries");
getEntriesButton.addEventListener("click", getDiaryEntries);

async function getDiaryEntries() {
  try {
    // Get user token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User token not found. Please log in.");
    }

    // Fetch user's diary entries
    const response = await fetch("http://localhost:3001/api/entries", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch diary entries.");
    }

    const data = await response.json();
    if (data.length === 0) {
      // Show alert if there are no entries
      alert("There are no diary entries for the user. Please add entry.");
      return; // Exit function early
    }

    // Display diary entries in the table
    const diaryEntriesTable = document.querySelector(".diary-entries");
    diaryEntriesTable.innerHTML = ""; // Clear existing entries

    data.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${entry.mood}</td>
          <td>${entry.sleep_hours}</td>
          <td>${entry.notes}</td>
          <td>
            <button class="update" data-id="${entry.entry_id}">Update</button>
          </td>
          <td>
            <button class="del" data-id="${entry.entry_id}">Delete</button>
          </td>
        `;

      // Add event listener for Update button
      const updateButton = row.querySelector(".update");
      updateButton.addEventListener("click", () => {
        // Open modal or form for modification
        openUpdateEntryPopup(entry);
      });

      // Add event listener for Delete button
      const deleteButton = row.querySelector(".del");
      deleteButton.addEventListener("click", deleteEntry);

      diaryEntriesTable.appendChild(row);
    });
  } catch (error) {
    console.error("Error:", error.message);
    alert("Failed to fetch diary entries. Please try again.");
  }
}

//
// UPDATE ENTRY
// Function to handle updating an entry
async function updateEntry(entryId, updatedData) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User token not found. Please log in.");
    }

    const response = await fetch(
      `http://localhost:3001/api/entries/${entryId}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update entry.");
    }

    alert("Entry updated successfully!");
    // Refresh the entries table after updating
    getDiaryEntries();
  } catch (error) {
    console.error("Error:", error.message);
    alert("Failed to update entry. Please try again.");
  }
}

// Function to open update entry popup/modal with pre-filled data
function openUpdateEntryPopup(entry) {
  const updateModal = document.getElementById("updateModal");
  const moodInput = document.getElementById("moodInput");
  const sleepHoursInput = document.getElementById("sleepHoursInput");
  const notesInput = document.getElementById("notesInput");
  const updateForm = document.getElementById("updateForm");

  // Prefill input fields with existing entry data
  moodInput.value = entry.mood;
  sleepHoursInput.value = entry.sleep_hours;
  notesInput.value = entry.notes;

  // Define function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const updatedData = {
      mood: moodInput.value,
      sleep_hours: sleepHoursInput.value,
      notes: notesInput.value,
    };
    updateEntry(entry.entry_id, updatedData);
    updateModal.style.display = "none"; // Close the modal after submission
    // Remove event listener after submission
    updateForm.removeEventListener("submit", handleSubmit);
  }

  // Event listener for form submission
  updateForm.addEventListener("submit", handleSubmit);

  // Event listener for close button
  const closeButton = document.querySelector("#updateModal .close");
  closeButton.addEventListener("click", () => {
    updateModal.style.display = "none"; // Close the modal on close button click
    // Remove event listener if modal is closed without submission
    updateForm.removeEventListener("submit", handleSubmit);
  });

  // Display the modal
  updateModal.style.display = "block";
}

// Event listener for Update button in each row of the diary entries table
document.querySelectorAll(".update").forEach((updateButton) => {
  updateButton.addEventListener("click", async (event) => {
    const entryId = event.target.dataset.id;
    // Fetch the entry details based on entryId
    const entry = await fetchEntryDetails(entryId);
    if (entry) {
      openUpdateEntryPopup(entry);
    }
  });
});

//
// DELETE ENTRY
async function deleteEntry(event) {
  const id = event.target.dataset.id;
  const answer = confirm(`Are you sure you want to delete entry ID: ${id} ?`);
  if (answer) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User token not found. Please log in.");
      }

      const response = await fetch(`http://localhost:3001/api/entries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete entry.");
      }

      alert("Entry deleted successfully!");
      // Refresh the entries table after deletion
      getDiaryEntries();
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to delete entry. Please try again.");
    }
  }
}
