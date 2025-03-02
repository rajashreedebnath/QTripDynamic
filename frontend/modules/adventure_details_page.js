import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL


  //Create the adventure details page - Milestone1
  // 1. Create a new URLSearchParams object using the search string.
  const urlSearchParams = new URLSearchParams(search);

  // 2. Use the get method to extract the adventure ID.
  const adventureId = urlSearchParams.get("adventure");

  // 3. Return the adventure ID.
  return adventureId;


  // Place holder for functionality to work in the Stubs
  return null;
}



//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  //Create the adventure details page - Milestone1
  try {
    // 1. Build the URL for the backend API using the configured endpoint and adventure ID.
    // 2. Make the fetch call to the backend API.
    const response = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    
    // 3. Parse the JSON data from the response.
    const adventureDetails = await response.json();

    // 4. Return the adventure details.
    return adventureDetails;

  } catch (error) {
    return null; // Or handle the error in an appropriate way for your application.
  }


  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {

  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM


  document.getElementById("adventure-name").innerHTML = adventure.name;

  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;

  adventure.images.map((image) => {
    let ele = document.createElement("div");
    ele.className = "col-lg-12";
    ele.innerHTML = `
    <img
      src="${image}"
      class="activity-card-image pb-3 pb-md-0"
      alt="Adventure Image"
      srcset=""
    />`;
    document.getElementById("photo-gallery").appendChild(ele);
  });

  document.getElementById("adventure-content").innerHTML = adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images


  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>

    <div class="carousel-inner" id="carousel-inner">

    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`


  images.forEach((image, idx) => {
    let ele = document.createElement("div");
    ele.className = `carousel-item ${idx === 0 ? "active" : ""}`;
    ele.innerHTML = `
    <img
      src="${image}"
      class="activity-card-image pb-3 pb-md-0"
      alt="Adventure Image"
      srcset=""
    />`;
    document.getElementById("carousel-inner").appendChild(ele);
  });


  

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  if (adventure["available"]) {
    // If the adventure is available:
    
    // a. Show the reservation-panel-available panel.
    document.getElementById("reservation-panel-available").style.display = "block"
    // b. Hide the reservation-panel-sold-out panel.
    document.getElementById("reservation-panel-sold-out").style.display = "none";  
    // c. Update the appropriate element to show the cost per head using the costPerHead field of the input adventure.
    document.getElementById("reservation-person-cost").innerHTML = adventure["costPerHead"];
  } else {
    // If the adventure is not available (already booked):
    // a. Show the reservation-panel-sold-out panel.
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    // b. Hide the reservation-panel-available panel.
    document.getElementById("reservation-panel-available").style.display = "none";
    
    
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  persons = parseInt(persons);
  if (isNaN(persons) || persons < 0) {
    persons = 0;
  }

  document.getElementById("reservation-cost").innerHTML = persons * adventure.costPerHead;


}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  const form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let url = config.backendEndpoint + "/reservations/new";
    let formElements = form.elements;

    let bodyString = JSON.stringify({
      name: formElements["name"].value,
      date: formElements["date"].value,
      person: formElements["person"].value,
      adventure: adventure.id,
    });

    try {
      let res = await fetch(url, {
        method: "POST",
        body: bodyString,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        alert("Success!");
        window.location.reload();
      } else {
        let data = await res.json();
        alert(`Failed - ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed - fetch call resulted in error");
    }

  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
