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


import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from "./constants";
import shortid from "shortid";

const Container = () => {
  const history = useHistory();
  const { user } = useSelector(state => state.user);
  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;
  const [title, setTitle] = useState(null);
  const [layout, setLayout] = useState(initialLayout);
  const [ids, setIds] = useState([]);
  const [components, setComponents] = useState(initialComponents);
  const [articles, setArticles] = useState([]);
  const [ads, setAds] = useState([]);
  const [search, setSearch] = useState(null);
  const [searchAd, setSearchAd] = useState(null);

  const handleSearchArticles = async (value) => {
    try {
      const response = await api.article.getArticlesSearch(`?search=${value}`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response) {
        const newArticles = [];
        response.data.forEach(function (article) {
          newArticles.push({...article,
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

  const handleSearchAds = async (value) => {
    try {
      const response = await api.article.getAdsSearch(`?search=${value}`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response) {
        const newAds = [];
        response.data.forEach(function (ad) {
          newAds.push({...ad,
            component: {
              type: ad.title,
              content: ad.title
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
      console.log('dropZone', dropZone)
      console.log('item', item)

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
      ids,
    };
    try {
      const response = await api.cover.post(data,
        { headers: user.headers }
      );
      
      if (response) {
        history.push('/admin/home', {type: 'success', message: 'La portada se creo correctamente.'});
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(layout);
  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  return (
    <div className="body">
      <div className="sideBar">
        <div className="filters">
          <div className="col-lg-12">
            <input name="search-article" value={search} onChange={e => handleSearchArticles(e.target.value)}
              type="text"
              placeholder="Buscar" />
          </div>
          {articles.map((article, index) => (
            <SideBarItem key={article.id} data={article} />
          ))}
          <div className="col-lg-12">
            <input name="search-ad" value={searchAd} onChange={e => handleSearchAds(e.target.value)}
              type="text"
              placeholder="Buscar publicidad" />
          </div>
          {ads.map((ad, index) => (
            <SideBarItem key={ad.id} data={ad} />
          ))}
        </div>
      </div>
      <div className="pageContainer">
        <div className="page">
          {layout.map((row, index) => {
            const currentPath = `${index}`;

            return (
              <React.Fragment key={row.id}>
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
        <div>
          <button type="submit" className="cbtn1" type="submit" onClick={submitHandler}>Guardar</button>
        </div>
        <TrashDropZone data={{layout}} onDrop={handleDropToTrashBin} />
      </div>
    </div>
  );
};
export default Container;
