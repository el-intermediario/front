import React, {useState} from 'react';
import api from "../../utils/api";
import Autocomplete from 'react-autocomplete';

const CustomAutocomplete = ({handleItemSelected}) => {
  // Autocomplete.
  const [valueSearchReference, setValueSearchReference] = useState('');
  const [articlesReference, setArticlesReference] = useState([]);
  const [articleReferenceObject, setArticleReferenceObject] = useState(null);
  let requestTimer = null;

  const searchItems = (searchValue, cb) => {
    if (searchValue.length > 2) {
      const filter = searchValue ? `?search=${searchValue}` : '';
      api.article.getArticlesSearch(filter,
        { headers: { 'Content-Type': 'application/json' } }
      ).then(response => {
        const articles = response.data;
        setTimeout(cb, 500, articles);
      })
      .catch(error => {
        console.log(`Error ${error.response}`);
      });
    }
  };

  return (
    <Autocomplete
      value={valueSearchReference}
      inputProps={{ id: 'ticketsAutocomplete', className: 'ticket-autocomplete', placeholder: 'Ticket Search' }}
      items={articlesReference}
      getItemValue={(item) => item.title}
      wrapperStyle={{ width: '100%' }}
      onChange={(event, value) => {
        setValueSearchReference(value);
        /* setTickets([]); */
        clearTimeout(requestTimer);
        requestTimer = searchItems(value, (items) => {
          setArticlesReference(items);
          //setSearchValue(value);
        });
      }}
      onSelect={(value, state) => {
        setValueSearchReference(value);
        handleItemSelected(state);
        setArticleReferenceObject(state);
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