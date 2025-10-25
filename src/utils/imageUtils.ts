// Generate random placeholder image URL using Picsum Photos
export const getPlaceholderImage = (title: string, institution: string, category: string): string => {
  // Create a unique seed based on the title and institution
  const seed = title.split(' ').join('').toLowerCase();
  
  // Map categories to Picsum photo IDs for better relevance
  const categoryMap: Record<string, number> = {
    'computer science': 0,
    'physics': 10,
    'biology': 20,
    'engineering': 30,
    'neuroscience': 40,
    'chemistry': 50,
    'mathematics': 60,
    'environmental science': 70,
    'social sciences': 80,
    'medicine': 90
  };
  
  // Get the base ID for the category, or use a random one
  const baseId = categoryMap[category.toLowerCase()] || Math.floor(Math.random() * 1000);
  
  // Generate a random ID based on the title and base ID
  const id = (baseId + seed.length) % 1000;
  
  // Return a random image from Picsum Photos with fixed dimensions in color
  return `https://picsum.photos/id/${id}/800/480`;
};
