import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import { Button } from 'reactstrap';
import 'react-image-crop/dist/ReactCrop.css';

const UploadImage = ({ handleImage, handleCrop }) => {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const buttonRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 70, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setOriginalFile(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    if (!handleCrop) {
      handleImage(originalFile, originalFile.name);
      return
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = 1; //window.devicePixelRatio;
    
    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;
    
    ctx.imageSmoothingQuality = 'medium';
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    const img = canvas.toDataURL('image/jpeg');
    const file = dataURItoBlob(img);
    handleImage(file, originalFile.name);

  }, [completedCrop]);

  const dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

  return (
    <div className="row">
      <div className="col-3">
        <input
          ref={buttonRef}
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          style={{ display: "none" }}
        />
        <Button
          outline
          onClick={() => buttonRef.current.click()}
        >
          Subir imagen
        </Button>
      </div>
      <div className="col-5">
        <ReactCrop
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
      </div>
      <div className="col-4">
        <canvas
          ref={previewCanvasRef}
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0)
          }}
        />
      </div>
    </div>
  )
};

export default UploadImage;