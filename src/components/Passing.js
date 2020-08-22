import React from 'react';
import formatNumber from 'format-number';
import format from 'date-fns/format';

const formatter = formatNumber();

export default function Passing({ data }) {
  return data.map((_, i) => (
    <p key={i}>
      Fallará a la Tierra mañana a las{' '}
      {format(_.epoch_date_close_approach, 'h:mmaaaa')} por{' '}
      {formatter(parseInt(_.miss_distance.kilometers, 10))} kilometros mientras viaja a {formatNumber({ truncate: 0 })(_.relative_velocity.kilometers_per_hour)}kph
    </p>
  ));
}
