
// Initialize and add the map
let map;

async function initMap() {

  const position = { lat: 40.6012728, lng: -75.3598203 };
  //center ^^
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const response = await fetch("/search_prescription/Ibuprofen?sort=price");
  const prescriptions = await response.json();
  console.log(prescriptions);
  // The map, centered at Uluru
  //What does Zoom mean here?
  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
  for (const prescription of prescriptions) {
    const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: buildContent(prescription),
      position: prescription.position,
      title: prescription.description,
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

function buildContent(prescription) {
  const content = document.createElement("div");

  content.classList.add("prescription");
  content.innerHTML = `
    <div class="icon">
        <i aria-hidden="true" class="fa fa-icon fa-solid fa-pills" title="Rx"></i>
        <span class="fa-sr-only">Rx</span>
    </div>
    <div class="details">
        <div class="provider">${prescription.store_name} / month</div>
        <div class="address">${prescription.address}</div>
        <div class="features">
        <div>
            <i aria-hidden="true" class="fa fa-dollar-sign fa-lg" title="Price"></i>
            <span class="fa-sr-only">Price</span>
            <span>$${prescription.price}</span>
        </div>
        <div>
            <i aria-hidden="true" class="fa fa-car-on fa-lg" title="Distance"></i>
            <span class="fa-sr-only">Distance</span>
            <span>${prescription.distance}</span>
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