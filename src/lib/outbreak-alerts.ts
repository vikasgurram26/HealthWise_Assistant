export type OutbreakAlert = {
    disease: string;
    alertLevel: 'High' | 'Medium' | 'Low';
    description: string;
    affectedAreas: string[];
};

// This is a mock data source for demonstration purposes.
// In a real application, this would fetch data from a live API.
const mockAlerts: OutbreakAlert[] = [
    {
        disease: 'Influenza (Flu)',
        alertLevel: 'High',
        description: 'Seasonal flu activity is high. Widespread cases reported.',
        affectedAreas: ['new york', 'los angeles', 'chicago'],
    },
    {
        disease: 'COVID-19',
        alertLevel: 'Medium',
        description: 'New variant seeing a slight increase in cases. Monitor symptoms.',
        affectedAreas: ['new york', 'seattle'],
    },
    {
        disease: 'Norovirus',
        alertLevel: 'Low',
        description: 'Localized outbreaks in some communities. Practice good hygiene.',
        affectedAreas: ['chicago'],
    },
];

/**
 * Fetches outbreak alerts for a given location.
 * @param location The location to search for alerts.
 * @returns A promise that resolves to an array of outbreak alerts.
 */
export async function getOutbreakAlerts(location: string): Promise<Partial<OutbreakAlert>[]> {
    const locationLower = location.toLowerCase();
    const alerts = mockAlerts.filter(alert =>
        alert.affectedAreas.some(area => locationLower.includes(area))
    );

    // The tool only needs the disease and alert level.
    return alerts.map(({ disease, alertLevel }) => ({ disease, alertLevel }));
}
