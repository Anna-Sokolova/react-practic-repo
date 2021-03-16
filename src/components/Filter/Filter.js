import React from 'react';

const Filter = ({valueFilter, onChangeFilter}) => (
  <label>
    Фильтр по имени
    <input type="text" value={valueFilter} onChange={onChangeFilter} />
  </label>
);

export default Filter;
