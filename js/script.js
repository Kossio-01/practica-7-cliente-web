const URL_SERVER = "https://glorious-bassoon-r476g4xwwr7xfxp4w-3000.app.github.dev/sensores";
function getSensor() {
  fetch(URL_SERVER, {
    method: "GET",
    mode: "cors"
  }).then((response) => {
    if (response.status !== 200) {
      console.log(
        "Parece que hubo un problema con la consulta. Status Code: " +
          response.status
      );
      return;
    }
    response.json().then(function (data) {
      let ul = document.getElementById("sensor-list");
      ul.innerHTML = "";
      data.forEach((sensor) => {
        let li = document.createElement("li");
        li.className = "mdl-list__item";
        let span = document.createElement("span");
        span.className = "mdl-list__item-primary-content";
        let i = document.createElement("i");
        i.className = "material-icons mdl-list__item-icon";
        i.appendChild(document.createTextNode("memory"));
        span.appendChild(i);
        span.appendChild(document.createTextNode(sensor.nombre));
        li.appendChild(span);
        ul.appendChild(li);
      });
    });
  });
}

function createSensor(sensorName) {
  let sensor = {
    nombre: sensorName
  };
  fetch(URL_SERVER, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(sensor)
  }).then((response) => {
    if (response.status !== 201) {
      console.log(
        "Parece que hubo un problema con la consulta. Status Code: " +
          response.status
      );
      return;
    }
    response.json().then(function (data) {
      let snackbarContainer = document.querySelector("#mensaje-interactivo");
      let dataMessage = { message: "Sensor agregado - id: " + data._id };
      snackbarContainer.MaterialSnackbar.showSnackbar(dataMessage);
      document.getElementById("sensor-name").value = "";
    });
  });
}

function viewPage(page) {
  if (page === "page-sensor-list") {
    document.getElementById("page-sensor-list").style.display = "block";
    document.getElementById("page-sensor-add").style.display = "none";
    getSensor();
  } else {
    document.getElementById("page-sensor-list").style.display = "none";
    document.getElementById("page-sensor-add").style.display = "block";
  }

  // Cierra el menú desplegable (drawer) para quitar la capa sombra
  let layout = document.querySelector(".mdl-layout");
  if (layout && layout.MaterialLayout) {
    layout.MaterialLayout.toggleDrawer();
  }
}

window.addEventListener("load", function () {
  getSensor();

  // Escuchadores de eventos para los enlaces del menú
  document.getElementById("nav-sensor-list").addEventListener("click", function (e) {
    e.preventDefault();
    viewPage("page-sensor-list");
  });

  document.getElementById("nav-sensor-add").addEventListener("click", function (e) {
    e.preventDefault();
    viewPage("page-sensor-add");
  });

  document.getElementById("btn-sensor-add").addEventListener("click", () => {
    createSensor(document.getElementById("sensor-name").value);
  });

  viewPage("page-sensor-list");
});