/** Base path - must EXACTLY match next.config repoName */
export const BASE_PATH = "/coachcathyandHydrosafe";

/** Resolve an image path with basePath for correct loading on dev and GitHub Pages */
export function imgPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
