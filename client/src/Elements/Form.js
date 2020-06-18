import styled from 'styled-components';

export const Form = styled.form`
  font-size: 30px;
  text-align: center;
  margin-bottom: 30px;

  input {
  background: ${props => props.theme.background};
  padding: 5px 10px;
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid #999;
  vertical-align: middle;
  margin: 0 20px;
  }
`;