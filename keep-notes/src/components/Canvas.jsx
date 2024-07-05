import { useEffect, useRef, useState } from "react";
import { db, storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Canvas({ isPopUp, docId, userDetails}) {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    // getting the canvas and the context
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.style.width = "100%";
    canvas.style.height = "100%";

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // drawing after it

    context.lineWidth = 3;
    context.lineCap = "round";
    context.strokeStyle = "black";
  }, [isPopUp]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    context.beginPath();

    context.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };
  const onDrawing = (e) => {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    context.stroke();
  };
  const endDrawing = () => {
    setIsDrawing(false);
  };

  function downloadCanvas(e) {
    const link = e.currentTarget;
    link.setAttribute("download", docId + "_Canvas.png");
    let img = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", img);
  }
  function clearCanvas() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  function saveCanvas() {
    const canvas = canvasRef.current;
    // const context = canvas.getContext("2d");

    canvas.toBlob((blob) => {
      const storageRef = ref(storage, `images/${docId}`);
      
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // setProgress(Math.round (progress));
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload failed', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            // setImgLink(downloadURL);
            // setCanvasLink(downloadURL);
        (userDetails && 
        db
        .collection(userDetails.uid)
        .doc(docId)
        .update({
          canvasUrl: downloadURL,
        })
        .catch(console.log("Error updating the value")));
        
          });
        }
      );

    });

    
    
  }

  return (
    <>
      <div className="w-full flex flex-col items-center h-full">
        <p className="text-green-700 p-2">Drawing Board</p>

        <canvas
          ref={canvasRef}
          style={{ border: "2px solid black" }}
          onMouseDown={startDrawing}
          onMouseMove={onDrawing}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
        />

        <div className="canvasButtons flex">
          {/* download the canvas button  */}
          <button
            type="button"
            className=" mt-1 p-2 bg-blue-500 text-slate-100 hover:drop-shadow-xl rounded-md "
          >
            <a onClick={(e) => downloadCanvas(e)} href="downloadImg">
              Download
            </a>
          </button>

          {/* clear button  */}
          <button
            onClick={(e) => clearCanvas(e)}
            type="button"
            className=" mt-1 p-2 ml-5 bg-blue-500 text-slate-100 hover:drop-shadow-xl rounded-md "
          >
            Clear
          </button>

          {/* save to firebase  */}
          <button
            onClick={(e) => saveCanvas(e)}
            type="button"
            className=" mt-1 p-2 ml-5 bg-blue-500 text-slate-100 hover:drop-shadow-xl rounded-md "
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default Canvas;
