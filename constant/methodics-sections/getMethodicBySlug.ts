import { mockMethodic } from "@/constant/methodics-sections/mokMethodic";

export async function getMethodicBySlug(methodic: string) {
  
  if (mockMethodic.methodic === methodic) {
    return mockMethodic;
  }

  return null;  
}
