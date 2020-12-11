import CityCard from './components/CityCard'
import Navbar from './components/Navbar'
import ImageAndWelcome from './components/ImageAndWelcome'


const citiesDummy = [
  { id: 74, name: 'Jakarta', country_name: 'Indonesia' },
  { id: 11052, name: 'Bandung', country_name: 'Indonesia' },
  { id: 170, name: 'Bali', country_name: 'Indonesia' }
]

function App() {
  return (
    <>
      <Navbar />
      <ImageAndWelcome />
      <div className="container" style={{ marginTop: 30, marginBottom: 30 }}>
        <div className="row">
          <div className="col-12">
            <h3>Featured City</h3>
          </div>
        </div>
        <div className="row">
          {citiesDummy.map(city =>
             <CityCard key={city.id} city={city} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
