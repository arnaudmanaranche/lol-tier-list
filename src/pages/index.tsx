import Button from 'Components/Button'
import { ROUTES } from 'Utils/constants'

const { TOURNAMENTS } = ROUTES

const Home: React.FC = () => (
  <div className="flex flex-col items-center text-center">
    <h1>Share easily your League of Legends power rankings</h1>
    <Button href={TOURNAMENTS}>Create yours</Button>
  </div>
)

export default Home
