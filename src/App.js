import './App.css';
import { useEffect, useState } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

function App() {
  const [data, setData] = useState([])
  const [parameter, setParameter] = useState('day')

  const parameters = [
    'day', 'week', 'month'
  ]

  function handleChange(parameter) {
    setParameter(parameter)
  }

  useEffect(() => {

    let myBtns = Array.from(document.getElementsByClassName('button'));

    myBtns.forEach(function (btn) {

      btn.addEventListener('click', () => {
        myBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });

    });


    setData([]);
    var axios = require('axios');

    var config = {
      method: 'get',
      url: `https://7cg8uz8p69.execute-api.us-east-1.amazonaws.com/test/people/?period=${parameter}`,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        setData(response.data.people);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [parameter])

  return (
    <div className="App">
      <h1>Activity</h1>
      <span>
        <button className="button active" onClick={() => handleChange(parameters[0])}>Today</button>
        <button className="button" onClick={() => handleChange(parameters[1])}>This week</button>
        <button className="button" onClick={() => handleChange(parameters[2])}>This month</button>
      </span>

      {
        data.length ?
          <div className="scroll">
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Matter</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>

                {data.map((item, index) => (
                  <tr key={(index + 1) * Math.random()}>
                    <td>{item.client.charAt(0).toUpperCase() + item.client.slice(1)}</td>
                    <td>{item.matter.charAt(0).toUpperCase() + item.matter.slice(1)}</td>
                    <td>{item.description.charAt(0).toUpperCase() + item.description.slice(1)}</td>
                    <td>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</td>
                    <td>{item.time.charAt(0).toUpperCase() + item.time.slice(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          :
          <div className="loader">
            <Loader
              type="RevolvingDot"
              color="#dbd76a"
              height={100}
              width={100}
              timeout={1000}
            />
          </div>
      }

    </div>
  );
}

export default App;
