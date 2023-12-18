import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try {
    // 1. Invoke the Backend’s REST API using the configured backendEndpoint and the /reservations/ API endpoint.
    const result = await fetch(config.backendEndpoint + "/reservations");

    // 2. Get the json data from the Backend’s response.
    const data = await result.json();

    // 4. Return this json data.
    return data;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

  if (reservations.length > 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
    return;
  }

  // Render data in the table
  reservations.forEach((key) => {
    let ele = document.createElement("tr");
    
    const bookingTime = new Date(key.time);
    const formattedTime = `${bookingTime.toLocaleDateString("en-IN", {
      year: "numeric",
      day: "numeric",
      month: "long",
    })}, ${bookingTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }).toLowerCase()}`;

    ele.innerHTML = `
      <th scope="row">${key.id}</th>
      <td>${key.name}</td>
      <td>${key.adventureName}</td>
      <td>${key.person}</td>
      <td>${new Date(key.date).toLocaleDateString("en-IN")}</td>
      <td>${key.price}</td>
      <td>${formattedTime}</td>
      <td>
        <div class="reservation-visit-button" id=${key.id}>
          <a href="../detail/?adventure=${key.adventure}">Visit Adventure</a>
        </div>
      </td>
    `;

    document.getElementById("reservation-table").appendChild(ele);
  });
}

export { fetchReservations, addReservationToTable };
