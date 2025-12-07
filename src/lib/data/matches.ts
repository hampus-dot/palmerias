export interface Match {
	id: number;
	date: string;
	time: string;
	opponent: string;
	homeAway: 'Hemma' | 'Borta';
	result?: {
		goalsFor: number;
		goalsAgainst: number;
	};
	location: string;
	scorers?: { playerId: number; goals: number }[];
	assists?: { playerId: number; assists: number }[];
}

export const matches: Match[] = [
	{
		id: 1,
		date: '2025-11-15',
		time: '15:00',
		opponent: 'Gais',
		homeAway: 'Hemma',
		location: 'Palmeriavallen',
		result: { goalsFor: 3, goalsAgainst: 1 },
		scorers: [
			{ playerId: 3, goals: 2 },
			{ playerId: 10, goals: 1 }
		],
		assists: [
			{ playerId: 1, goals: 2 },
			{ playerId: 7, goals: 1 }
		]
	},
	{
		id: 2,
		date: '2025-11-22',
		time: '14:00',
		opponent: 'IFK Göteborg',
		homeAway: 'Borta',
		location: 'Gamla Ullevi',
		result: { goalsFor: 1, goalsAgainst: 2 },
		scorers: [{ playerId: 9, goals: 1 }],
		assists: [{ playerId: 8, goals: 1 }]
	},
	{
		id: 3,
		date: '2025-11-29',
		time: '16:00',
		opponent: 'BK Häcken',
		homeAway: 'Hemma',
		location: 'Palmeriavallen',
		result: { goalsFor: 2, goalsAgainst: 2 },
		scorers: [
			{ playerId: 3, goals: 1 },
			{ playerId: 11, goals: 1 }
		],
		assists: [
			{ playerId: 1, goals: 1 },
			{ playerId: 7, goals: 1 }
		]
	},
	{
		id: 4,
		date: '2025-12-11',
		time: '19:00',
		opponent: 'Örgryte',
		homeAway: 'Borta',
		location: 'Gamla Ullevi'
	},
	{
		id: 5,
		date: '2025-12-18',
		time: '15:00',
		opponent: 'Utsiktens BK',
		homeAway: 'Hemma',
		location: 'Palmeriavallen'
	}
];
