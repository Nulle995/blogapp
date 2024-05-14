import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const file = await loader.file;
          const response = await axios.request({
            method: "POST",
            url: `http://127.0.0.1:8000/api/blog/image/`,
            data: {
              url: file,
              // nombre del campo
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          resolve({
            default: `${response.data.url}`,
            // respuesta del servidor donde se almacena la dirección de la imagen
          });
        } catch (error) {
          reject("Error al subir imagen!");
        }
      });
    },
    abort: () => {},
  };
}
function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

function TextEditor({ content, setContent }) {
  return (
    <>
      <CKEditor
        config={{
          extraPlugins: [uploadPlugin],
        }}
        editor={ClassicEditor}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
        data={content}
      />
    </>
  );
}

export default TextEditor;
