import { Editor } from "@tinymce/tinymce-react";

export default function RichEditor({ onEditorChange }) {
  return (
    <Editor
      apiKey={`${import.meta.env.VITE_TINY_MCE_API_KEY}`}
      initialValue="<p>Share your thoughts ...</p>"
      onEditorChange={onEditorChange}
      init={{
        height: 250,
        menu: {
          edit: { title: "Edit", items: "undo redo | searchreplace" },
          view: { title: "View", items: "preview | fullscreen" },
          insert: {
            title: "Insert",
            items: "image link media | charmap emoticons hr",
          },
          format: {
            title: "Format",
            items:
              "bold italic underline strikethrough superscript subscript codeformat | fontfamily fontsize align | removeformat",
          },
        },
        menubar: "edit view insert format",
        plugins: [
          "advlist",
          "autolink",
          "emoticons",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "media",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | " +
          "image media link | " +
          "bold italic underline | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "preview fullscreen | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:0.9rem }",
      }}
    />
  );
}
