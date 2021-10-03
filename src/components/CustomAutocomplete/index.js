import React, {useState, useEffect} from 'react';
import api from "../../utils/api";
import Autocomplete from 'react-autocomplete';

const CustomAutocomplete = ({handleItemSelected}) => {
  const [valueSearch, setValueSearch] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filter = valueSearch ? `?limit=8&search=${valueSearch}` : '?limit=6';
      api.article.getArticlesSearch(filter,
        { headers: { 'Content-Type': 'application/json' } }
      ).then(response => {
        const responseItems = response.data;
        setItems(responseItems)
      })
      .catch(error => {
        console.log(`Error ${error.response}`);
      });
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [valueSearch])

  return (
    <Autocomplete
      value={valueSearch}
      inputProps={{ id: 'ticketsAutocomplete', className: 'ticket-autocomplete', placeholder: 'Ticket Search' }}
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