import React, { useState } from 'react';
import styled from 'styled-components';

const ControlledInput = () => {
  const [value, setValue] = useState('')
  return (
    <>
      <Input type="text" name="text" id="text" value={value} onChange={e => setValue(e.target.value)} />
    </>
  )
}

export default ControlledInput;

const Input = styled.input`

`;