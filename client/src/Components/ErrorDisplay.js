import React from 'react';

const ErrorDisplay = ({ errorStatus, message, stackHighlighted }) => {
  return (
    <div>
      <h3>{errorStatus}</h3>
      <p>{message}</p>
      {stackHighlighted && <p>{stackHighlighted}</p>}
    </div>
  )
}

export default ErrorDisplay;