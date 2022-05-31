import React, { useEffect } from 'react';
import axios from 'axios';
import useScript from 'react-script-hook';

const MINUTE_MS = 60000;

const Mam = () => {
  useScript({
    src: 'https://widgets.api-sports.io/football/1.1.8/widget.js',
    onload: () => console.log('Script loaded!'),
  });

  useEffect(() => {
    // fetchData();
    const interval = setInterval(() => {
      // fetchData();
    }, MINUTE_MS)

    // Unmount component
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const config = {
      method: 'get',
      url: 'https://v3.football.api-sports.io/fixtures?season=2022&league=128&last=1', // 128 , copaargentina 130  code=AR fixtures/events
      headers: {
        'x-rapidapi-key': 'xxxxxxx', // .env
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    };
    
    try {
      const response = await axios(config);
      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      
    </>
  )
}

export default Mam;