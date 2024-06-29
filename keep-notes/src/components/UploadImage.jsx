// UploadImage.js
import { useEffect, useState } from 'react';
import { storage } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const UploadImage = ({setImgLink}) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    
  };
  useEffect(() => {

    if (file) {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(Math.round (progress));
          //   alert('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error('Upload failed', error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // console.log('File available at', downloadURL);
              setImgLink(downloadURL);
            });
          }
        );
      }

  }, [setImgLink, file])


  return (
    <div className='uploadImage rounded-sm flex p-1 justify-between items-center m-3'>
      <input type="file" className='' onChange={(e) => handleFileChange(e)} />
      <p className='mr-2 font-["Calibri"] ml-2 text-slate-800'>{progress}%</p>
    </div>
  );
};

export default UploadImage;
