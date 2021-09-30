import React from 'react';

const Media = (props) => {
  const { data } = props.blockProps;
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const { src } = entity.getData();
  const type = entity.getType();
  //const type = 'video';

  let media;
  if (type === 'reference') {
    return (
      <div className="field-reference">{src} - {data.url}</div>
    )
  }

  return media;
};

export default Media;