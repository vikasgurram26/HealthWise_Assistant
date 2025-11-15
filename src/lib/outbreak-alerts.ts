
'use server';

export type OutbreakAlert = {
  disease: string;
  alertLevel: 'High' | 'Medium' | 'Low';
  description: string;
  affectedAreas: string[];
  status: 'Active' | 'Past';
  url: string; // Added to link to the source
  pubDate: string; // Added for sorting and display
};

// Fetches real-time news from the World Health Organization (WHO)
async function getWhoNews(): Promise<OutbreakAlert[]> {
  try {
    const response = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.who.int%2Frss-feeds%2Fnews-english.xml',
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );
    if (!response.ok) {
      console.error('Failed to fetch WHO news');
      return [];
    }
    const data = await response.json();
    
    if (data.status !== 'ok' || !data.items) {
      console.error('WHO news API returned an error or no items');
      return [];
    }

    return data.items.map((item: any) => ({
      disease: item.title,
      alertLevel: 'High' as const, // Defaulting to high as it's news, can be adjusted
      description: item.description || 'No description available.',
      affectedAreas: [], // The RSS feed does not provide structured location data
      status: 'Active' as const,
      url: item.link,
      pubDate: item.pubDate,
    }));
  } catch (error) {
    console.error('Error fetching or parsing WHO news:', error);
    return [];
  }
}

/**
 * Fetches outbreak alerts for a given location for use in Genkit tools.
 * Note: The WHO RSS feed does not provide structured location data, so this function will return recent global alerts.
 * @param location The location to search for alerts.
 * @returns A promise that resolves to an array of partial outbreak alerts.
 */
export async function getOutbreakAlerts(
  location: string
): Promise<Partial<OutbreakAlert>[]> {
  const alerts = await getWhoNews();
  // The tool only needs the disease and alert level.
  return alerts.map(({ disease, alertLevel }) => ({ disease, alertLevel }));
}

/**
 * Fetches full outbreak alert details for a given location for UI display.
 * @param location The location to search for alerts. The location is currently unused as we fetch global alerts.
 * @returns A promise that resolves to an array of full outbreak alerts.
 */
export async function getFullOutbreakAlerts(
  location: string
): Promise<OutbreakAlert[]> {
    return await getWhoNews();
}
