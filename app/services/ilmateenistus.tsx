interface ClimateData {
  // Define the structure of the climate data you expect from the API here
  // For example, you might have properties like temperature, humidity, etc.
}

export async function getClimateDataByCoordinates(
  latitude: number,
  longitude: number
): Promise<ClimateData> {
  try {
    const response = await fetch(
      `https://ilmateenistusproxy.azurewebsites.net/ilmateenistus?coordinates=${latitude};${longitude}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch climate data');
    }

    const climateData: ClimateData = await response.json();

    return climateData;
  } catch (error) {
    // Handle errors, e.g., log them or throw an exception
    throw new Error('Failed to fetch climate data');
  }
}
