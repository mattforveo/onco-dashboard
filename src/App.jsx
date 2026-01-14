import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import PageLayout from './components/layout/PageLayout';
import Overview from './pages/Overview';
import PopulationStudies from './pages/PopulationStudies';
import CaseStudies from './pages/CaseStudies';
import Mechanisms from './pages/Mechanisms';
import './index.css';

function App() {
  return (
    <FilterProvider>
      <Router>
        <PageLayout>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/population" element={<PopulationStudies />} />
            <Route path="/cases" element={<CaseStudies />} />
            <Route path="/mechanisms" element={<Mechanisms />} />
          </Routes>
        </PageLayout>
      </Router>
    </FilterProvider>
  );
}

export default App;
