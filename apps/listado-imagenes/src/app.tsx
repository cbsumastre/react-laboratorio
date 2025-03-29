import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ShopProvider } from './contexts/shopContext';
import { Puppies } from './pages/puppies';
import { Kitties } from './pages/kitties';
import { Cart } from './components/cart/cart';
import { Layout } from './layouts/layout';

function App() {
  return (
    <ShopProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Kitties />} />
            <Route path="/kitties" element={<Kitties />} />
            <Route path="/puppies" element={<Puppies />} />
          </Routes>
          <Cart />
        </Layout>
      </Router>
    </ShopProvider>
  )
}

export default App
