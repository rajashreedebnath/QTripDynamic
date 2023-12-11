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
    const url = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;

    // 2. Make the fetch call to the backend API.
    const response = await fetch(url);

    // 3. Check if the response is successful (status code 200).
    if (response.ok) {
      // 4. Parse the JSON data from the response.
      const adventureDetails = await response.json();

      // 5. Return the adventure details.
      return adventureDetails;
    } else {
      // 6. If the response is not successful, throw an error.
      throw new Error(`${response.status}`);
    }
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


  // Get the HTML elements where details need to be inserted by using their element ids
  const adventureNameElement = document.getElementById("adventure-name");
  const adventureSubtitleElement = document.getElementById("adventure-subtitle");
  const photoGalleryElement = document.getElementById("photo-gallery");
  const adventureContentElement = document.getElementById("adventure-content");

  // Use these fields from the adventure details to populate the DOM
  const { name, subtitle, images, content } = adventure;

  // Insert the adventure name and subtitle into the DOM
  adventureNameElement.textContent = name;
  adventureSubtitleElement.textContent = subtitle;

  // Loop through the images, create a div element for each, and insert it into the photo-gallery
  images.forEach((image) => {
    const imageDiv = document.createElement("div");
    imageDiv.className = "col-12 mb-3"; // Adjust the classes as needed
    imageDiv.innerHTML = `<img src="${image}" class="activity-card-image img-fluid" alt="Adventure Image" />`;
    photoGalleryElement.appendChild(imageDiv);
  });

  // Insert the adventure content into the DOM
  adventureContentElement.innerHTML = `${content}`;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images


  // Get the HTML element where the gallery needs to be inserted by using its element id
  const photoGalleryElement = document.getElementById("photo-gallery");

  // Clear any existing content in the photo-gallery element
  photoGalleryElement.innerHTML = '';

  // Create the carousel container and inner elements
  const carouselContainer = document.createElement("div");
  carouselContainer.id = "carouselExampleIndicators";
  carouselContainer.className = "carousel slide";
  carouselContainer.setAttribute("data-bs-ride", "carousel");

  // Create the carousel indicators
  const carouselIndicators = document.createElement("div");
  carouselIndicators.className = "carousel-indicators";

  // Create the carousel inner element
  const carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";

  // Loop through the images, create a div element for each, and insert it into the carousel-inner
  images.forEach((image, index) => {
    const carouselIndicator = document.createElement("button");
    carouselIndicator.type = "button";
    carouselIndicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
    carouselIndicator.setAttribute("data-bs-slide-to", index.toString());
    carouselIndicator.className = index === 0 ? "active" : "";
    carouselIndicator.setAttribute("aria-label", `Slide ${index + 1}`);

    const carouselItem = document.createElement("div");
    carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;

    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.className = "d-block w-100";
    imgElement.alt = `Slide ${index + 1}`;

    // Append the indicator and item to their respective parent elements
    carouselIndicators.appendChild(carouselIndicator);
    carouselItem.appendChild(imgElement);
    carouselInner.appendChild(carouselItem);
  });

  // Create the carousel controls (arrows)
  const prevButton = document.createElement("button");
  prevButton.className = "carousel-control-prev";
  prevButton.type = "button";
  prevButton.setAttribute("data-bs-target", "#carouselExampleIndicators");
  prevButton.setAttribute("data-bs-slide", "prev");

  const prevIcon = document.createElement("span");
  prevIcon.className = "carousel-control-prev-icon";
  prevIcon.setAttribute("aria-hidden", "true");

  const prevText = document.createElement("span");
  prevText.className = "visually-hidden";
  prevText.textContent = "Previous";

  prevButton.appendChild(prevIcon);
  prevButton.appendChild(prevText);

  const nextButton = document.createElement("button");
  nextButton.className = "carousel-control-next";
  nextButton.type = "button";
  nextButton.setAttribute("data-bs-target", "#carouselExampleIndicators");
  nextButton.setAttribute("data-bs-slide", "next");

  const nextIcon = document.createElement("span");
  nextIcon.className = "carousel-control-next-icon";
  nextIcon.setAttribute("aria-hidden", "true");

  const nextText = document.createElement("span");
  nextText.className = "visually-hidden";
  nextText.textContent = "Next";

  nextButton.appendChild(nextIcon);
  nextButton.appendChild(nextText);

  // Append the carousel components to the carousel container
  carouselContainer.appendChild(carouselIndicators);
  carouselContainer.appendChild(carouselInner);
  carouselContainer.appendChild(prevButton);
  carouselContainer.appendChild(nextButton);

  // Append the carousel container to the photo gallery element
  photoGalleryElement.appendChild(carouselContainer);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

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
