const calendarBody = document.getElementById("calendarBody");
const timeLabels = document.getElementById("timeLabels");
const modal = document.getElementById("eventModal");

let eventsByDate = {};
let selectedDate = new Date(); 
function getDateKey(date) {
  return date.toISOString().split("T")[0]; 
}

function createGrid() {
  for (let i = 0; i < 24; i++) {
    const label = document.createElement("div");
    label.className = "time-label";
    label.textContent = `${i}:00`;
    timeLabels.appendChild(label);

    const slot = document.createElement("div");
    slot.className = "time-slot";
    slot.dataset.hour = i;
    calendarBody.appendChild(slot);
  }
}

document.getElementById("addEvent").onclick = () => {
  modal.style.display = "block";
};

document.getElementById("cancelBtn").onclick = () => {
  modal.style.display = "none";
};

document.getElementById("saveBtn").onclick = () => {
  const title = document.getElementById("eventTitle").value;
  const start = document.getElementById("eventStart").value;
  const end = document.getElementById("eventEnd").value;
  const color = document.getElementById("eventColor").value;

  if (!title || !start || !end) return;

  const key = getDateKey(selectedDate);

  if (!eventsByDate[key]) {
    eventsByDate[key] = [];
  }

  eventsByDate[key].push({ title, start, end, color });

  renderEvents();
  modal.style.display = "none";
};

function renderEvents() {
  document.querySelectorAll(".event").forEach(e => e.remove());

  const key = getDateKey(selectedDate);
  const events = eventsByDate[key] || [];

  events.forEach(ev => {
    const startHour = parseInt(ev.start.split(":")[0]);
    const endHour = parseInt(ev.end.split(":")[0]);

    const eventDiv = document.createElement("div");
    eventDiv.className = `event event-${ev.color}`;
    eventDiv.style.top = `${startHour * 60}px`;
    eventDiv.style.height = `${(endHour - startHour) * 60}px`;
    eventDiv.textContent = ev.title;

    calendarBody.appendChild(eventDiv);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clearBtn");

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      const key = getDateKey(selectedDate);

      console.log("Clearing events for:", key);

      eventsByDate[key] = [];

      renderEvents();
    });
  } else {
    console.log("clearBtn not found in HTML");
  }

  createGrid();
});