// import data from data.js
var tableData = data;

// create unique array function
function unique(value, index, self) {
    return self.indexOf(value) === index;
}

// dynamically build select dropdowns
var cities = data.map(sighting => sighting.city).filter(unique).sort();
var states = data.map(sighting => sighting.state).filter(unique).sort();
var countries = data.map(sighting => sighting.country).filter(unique).sort();
var shapes = data.map(sighting => sighting.shape).filter(unique).sort();

var cityDrop = d3.select("#city");
cities.forEach(city => {
    var option = cityDrop.append("option")
    option.text(city);
})

var stateDrop = d3.select("#state");
states.forEach(state => {
    var option = stateDrop.append("option")
    option.text(state);
})

var countryDrop = d3.select("#country");
countries.forEach(country => {
    var option = countryDrop.append("option")
    option.text(country);
})

var shapesDrop = d3.select("#shape");
shapes.forEach(shape => {
    var option = shapesDrop.append("option")
    option.text(shape);
})

// button event listener
var button = d3.select("button");
var form = d3.select("form");

function handleClick() {

    // prevent page from refreshing
    d3.event.preventDefault();

    // locate table and tbody
    var table = d3.select("table");
    var tbody = d3.select("tbody");

    // dynamically remove table rows using new data
    tbody.remove();
    table.append("tbody");

    // select datetime input from form
    var inputDate = d3.select("#datetime").property("value");
    var inputCity = d3.select("#city").property("value");
    var inputState = d3.select("#state").property("value");
    var inputCountry = d3.select("#country").property("value");
    var inputShape = d3.select("#shape").property("value");

    // filter data using the date from the form input
    var filterData = data
    
    if (inputDate) {
        filterData = filterData.filter(sighting => sighting.datetime === inputDate);
    }
    if (inputCity) {
        filterData = filterData.filter(sighting => sighting.city === inputCity);
    }
    if (inputState) {
        filterData = filterData.filter(sighting => sighting.state === inputState);
    }
    if (inputCountry) {
        filterData = filterData.filter(sighting => sighting.country === inputCountry);
    }
    if (inputShape) {
        filterData = filterData.filter(sighting => sighting.shape === inputShape);
    }

    // dynamically build table rows using new data
    var tbody = d3.select("tbody");
    if (filterData.length > 0) {
        filterData.forEach(sighting => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
            })
        })
    }
    else {
        var row = tbody.append("tr");
        var cell = row.append("td");
        cell.attr("colspan", "7");
        cell.text("Sorry, no data was found for these filters.");
    }
}

button.on("click", handleClick);
form.on("submit", handleClick);