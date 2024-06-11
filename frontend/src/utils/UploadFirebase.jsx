import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

export const uploadImageFirebase = async (file) => {
  try {
    const storageRef = ref(
      storage,
      import.meta.env.VITE_REACT_FIREBASE_IMAGES_FOLDER + file.name,
    );
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    return null;
  }
};
