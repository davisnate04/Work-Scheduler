$(function () {
  const hours = JSON.parse(localStorage.getItem("hours")) || [];
  const timeBlock = document.getElementsByClassName("time-block");
  const currentDay = document.getElementById("currentDay");
  const timeArray = ["past", "present", "future"];
  const day = dayjs();
  let create = false;
  let intervalStart;

  currentDay.innerHTML = day.format('dddd, MMMM D')
  
  // Creates the element only once
  function createElement() {
      if (!create) {
      const appointment = document.createElement('p');

      appointment.innerHTML = `Appointment Added to <span style="color: #AA336A; font-weight:bold;">localStorage</span> &#10003`;
      appointment.setAttribute("class", "text-center");
      appointment.setAttribute("style", "position: relative; top: 75px; font-weight:bold; border-top: 8px solid black");
      document.body.children[0].appendChild(appointment);

      create = true;
      }
  }
  
  // Saves the text next to the save button
  function save(event) {
    if (event.target.ariaLabel === "save") {
      const appt = document.getElementById("appt");
      const appointment = document.createElement('p');

      appointment.innerHTML = `Appointment Added to <span style="color: #AA336A; font-weight:bold;">localStorage</span> &#10003`;
      appointment.setAttribute("class", "text-center");
      appointment.setAttribute("style", "position: relative; top: 75px; font-weight:bold; border-top: 8px solid black");
      document.body.children[0].appendChild(appointment);

      const hour = {
        "hour": event.target.previousElementSibling.parentElement.id,
        "text": event.target.previousElementSibling.value
      }
      var hourChange = hours.find(function(e) { return e.hour == hour.hour});


      if (hours.length == 0) {
        hours.push(hour);
      }

      if (hourChange) {
        hourChange.text = hour.text;
      } else {
        hours.push(hour);
      }

      localStorage.setItem("hours", JSON.stringify(hours));
    }
  }
  // Loads the saved text on the page loading
  for (const child of timeBlock) {
    var loadText = hours.find(function(e) { return e.hour == child.id});

    if (loadText) {
      child.querySelector('.description').innerText = loadText.text;
    } else {
      console.log("Skipped");
    }
  }

  // Updates the color of the textarea based on the time every half second
  intervalStart = setInterval(function() {

    let currentHour = dayjs().get('hour');

    for (const child of timeBlock) {
      let idTime = child.id.match(/(\d+)/)[0];
      
      if (idTime < currentHour) {
        child.classList.remove(timeArray);

        child.classList.add("past");
      } else if (idTime > currentHour) {
        child.classList.remove(timeArray);

        child.classList.add("future")
      } else {
        child.classList.remove(timeArray);

        child.classList.add("present");
      }
    }    
  }, 500);

  document.addEventListener("click", save);
});
