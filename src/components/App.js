import React from 'react';
import { useAsync } from 'react-async-hook';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import Orbital from './Orbital';

function getDate(d = new Date()) {
  return d.toJSON().split('T')[0];
}

const fetchData = () =>
  fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${getDate()}&api_key=DEMO_KEY`
  ).then((res) => res.json());

export default function App() {
  const data = useAsync(fetchData, []);

  if (data.loading) {
    document.title = 'Contando peligros potenciales a la Tierra…';

    return (
      <p>
        Obteniendo datos de la NASA ahora mismo para comprobar si algo 
        procedente del espacio nos va a golpear. Un momento...
      </p>
    );
  }

  const day = getDate(addDays(new Date(), 1));
  const hazards = data.result.near_earth_objects[day].reduce((acc, curr) => {
    if (curr.is_potentially_hazardous_asteroid) {
      return acc + 1;
    }
    return acc;
  }, 0);

  document.title = `${hazards} ${hazards === 1 ? 'peligro potencial' : 'peligros potenciales'}
   ${hazards > 0 ? '😱' : '👍'}`;

  const results = data.result.near_earth_objects[day];
  return (
    <div>
      <p>
        {format(addDays(new Date(), 1), 'dd/MM/yyyy')} habrán{' '}
        <strong>{results.length}</strong> aproximaciones
      </p>
      <hr></hr>
      {results
        .sort((a) => (a.is_potentially_hazardous_asteroid ? -1 : 1))
        .map((data) => (
          <Orbital key={data.id} {...data} />
        ))}
    </div>
  );
}
