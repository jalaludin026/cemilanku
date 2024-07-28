"use client";
import React, { useState, useEffect, useRef } from "react";

export default function CustomEditor({ text, setText }) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  return editorLoaded ? (
    <div className="unset text-gray mb-5">
      <CKEditor
        editor={ClassicEditor}
        data={text}
        onInit={(editor) => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setText(data);
        }}
      />
    </div>
  ) : (
    <div>Editor loading</div>
  );
}
