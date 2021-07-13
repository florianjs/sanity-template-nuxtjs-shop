export default {
  name: "item",
  title: "Item",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      title: "Sizes & Prices",
      name: "prices",
      type: "array",
      of: [{ type: "variant" }],
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
        crop: true,
      },
      fields: [
        {
          title: "Alternative Text",
          name: "alt",
          type: "string",
        },
      ],
    },
    {
      name: "imagesGallery",
      title: "Images gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            crop: true,
          },
          fields: [
            {
              title: "Alternative Text",
              name: "alt",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],

  initialValue: {
    featured: false,
  },

  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
};
