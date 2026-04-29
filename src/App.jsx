import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchScreen from './screens/SearchScreen';
import PlayScreen from './screens/PlayScreen';
import HomeScreen from './screens/HomeScreen';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/play/:id" element={<PlayScreen />} />
      </Routes>
    </Router>
  );
}