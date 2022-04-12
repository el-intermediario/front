import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { setArticlesOffset } from "../../../store/actions/index";
import api from "../../../utils/api";

const style = {
  border: "1px dashed black",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move"
};
const Component = ({ data, components, path }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { articlesOffset } = useSelector(state => state.meta);

  const [{ isDragging }, drag] = useDrag({
    item: { type: COMPONENT, id: data.id, path },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  // Save ids of articles in redux.
  if (data.data && data.data.typeId === 'article' && !articlesOffset.includes(data.data.idShort)) {
    dispatch(setArticlesOffset(data.data.idShort));
  }

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="component draggable"
    >
      {data.data.typeId === 'article' ? (
        <div>
          <div>{data.data && data.data.title || data.data.name}</div>
          <div>
            <img src={`${api.space}f_auto,c_fill,g_face,h_380,q_84,w_600/v${data.data.image.url}`} width="100%"/>
          </div>
        </div>
      ) : null}
      {data.data.typeId === 'topic' ? (
        <div>
          <div>Notas de: {data.data && data.data.title}</div>
        </div>
      ) : null}
      {data.data.typeId === 'ad' && <img src={`${api.space}v${data.data.image.url}`} />}
    </div>
  );
};
export default Component;
