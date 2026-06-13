import { useEffect, useState } from 'react';
import swan from './swan.svg';
import './App.css';

function App() {
  const [password, setPassword] = useState('2027');

  const targetDate = new Date("2027-02-07T00:00:00");
  
  const calculateDaysLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) return 0;

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };

  const [daysLeft, setDaysLeft] = useState(calculateDaysLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysLeft(calculateDaysLeft());
    }, 1000 * 60 * 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <body className={password !== '2027' ? 'container' : ''}>
      {
      password === '2027' ?
      <>
      <header>
        <img src={swan} alt="swan logo"/>
        <h1>MANNY & LIV</h1>
        <h4>FEBRUARY 7, 2027 - LAKELAND, FL</h4>
        <h4>
          {daysLeft > 0 ? `${daysLeft} DAYS TO GO!` : 'THE DAY HAS ARRIVED'}
        </h4>
      </header>
      <main>

      </main>
      <footer>

      </footer>
      </>
      :
      <section>
        <h2>Please enter the password.</h2>
        {/* <input type="text" placeholder='12345' value={password} /> */}
      </section>
      }
      
    </body>
  )
};

export default App;