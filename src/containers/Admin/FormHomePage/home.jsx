import React, { useState, useCallback, useEffect } from "react";

import DropZone from "./DropZone";
import TrashDropZone from "./TrashDropZone";
import SideBarItem from "./SideBarItem";
import Row from "./Row";
import initialData from "./initial-data";
import api from "../../../utils/api";
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  handleMoveSidebarComponentIntoParent,
  handleRemoveItemFromLayout
} from "./helpers";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';


import {SIDEBAR_ITEM, COMPONENT, COLUMN } from "./constants";
import shortid from "shortid";
import CoverModal from "../../../components/CoverModal";
import { Button, ButtonGroup } from "reactstrap";

const Container = (props) => {
  const history = useHistory();
  const { user } = useSelector(state => state.user);
  const { articlesOffset } = useSelector(state => state.meta);
  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;
  const initialBricks = initialData.bricks;
  const [id, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(true);
  const [layout, setLayout] = useState(initialLayout);
  const [components, setComponents] = useState(initialComponents);
  const [articles, setArticles] = useState([]);
  const [ads, setAds] = useState([]);
  const [search, setSearch] = useState('');
  const [searchAd, setSearchAd] = useState('');
  const [topic, setTopic] = useState('');
  const [preview, setPreview] = useState(false);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    if (props.cover) {
      setCover(props.cover);
      setTitle(props.cover.title);
      setStatus(props.cover.status);
      setLayout(props.cover.layout);
      if (props.cover) {
        setId(props.cover._id);
      }
    } else {
      setCover(null);
      setTitle('');
      setLayout(initialLayout);
    }
  }, [props])

  const handleSearchArticles = async (value) => {
    try {
      setSearch(value);
      const response = await api.article.getArticles(`?search=${value}`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response) {
        const newArticles = [];
        response.data.forEach(function (article) {
          newArticles.push({...article,
            typeId: 'article',
            component: {
              type: article.title,
              content: article.title
            },
            type: 'sidebarItem'
          })
        })
        setArticles(newArticles);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchAds = async (value, size) => {
    try {
      const response = await api.ad.get(`?sizes=${size}`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response) {
        const newAds = [];
        response.data.forEach(function (ad) {
          newAds.push({...ad,
            typeId: 'ad',
            component: {
              type: ad.name,
              content: ad.name
            },
            type: 'sidebarItem'
          })
        })
        setAds(newAds);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split("-");
      setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
    },
    [layout]
  );

  const handleDrop = useCallback(
    (dropZone, item) => {
      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

      const newItem = { id: item.id, type: item.type };
      if (item.type === COLUMN) {
        newItem.children = item.children;
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: shortid.generate(),
          ...item.component
        };

        const {component, type, ...data} = item;
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
          data
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent
        });
        setLayout(
          handleMoveSidebarComponentIntoParent(
            layout,
            splitDropZonePath,
            newItem
          )
        );
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(
            handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
          );
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(
          handleMoveToDifferentParent(
            layout,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        );
        return;
      }

      // 3. Move + Create
      setLayout(
        handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        )
      );
    },
    [layout, components]
  );

  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        components={components}
        path={currentPath}
      />
    );
  };

  const submitHandler = async () => {
    const data = {
      title,
      layout,
      status,
      articlesOffset
    };
    
    try {
      let response;
      if (id) { // Update a cover.
        response = await api.cover.put(id, data,
          { headers: user.headers }
        );
      } else { // Create a new cover.
        response = await api.cover.post(data,
          { headers: user.headers }
        );
      }
      if (response.data) {
        return history.push('/', {type: 'success', message: 'La portada se actualizó correctamente.'});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBrickTopic = () => {
    const newBrick = {
      id: 'topic_' + topic,
      type: 'row',
      children: [
        {
          type: 'column',
          id: shortid.generate(),
          children: [{
            data: {
              title: topic,
              typeId: 'topic'
            },
            id: shortid.generate(),
            type: 'component',
          }]
        }
      ]
    }
    setLayout([...layout, newBrick]);
  }

  console.log(props.cover);
  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  return (
    <div className="body">
      <div className="sideBar">
        <div className="filters">
          <div className="">
            <input name="search-article" value={search} onChange={e => handleSearchArticles(e.target.value)}
              type="text"
              placeholder="Buscar nota" />
          </div>
          {articles.map((article, index) => (
            <SideBarItem key={article.id} data={article} />
          ))}
          <div className="">
            <ButtonGroup>
              <Button color="primary" onClick={e => handleSearchAds(e.target.value, 'portada_superior')}>
                Publi Horizontal
              </Button>
              <Button color="info" onClick={e => handleSearchAds(e.target.value, '350x250')}>
                Publi Cuadrada
              </Button>
            </ButtonGroup>
          </div>
          {ads.map((ad, index) => (
            <SideBarItem key={ad.id} data={ad} />
          ))}

          <div className="row">
            <h4>Agregar bloque de:</h4>
            <div>
              <input name="topic" value={topic} onChange={e => setTopic(e.target.value)}
                type="text"
                placeholder="Tema" 
              />
            </div>
            <div>
              <Button type="submit" color="info" onClick={handleBrickTopic}>Agregar</Button>
            </div>
          </div>

          {/* <div className="">
            <div>
              <h4>Bloques:</h4>
            </div>
            <div>
              {initialBricks.map(brick => {
                return <SideBarItem key={brick.typeId} data={brick} />
              })}
            </div>
          </div> */}
        </div>
      </div>
      <div className="pageContainer">
        <div className="page">
          {layout.map((row, index) => {
            const currentPath = `${index}`;

            return (
              <React.Fragment key={row.id + index}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: layout.length
                  }}
                  onDrop={handleDrop}
                  path={currentPath}
                />
                {renderRow(row, currentPath)}
              </React.Fragment>
            );
          })}
          <DropZone
            onDrop={handleDrop}
            isLast
            data={{
              path: `${layout.length}`,
              childrenCount: layout.length
            }}
          />
        </div>
      </div>
      <div className="trash">
        <div>
          <input name="title" value={title} onChange={e => setTitle(e.target.value)}
            type="text"
            placeholder="Titulo" 
          />
        </div>
        <div className="col-12">
          <input 
            type="checkbox" 
            name="status"
            checked={status}
            onChange={e => setStatus(e.target.checked)}
          />
          <label>Publicar</label>
        </div>
        <div className="col-12">
          <button onClick={(e) => setPreview(true)}>Vista Previa</button>
        </div>
        <div>
          <button type="submit" className="cbtn1" type="submit" onClick={submitHandler}>Guardar</button>
        </div>
        <TrashDropZone data={{layout}} onDrop={handleDropToTrashBin} />
      </div>
      {preview ?
        <CoverModal setPreviewShow={setPreview} previewShow={preview} layout={layout} />
        : null
      }
    </div>
  );
};
export default Container;
