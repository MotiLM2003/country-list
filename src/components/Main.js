import React, { useState, useEffect } from 'react';
function Main() {
  const [state, setState] = useState([]);
  const [oldState, setoldState] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const fetchData = async () => {
    const search = `https://restcountries.eu/rest/v2/all`;
    const res = await (await fetch(search)).json();
    setState(res);
    setoldState(res);
  };

  useEffect(() => {
    console.log('state updated');
  }, [state]);

  const setData = () => {
    let state = [];
    switch (selectedCountry) {
      case '0': {
        state = [
          ...oldState.sort((a, b) => {
            return a.name.replace(/\s+/g, '') > b.name.replace(/\s+/g, '')
              ? 1
              : -1;
          }),
        ];

        break;
      }
      case '1': {
        state = [
          ...oldState.sort((a, b) => {
            return a.capital > b.capital ? 1 : -1;
          }),
        ];
        break;
      }
      case '2': {
        console.log('sorting by population');
        state = [
          ...oldState.sort((a, b) =>
            parseInt(a.population) > parseInt(b.population) ? -1 : 1
          ),
        ];
        break;
      }
      default: {
      }
    }
    setState(state);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData();
  }, [selectedCountry]);

  return (
    <div>
      <div class='search-container'>
        Select a coutry:
        <select
          onChange={(e) => {
            setSelectedCountry(e.target.value);
          }}
        >
          <option value='0'>Name</option>
          <option value='1'>Capital</option>
          <option value='2'>Population</option>
        </select>
      </div>
      <table border='1'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Native Name</th>
            <th>Capital</th>
            <th>Population</th>
            <th>flag</th>
          </tr>
        </thead>
        <tbody>
          {state.map((country, index) => {
            return (
              <tr>
                <td>{country.name}</td>
                <td>{country.nativeName}</td>
                <td>{country.capital}</td>
                <td>{country.population}</td>
                <td>
                  <img src={country.flag} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Main;
