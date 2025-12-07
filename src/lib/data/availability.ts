export interface Availability {
	playerId: number;
	eventId: number;
	eventType: 'training' | 'match';
	status: 'yes' | 'no' | 'maybe' | 'pending';
}

export const availabilityData: Availability[] = [
	// Training 1
	{ playerId: 1, eventId: 1, eventType: 'training', status: 'yes' },
	{ playerId: 2, eventId: 1, eventType: 'training', status: 'yes' },
	{ playerId: 3, eventId: 1, eventType: 'training', status: 'no' },
	// Add more as needed
];
