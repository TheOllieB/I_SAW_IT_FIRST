const request = require('request');
const { Parser } = require('json2csv');
const excel = require('excel4node');
const fs = require('fs');

'use stict';
const fields = ['id', 'title', 'product_type', 'vendor', 'variants.id'];
let workbook = new excel.Workbook();
let worksheet = workbook.addWorksheet('Titles and Descriptions');

const getProducts = () => {
	return new Promise((resolve, reject) => {
		const options = {
			url: 'https://jkq0dchnp0.execute-api.eu-west-1.amazonaws.com/dev/get-json-data',
			json: true
		};
		request.get(options, (err, res, body) => {
			if (err) reject(err);
			resolve(body);
		});
	});
}

const createCSV = (fileName, field, content) => {
	const json2csvParser = new Parser(field);
	const csv = json2csvParser.parse(content);
	fs.writeFile(fileName, csv, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Saved to file!');
		}
	});
}

getProducts().then((body) => {
	const data = body.products;
	//Generate a CSV file from the data with the following columns: ID, Title, Product Type, Vendor, Variants IDS 
	const firstCsv = { fields, unwind: ['variants', 'id'] };
	createCSV('products.csv', firstCsv, data);

	//Generate an array and log it to the console contain the following info: Product Image URL, Product Image Height, Product Image Width and an overall count of total images
	let imageCount = 0;
	let genArray = [];
	for (let i = 0; i < data.length; i++) {
		genArray.push(data[i].image.src);
		genArray.push("From images: " + data[i].images[0]['src']);
		imageCount += 2;
		genArray.push(data[i].image.height);
		genArray.push(data[i].image.width);
		if (data[i]['images'].length > 1) {
			genArray.push("From images: " + data[i]['images'][1]['src']);
			imageCount++;
		}
	}

	genArray.push(imageCount);
	console.log(genArray);

	// Generate an XLSX file containing the Product Titles and Descriptions 
	let titlesArr = [];
	let descArr = [];

	for (let product of data) {
		titlesArr.push(product.title);
		descArr.push(product.body_html);
	};
	worksheet.cell(1, 1).string('Titles');
	worksheet.cell(1, 2).string('Descriptions');
	for (let i = 0; i < titlesArr.length; i += 1) {
		worksheet.cell(i + 2, 1).string(titlesArr[i]);
		worksheet.cell(i + 2, 2).string(descArr[i]);

	}
	workbook.write('products.xlsx');
	console.log('Created .xlsx file!');

	// Generate a CSV of all the product tags combined, with duplicates removed 
	let dupesArray = [];
	let joinedArray = [];
	for (let i = 0; i < data.length; i++) {
		dupesArray.push(data[i].tags);
	}

	joinedArray = dupesArray.join().split(',');
	noDupesArray = [...new Set(joinedArray)];
	const app = { 'tags': [noDupesArray] }
	createCSV('tags.csv', 'tags', app.tags);

})
	.catch((err) => console.log(err));