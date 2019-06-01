var readline = require('readline');

const productMap = {
	'ipd': '$549.99',
	'mbp': '$1399.99',
	'atv': '$109.5',
	'vga': '$30'
}

const complementaryProductMap = {
	0 : 'mbp,vga'
	// Add more here if required
};

const outputMap = {};
let total = 0;
let stdin = process.openStdin();
let totalMap = {};
const productCodes = ['atv', 'mbp', 'vga', 'ipd'];

// Prompt user to input data in console.
console.log("Please input product code out of atv, ipd, mbp, vga");

stdin.addListener("data", function(input) {
	let key = input.toString().replace(/\r?\n/, '');

	if (typeof(outputMap[key]) === 'undefined') {
		outputMap[key] = [];
	}

	if (!productCodes.includes(key)) {
		console.log('Please enter a valid product code out of atv,ipd,mbp,vga');
		return;
	}

	outputMap[key].push(key);
	const price = parseFloat(productMap[key].replace('$', ''));
	const atvThreshold = 3;
	const ipdThreshold = 4;
	const complementaryProducts = complementaryProductMap[0].split(',');
	let cost = 0;

	switch (key) {
		case 'atv':
			if (typeof(totalMap[key]) === 'undefined') {
				totalMap[key] = {
					cost: 0,
					qty: 0
				};
			}
			if (outputMap[key].length && outputMap[key].length % atvThreshold === 0) {
				cost = (outputMap[key].length - Math.round(outputMap[key].length / atvThreshold)) * price +
					(outputMap[key].length - atvThreshold * Math.round(outputMap[key].length / atvThreshold)) * price;
			} else {
				cost = outputMap[key].length * price;
			}
			totalMap[key] = {
				cost: cost,
				qty: outputMap[key].length
			};
			break;

		case 'mbp':
			if (typeof(totalMap[key]) === 'undefined') {
				totalMap[key] = {
					cost: 0,
					qty: 0
				};
			}
			cost = outputMap[key].length * price;
			totalMap[key] = {
				cost: cost,
				qty: outputMap[key].length
			};
			// check for VGA here
			if (totalMap[complementaryProducts[1]] && outputMap[key].length >= totalMap[complementaryProducts[1]]['qty']) {
				totalMap[complementaryProducts[1]]['cost'] = 0;
			}
			break;

		case 'ipd':
			if (typeof(totalMap[key]) === 'undefined') {
				totalMap[key] = {
					cost: 0,
					qty: 0
				};
			}
			if (outputMap[key].length >= ipdThreshold) {
				cost = outputMap[key].length * (price - 50);
			} else {
				cost = outputMap[key].length * price;
			}
			totalMap[key] = {
				cost: cost,
				qty: outputMap[key].length
			};
			break;

		case 'vga':
			if (typeof(totalMap[key]) === 'undefined') {
				totalMap[key] = {
					cost: 0,
					qty: 0
				};
			}
			var mbpCount = outputMap[complementaryProducts[0]] && outputMap[complementaryProducts[0]].length || 0;
			var vgaCount = outputMap[key].length;
			var diff = (vgaCount > mbpCount) ? vgaCount - mbpCount : 0;
			cost = diff * price;
			totalMap[key] = {
				cost: cost,
				qty: outputMap[key].length
			};
			break;

		default:
			break;
	}

	console.log('Total = ', totalMap);
	total = 0;
	for (key in totalMap) {
		console.log(key, totalMap[key]['cost']);
		total += totalMap[key]['cost'];
	}

	console.log('Product final total = \x1b[32m \x1b[5m', total);

	// Prompt user to input data in console.
	console.log("\nPlease input product code out of atv, ipd, mbp, vga !! Ctrl+ C to exit\x1b[0m");
});