import type { IconType } from 'react-icons'
import {
	LuBuilding2,
	LuCarFront,
	LuCircleCheck,
	LuCoins,
	LuHammer,
	LuHouse,
	LuLaptop,
	LuMapPin,
	LuMonitor,
	LuPackage,
	LuPaintRoller,
	LuRocket,
	LuStore,
	LuTractor,
	LuTruck,
	LuUtensils,
} from 'react-icons/lu'

import type { StepId } from './model'

export type ChoiceOption = {
	value: string
	label: string
	icon?: IconType
	statePath?: string
}

export type ChoiceQuestion = {
	title: string
	helper?: string
	columns: 2 | 3 | 4
	options: ChoiceOption[]
}

export const choiceQuestions: Partial<Record<StepId, ChoiceQuestion>> = {
	purpose: {
		title: 'What is the purpose of this loan?',
		columns: 3,
		options: [
			{ value: 'cashflow', label: 'Cashflow', icon: LuCoins },
			{ value: 'new_vehicle', label: 'New vehicle', icon: LuCarFront },
			{ value: 'new_equipment', label: 'New equipment', icon: LuMonitor },
			{ value: 'stock', label: 'More stock', icon: LuPackage },
			{ value: 'property', label: 'Property', icon: LuHouse },
			{ value: 'fitout', label: 'Fitout', icon: LuPaintRoller },
			{ value: 'buy_business', label: 'Buying a business', icon: LuStore },
			{ value: 'start_business', label: 'Starting a business', icon: LuRocket },
			{ value: 'other', label: 'Other', icon: LuCircleCheck },
		],
	},
	vehicle_type: {
		title: 'What type of vehicle are you looking for?',
		columns: 2,
		options: [
			{ value: 'car', label: 'Car', icon: LuCarFront },
			{ value: 'ute_or_van', label: 'Ute or van', icon: LuTruck },
			{ value: 'truck', label: 'Truck', icon: LuTruck },
			{ value: 'trailer', label: 'Trailer', icon: LuTractor },
			{ value: 'other', label: 'Other vehicle', icon: LuCircleCheck },
		],
	},
	equipment_type: {
		title: 'What type of equipment are you looking for?',
		columns: 2,
		options: [
			{ value: 'construction', label: 'Construction machinery', icon: LuTractor },
			{ value: 'medical', label: 'Medical or dental', icon: LuCircleCheck },
			{ value: 'hospitality', label: 'Hospitality equipment', icon: LuUtensils },
			{ value: 'technology', label: 'IT or office equipment', icon: LuLaptop },
			{ value: 'other', label: 'Other equipment', icon: LuHammer },
		],
	},
	trading_history: {
		title: 'How long has the business been trading?',
		columns: 3,
		options: [
			{ value: 'not_trading', label: 'Not trading yet' },
			{ value: 'under_six_months', label: 'Under 6 months' },
			{ value: 'six_to_twelve_months', label: '6–12 months' },
			{ value: 'one_to_two_years', label: '1–2 years' },
			{ value: 'two_plus_years', label: 'Over 2 years' },
		],
	},
	monthly_revenue: {
		title: 'What is the business’s average monthly revenue?',
		columns: 2,
		options: [
			{ value: 'pre_revenue', label: 'Not trading yet / pre-revenue' },
			{ value: 'under_10000', label: 'Under $10,000' },
			{ value: '10000_25000', label: '$10,000–$25,000' },
			{ value: '25000_50000', label: '$25,000–$50,000' },
			{ value: '50000_100000', label: '$50,000–$100,000' },
			{ value: '100000_250000', label: '$100,000–$250,000' },
			{ value: 'over_250000', label: 'Over $250,000' },
		],
	},
	living_situation: {
		title: 'What is your current living situation?',
		columns: 3,
		options: [
			{ value: 'homeowner', label: 'Homeowner', icon: LuHouse },
			{ value: 'renting', label: 'Renting', icon: LuBuilding2 },
			{ value: 'other', label: 'Other', icon: LuMapPin },
		],
	},
	tax_debt: {
		title: 'Does the business currently have tax debt?',
		helper: 'This does not automatically prevent the business from having options.',
		columns: 2,
		options: [
			{ value: 'yes', label: 'Yes' },
			{ value: 'no', label: 'No' },
		],
	},
	state: {
		title: 'Which state or territory is the business in?',
		columns: 3,
		options: [
			{ value: 'NSW', label: 'NSW', statePath: 'M7 6 23 8 24 18 18 25 10 23 8 15Z' },
			{ value: 'VIC', label: 'VIC', statePath: 'M6 10 25 13 22 24 15 26 8 21Z' },
			{ value: 'QLD', label: 'QLD', statePath: 'M10 4 22 5 24 24 13 22 8 14Z' },
			{ value: 'WA', label: 'WA', statePath: 'M7 5 20 8 23 15 18 25 9 24 6 15Z' },
			{ value: 'SA', label: 'SA', statePath: 'M9 7 22 7 24 21 17 25 8 21Z' },
			{ value: 'TAS', label: 'TAS', statePath: 'M9 7 23 10 21 23 14 27 7 17Z' },
			{ value: 'ACT', label: 'ACT', statePath: 'M10 8 22 9 24 20 17 25 9 21 7 14Z' },
			{ value: 'NT', label: 'NT', statePath: 'M10 4 22 5 23 25 8 24 8 13Z' },
		],
	},
}

export const fieldQuestionTitles: Partial<Record<StepId, { title: string; helper?: string }>> = {
	amount: {
		title: 'How much would you like to borrow?',
		helper: 'Enter the amount you actually need.',
	},
	contact: {
		title: 'Where should we send your options?',
		helper: 'Your details are handled securely and are not shown publicly.',
	},
}
