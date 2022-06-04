import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import CarouselMatchs from '../CarouselMatchs';

const MINUTE_MS = 180000;

const Mam = () => {
  const [matchs, setMatchs] = useState([]);

  useEffect(() => {
    fetchData();
    /*
    const interval = setInterval(() => {
      fetchData();
    }, MINUTE_MS)

    // Unmount component
    return () => clearInterval(interval);*/
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.fixtures.get('', { headers: { 'Content-Type': 'application/json' } })
      if (response.data) {
        console.log(response.data.lastMatchs);
        setMatchs([...response.data.lastMatchs, ...response.data.nextMatchs]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="row-matchs">
      <CarouselMatchs data={matchs}/>
    </div>
  )
}

export default Mam;