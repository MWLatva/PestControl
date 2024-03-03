
// Initialize and add the map
let map;
// Helpful Guide for custom AdvancedMarkers: https://developers.google.com/maps/documentation/javascript/examples/advanced-markers-html
async function initMap() {

  const position = { lat: 40.6012728, lng: -75.3598203 };
  //center ^^
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  // This route will be replaced by the client's request of specific prescription and radius
  const response = await fetch("/search_prescription/Ibuprofen?sort=price&radius=25");
  const prescriptions = await response.json();
  console.log(prescriptions);
  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
  var rank = 0;
  const totalPrescriptions = prescriptions.length;
  for (const prescription of prescriptions) {
    // Append rank to prescription then increment rank
    prescription.rank = rank + 1;
    rank = rank + 1;
    console.log(prescription);
    const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: buildContent(prescription, totalPrescriptions),
      position: {lat: prescription.lat, lng: prescription.lng},
      title: prescription.name,
    });

    AdvancedMarkerElement.addListener("click", () => {
      toggleHighlight(AdvancedMarkerElement, prescription);
    });
  }
}

function toggleHighlight(markerView, prescription) {
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
  } else {
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
  }
}

function getColorForRank(rank, total) {
  const third = total / 3;
  const twoThirds = 2 * third;

  if (rank <= third) {
    // Top third: Green
    return 'rgb(76, 175, 80)';
  } else if (rank <= twoThirds) {
    // Middle third: Orange
    return 'rgb(255, 152, 0)';
  } else {
    // Bottom third: Red
    return 'rgb(244, 67, 54)';
  }
}


function buildContent(prescription, totalPrescriptions) {
  const color = getColorForRank(prescription.rank, totalPrescriptions);
  const content = document.createElement("div");

  content.classList.add("prescription");
  content.style.setProperty("--rx-color", color);
  content.innerHTML = `
    <div class="icon">
        <i aria-hidden="true" class="fa fa-icon fa-solid fa-pills" title="Rx"></i>
        <span class="fa-sr-only">Rx</span>
    </div>
    <div class="details">
        <div class="provider">${prescription.rank}. ${prescription.store_name}</div>
        <div class="address">${prescription.address}</div>
        <div class="features">
        <div>
            <i aria-hidden="true" class="fa fa-dollar-sign fa-lg" title="Price"></i>
            <span class="fa-sr-only">Price</span>
            <span>$${prescription.price.toFixed(2)} / mo</span>
        </div>
        <div>
            <i aria-hidden="true" class="fa fa-car-on fa-lg" title="Distance"></i>
            <span class="fa-sr-only">Distance</span>
            <span>${prescription.distance.toFixed(1)} mi</span>
        </div>
        <div>
            <i aria-hidden="true" class="fa fa-prescription fa-lg" title="Rx"></i>
            <span class="fa-sr-only">Rx</span>
            <span>${prescription.name}</span>
        </div>
        </div>
    </div>
    `;
  return content;
}

initMap();