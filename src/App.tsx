import './App.css';
import { Calendar } from './components/Calendar';

function App() {
  return (
    <div className="py-8 px-16 w-5/6 m-auto text-center">
      <p>Calendar App</p>
      <Calendar inputDate={'21/06/1996'} />
    </div>
  );
}

export default App;
