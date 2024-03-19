// script.js
// Load items from local storage
document.addEventListener("DOMContentLoaded", () => {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  renderItems(items);
});

// Function to add an item
function addItem() {
  const titleInput = document.getElementById("titleInput").value.trim();
  const descriptionInput = document.getElementById("descriptionInput").value.trim();

  if (titleInput !== "" && descriptionInput !== "") {
    const item = {
      id: Date.now(),
      title: titleInput,
      description: descriptionInput
    };

    let items = JSON.parse(localStorage.getItem("items")) || [];
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));

    renderItems(items);
    document.getElementById("titleInput").value = "";
    document.getElementById("descriptionInput").value = "";
  } else {
    alert("Please enter both title and description!");
  }
}

// Function to remove an item
function removeItem(id) {
  let items = JSON.parse(localStorage.getItem("items")) || [];
  items = items.filter(item => item.id !== id);
  localStorage.setItem("items", JSON.stringify(items));
  renderItems(items);
}

// Function to render items
function renderItems(items) {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";

  items.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.title}</td>
      <td>${item.description}</td>
      <td>
        <button class="btn btn-info btn-sm mr-1" onclick="editItem(${item.id})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">Delete</button>
      </td>
    `;
    itemList.appendChild(tr);
  });
}

// Function to edit an item
function editItem(id) {
  let items = JSON.parse(localStorage.getItem("items")) || [];
  const item = items.find(item => item.id === id);

  if (!item) return;

  const title = prompt("Edit Title:", item.title);
  const description = prompt("Edit Description:", item.description);

  if (title !== null && description !== null) {
    item.title = title.trim();
    item.description = description.trim();
    localStorage.setItem("items", JSON.stringify(items));
    renderItems(items);
  }
}
