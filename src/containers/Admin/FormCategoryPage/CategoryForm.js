import React from 'react';
import { GrAddCircle } from "react-icons/gr";
import Swal from 'sweetalert2';
const strToMachinename = require('str-to-machinename');

const CategoryForm = ({ handleCategory, data }) => {
  const submitHandler = (category) => {
    const keyName = strToMachinename(category, '_');

    handleCategory({
      label: category,
      key: keyName,
      nodes: []
    })
  }

  const addTerm = async () => {
    const { value: name } = await Swal.fire({
      input: 'text',
      inputLabel: 'Agrega subcategoria en: ' + data.label,
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        console.log(value);
        if (!value) {
          return 'You need to write something!'
        }
      }
    })
    
    if (name) {
      submitHandler(name);
      Swal.fire(`La categoria ${name} se agrego correctamente.`)
    }
  }

  return (
    <div onClick={addTerm}><GrAddCircle /></div>
  )
}

export default CategoryForm;