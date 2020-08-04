// from data.js
var tableData = data;

// get table
var tbody = d3.select("tbody");

function buildTable(data) {
	// clear existing data
	tbody.html("");

	// add each row in data set
	data.forEach((dataRow) => {
		var row = tbody.append("tr");

		Object.values(dataRow).forEach((val) => {
			var cell = row.append("td");
			cell.text(val);
		});
	});
}

// dictionary of filters
var filters = {};

function updateFilters() {

	var changedElement = d3.select(this).select("input");
	var elementValue = changedElement.property("value");
	var filterId = changedElement.attr("id");

	if (elementValue) {
		filters[filterId] = elementValue;
	} else {
		delete filters[filterId];
	}

	// rebuild table with filters
	filterTable();

}

function filterTable() {

	let filteredData = tableData;

	Object.entries(filters).forEach(([key, value]) => {
		filteredData = filteredData.filter(row => row[key] === value);
	});

	buildTable(filteredData);
}

// filter event listener
d3.selectAll(".filter").on("change", updateFilters);

// initiate default table
buildTable(tableData);