import { z, defineCollection } from "astro:content";

const portfolioCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      section: z.string(),
      skills: z.array(z.string()),
      introparagraph: z.string().optional(),
      coverimage: image(),
      githuburl: z.string().optional(),
      demourl: z.string().optional(),
    }),
});

const educationCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      school: z.string(),
      location: z.string(),
      years: z.string(),
      image: image(),
    }),
});

const experienceCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      company: z.string(),
      location: z.string(),
      years: z.string(),
      image: image(),
    }),
});

export const collections = {
  education: educationCollection,
  experience: experienceCollection,
  portfolio: portfolioCollection,
};
