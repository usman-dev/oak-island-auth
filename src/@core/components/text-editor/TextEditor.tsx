import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { Editor } from '@tinymce/tinymce-react';

const editorConfiguration = {
  toolbar: ['bold', 'italic'],
};
const TextEditor = ({ title = '', setEditorData, data = '' }) => {
  const editorRef = useRef<any>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, DecoupledEditor } = editorRef.current || {};

  useEffect(() => {
    setEditorLoaded(true);
  }, [editorRef.current]);

  const handleChange = (val: any) => {
    setEditorData(val);
  };

  return (
    <>
      <div className="App">
        <h4>{title}</h4>
        {editorLoaded ? (
          <div>
            <Editor
              tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/tinymce.min.js"
              onEditorChange={(val) => handleChange(val)}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={data && data}
              init={{
                height: 500,

                branding: false,

                directionality: 'ltr',

                plugins: [
                  'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                ],
                toolbar:
                  'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',

                menubar: 'file edit view insert format tools table help',

                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
            />
            <br />
          </div>
        ) : (
          <p>Loading....</p>
        )}
      </div>
    </>
  );
};

export default TextEditor;
