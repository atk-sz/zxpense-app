export const generateId = (title?: string, length: number = 7) => {
  const unique = Math.random()
    .toString(36)
    .substring(2, 2 + length);
  if (title) {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${slug}-${unique}`;
  }
  return unique;
};
