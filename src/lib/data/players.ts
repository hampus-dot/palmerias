export interface Player {
	id: number;
	name: string;
	number: number;
	position: string;
	roles: ('player' | 'coach')[];
	matchesPlayed: number;
	goals: number;
	assists: number;
}

export const players: Player[] = [
	// Spelande tränare
	{
		id: 1,
		name: 'Erik Svensson',
		number: 10,
		position: 'Mittfältare',
		roles: ['player', 'coach'],
		matchesPlayed: 12,
		goals: 5,
		assists: 8
	},
	{
		id: 2,
		name: 'Johan Andersson',
		number: 5,
		position: 'Försvarare',
		roles: ['player', 'coach'],
		matchesPlayed: 12,
		goals: 1,
		assists: 2
	},
	{
		id: 3,
		name: 'Marcus Lindberg',
		number: 9,
		position: 'Forward',
		roles: ['player', 'coach'],
		matchesPlayed: 11,
		goals: 12,
		assists: 4
	},
	// Övriga spelare
	{
		id: 4,
		name: 'David Karlsson',
		number: 1,
		position: 'Målvakt',
		roles: ['player'],
		matchesPlayed: 12,
		goals: 0,
		assists: 0
	},
	{
		id: 5,
		name: 'Peter Nilsson',
		number: 3,
		position: 'Försvarare',
		roles: ['player'],
		matchesPlayed: 10,
		goals: 0,
		assists: 1
	},
	{
		id: 6,
		name: 'Andreas Berg',
		number: 4,
		position: 'Försvarare',
		roles: ['player'],
		matchesPlayed: 11,
		goals: 1,
		assists: 0
	},
	{
		id: 7,
		name: 'Stefan Larsson',
		number: 6,
		position: 'Mittfältare',
		roles: ['player'],
		matchesPlayed: 12,
		goals: 3,
		assists: 5
	},
	{
		id: 8,
		name: 'Martin Olsson',
		number: 7,
		position: 'Mittfältare',
		roles: ['player'],
		matchesPlayed: 9,
		goals: 2,
		assists: 3
	},
	{
		id: 9,
		name: 'Fredrik Persson',
		number: 8,
		position: 'Mittfältare',
		roles: ['player'],
		matchesPlayed: 12,
		goals: 4,
		assists: 6
	},
	{
		id: 10,
		name: 'Mikael Johansson',
		number: 11,
		position: 'Forward',
		roles: ['player'],
		matchesPlayed: 10,
		goals: 7,
		assists: 2
	},
	{
		id: 11,
		name: 'Henrik Gustafsson',
		number: 14,
		position: 'Mittfältare',
		roles: ['player'],
		matchesPlayed: 8,
		goals: 1,
		assists: 2
	},
	{
		id: 12,
		name: 'Daniel Eklund',
		number: 15,
		position: 'Forward',
		roles: ['player'],
		matchesPlayed: 11,
		goals: 6,
		assists: 3
	},
	{
		id: 13,
		name: 'Jonas Nyström',
		number: 17,
		position: 'Försvarare',
		roles: ['player'],
		matchesPlayed: 12,
		goals: 0,
		assists: 1
	},
	{
		id: 14,
		name: 'Patrik Lundqvist',
		number: 19,
		position: 'Mittfältare',
		roles: ['player'],
		matchesPlayed: 7,
		goals: 2,
		assists: 1
	},
	{
		id: 15,
		name: 'Robert Hansson',
		number: 20,
		position: 'Forward',
		roles: ['player'],
		matchesPlayed: 9,
		goals: 5,
		assists: 2
	}
];
