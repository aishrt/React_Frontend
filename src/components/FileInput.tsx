import React, { useState } from "react";

interface FileInputProps {
  onFileChange: (file: File | null, fileDataURL: string) => void;
  defaultImage?: string;
}

const generateRandomId = () =>
  `file-input-${Math.random().toString(36).substr(2, 9)}`;

const FileInput: React.FC<FileInputProps> = ({
  onFileChange,
  defaultImage,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileDataURL, setFileDataURL] = useState<string>("");
  const fileId = generateRandomId();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = function (event) {
        if (event.target && event.target.result) {
          setFileDataURL(event.target.result as string);
          onFileChange(selectedFile, event.target.result as string);
        }
      };

      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    } else {
      setFile(null);
      setFileDataURL("");
      onFileChange(null, "");
    }
  };

  return (
    <div className="inputFile">
      <label htmlFor={fileId}>
        {file ? (
          <img src={fileDataURL} alt="Selected" />
        ) : (
          <>
            {defaultImage ? (
              <img src={defaultImage} alt="Selected" />
            ) : (
              <i className="fa-solid fa-upload"></i>
            )}
          </>
        )}
      </label>
      <input id={fileId} type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileInput;

// import React, { useState } from "react";

// interface FileInputProps {
//   onFileChange: (file: File | null, fileDataURL: string) => void;
//   defaultImage?: string;
// }

// const FileInput: React.FC<FileInputProps> = ({
//   onFileChange,
//   defaultImage,
// }) => {
//   const [file, setFile] = useState<File | null>(null);
//   const [fileDataURL, setFileDataURL] = useState<string>("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];

//     if (selectedFile) {
//       const reader = new FileReader();

//       reader.onload = function (event) {
//         if (event.target && event.target.result) {
//           setFileDataURL(event.target.result as string);
//           onFileChange(selectedFile, event.target.result as string);
//         }
//       };

//       reader.readAsDataURL(selectedFile);
//       setFile(selectedFile);
//     } else {
//       setFile(null);
//       setFileDataURL("");
//       onFileChange(null, "");
//     }
//   };

//   return (
//     <div className="inputFile">
//       <label htmlFor="input-file">
//         {file ? (
//           <img src={fileDataURL} alt="Selected" />
//         ) : (
//           <>
//             {defaultImage ? (
//               <img src={defaultImage} alt="Selected" />
//             ) : (
//               <i className="fa-solid fa-upload"></i>
//             )}
//           </>
//         )}
//       </label>
//       <input id="input-file" type="file" onChange={handleFileChange} />
//     </div>
//   );
// };

// export default FileInput;

// const [file, setFile] = useState(null);
// const [fileDataURL, setFileDataURL] = useState<string>("");
// const [hasImage, setHasImage] = useState(false);

// const handleFileChange = (e: any) => {
//   const selectedfile = e.target.files[0];
//   const reader = new FileReader();
//   reader.onload = function (event) {
//     if (event.target && event.target.result) {
//       setFileDataURL(event.target.result as string);
//       setHasImage(true);
//     }
//   };
//   if (selectedfile) {
//     reader.readAsDataURL(selectedfile);
//     setFile(selectedfile);
//   }
// };

//   <div className="inputFile">
//   <label htmlFor="input-file">
//     {hasImage ? (
//       <img src={fileDataURL} />
//     ) : (
//       <i className="fa-solid fa-upload"></i>
//     )}
//   </label>
//   <input id="input-file" type="file" onChange={handleFileChange} />
// </div>
