export type GlobalHealthData = {
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    updated: number;
  };
  
  export async function getGlobalHealthData(): Promise<GlobalHealthData> {
    try {
      const response = await fetch('https://disease.sh/v3/covid-19/all', {
        next: { revalidate: 3600 }, // Revalidate every hour
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching global health data:', error);
      // Return a default or cached version if fetching fails
      return {
        cases: 0,
        todayCases: 0,
        deaths: 0,
        todayDeaths: 0,
        recovered: 0,
        todayRecovered: 0,
        active: 0,
        critical: 0,
        updated: 0,
      };
    }
  }