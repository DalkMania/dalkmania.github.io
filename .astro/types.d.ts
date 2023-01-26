declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (data: CollectionEntry<C>) => boolean
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"education": {
"bachelors-degree.mdx": {
  id: "bachelors-degree.mdx",
  slug: "bachelors-degree",
  body: string,
  collection: "education",
  data: any
},
"masters-degree.mdx": {
  id: "masters-degree.mdx",
  slug: "masters-degree",
  body: string,
  collection: "education",
  data: any
},
},
"experience": {
"01-gameon.mdx": {
  id: "01-gameon.mdx",
  slug: "01-gameon",
  body: string,
  collection: "experience",
  data: any
},
"02-freelance-web-developer.mdx": {
  id: "02-freelance-web-developer.mdx",
  slug: "02-freelance-web-developer",
  body: string,
  collection: "experience",
  data: any
},
"03-talend.mdx": {
  id: "03-talend.mdx",
  slug: "03-talend",
  body: string,
  collection: "experience",
  data: any
},
"04-cake-corporation.mdx": {
  id: "04-cake-corporation.mdx",
  slug: "04-cake-corporation",
  body: string,
  collection: "experience",
  data: any
},
"05-revel-systems.mdx": {
  id: "05-revel-systems.mdx",
  slug: "05-revel-systems",
  body: string,
  collection: "experience",
  data: any
},
"06-pd-media-lab.mdx": {
  id: "06-pd-media-lab.mdx",
  slug: "06-pd-media-lab",
  body: string,
  collection: "experience",
  data: any
},
},
"portfolio": {
"01-locu-api-wp-plugin.mdx": {
  id: "01-locu-api-wp-plugin.mdx",
  slug: "01-locu-api-wp-plugin",
  body: string,
  collection: "portfolio",
  data: any
},
"02-facebook-events-api-wp-plugin.mdx": {
  id: "02-facebook-events-api-wp-plugin.mdx",
  slug: "02-facebook-events-api-wp-plugin",
  body: string,
  collection: "portfolio",
  data: any
},
"03-hiringthing-api-wp-plugin.mdx": {
  id: "03-hiringthing-api-wp-plugin.mdx",
  slug: "03-hiringthing-api-wp-plugin",
  body: string,
  collection: "portfolio",
  data: any
},
"04-instagram-api-wp-plugin.mdx": {
  id: "04-instagram-api-wp-plugin.mdx",
  slug: "04-instagram-api-wp-plugin",
  body: string,
  collection: "portfolio",
  data: any
},
"05-lever-api-wp-plugin.mdx": {
  id: "05-lever-api-wp-plugin.mdx",
  slug: "05-lever-api-wp-plugin",
  body: string,
  collection: "portfolio",
  data: any
},
"06-revel-systems-version-1.mdx": {
  id: "06-revel-systems-version-1.mdx",
  slug: "06-revel-systems-version-1",
  body: string,
  collection: "portfolio",
  data: any
},
"07-revel-systems-version-2.mdx": {
  id: "07-revel-systems-version-2.mdx",
  slug: "07-revel-systems-version-2",
  body: string,
  collection: "portfolio",
  data: any
},
"08-mancini-law-offices.mdx": {
  id: "08-mancini-law-offices.mdx",
  slug: "08-mancini-law-offices",
  body: string,
  collection: "portfolio",
  data: any
},
"09-jack-and-tonys-pitch-mockup.mdx": {
  id: "09-jack-and-tonys-pitch-mockup.mdx",
  slug: "09-jack-and-tonys-pitch-mockup",
  body: string,
  collection: "portfolio",
  data: any
},
"10-greenhouse-job-board-api-wp-plugin.mdx": {
  id: "10-greenhouse-job-board-api-wp-plugin.mdx",
  slug: "10-greenhouse-job-board-api-wp-plugin",
  body: string,
  collection: "portfolio",
  data: any
},
"11-cake-website.mdx": {
  id: "11-cake-website.mdx",
  slug: "11-cake-website",
  body: string,
  collection: "portfolio",
  data: any
},
"12-sysco-united-way.mdx": {
  id: "12-sysco-united-way.mdx",
  slug: "12-sysco-united-way",
  body: string,
  collection: "portfolio",
  data: any
},
"13-wp-wpbakery-page-builder-amazon-s3-addon.mdx": {
  id: "13-wp-wpbakery-page-builder-amazon-s3-addon.mdx",
  slug: "13-wp-wpbakery-page-builder-amazon-s3-addon",
  body: string,
  collection: "portfolio",
  data: any
},
"14-react-sid-player.mdx": {
  id: "14-react-sid-player.mdx",
  slug: "14-react-sid-player",
  body: string,
  collection: "portfolio",
  data: any
},
"15-wp-graphql-cpt.mdx": {
  id: "15-wp-graphql-cpt.mdx",
  slug: "15-wp-graphql-cpt",
  body: string,
  collection: "portfolio",
  data: any
},
"16-wp-graphql-mb.mdx": {
  id: "16-wp-graphql-mb.mdx",
  slug: "16-wp-graphql-mb",
  body: string,
  collection: "portfolio",
  data: any
},
"17-tv-show-tracker.mdx": {
  id: "17-tv-show-tracker.mdx",
  slug: "17-tv-show-tracker",
  body: string,
  collection: "portfolio",
  data: any
},
"18-wp-lazy-loading.mdx": {
  id: "18-wp-lazy-loading.mdx",
  slug: "18-wp-lazy-loading",
  body: string,
  collection: "portfolio",
  data: any
},
"19-angular-chuck-norris-pwa.mdx": {
  id: "19-angular-chuck-norris-pwa.mdx",
  slug: "19-angular-chuck-norris-pwa",
  body: string,
  collection: "portfolio",
  data: any
},
"20-wordpress-git-installer.mdx": {
  id: "20-wordpress-git-installer.mdx",
  slug: "20-wordpress-git-installer",
  body: string,
  collection: "portfolio",
  data: any
},
"21-react-hangman.mdx": {
  id: "21-react-hangman.mdx",
  slug: "21-react-hangman",
  body: string,
  collection: "portfolio",
  data: any
},
"22-gatsby-plugin-osano.mdx": {
  id: "22-gatsby-plugin-osano.mdx",
  slug: "22-gatsby-plugin-osano",
  body: string,
  collection: "portfolio",
  data: any
},
"23-gatsby-plugin-snap-engage.mdx": {
  id: "23-gatsby-plugin-snap-engage.mdx",
  slug: "23-gatsby-plugin-snap-engage",
  body: string,
  collection: "portfolio",
  data: any
},
"24-jazzhr-api-wp-plugin.mdx": {
  id: "24-jazzhr-api-wp-plugin.mdx",
  slug: "24-jazzhr-api-wp-plugin",
  body: string,
  collection: "portfolio",
  data: any
},
"25-jazzhr-gatsby-plugin.mdx": {
  id: "25-jazzhr-gatsby-plugin.mdx",
  slug: "25-jazzhr-gatsby-plugin",
  body: string,
  collection: "portfolio",
  data: any
},
"26-nextjs-crud-todo-app.mdx": {
  id: "26-nextjs-crud-todo-app.mdx",
  slug: "26-nextjs-crud-todo-app",
  body: string,
  collection: "portfolio",
  data: any
},
"27-rock-paper-scissors-lizard-spock-app.mdx": {
  id: "27-rock-paper-scissors-lizard-spock-app.mdx",
  slug: "27-rock-paper-scissors-lizard-spock-app",
  body: string,
  collection: "portfolio",
  data: any
},
},

	};

	type ContentConfig = never;
}
