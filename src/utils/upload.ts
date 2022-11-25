import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { message } from 'antd';

export const upload = async (file: File, path?: string) => {
  const storage = getStorage();
  const storageRef = ref(
    storage,
    `${path ?? ''}${v4()}.${file.name?.split('.').pop()}`
  );
  const url = await uploadBytes(storageRef, file)
    .then(async (snapshot) => {
      const url = await getDownloadURL(snapshot.ref);
      message.success('Upload thành công');
      return url;
    })
    .catch((error) => console.log(error));

  return url || '';
};
