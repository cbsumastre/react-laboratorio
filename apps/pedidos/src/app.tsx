import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { PedidoProvider } from './contexts/pedidoContext';
import { Pedido } from './pedido';

function App() {
    return (
        <PedidoProvider>
            <Router>
                <Routes>
                    <Route path="*" element={<Pedido />} />
                </Routes>
            </Router>
        </PedidoProvider>
    )
}

export default App
