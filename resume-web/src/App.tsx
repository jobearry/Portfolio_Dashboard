import './App.css'
import { Footer } from './components/common/footer'
import Home from './pages/home/Home'

export function App() {
  return (
    <div className='dark'>
      <Home></Home>
      <Footer></Footer>
    </div>
  )
}
