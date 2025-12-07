export interface Team {
	id: number;
	name: string;
	played: number;
	won: number;
	drawn: number;
	lost: number;
	goalsFor: number;
	goalsAgainst: number;
	goalDifference: number;
	points: number;
}

export const leagueTable: Team[] = [
	{
		id: 1,
		name: 'Hammarby IF',
		played: 15,
		won: 11,
		drawn: 2,
		lost: 2,
		goalsFor: 34,
		goalsAgainst: 15,
		goalDifference: 19,
		points: 35
	},
	{
		id: 2,
		name: 'Djurgårdens IF',
		played: 15,
		won: 10,
		drawn: 3,
		lost: 2,
		goalsFor: 32,
		goalsAgainst: 14,
		goalDifference: 18,
		points: 33
	},
	{
		id: 3,
		name: 'AIK',
		played: 15,
		won: 9,
		drawn: 4,
		lost: 2,
		goalsFor: 28,
		goalsAgainst: 12,
		goalDifference: 16,
		points: 31
	},
	{
		id: 4,
		name: 'Palmerias FC',
		played: 15,
		won: 8,
		drawn: 3,
		lost: 4,
		goalsFor: 26,
		goalsAgainst: 18,
		goalDifference: 8,
		points: 27
	},
	{
		id: 5,
		name: 'IFK Göteborg',
		played: 15,
		won: 7,
		drawn: 5,
		lost: 3,
		goalsFor: 24,
		goalsAgainst: 16,
		goalDifference: 8,
		points: 26
	},
	{
		id: 6,
		name: 'Malmö FF',
		played: 15,
		won: 7,
		drawn: 4,
		lost: 4,
		goalsFor: 23,
		goalsAgainst: 19,
		goalDifference: 4,
		points: 25
	},
	{
		id: 7,
		name: 'BK Häcken',
		played: 15,
		won: 6,
		drawn: 5,
		lost: 4,
		goalsFor: 21,
		goalsAgainst: 18,
		goalDifference: 3,
		points: 23
	},
	{
		id: 8,
		name: 'IF Elfsborg',
		played: 15,
		won: 5,
		drawn: 4,
		lost: 6,
		goalsFor: 18,
		goalsAgainst: 22,
		goalDifference: -4,
		points: 19
	},
	{
		id: 9,
		name: 'Örgryte IS',
		played: 15,
		won: 3,
		drawn: 3,
		lost: 9,
		goalsFor: 14,
		goalsAgainst: 28,
		goalDifference: -14,
		points: 12
	},
	{
		id: 10,
		name: 'GAIS',
		played: 15,
		won: 2,
		drawn: 2,
		lost: 11,
		goalsFor: 11,
		goalsAgainst: 33,
		goalDifference: -22,
		points: 8
	}
];
