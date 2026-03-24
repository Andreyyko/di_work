export async function getMethodicBySlug(slug: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const res = await fetch(
    `${API_URL}/methods?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&populate=*`
  );

  if (!res.ok) {
    throw new Error("Failed to load method");
  }

  const json = await res.json();
  const item = json.data?.[0];

  if (!item) {
    return null;
  }

  const attrs = item.attributes ?? item;

  return {
    id: item.id,
    ...attrs,
  };
}
