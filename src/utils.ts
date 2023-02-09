import { Nutrients } from './types';

export function fillArrayWithNumbers(n: number) {
	return Array.from({ length: n }, (_, i) => i + 1);
}

const getNutrientValInMg = (total: number, unit: string) => {
	if (unit === 'mg') {
		return Math.floor(total);
	} else if (unit === 'g') {
		return Math.floor(total * 1000);
	} else {
		return Number((total / 1000).toFixed(3));
	}
};

export function formatChartData(nutritionArr: Nutrients[]) {
	return nutritionArr.map(nutrient => {
		const { label, total, unit } = nutrient;
		return {
			nutrient: label,
			value: getNutrientValInMg(total, unit),
		};
	});
}
