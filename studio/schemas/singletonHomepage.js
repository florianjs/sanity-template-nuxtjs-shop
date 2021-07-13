export default {
  name: "homepage",
  title: "Homepage Settings",
  type: "document",
  __experimental_actions: ["create", "update", /*'delete',*/ "publish"],
  fields: [
    {
      name: "header",
      title: "Items in header",
      type: "array",
      of: [{ type: "reference", to: { type: "item" } }],
    },
    {
      name: "body",
      title: "Header Text",
      description: "Make it short - bold text is colorized.",
      type: "blockContent",
    },
    {
      title: "Color schema",
      description: "Pick a color",
      name: "colorlist",
      type: "colorlist", // required
      options: {
        borderradius: {
          outer: "100%",
          inner: "100%",
        },
        list: [
          { title: "Red", value: "#ef4444" },
          { title: "Yellow", value: "#f59e0b" },
          { title: "Green", value: "#10b981" },
          { title: "Blue", value: "#3b82f6" },
          { title: "Indigo", value: "#6366f1" },
          { title: "Purple", value: "#8b5cf6" },
          { title: "Pink", value: "#ec4899" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "urlSuccess",
      title: "Stripe success",
      description: "redirect URL when successful",
      type: "url",
    },
    {
      name: "urlCancel",
      title: "Stripe cancel",
      description: "redirect URL when canceled",
      type: "url",
    },
    {
      name: "mainImage",
      title: "Open Graph image",
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
};
