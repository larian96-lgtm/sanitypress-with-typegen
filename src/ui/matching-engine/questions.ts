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
	stateImage?: string
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
	vehicle_source: {
		title: 'Where are you buying the vehicle from?',
		columns: 3,
		options: [
			{ value: 'used_from_dealer', label: 'Used from a dealer' },
			{ value: 'private_sale', label: 'Private sale' },
			{ value: 'unknown', label: 'Not sure yet' },
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
		columns: 2,
		options: [
			{ value: 'under_12_months', label: 'Under 12 months' },
			{ value: 'one_to_two_years', label: '1–2 years' },
			{ value: 'two_to_five_years', label: '2–5 years' },
			{ value: 'five_plus_years', label: '5 years+' },
		],
	},
	monthly_revenue: {
		title: 'What is the business’s average monthly revenue?',
		columns: 2,
		options: [
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
			{ value: 'NSW', label: 'NSW', stateImage: '/comparisonone/matching-engine/state-icons/nsw.png' },
			{ value: 'VIC', label: 'VIC', stateImage: '/comparisonone/matching-engine/state-icons/vic.png' },
			{ value: 'QLD', label: 'QLD', stateImage: '/comparisonone/matching-engine/state-icons/qld.png' },
			{ value: 'SA', label: 'SA', stateImage: '/comparisonone/matching-engine/state-icons/sa.png' },
			{ value: 'WA', label: 'WA', stateImage: '/comparisonone/matching-engine/state-icons/wa.png' },
			{ value: 'NT', label: 'NT', stateImage: '/comparisonone/matching-engine/state-icons/nt.png' },
			{ value: 'ACT', label: 'ACT', stateImage: '/comparisonone/matching-engine/state-icons/act.png' },
			{ value: 'TAS', label: 'TAS', stateImage: '/comparisonone/matching-engine/state-icons/tas.png' },
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
