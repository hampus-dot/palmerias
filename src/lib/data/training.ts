export interface TrainingSession {
	id: number;
	date: string;
	time: string;
	location: string;
	type: 'Lagtränning' | 'Matchförberedelse' | 'Taktik' | 'Fysträning';
	attendance: number[];
	notes?: string;
}

export const trainingSessions: TrainingSession[] = [
	{
		id: 1,
		date: '2025-12-08',
		time: '18:00 - 20:00',
		location: 'Palmeriavallen',
		type: 'Lagtränning',
		attendance: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		notes: 'Focus på bollinnehav'
	},
	{
		id: 2,
		date: '2025-12-10',
		time: '18:30 - 20:00',
		location: 'Palmeriavallen',
		type: 'Matchförberedelse',
		attendance: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
		notes: 'Inför match mot Örgryte'
	},
	{
		id: 3,
		date: '2025-12-12',
		time: '19:00 - 20:30',
		location: 'Inomhushall',
		type: 'Taktik',
		attendance: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		notes: 'Genomgång av formationer'
	},
	{
		id: 4,
		date: '2025-12-15',
		time: '17:00 - 18:30',
		location: 'Palmeriavallen',
		type: 'Fysträning',
		attendance: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		notes: 'Konditions- och styrketräning'
	}
];
