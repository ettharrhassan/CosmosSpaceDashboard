// sideBar Hide and Show

let todayInSpace = document.getElementById("todayInSpace");
let sideBarLaunches = document.getElementById("sideBarLaunches");
let sideBarPlanets = document.getElementById("sideBarPlanets");

let todayInSpaceSection = document.getElementById("today-in-space");
let launchesSection = document.getElementById("launches");
let planetsSection = document.getElementById("planets");

todayInSpace.addEventListener("click", function () {
  todayInSpaceSection.classList.replace("hidden", "flex");
  launchesSection.classList.replace("flex", "hidden");
  planetsSection.classList.replace("flex", "hidden");
  setActiveLink(todayInSpace);
});

sideBarLaunches.addEventListener("click", function () {
  launchesSection.classList.replace("hidden", "flex");
  todayInSpaceSection.classList.replace("flex", "hidden");
  planetsSection.classList.replace("flex", "hidden");
  setActiveLink(sideBarLaunches); 
});

sideBarPlanets.addEventListener("click", function () {
  planetsSection.classList.replace("hidden", "flex");
  launchesSection.classList.replace("flex", "hidden");
  todayInSpaceSection.classList.replace("flex", "hidden");
  setActiveLink(sideBarPlanets);
});

let navLinks = document.querySelectorAll(".nav-link");
const activeClasses = ["bg-blue-500/10", "text-blue-400"];
const inactiveClasses = ["text-slate-300", "hover:bg-slate-800"];

function setActiveLink(clickedLink) {
  navLinks.forEach((link) => {
    link.classList.remove(...activeClasses, ...inactiveClasses);
    if (link === clickedLink) {
      link.classList.add(...activeClasses);
    } else {
      link.classList.add(...inactiveClasses);
    }
  });

}
  setActiveLink(todayInSpace);
// callAPI

let todayInSpaceImage = document.getElementById("apod-image");
let todayInSpaceTitle = document.getElementById("apod-title");
let todayInSpaceParagraph = document.getElementById("apod-explanation");
let todayInSpaceDateDetails = document.getElementById("apod-date-detail");
let todayInSpaceCopyRights = document.getElementById("apod-copyright");
let todayInSpaceFooterDate = document.getElementById("apod-date-info");
let todayInSpaceSubTitleDate = document.getElementById("apod-date");
let todayInSpaceMediaType = document.getElementById("apod-media-type");
let apodDateInput = document.getElementById("apod-date-input");
let loadDateBtn = document.getElementById("load-date-btn");
let todayApodBtn = document.getElementById("today-apod-btn");
let apodLoading = document.getElementById("apod-loading");
let dateInputLabelText = apodDateInput.nextElementSibling;

function getTodayFormatted() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
apodDateInput.max = getTodayFormatted();

function formatDisplayDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

let currentRequestId = 0;

