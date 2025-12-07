export interface TrainingSession {
	id: number;
	date: string;
	time: string;
	location: string;
	type: 'Team Training' | 'Match Preparation' | 'Tactics' | 'Physical Training';
	attendance: number[];
	notes?: string;
}

export const trainingSessions: TrainingSession[] = [
	{
		id: 1,
		date: '2025-12-08',
		time: '18:00 - 20:00',
		location: 'Palmeriavallen',
		type: 'Team Training',
		attendance: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		notes: 'Focus on ball possession'
	},
	{
		id: 2,
		date: '2025-12-10',
		time: '18:30 - 20:00',
		location: 'Palmeriavallen',
		type: 'Match Preparation',
		attendance: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
		notes: 'Preparation for match against Örgryte'
	},
	{
		id: 3,
		date: '2025-12-12',
		time: '19:00 - 20:30',
		location: 'Indoor Hall',
		type: 'Tactics',
		attendance: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		notes: 'Formation review'
	},
	{
		id: 4,
		date: '2025-12-15',
		time: '17:00 - 18:30',
		location: 'Palmeriavallen',
		type: 'Physical Training',
		attendance: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		notes: 'Conditioning and strength training'
	}
];
