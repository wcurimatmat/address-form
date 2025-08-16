const provinceSelectContainer = document.querySelector(
    ".province-select-container"
);
const cityMunicipalitySelectContainer = document.querySelector(
    ".city-municipality-select-container"
);
const barangaySelectContainer = document.querySelector(
    ".barangay-select-container"
);

const regionList = document.getElementById("region");
const provinceList = document.getElementById("province");
const cityMunicipalityList = document.getElementById("city_municipality");
const barangayList = document.getElementById("barangay");

const resetButton = document.getElementById("reset");

async function fetchLocation(URL) {
    const response = await fetch(URL);
    return await response.json();
}

function fixEncoding(str) {
    return decodeURIComponent(escape(str));
}

async function getRegions() {
    regionList.innerHTML = `<option value="" selected>-- Select Region --</option>`;

    const regions = await fetchLocation("https://psgc.cloud/api/v2/regions");

    regions.data.forEach(function (region) {
        const regionOption = document.createElement("option");

        regionOption.textContent = region.name;
        regionOption.value = region.code;

        regionList.append(regionOption);
    });
}

async function getProvinces(regionCode) {
    provinceList.innerHTML = `<option value="" selected>-- Select Province --</option>`;

    const provinces = await fetchLocation(
        `https://psgc.cloud/api/v2/regions/${regionCode}/provinces`
    );

    provinces.data.forEach(function (province) {
        const provinceOption = document.createElement("option");

        provinceOption.textContent = province.name;
        provinceOption.value = province.code;

        provinceList.append(provinceOption);
    });

    provinceSelectContainer.classList.remove("hidden");
    provinceSelectContainer.classList.add("display");
}

async function getCityMunicipality(provinceCode) {
    cityMunicipalityList.innerHTML = `<option value="" selected>-- Select City/Municipality --</option>`;

    const cityMunicipality = await fetchLocation(
        `https://psgc.cloud/api/v2/provinces/${provinceCode}/cities-municipalities`
    );

    cityMunicipality.data.forEach(function (province) {
        const option = document.createElement("option");

        option.textContent = fixEncoding(province.name);
        option.value = province.code;

        cityMunicipalityList.append(option);
    });

    cityMunicipalitySelectContainer.classList.remove("hidden");
    cityMunicipalitySelectContainer.classList.add("display");
}

async function getBarangay(locality) {
    barangayList.innerHTML = `<option value="" selected>-- Select Barangay --</option>`;

    const barangay = await fetchLocation(
        `https://psgc.cloud/api/v2/cities-municipalities/${locality}/barangays`
    );

    barangay.data.forEach(function (location) {
        const option = document.createElement("option");

        option.textContent = location.name;
        option.value = location.code;

        barangayList.append(option);
    });

    barangaySelectContainer.classList.remove("hidden");
    barangaySelectContainer.classList.add("display");
}

function init() {
    getRegions();

    regionList.addEventListener("change", function () {
        if (regionList.value != "") {
            getProvinces(regionList.value);
        } else {
            provinceSelectContainer.classList.add("hidden");
        }
    });

    provinceList.addEventListener("change", function () {
        if (provinceList.value != "") {
            getCityMunicipality(provinceList.value);
        } else {
            cityMunicipalitySelectContainer.classList.add("hidden");
        }
    });

    cityMunicipalityList.addEventListener("change", function () {
        if (cityMunicipalityList.value != "") {
            getBarangay(cityMunicipalityList.value);
        } else {
            barangaySelectContainer.classList.add("hidden");
        }
    });
}

resetButton.addEventListener("click", function () {
    provinceList.innerHTML = `<option value="" selected>-- Select Province --</option>`;
    cityMunicipalityList.innerHTML = `<option value="" selected>-- Select City/Municipality --</option>`;
    barangayList.innerHTML = `<option value="" selected>-- Select Barangay --</option>`;

    provinceSelectContainer.classList.remove("display");
    provinceSelectContainer.classList.add("hidden");

    cityMunicipalitySelectContainer.classList.remove("display");
    cityMunicipalitySelectContainer.classList.add("hidden");

    barangaySelectContainer.classList.remove("display");
    barangaySelectContainer.classList.add("hidden");

    init();
});

init();
