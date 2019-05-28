import React from 'react';
import DestinationsForm from './destinations-form';
import DestinationsList from './destinations-list';

export const Main = () => {
  return (
    <div className="fa-main-ct">
      <DestinationsForm />
      <DestinationsList />
    </div>
  )
};