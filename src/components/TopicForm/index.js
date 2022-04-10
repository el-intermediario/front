import React, { useEffect } from 'react';

const TopicForm = () => {
    const [topic, setTopic] = useState({
        topic: null,
        bg: null
    });

    return (
        <>
            <h4>Agregar bloque de:</h4>
            <div className="field-topic">
              <input name="topic" value={topic} onChange={e => setTopic({...topic, topic: e.target.value})}
                type="text"
                placeholder="Tema" 
              />
            </div>
            <div className="field-bg">
              <input
                type="file" 
                value={topic} 
                onChange={e => setTopic({...topic, bg: e.target.file})}
              />
            </div>
            <div>
              <Button type="submit" color="info" onClick={handleBrickTopic}>Agregar</Button>
            </div>
        </>
    )
}