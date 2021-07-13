import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Settings")
    .items([
      S.listItem()
        .title("Homepage Settings")
        .child(
          S.editor()
            .title("Homepage Settings")
            .id("homepage")
            .schemaType("homepage")
            .documentId("singleton-homepage")
        ),

      ...S.documentTypeListItems().filter(
        (listItem) => !["homepage"].includes(listItem.getId())
      ),
    ]);
