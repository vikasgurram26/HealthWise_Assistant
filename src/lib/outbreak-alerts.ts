
export type OutbreakAlert = {
  disease: string;
  alertLevel: 'High' | 'Medium' | 'Low';
  description: string;
  affectedAreas: string[];
  status: 'Active' | 'Past';
};

// This is a mock data source for demonstration purposes.
// In a real application, this would fetch data from a live API.
const mockAlerts: OutbreakAlert[] = [
  {
    disease: 'Influenza (Flu)',
    alertLevel: 'High',
    description:
      'Seasonal flu activity is high. Widespread cases reported. Vaccination is highly recommended.',
    affectedAreas: ['new york', 'los angeles', 'chicago'],
    status: 'Active',
  },
  {
    disease: 'COVID-19',
    alertLevel: 'Medium',
    description:
      'A new variant is causing a slight increase in cases. Monitor symptoms and consider wearing a mask in crowded indoor spaces.',
    affectedAreas: ['new york', 'seattle'],
    status: 'Active',
  },
  {
    disease: 'Norovirus',
    alertLevel: 'Low',
    description:
      'Localized outbreaks have been reported in some communities. Practice good hand hygiene to prevent infection.',
    affectedAreas: ['chicago'],
    status: 'Active',
  },
  {
    disease: 'West Nile Virus',
    alertLevel: 'Low',
    description:
      'Mosquito activity is present. Use insect repellent and remove standing water to reduce risk.',
    affectedAreas: ['los angeles', 'miami'],
    status: 'Active',
  },
  {
    disease: 'Zika Virus',
    alertLevel: 'High',
    description:
      'A significant outbreak occurred, leading to travel advisories and extensive mosquito control efforts.',
    affectedAreas: ['miami'],
    status: 'Past',
  },
  {
    disease: 'H1N1 (Swine Flu)',
    alertLevel: 'High',
    description:
      'A global pandemic in 2009. The "past" status reflects the containment of the initial pandemic wave.',
    affectedAreas: ['new york', 'los angeles', 'chicago', 'seattle'],
    status: 'Past',
  },
];

/**
 * Fetches outbreak alerts for a given location for use in Genkit tools.
 * @param location The location to search for alerts.
 * @returns A promise that resolves to an array of partial outbreak alerts.
 */
export async function getOutbreakAlerts(
  location: string
): Promise<Partial<OutbreakAlert>[]> {
  const locationLower = location.toLowerCase();
  const alerts = mockAlerts.filter(
    (alert) =>
      alert.status === 'Active' &&
      alert.affectedAreas.some((area) => locationLower.includes(area))
  );

  // The tool only needs the disease and alert level.
  return alerts.map(({ disease, alertLevel }) => ({ disease, alertLevel }));
}

/**
 * Fetches full outbreak alert details for a given location for UI display.
 * @param location The location to search for alerts.
 * @returns A promise that resolves to an array of full outbreak alerts.
 */
export async function getFullOutbreakAlerts(
  location: string
): Promise<OutbreakAlert[]> {
  const locationLower = location.toLowerCase();
  return mockAlerts.filter((alert) =>
    alert.affectedAreas.some((area) => locationLower.includes(area))
  );
}
