import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const projectCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects/" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      technologies: z.array(z.string()),
      image: image().optional(),
      liveUrl: z.string().optional(),
      githubUrl: z.string().optional(),
    }),
});

const experienceCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/experience/" }),
  schema: () =>
    z.object({
      title: z.string(),
      company: z.string(),
      period: z.string(),
      location: z.string(),
      description: z.string(),
      technologies: z.array(z.string()),
    }),
});

export const collections = {
  experience: experienceCollection,
  projects: projectCollection,
};
