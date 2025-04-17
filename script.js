// DOM Elements
const loginSection = document.getElementById("login-section");
const appContent = document.getElementById("app-content");
const loginError = document.getElementById("login-error");

// ===== AUTHENTICATION ===== //
function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .catch((error) => {
      loginError.textContent = error.message;
    });
}

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .catch((error) => {
      loginError.textContent = error.message;
    });
}

function logout() {
  auth.signOut();
}

// Auth state listener
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is logged in
    loginSection.style.display = "none";
    appContent.style.display = "block";
    document.getElementById("user-email").textContent = user.email;
    loadEquipment();
  } else {
    // User is logged out
    loginSection.style.display = "block";
    appContent.style.display = "none";
  }
});

// ===== EQUIPMENT FUNCTIONS ===== //
function loadEquipment() {
  db.collection("equipment").onSnapshot((snapshot) => {
    const equipList = document.getElementById("equipList");
    const equipTable = document.getElementById("equipData");
    
    equipList.innerHTML = '<option value="">Select Equipment</option>';
    equipTable.innerHTML = "";

    snapshot.forEach((doc) => {
      const equip = doc.data();
      
      // Add to dropdown
      const option = document.createElement("option");
      option.value = doc.id;
      option.text = `${equip.id} - ${equip.name}`;
      equipList.add(option);

      // Add to table
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${equip.id}</td>
        <td>${equip.name}</td>
        <td class="status-${equip.status.replace(" ", "-")}">${equip.status}</td>
        <td>${equip.location || "-"}</td>
        <td>${equip.dept || "-"}</td>
      `;
      equipTable.appendChild(row);
    });
  });
}

async function addEquipment() {
  const name = document.getElementById("equipName").value;
  const id = document.getElementById("equipId").value;
  const dept = document.getElementById("equipDept").value;

  if (!name || !id) return alert("Name and ID are required!");

  await db.collection("equipment").add({
    id, name, dept,
    status: "Available",
    location: ""
  });
  // Connection test
firebase.auth().onAuthStateChanged(user => {
  console.log("Firebase connection:", user ? "OK" : "Not logged in");
});

// Firestore test
firebase.firestore().collection("test").doc("test").set({test: true})
  .then(() => console.log("Firestore working"))
  .catch(e => console.error("Firestore error:", e));

  // Clear form
  document.getElementById("equipName").value = "";
  document.getElementById("equipId").value = "";
  document.getElementById("equipDept").value = "";
}

async function updateStatus() {
  const equipId = document.getElementById("equipList").value;
  const status = document.getElementById("status").value;
  const location = document.getElementById("location").value;

  if (!equipId) return alert("Please select equipment");

  await db.collection("equipment").doc(equipId).update({
    status,
    location: location || "-"
  });
 // Global variable to store all equipment
let allEquipment = [];

function loadEquipment() {
  db.collection("equipment").onSnapshot((snapshot) => {
    allEquipment = [];
    const equipTable = document.getElementById("equipData");
    equipTable.innerHTML = "";

    snapshot.forEach((doc) => {
      const equip = doc.data();
      equip.docId = doc.id; // Store Firestore document ID
      allEquipment.push(equip);

      // Add to table
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${equip.type || '-'}</td>
        <td>${equip.id}</td>
        <td>${equip.name}</td>
        <td class="status-${equip.status.replace(" ", "-")}">${equip.status}</td>
        <td>${equip.location || "-"}</td>
        <td>${equip.dept || "-"}</td>
      `;
      equipTable.appendChild(row);
    });

    // Populate dropdown initially
    filterEquipmentDropdown();
  });
}

function filterEquipmentDropdown() {
  const equipList = document.getElementById("equipList");
  const typeFilter = document.getElementById("equipTypeFilter").value;
  
  // Clear existing options except the first one
  equipList.innerHTML = '<option value="">Select Equipment</option>';
  
  // Filter equipment based on type
  const filteredEquipment = typeFilter === "all" 
    ? allEquipment 
    : allEquipment.filter(equip => equip.type === typeFilter);
  
  // Add filtered equipment to dropdown
  filteredEquipment.forEach(equip => {
    const option = document.createElement("option");
    option.value = equip.docId;
    option.textContent = `${equip.type} ${equip.id} - ${equip.name} (${equip.status})`;
    equipList.appendChild(option);
  });
}
// Add type field when adding new equipment
async function addEquipment() {
  const type = document.getElementById("equipType").value; // Add this dropdown to HTML
  // ... rest of your existing add code ...
  await db.collection("equipment").add({
    // ... other fields ...
    type: type // Add equipment type
  });
}

}


