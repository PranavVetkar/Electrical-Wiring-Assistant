function generateRoomInputs() {
  const numRooms = document.getElementById("numRooms").value;
  const container = document.getElementById("roomsContainer");
  container.innerHTML = ""; // reset

  for (let i = 1; i <= numRooms; i++) {
    container.innerHTML += `
      <div class="room-box" id="room${i}">
        <h3>Room ${i}</h3>
        <button onclick="addAppliance(${i})">+ Add Appliance</button><br>
        <label>Appliance Name:</label>
        <input type="text" id="appliance${i}_1" placeholder="e.g. Fan" />
        <label>Wattage (W):</label>
        <input type="number" id="watt${i}_1" placeholder="e.g. 80" />
        <label>Quantity:</label>
        <input type="number" id="qty${i}_1" placeholder="e.g. 2" />
        <div id="appliancesRoom${i}"></div>
      </div>
    `;
  }
}

function addAppliance(roomNum) {
  const container = document.getElementById(`appliancesRoom${roomNum}`);
  const count = container.children.length + 2;
  container.innerHTML += `
    <div>
      <label>Appliance Name:</label>
      <input type="text" id="appliance${roomNum}_${count}" placeholder="e.g. Light" />
      <label>Wattage (W):</label>
      <input type="number" id="watt${roomNum}_${count}" placeholder="e.g. 60" />
      <label>Quantity:</label>
      <input type="number" id="qty${roomNum}_${count}" placeholder="e.g. 4" />
    </div>
  `;
}

function calculateLoad() {
  const numRooms = document.getElementById("numRooms").value;
  let totalLoad = 0;
  let outputHTML = "<div class='output-box'><h2>Results</h2>";

  for (let i = 1; i <= numRooms; i++) {
    let roomLoad = 0;
    const roomDiv = document.getElementById(`room${i}`);
    const inputs = roomDiv.querySelectorAll("input[id^='watt'], input[id^='qty']");

    for (let j = 0; j < inputs.length; j += 2) {
      const watt = parseFloat(inputs[j].value) || 0;
      const qty = parseInt(inputs[j + 1].value) || 0;
      roomLoad += watt * qty;
    }

    totalLoad += roomLoad;
    outputHTML += `<p><strong>Room ${i} Load:</strong> ${roomLoad.toFixed(2)} W</p>`;
  }

  const totalCurrent = totalLoad / 230;
  let wireSize = "";

  if (totalCurrent <= 10) wireSize = "2.5 sq.mm.";
  else if (totalCurrent <= 15) wireSize = "4 sq.mm.";
  else wireSize = "6 sq.mm. or higher (consult electrician)";

  outputHTML += `
    <hr>
    <p><strong>Total Load:</strong> ${totalLoad.toFixed(2)} W</p>
    <p><strong>Total Current:</strong> ${totalCurrent.toFixed(2)} A</p>
    <p><strong>Suggested Wire Size:</strong> ${wireSize}</p>
  </div>`;

  document.getElementById("output").innerHTML = outputHTML;
}
