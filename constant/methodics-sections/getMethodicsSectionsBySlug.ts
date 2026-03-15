import { mockMethodics } from "./methodics-sections";

export async function getMethodicsSectionsBySlug(category: string) {
  console.log("FETCH category:", category);

  return mockMethodics.find((m) => m.category === category) || null;
}
