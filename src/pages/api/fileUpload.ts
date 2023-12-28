import axios from "axios";
import { API_URL } from "../../config";

export type fileDTO = {
  file: any;
};

export const fileUpload = async (file: File): Promise<fileDTO | undefined> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${API_URL}/upload`, formData);

    if (response.status === 200) {
      const data = response.data.file;
      return data;
    } else {
      console.error("Error uploading image:", response.data);
    }
  } catch (error) {
    console.error("An error occurred while uploading image:", error);
  }
};

// const [file, setFile] = useState<any>();
// const handleFileChange = (file: File | null, fileDataURL: string) => {
//   setFile(file);
// };
// const handleUpload = async () => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file!);
//     const response = await axios.post(`${API_URL}/upload`, formData);
//     if (response.status === 200) {
//       const data = response.data.file;
//       return data;
//     } else {
//       console.error("Error uploading image:", response.data);
//     }
//   } catch (error) {
//     console.error("An error occurred while uploading image:", error);
//   }
// };
