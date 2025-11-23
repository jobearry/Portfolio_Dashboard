import './App.css'
import { Footer } from './components/common/footer'
import { AppRouter } from './routes/route'

export function App() {
  return (
    <div className='dark'>
      <AppRouter/>
      <Footer></Footer>
    </div>
  )
}
