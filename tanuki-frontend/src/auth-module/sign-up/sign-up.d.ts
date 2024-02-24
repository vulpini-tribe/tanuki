enum ActivityLevel {
	NONE = 1.2,
	LIGHT = 1.375,
	MODERATE = 1.55,
	HEAVY = 1.725,
	EXTREME = 1.9
}

enum HormonalSex {
	FEMALE = 'female',
	MALE = 'male'
}

enum Unit {
	NORMAL = 'kg',
	RETARDED = 'lbs'
}

export type FormFields = {
	weight: number; // 30..200
	height: number; // 100..220
	age: number; // 14..100
	unit: Unit;
	hormonal_sex: HormonalSex;

	activity_rate: ActivityLevel;
	goal: number;
	per_week: number;

	name: string;
	dob: Date;
	email: string;
	password: string;
	password_repeat: string;
};

export type FormKeys = keyof FormFields;
