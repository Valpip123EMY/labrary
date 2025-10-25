// Generate random placeholder image URL using Picsum Photos
export const getPlaceholderImage = (title: string, category: string): string => {
  // Create a unique seed based on the title
  const seed = title.split(' ').join('').toLowerCase();
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
  const baseId = categoryMap[category.toLowerCase()] || Math.floor(Math.random() * 1000);
  const id = (baseId + seed.length) % 1000;
  return `https://picsum.photos/id/${id}/800/480`;
};
