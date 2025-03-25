import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ShopProvider } from './shopContext';
import { Puppies } from './puppies';
import { Kitties } from './kitties';
import { Cart } from './cart';
import { Layout } from './layout';

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
