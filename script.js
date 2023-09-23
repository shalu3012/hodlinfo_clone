document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector(".table-body");

  fetch("https://hodlinfo-api-w6li.onrender.com/getItems/getItems")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      tableBody.textContent = "";
      data.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td ><h4 class="table-text">${index + 1}</h4></td>
            <td ><a target="_blank" href=""><h4 class="table-text"><span class="exchange-name">${
              item.name
            }</span></h4></a></td>
            <td ><h4 class="table-text">${item.last}</h4></td>
            <td ><h4 class="table-text"><span>${item.buy}/${
          item.Sell
        }</span></h4></td>
            <td ><h4 class="table-text color-red">${item.volume}</h4></td>
            <td ><h4 class="table-text color-red">${item.base_unit}</h4></td>
          `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error:", error));
});

let circularProgress = document.querySelector(".circular-progress-bar"),
  progressValue = document.querySelector(".progress-value");

let counter = 60;

let progress = setInterval(() => {
  counter--;

  progressValue.textContent = `${counter}`;
  circularProgress.style.background = `conic-gradient(#3dc6c1 ${
    counter * 6
  }deg, #ededed 0deg)`;

  if (counter == 0) {
    counter = 60;
  }
}, 1000);

const toggleSwitch = document.querySelector(
  '.theme-slider input[type="checkbox"]'
);
const theme = document.querySelector(".theme");

/* Function to change theme */
function switchTheme(e) {
  /* Once checkbox is checked default theme change to dark */
  if (e.target.checked) {
    theme.classList.remove("theme-light");
    theme.classList.add("theme-dark");
  } else {
    /* While page in dark mode and checkbox is 
    checked then theme back to change light*/
    theme.classList.remove("theme-dark");
    theme.classList.add("theme-light");
  }
  console.log(theme);
}

toggleSwitch.addEventListener("change", switchTheme, false);
