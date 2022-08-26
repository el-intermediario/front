import React, { useState } from 'react';
import { Button } from 'reactstrap';
import api from '../../utils/api';
import FileUpload from '../FileUpload';

const TopicForm = ({handleBrickTopic}) => {
  const [image, setImage] = useState(null);
  const [topic, setTopic] = useState('');

  const handleFiles = async (files, folder) => {
    const formData = new FormData();
    formData.append('folder', `sanjua/${folder}`);
    for(const file of files) {
      formData.append('image', file);
    }

    try {
      const response = await api.upload.post(formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
      
      if (response) {
        setImage(response.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h5>Agregar bloque de:</h5>
      <div className="field-topic">
        <input name="topic" value={topic} onChange={e => setTopic(e.target.value)}
          type="text"
          placeholder="Tema"
        />
      </div>
      <div className="field-bg">
        <FileUpload
          initialFiles={[]}
          maxFiles={1}
          handleInitialFiles={(data) => setImage(data[0])}
          handleFiles={(files) => handleFiles(files, 'cover/blockBg')}
        />
      </div>
      <div>
        <Button type="submit" color="info" onClick={() => handleBrickTopic(topic, image)}>Agregar</Button>
      </div>
    </>
  )
}

export default TopicForm;