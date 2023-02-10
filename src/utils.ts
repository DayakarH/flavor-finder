import { Nutrients } from './types';

export function fillArrayWithNumbers(n: number) {
	return Array.from({ length: n }, (_, i) => i + 1);
}

const getNutrientValInMg = (total: number, unit: string) =>
	Math.floor(
		unit === 'mg' ? total : unit === 'g' ? total * 1000 : total / 1000
	);

export function formatChartData(nutritionArr: Nutrients[]) {
	return nutritionArr.map(nutrient => {
		const { label, total, unit } = nutrient;
		return {
			nutrient: label,
			value: getNutrientValInMg(total, unit),
		};
	});
}
