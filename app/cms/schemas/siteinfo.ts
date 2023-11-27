import { defineField, defineType } from "sanity";

const websiteSettings = defineType({
  name: "websiteSettings",
  type: "document",
  title: "Website Settings",
  fields: [
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title"
    }),
    defineField({
      name: "backgroundColor",
      type: "string", 
      title: "Background Color",
    }),
  ],
});

export const websiteSchemas = [websiteSettings];
