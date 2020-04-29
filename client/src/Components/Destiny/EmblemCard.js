import React from 'react';
import styled from 'styled-components';



const Card = styled.div`
  display: flex;
  justify-content: space-between;
  background: #ffffff url(${props => 'https://www.bungie.net' + props.bgPath}) top / cover no-repeat;
  color: #f5f5f5;
  margin-bottom: 5px;
  @media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 474px;
    max-height: 96px;
  }
  .class-race {
    margin-left: 70px;
    h3 {
      font-weight: normal;
      font-size: 1.5em;
      margin-top: 1rem;
      margin-bottom: .2rem;
    }
    p {
      margin: 0;
    }
    @media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
      margin-left: 96px;
    }
  }

  h2 {
    font-weight: normal;
    color: rgb(221, 201, 24);
    margin-right: 5px;
  }
`;

const EmblemCard = ({ characterData }) => {
  const { race, gender, light, classType, emblemBackgroundPath } = characterData;
  return (
    <Card bgPath={emblemBackgroundPath}>
      <div className='class-race' >
        <h3>{classType}</h3>
        <p>{`${race} ${gender}`}</p>
      </div>
      <div>
        <h2>{light}</h2>
      </div>
    </Card>
  )
}
export default EmblemCard;