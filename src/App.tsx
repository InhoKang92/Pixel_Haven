import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/index/index'
import BookmarkPage from './pages/bookmark/index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<IndexPage />}></Route>
        <Route path="/search/:id" element={<IndexPage />}></Route>
        <Route path="/bookmark" element={<BookmarkPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App