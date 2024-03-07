import { useMemo } from 'react';
import { Interval, DateTime } from 'luxon';

const today = DateTime.now();

const calcDaysMatrix = (week: DateTime) => {
	const lastDay = week.endOf('week');
	const firstDay = week.startOf('week');

	const days = Interval.fromDateTimes(firstDay, lastDay)
		.splitBy({ days: 1 })
		.map((d) => d.start);

	return days.map((day) => {
		if (!day) return null;

		const isCurrentMonth = day.hasSame(lastDay, 'month');
		const isCurrentMonth2 = day.hasSame(firstDay, 'month');

		return isCurrentMonth || isCurrentMonth2 ? day : null;
	});
};

const calcWeeksMatrix = (month: DateTime) => {
	const lastDay = month.endOf('month');
	const firstDay = month.startOf('month');

	const test: { [key: number]: DateTime[] } = {};
	const weeks = Interval.fromDateTimes(firstDay.startOf('week'), lastDay.endOf('week'))
		.splitBy({ weeks: 1 })
		.map((d) => d.start);

	weeks.forEach((week) => {
		if (!week) return;

		const key = week.weekNumber.toString();
		// @ts-ignore
		test[key] = calcDaysMatrix(week);
	});

	return test;
};

const calcMonthMatrix = (month: DateTime) => {
	// Get range for work with | Start
	const today = DateTime.now();
	const endDate = today.minus({ months: 6 });

	const lastDay = today.endOf('month');
	const firstDay = endDate.startOf('month');
	// Get range for work with | End

	const months: { [key: string]: DateTime } = {};

	const monthRng = Interval.fromDateTimes(firstDay, lastDay)
		.splitBy({ months: 1 })
		.map((d) => d.start);

	monthRng.forEach((month) => {
		if (!month) return;

		const key = month.toFormat('MM-yyyy');
		// @ts-ignore
		months[key] = calcWeeksMatrix(month);
	});

	return months;
};

const useDayMatrix = () => {
	const dayMatrix = useMemo(() => {
		return calcMonthMatrix(today);
	}, []);

	return dayMatrix;
};

export default useDayMatrix;
