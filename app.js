function removeCat(catIndex) {
  cats.splice(catIndex, 1); // Remove the cat from the array
  renderCatList(); // Re-render the cat list
}

function toggleCatVisibility(catIndex) {
  cats[catIndex].hidden = !cats[catIndex].hidden; // Toggle the hidden property
  renderCatList(); // Re-render the cat list
}

function openAddCatForm() {
  const addCatButton = document.querySelector('.add-cat-btn button');
  addCatButton.disabled = true; // Disable the "Add a cat" button
  const catForm = document.createElement('form');
  catForm.className = 'add-cat-form';
  catForm.innerHTML = `
    <label for="name" class="dsp-block">Name:</label>
    <input type="text" id="name" name="name" required><br>

    <label for="dob" class="dsp-block">Date of Birth:</label>
    <input type="date" id="dob" name="dob" required><br>

    <label for="sex" class="dsp-block">Sex:</label>
    <select id="sex" name="sex" required>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select><br>
    <label for="breed" class="dsp-block">Breed:</label>
    <select id="breed" name="breed" class="form-select" required>
      <option value="American Short Hair">American Short Hair</option>
      <option value="British Shorthair">British Shorthair</option>
      <option value="Other">Other / Don't Know</option>
      <option value="Burmese">Burmese</option>
      <option value="Cornish Rex">Cornish Rex</option>
      <option value="Devon Rex">Devon Rex</option>
      <option value="Himalayan">Himalayan</option>
      <option value="Maine Coon">Maine Coon</option>
      <option value="Manx">Manx</option>
      <option value="Persian">Persian</option>
      <option value="Russian Blue">Russian Blue</option>
      <option value="Scottish Fold">Scottish Fold</option>
      <option value="Siamese">Siamese</option>
      <option value="Sphynx">Sphynx</option>
      <option value="Tuxedo">Tuxedo</option>
      <option value="Turkish Angora">Turkish Angora</option>
      <option value="Turkish Van">Turkish Van</option>
    </select><br>

    <fieldset>
      <label for="fixed">Fixed:</label><input type="checkbox" id="fixed" name="fixed"><br>
      <label for="shots">Shots:</label><input type="checkbox" id="shots" name="shots"><br>
    </fieldset>

    <label for="weight" class="dsp-block">Weight:</label>
    <input type="number" id="weight" name="weight" step="0.1" required><br>

    <label for="special_notes" class="dsp-block">Special Notes:</label>
    <textarea id="special_notes" name="special_notes"></textarea><br>

    <button type="submit">Save New Cat</button>
    <button type="button" onclick="cancelAddCat()">Cancel</button>
  `;

  catForm.addEventListener('submit', addCat);

  const catList = document.getElementById('catList');
  catList.appendChild(catForm);
}
function cancelAddCat() {
  const addCatButton = document.querySelector('.add-cat-btn button');
  addCatButton.disabled = false; // Enable the "Add a cat" button

  const catForm = document.querySelector('.add-cat-form');
  catForm.remove();
}

function addCat(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const dobInput = document.getElementById('dob');
  const sexInput = document.getElementById('sex');
  const fixedInput = document.getElementById('fixed');
  const shotsInput = document.getElementById('shots');
  const weightInput = document.getElementById('weight');
  const specialNotesInput = document.getElementById('special_notes');

  const newCat = {
    name: nameInput.value,
    dob: dobInput.value,
    sex: sexInput.value,
    fixed: fixedInput.checked,
    shots: shotsInput.checked,
    weight: parseFloat(weightInput.value),
    special_notes: specialNotesInput.value,
  };

  // Make an HTTP POST request to the server endpoint
  fetch('/cats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCat),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Cat data saved:', data);
      // Refresh the cat list after saving the data
      getCats();
    })
    .catch((error) => console.error('Error:', error));

  // Clear the form
  event.target.reset();
}

// Define the existing cats array (replace with your initial JSON data)
let cats = [];

function renderCatList() {
  const catList = document.getElementById('catList');
  catList.innerHTML = '';

  cats.forEach((cat) => {
    const listItem = document.createElement('li');
    const age = new Date().getFullYear() - new Date(cat.dob).getFullYear();
    listItem.className = 'cat-entry';

    listItem.innerHTML = `
      <strong>Name:</strong> ${cat.name}<br>
      <strong>Date of Birth:</strong> ${cat.dob}<br>
      <strong>Age:</strong> ${age} years<br>
      <strong>Sex:</strong> ${cat.sex}<br>
      <strong>Fixed:</strong> ${cat.fixed ? 'Yes' : 'No'}<br>
      <strong>Shots:</strong> ${cat.shots ? 'Up to date' : 'Not up to date'}<br>
      <strong>Weight:</strong> ${cat.weight} kg<br>
      <strong>Special Notes:</strong> ${cat.special_notes}
    `;

    catList.appendChild(listItem);
  });
}

// Fetch cats from JSON file
fetch('cats.json')
  .then((response) => response.json())
  .then((data) => {
    cats = data;
    renderCatList();
  })
  .catch((error) => console.error('Error:', error));
