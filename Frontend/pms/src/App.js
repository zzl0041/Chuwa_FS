import Layout from './components/Layout/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Default from './Default';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Default />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