async function getData(date) {
  const requestId = ++currentRequestId;
  apodLoading.classList.remove("hidden");
  todayInSpaceImage.classList.add("hidden");

  try {
    let res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=9h59OV8WKcV2aTThJqIPn7Wd8c4nJU9HgPAQPNok&date=${date}`,
    );
    let dataFromApi = await res.json();
    if (requestId !== currentRequestId) {
      return;
    }

    if (dataFromApi.code) {
      return;
    }

    todayInSpaceTitle.innerHTML = dataFromApi.title;
    todayInSpaceParagraph.innerHTML = dataFromApi.explanation;
    todayInSpaceSubTitleDate.innerHTML = dataFromApi.date;
    todayInSpaceDateDetails.innerHTML = `<i class="far fa-calendar mr-2"></i>${dataFromApi.date}`;
    todayInSpaceCopyRights.innerHTML = dataFromApi.copyright
      ? `© ${dataFromApi.copyright}`
      : "";
    todayInSpaceFooterDate.innerHTML = dataFromApi.date;
    todayInSpaceMediaType.innerHTML =
      dataFromApi.media_type === "image" ? "Image" : "Video";

    const newImageUrl =
      dataFromApi.media_type === "image"
        ? dataFromApi.url
        : dataFromApi.thumbnail_url || dataFromApi.url || "";
    await new Promise((resolve) => {
      if (!newImageUrl) {
        resolve();
        return;
      }
      const preloadImg = new Image();
      preloadImg.onload = resolve;
      preloadImg.onerror = resolve;
      preloadImg.src = newImageUrl;
    });

    if (requestId !== currentRequestId) {
      return;
    }

    todayInSpaceImage.src = newImageUrl;
    todayInSpaceImage.alt = dataFromApi.title;
    dateInputLabelText.textContent = formatDisplayDate(dataFromApi.date);
    apodDateInput.value = dataFromApi.date;
  } catch (error) {
    console.error(error);
  } finally {
    if (requestId === currentRequestId) {
      apodLoading.classList.add("hidden");
      todayInSpaceImage.classList.remove("hidden");
    }
  }
}

apodDateInput.addEventListener("change", () => {
  const selectedDate = apodDateInput.value;
  if (selectedDate) {
    dateInputLabelText.textContent = formatDisplayDate(selectedDate);
  }
});

loadDateBtn.addEventListener("click", () => {
  const selectedDate = apodDateInput.value;
  if (!selectedDate) {
    return;
  }
  getData(selectedDate);
});

todayApodBtn.addEventListener("click", () => {
  const today = getTodayFormatted();
  getData(today);
});

getData(getTodayFormatted());

//planets

let planetDetailName = document.getElementById("planet-detail-name");
let planetDetailDescription = document.getElementById(
  "planet-detail-description",
);
let planetDistance = document.getElementById("planet-distance");
let planetRadius = document.getElementById("planet-radius");
let planetMass = document.getElementById("planet-mass");
let planetDensity = document.getElementById("planet-density");
let planetOrbitalPeriod = document.getElementById("planet-orbital-period");
let planetRotation = document.getElementById("planet-rotation");
let planetMoons = document.getElementById("planet-moons");
let planetGravity = document.getElementById("planet-gravity");
let planetDiscoverer = document.getElementById("planet-discoverer");
let planetDiscoveryDate = document.getElementById("planet-discovery-date");
let planetBodyType = document.getElementById("planet-body-type");
let planetVolume = document.getElementById("planet-volume");
let planetPerihelion = document.getElementById("planet-perihelion");
let planetAphelion = document.getElementById("planet-aphelion");
let planetEccentricity = document.getElementById("planet-eccentricity");
let planetInclination = document.getElementById("planet-inclination");
let planetAxialTilt = document.getElementById("planet-axial-tilt");
let planetTemp = document.getElementById("planet-temp");
let planetEscape = document.getElementById("planet-escape");
let planetFactsList = document.getElementById("planet-facts");
let planetDetailImage = document.getElementById("planet-detail-image");
let planetCards = document.querySelectorAll(".planet-card");

const planetsData = {
  mercury: {
    name: "Mercury",
    description:
      "Mercury is the smallest planet in the Solar System and the closest to the Sun. It has no atmosphere to retain heat, causing extreme temperature swings between day and night.",
    distance: "57.9M km",
    radius: "2,439.7 km",
    mass: "3.3011 × 10²³ kg",
    density: "5.427 g/cm³",
    orbitalPeriod: "88.0 days",
    rotation: "1407.6 hours",
    moons: 0,
    gravity: "3.7 m/s²",
    discoverer: "Known since antiquity",
    discoveryDate: "Ancient",
    bodyType: "Planet",
    volume: "6.083 × 10¹⁰ km³",
    perihelion: "46.0M km",
    aphelion: "69.8M km",
    eccentricity: "0.2056",
    inclination: "7.00°",
    axialTilt: "0.03°",
    avgTemp: "167°C",
    escape: "4.25 km/s",
    facts: [
      "Smallest planet in the Solar System",
      "No atmosphere to retain heat",
      "Extreme temperature variations between day and night",
      "Closest planet to the Sun",
    ],
  },
  venus: {
    name: "Venus",
    description:
      "Venus is the second planet from the Sun and the hottest in the Solar System due to a runaway greenhouse effect. It rotates backwards compared to most other planets.",
    distance: "108.2M km",
    radius: "6,051.8 km",
    mass: "4.8675 × 10²⁴ kg",
    density: "5.243 g/cm³",
    orbitalPeriod: "224.7 days",
    rotation: "-5832.5 hours",
    moons: 0,
    gravity: "8.87 m/s²",
    discoverer: "Known since antiquity",
    discoveryDate: "Ancient",
    bodyType: "Planet",
    volume: "9.28 × 10¹¹ km³",
    perihelion: "107.5M km",
    aphelion: "108.9M km",
    eccentricity: "0.0067",
    inclination: "3.39°",
    axialTilt: "177.4°",
    avgTemp: "464°C",
    escape: "10.36 km/s",
    facts: [
      "Hottest planet due to the greenhouse effect",
      "Rotates backwards (retrograde rotation)",
      "Thick toxic atmosphere made mostly of CO2",
      "Brightest natural object in the night sky after the Moon",
    ],
  },
  earth: {
    name: "Earth",
    description:
      "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29% of Earth's surface is land consisting of continents and islands. The remaining 71% is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, but also by lakes, rivers, and other fresh water, which together constitute the hydrosphere.",
    distance: "149.6M km",
    radius: "6,371 km",
    mass: "5.97 × 10²⁴ kg",
    density: "5.51 g/cm³",
    orbitalPeriod: "365.25 days",
    rotation: "24 hours",
    moons: 1,
    gravity: "9.8 m/s²",
    discoverer: "Known since antiquity",
    discoveryDate: "Ancient",
    bodyType: "Planet",
    volume: "1.08321 × 10¹² km³",
    perihelion: "147.1M km",
    aphelion: "152.1M km",
    eccentricity: "0.0167",
    inclination: "0.00°",
    axialTilt: "23.44°",
    avgTemp: "15°C",
    escape: "11.2 km/s",
    facts: [
      "Only known planet with liquid water",
      "Atmosphere contains 78% nitrogen",
      "Magnetic field protects from solar wind",
      "Formed 4.54 billion years ago",
    ],
  },
  mars: {
    name: "Mars",
    description:
      "Mars is the fourth planet from the Sun, known as the Red Planet due to iron oxide on its surface. It hosts the tallest volcano and the deepest canyon in the Solar System.",
    distance: "227.9M km",
    radius: "3,389.5 km",
    mass: "6.4171 × 10²³ kg",
    density: "3.933 g/cm³",
    orbitalPeriod: "687.0 days",
    rotation: "24.6 hours",
    moons: 2,
    gravity: "3.71 m/s²",
    discoverer: "Known since antiquity",
    discoveryDate: "Ancient",
    bodyType: "Planet",
    volume: "1.6318 × 10¹¹ km³",
    perihelion: "206.6M km",
    aphelion: "249.2M km",
    eccentricity: "0.0934",
    inclination: "1.85°",
    axialTilt: "25.19°",
    avgTemp: "-65°C",
    escape: "5.03 km/s",
    facts: [
      "Home to Olympus Mons, the tallest volcano in the Solar System",
      "Has two small moons: Phobos and Deimos",
      "Reddish color due to iron oxide (rust) on its surface",
      "Evidence of ancient water flows",
    ],
  },
  jupiter: {
    name: "Jupiter",
    description:
      "Jupiter is the largest planet in the Solar System, a gas giant famous for its Great Red Spot, a giant storm that has raged for centuries.",
    distance: "778.5M km",
    radius: "69,911 km",
    mass: "1.8982 × 10²⁷ kg",
    density: "1.326 g/cm³",
    orbitalPeriod: "4,332.6 days",
    rotation: "9.93 hours",
    moons: 79,
    gravity: "24.79 m/s²",
    discoverer: "Known since antiquity",
    discoveryDate: "Ancient",
    bodyType: "Gas Giant",
    volume: "1.43128 × 10¹⁵ km³",
    perihelion: "740.6M km",
    aphelion: "816.6M km",
    eccentricity: "0.0489",
    inclination: "1.30°",
    axialTilt: "3.13°",
    avgTemp: "-110°C",
    escape: "59.5 km/s",
    facts: [
      "Largest planet in the Solar System",
      "Famous for the Great Red Spot storm",
      "Has a faint ring system",
      "Dozens of known moons, including the four large Galilean moons",
    ],
  },
  saturn: {
    name: "Saturn",
    description:
      "Saturn is the sixth planet from the Sun, best known for its spectacular ring system made mostly of ice particles with a smaller amount of rocky debris.",
    distance: "1,433.5M km",
    radius: "58,232 km",
    mass: "5.6834 × 10²⁶ kg",
    density: "0.687 g/cm³",
    orbitalPeriod: "10,759.2 days",
    rotation: "10.7 hours",
    moons: 82,
    gravity: "10.44 m/s²",
    discoverer: "Known since antiquity",
    discoveryDate: "Ancient",
    bodyType: "Gas Giant",
    volume: "8.2713 × 10¹⁴ km³",
    perihelion: "1,352.6M km",
    aphelion: "1,514.5M km",
    eccentricity: "0.0565",
    inclination: "2.49°",
    axialTilt: "26.73°",
    avgTemp: "-140°C",
    escape: "35.5 km/s",
    facts: [
      "Famous for its extensive and bright ring system",
      "Least dense planet, less dense than water",
      "Second-largest planet in the Solar System",
      "Has dozens of moons, including Titan",
    ],
  },
  uranus: {
    name: "Uranus",
    description:
      "Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is unique in that it rotates on its side.",
    distance: "2,870.7M km",
    radius: "25,362 km",
    mass: "8.68127 × 10²⁵ kg",
    density: "1.27 g/cm³",
    orbitalPeriod: "30,685.40 days",
    rotation: "-17.24 hours",
    moons: 27,
    gravity: "8.87 m/s²",
    discoverer: "William Herschel",
    discoveryDate: "13/03/1781",
    bodyType: "Planet",
    volume: "6.833 × 10¹³ km³",
    perihelion: "2,735.0M km",
    aphelion: "3,006.3M km",
    eccentricity: "0.04570",
    inclination: "0.77°",
    axialTilt: "97.77°",
    avgTemp: "-197°C",
    escape: "21.38 km/s",
    facts: [
      "Rotates on its side, unlike any other planet",
      "Coldest planetary atmosphere in the Solar System",
      "Has a faint ring system",
      "Discovered by William Herschel in 1781",
    ],
  },
  neptune: {
    name: "Neptune",
    description:
      "Neptune is the eighth and farthest known planet from the Sun. It is a dark, cold ice giant with the strongest sustained winds of any planet.",
    distance: "4,495.1M km",
    radius: "24,622 km",
    mass: "1.02413 × 10²⁶ kg",
    density: "1.638 g/cm³",
    orbitalPeriod: "60,190 days",
    rotation: "16.11 hours",
    moons: 14,
    gravity: "11.15 m/s²",
    discoverer: "Urbain Le Verrier, John Couch Adams, Johann Galle",
    discoveryDate: "23/09/1846",
    bodyType: "Planet",
    volume: "6.254 × 10¹³ km³",
    perihelion: "4,459.8M km",
    aphelion: "4,537.0M km",
    eccentricity: "0.0086",
    inclination: "1.77°",
    axialTilt: "28.32°",
    avgTemp: "-200°C",
    escape: "23.5 km/s",
    facts: [
      "Strongest winds in the Solar System",
      "Farthest known planet from the Sun",
      "Deep blue color from methane in its atmosphere",
      "Has a faint ring system",
    ],
  },
};

function showPlanetData(planetId) {
  const planet = planetsData[planetId];

  planetDetailName.textContent = planet.name;
  planetDetailImage.src = `./assets/images/${planetId}.png`;
  planetDetailImage.alt = `${planet.name} planet`;
  planetDetailDescription.textContent = planet.description;

  planetDistance.textContent = planet.distance;
  planetRadius.textContent = planet.radius;
  planetMass.textContent = planet.mass;
  planetDensity.textContent = planet.density;
  planetOrbitalPeriod.textContent = planet.orbitalPeriod;
  planetRotation.textContent = planet.rotation;
  planetMoons.textContent = planet.moons;
  planetGravity.textContent = planet.gravity;

  planetDiscoverer.textContent = planet.discoverer;
  planetDiscoveryDate.textContent = planet.discoveryDate;
  planetBodyType.textContent = planet.bodyType;
  planetVolume.textContent = planet.volume;

  planetPerihelion.textContent = planet.perihelion;
  planetAphelion.textContent = planet.aphelion;
  planetEccentricity.textContent = planet.eccentricity;
  planetInclination.textContent = planet.inclination;
  planetAxialTilt.textContent = planet.axialTilt;
  planetTemp.textContent = planet.avgTemp;
  planetEscape.textContent = planet.escape;

  let factsHTML = "";
  for (let i = 0; i < planet.facts.length; i++) {
    factsHTML += `
        <li class="flex items-start">
          <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
          <span class="text-slate-300">${planet.facts[i]}</span>
        </li>`;
  }
  planetFactsList.innerHTML = factsHTML;
}

function setActivePlanetCard(clickedCard) {
  planetCards.forEach((card) => {
    card.style.borderColor = "#334155";
  });
  const color = clickedCard.style.getPropertyValue("--planet-color");
  clickedCard.style.borderColor = color;
}
planetCards.forEach((card) => {
  card.addEventListener("click", () => {
    const planetId = card.dataset.planetId;
    setActivePlanetCard(card);
    showPlanetData(planetId);
  });
});

showPlanetData("earth");

function setActivePlanetCard(clickedCard) {
  planetCards.forEach((card) => {
    card.style.borderColor = "#334155";
  });
  const color = clickedCard.style.getPropertyValue("--planet-color");
  clickedCard.style.borderColor = color;
}

planetCards.forEach((card) => {
  card.addEventListener("click", () => {
    const planetId = card.dataset.planetId;
    setActivePlanetCard(card);
    showPlanetData(planetId);
  });
});

showPlanetData("earth");
