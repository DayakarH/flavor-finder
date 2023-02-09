import React, { useRef, useLayoutEffect } from 'react';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const NutritionChart = ({ data }) => {
	console.log(data);
	useLayoutEffect(() => {
		let root = am5.Root.new('chartdiv');

		root.setThemes([am5themes_Animated.new(root)]);

		let chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panX: true,
				panY: true,
				wheelX: 'panX',
				wheelY: 'zoomX',
				pinchZoomX: true,
			})
		);
		let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
		cursor.lineY.set('visible', false);

		// Create Y-axis
		let yAxis = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				maxDeviation: 0.3,
				renderer: am5xy.AxisRendererY.new(root, {
					strokeOpacity: 0.1,
				}),
			})
		);

		let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
		xRenderer.labels.template.setAll({
			rotation: -90,
			centerY: am5.p50,
			centerX: am5.p100,
			paddingRight: 15,
		});

		xRenderer.grid.template.setAll({
			location: 1,
		});
		// Create X-Axis
		let xAxis = chart.xAxes.push(
			am5xy.CategoryAxis.new(root, {
				maxDeviation: 0.3,
				categoryField: 'nutrient',
				renderer: xRenderer,
				tooltip: am5.Tooltip.new(root, {}),
			})
		);
		xAxis.data.setAll(data);

		let series = chart.series.push(
			am5xy.ColumnSeries.new(root, {
				name: 'Series 1',
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: 'value',
				sequencedInterpolation: true,
				categoryXField: 'nutrient',
				tooltip: am5.Tooltip.new(root, {
					labelText: '{valueY}',
				}),
			})
		);

		series.columns.template.setAll({
			cornerRadiusTL: 5,
			cornerRadiusTR: 5,
			strokeOpacity: 0,
		});
		series.columns.template.adapters.add('fill', function (fill, target) {
			return chart.get('colors').getIndex(series.columns.indexOf(target));
		});

		series.columns.template.adapters.add('stroke', function (stroke, target) {
			return chart.get('colors').getIndex(series.columns.indexOf(target));
		});

		xAxis.data.setAll(data);
		series.data.setAll(data);
		series.appear(1000);
		chart.appear(1000, 100);
		return () => {
			root.dispose();
		};
	}, []);

	return (
		<>
			<h3>Nutrition Chart: All values are in mg</h3>
			<div id='chartdiv' style={{ width: '100%', height: '500px' }}></div>
		</>
	);
};
export default NutritionChart;
