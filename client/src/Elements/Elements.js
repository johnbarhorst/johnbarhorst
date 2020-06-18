import styled from 'styled-components';

export const ItemWrapper = styled.div`
  display: grid;
  gap: 0 .25rem;
  grid-template-columns: 1fr 2fr 1fr;
  margin: 0 .5rem 3rem;
  p {
    margin: 0;
    text-transform: capitalize;
  }
  .full-span {
    grid-column: 1 / -1;
  }
`;

