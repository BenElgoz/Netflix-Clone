import React from 'react';
import './HomeScreen.css';
import Row from '../components/Row';
import Banner from '../components/Banner';
import SearchBar from '../components/SearchBar';
import requests from '../requests';

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Banner />

      <SearchBar />

      {/* Rows */}
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} /> 
      <Row title="Romantic Movies" fetchUrl={requests.fetchRomanceMovies} /> 
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} /> 
      <Row title="Science Fiction Movies" fetchUrl={requests.fetchScienceFictionMovies} /> 
    </div>
  );
}

export default HomeScreen;
