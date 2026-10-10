export const withSiteBase = (path: string): string => {
  if (!path.startsWith('/') || path.startsWith('//')) return path;

  return `${import.meta.env.BASE_URL}${path.slice(1)}`;
};
