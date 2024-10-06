import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import { FavoritesProvider } from './context/FavoritesContext';
import FavoritesScreen from './screens/FavoritesScreen';
import Navbar from './components/Navbar';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Navbar /> 
        <div className="app">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search" element={<SearchResultsScreen />} />
            <Route path="/movie/:id" element={<MovieDetailsScreen />} />
            <Route path="/tv/:id" element={<MovieDetailsScreen />} /> 
            <Route path="/favorites" element={<FavoritesScreen />} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
