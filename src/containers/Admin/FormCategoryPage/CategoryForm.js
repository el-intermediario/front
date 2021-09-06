import React, { useState } from 'react';
const strToMachinename = require('str-to-machinename');

const CategoryForm = ({ handleCategory }) => {
  const [name, setName] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    const keyName = strToMachinename(name, '_');

    handleCategory({
      label: name,
      key: keyName,
      nodes: []
    })
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="row">
          <div className="col-lg-6">
            <input name="title" value={name} onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Nombre" />
          </div>
          <div className="col-12">
            <div className="space-20" />
            <button className="cbtn1" type="submit">Crear</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default CategoryForm;