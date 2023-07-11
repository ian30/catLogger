window.addEventListener("DOMContentLoaded", (event) => {
  // Fetch the cat data from the JSON file
  fetch("cats.json")
    .then((response) => response.json())
    .then((data) => {
      // Get the catList div element
      const catList = document.getElementById("catList");

      // Create an unordered list element
      const ul = document.createElement("ul");
      ul.classList.add("list-group");

      // Iterate over each cat object in the data
      data.forEach((cat) => {
        // Create a list item for each cat
        const li = document.createElement("li");
        li.classList.add("list-group-item");

        // Create the cat name element (h5)
        const catName = document.createElement("h5");
        catName.classList.add("test-class");
        catName.innerHTML = cat.cat_name;

        // Set the inner HTML of the list item with the cat name and details

        ul.appendChild(catName);
        li.innerHTML = `
          <!--<h5>${cat.cat_name}</h5>-->
          <div class="cat-details">
            <p>Breed: ${cat.cat_breed}</p>
            <p>Gender: ${cat.cat_gender}</p>
            <p>Spay Status: ${
              cat.cat_spay_status ? "Spayed/Neutered" : "Not Spayed/Neutered"
            }</p>
            <p>Vaccination Status: ${cat.cat_vaccination_status}</p>
            <p>Age: ${cat.cat_age} years</p>
            <p>Notes: ${cat.cat_notes}</p>
          </div>
        `;

        // Append the cat name element and list item to the unordered list
        ul.appendChild(li);

        // Add click event to the cat name
        catName.addEventListener("click", () => {
          const catDetails = li.querySelector(".cat-details");
          catDetails.classList.toggle("hidden");
        });
      });

      // Append the unordered list to the catList div
      catList.appendChild(ul);
    })
    .catch((error) => console.error(error));
});
