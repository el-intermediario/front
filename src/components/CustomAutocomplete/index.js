import React, {useState, useEffect} from 'react';
import api from "../../utils/api";
import Autocomplete from 'react-autocomplete';

const CustomAutocomplete = ({type = 'article', handleItemSelected, initialSearch}) => {
  const [valueSearch, setValueSearch] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (valueSearch.length) {
      const delayDebounceFn = setTimeout(() => {
        const params = valueSearch ? `?limit=8&search=${valueSearch}` : '?limit=4';
  
        if (type === 'article') {
          api.article.getArticles(params, 
            { headers: { 'Content-Type': 'application/json' } }
          ).then(response => {
            const responseItems = response.data;
            setItems(responseItems)
          }).catch(error => {
            console.log(`Error ${error.response}`);
          });
        } else if (type === 'video') {
          api.video.getVideos(params, 
            { headers: { 'Content-Type': 'application/json' } }
          ).then(response => {
            const responseItems = response.data;
            setItems(responseItems)
          }).catch(error => {
            console.log(`Error ${error.response}`);
          });
        }
      }, 1000)
  
      return () => clearTimeout(delayDebounceFn)
    }
  }, [valueSearch]);
  
  useEffect(() => {
    if (!initialSearch) {
      setValueSearch('');
    }
  }, [initialSearch]);

  return (
    <Autocomplete
      key={type}
      value={valueSearch}
      inputProps={{ className: 'custom-autocomplete', placeholder: 'Buscar..' }}
      items={items}
      getItemValue={(item) => item.title}
      wrapperStyle={{ width: '100%' }}
      onChange={(event, value) => {
        setValueSearch(value);
      }}
      onSelect={(value, state) => {
        setValueSearch(value);
        handleItemSelected(state);
      }}
      renderItem={(item, i) =>
        <div key={item.id}>
          {item.title}
        </div>
      }
      menuStyle={{ background: 'transparent' }}
    />
  )
};

export default CustomAutocomplete;