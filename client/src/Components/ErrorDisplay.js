import React from 'react';

const ErrorDisplay = ({ errorStatus, message, stackHighlighted }) => {
  return (
    <div>
      <h3>{errorStatus}</h3>
      <h4>Error Response from Bungie:</h4>
      <p>{message}</p>
      {stackHighlighted && <p>{stackHighlighted}</p>}
    </div>
  )
}

export default ErrorDisplay;