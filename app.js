// -------------------- VARIABLES --------------------
const companyInput = document.getElementById("companyName");
const btnAddCompany = document.getElementById("btnAddCompany");
const companyCount = document.getElementById("companyCount");

const serviceInput = document.getElementById("serviceName");
const btnAddService = document.getElementById("btnAddService");
const serviceCount = document.getElementById("serviceCount");

const numberInput = document.getElementById("numberInput");
const btnSearch = document.getElementById("btnSearch");
const newNumberPanel = document.getElementById("newNumberPanel");
const companySelect = document.getElementById("companySelect");
const btnCreateNumber = document.getElementById("btnCreateNumber");

const numberDetail = document.getElementById("numberDetail");
const d_number = document.getElementById("d_number");
const d_company = document.getElementById("d_company");
const d_created = document.getElementById("d_created");
const toggleBlocked = document.getElementById("toggleBlocked");

const servicesList = document.getElementById("servicesList");
const btnLoadUsage = document.getElementById("btnLoadUsage");
const usageList = document.getElementById("usageList");

// -------------------- FUNCIONES --------------------

// COMPAÑÍAS
btnAddCompany.addEventListener("click", async () => {
  const name = companyInput.value.trim();
  if (!name) return alert("Ingresa el nombre de la compañía");

  const res = await fetch("/api/registrar-compania", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ compania: name }),
  });
  const data = await res.json();
  if (res.ok) {
    alert(`Compañía agregada: ${data.compania}`);
    companyInput.value = "";
    loadCompanies();
  } else alert(`Error: ${data.error}`);
});

async function loadCompanies() {
  const res = await fetch("/api/listar-companias");
  const data = await res.json();
  companyCount.textContent = data.length;
  companySelect.innerHTML = "";
  data.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.nombre;
    companySelect.appendChild(opt);
  });
}
loadCompanies();

// SERVICIOS
btnAddService.addEventListener("click", async () => {
  const name = serviceInput.value.trim();
  if (!name) return alert("Ingresa el nombre del servicio");

  const res = await fetch("/api/registrar-servicio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ servicio: name }),
  });
  const data = await res.json();
  if (res.ok) {
    alert(`Servicio agregado: ${data.servicio}`);
    serviceInput.value = "";
    loadServices();
  } else alert(`Error: ${data.error}`);
});

async function loadServices() {
  const res = await fetch("/api/listar-servicios");
  const data = await res.json();
  serviceCount.textContent = data.length;
}
loadServices();

// NÚMEROS
btnSearch.addEventListener("click", async () => {
  const numero = numberInput.value.trim();
  if (!numero) return alert("Ingresa un número");
  const res = await fetch(`/api/buscar-numero?numero=${encodeURIComponent(numero)}`);
  const data = await res.json();
  if (data.existe) {
    newNumberPanel.classList.add("hidden");
    showNumberDetail(data);
  } else {
    newNumberPanel.classList.remove("hidden");
  }
});

btnCreateNumber.addEvent
