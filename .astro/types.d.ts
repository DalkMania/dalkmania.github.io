declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"education": {
"bachelors-degree.mdx": {
	id: "bachelors-degree.mdx";
  slug: "bachelors-degree";
  body: string;
  collection: "education";
  data: InferEntrySchema<"education">
} & { render(): Render[".mdx"] };
"masters-degree.mdx": {
	id: "masters-degree.mdx";
  slug: "masters-degree";
  body: string;
  collection: "education";
  data: InferEntrySchema<"education">
} & { render(): Render[".mdx"] };
};
"experience": {
"01-gameon.mdx": {
	id: "01-gameon.mdx";
  slug: "01-gameon";
  body: string;
  collection: "experience";
  data: InferEntrySchema<"experience">
} & { render(): Render[".mdx"] };
"02-freelance-web-developer.mdx": {
	id: "02-freelance-web-developer.mdx";
  slug: "02-freelance-web-developer";
  body: string;
  collection: "experience";
  data: InferEntrySchema<"experience">
} & { render(): Render[".mdx"] };
"03-talend.mdx": {
	id: "03-talend.mdx";
  slug: "03-talend";
  body: string;
  collection: "experience";
  data: InferEntrySchema<"experience">
} & { render(): Render[".mdx"] };
"04-cake-corporation.mdx": {
	id: "04-cake-corporation.mdx";
  slug: "04-cake-corporation";
  body: string;
  collection: "experience";
  data: InferEntrySchema<"experience">
} & { render(): Render[".mdx"] };
"05-revel-systems.mdx": {
	id: "05-revel-systems.mdx";
  slug: "05-revel-systems";
  body: string;
  collection: "experience";
  data: InferEntrySchema<"experience">
} & { render(): Render[".mdx"] };
"06-pd-media-lab.mdx": {
	id: "06-pd-media-lab.mdx";
  slug: "06-pd-media-lab";
  body: string;
  collection: "experience";
  data: InferEntrySchema<"experience">
} & { render(): Render[".mdx"] };
};
"portfolio": {
"01-locu-api-wp-plugin.mdx": {
	id: "01-locu-api-wp-plugin.mdx";
  slug: "01-locu-api-wp-plugin";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"02-facebook-events-api-wp-plugin.mdx": {
	id: "02-facebook-events-api-wp-plugin.mdx";
  slug: "02-facebook-events-api-wp-plugin";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"03-hiringthing-api-wp-plugin.mdx": {
	id: "03-hiringthing-api-wp-plugin.mdx";
  slug: "03-hiringthing-api-wp-plugin";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"04-instagram-api-wp-plugin.mdx": {
	id: "04-instagram-api-wp-plugin.mdx";
  slug: "04-instagram-api-wp-plugin";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"05-lever-api-wp-plugin.mdx": {
	id: "05-lever-api-wp-plugin.mdx";
  slug: "05-lever-api-wp-plugin";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"06-revel-systems-version-1.mdx": {
	id: "06-revel-systems-version-1.mdx";
  slug: "06-revel-systems-version-1";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"07-revel-systems-version-2.mdx": {
	id: "07-revel-systems-version-2.mdx";
  slug: "07-revel-systems-version-2";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"08-mancini-law-offices.mdx": {
	id: "08-mancini-law-offices.mdx";
  slug: "08-mancini-law-offices";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"09-jack-and-tonys-pitch-mockup.mdx": {
	id: "09-jack-and-tonys-pitch-mockup.mdx";
  slug: "09-jack-and-tonys-pitch-mockup";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"10-greenhouse-job-board-api-wp-plugin.mdx": {
	id: "10-greenhouse-job-board-api-wp-plugin.mdx";
  slug: "10-greenhouse-job-board-api-wp-plugin";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"11-cake-website.mdx": {
	id: "11-cake-website.mdx";
  slug: "11-cake-website";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"12-sysco-united-way.mdx": {
	id: "12-sysco-united-way.mdx";
  slug: "12-sysco-united-way";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"13-wp-wpbakery-page-builder-amazon-s3-addon.mdx": {
	id: "13-wp-wpbakery-page-builder-amazon-s3-addon.mdx";
  slug: "13-wp-wpbakery-page-builder-amazon-s3-addon";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"14-react-sid-player.mdx": {
	id: "14-react-sid-player.mdx";
  slug: "14-react-sid-player";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"15-wp-graphql-cpt.mdx": {
	id: "15-wp-graphql-cpt.mdx";
  slug: "15-wp-graphql-cpt";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"16-wp-graphql-mb.mdx": {
	id: "16-wp-graphql-mb.mdx";
  slug: "16-wp-graphql-mb";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"17-tv-show-tracker.mdx": {
	id: "17-tv-show-tracker.mdx";
  slug: "17-tv-show-tracker";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"18-wp-lazy-loading.mdx": {
	id: "18-wp-lazy-loading.mdx";
  slug: "18-wp-lazy-loading";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"19-angular-chuck-norris-pwa.mdx": {
	id: "19-angular-chuck-norris-pwa.mdx";
  slug: "19-angular-chuck-norris-pwa";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"20-wordpress-git-installer.mdx": {
	id: "20-wordpress-git-installer.mdx";
  slug: "20-wordpress-git-installer";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"21-react-hangman.mdx": {
	id: "21-react-hangman.mdx";
  slug: "21-react-hangman";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"22-gatsby-plugin-osano.mdx": {
	id: "22-gatsby-plugin-osano.mdx";
  slug: "22-gatsby-plugin-osano";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"23-gatsby-plugin-snap-engage.mdx": {
	id: "23-gatsby-plugin-snap-engage.mdx";
  slug: "23-gatsby-plugin-snap-engage";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"24-jazzhr-api-wp-plugin.mdx": {
	id: "24-jazzhr-api-wp-plugin.mdx";
  slug: "24-jazzhr-api-wp-plugin";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"25-jazzhr-gatsby-plugin.mdx": {
	id: "25-jazzhr-gatsby-plugin.mdx";
  slug: "25-jazzhr-gatsby-plugin";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"26-nextjs-crud-todo-app.mdx": {
	id: "26-nextjs-crud-todo-app.mdx";
  slug: "26-nextjs-crud-todo-app";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"27-rock-paper-scissors-lizard-spock-app.mdx": {
	id: "27-rock-paper-scissors-lizard-spock-app.mdx";
  slug: "27-rock-paper-scissors-lizard-spock-app";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
