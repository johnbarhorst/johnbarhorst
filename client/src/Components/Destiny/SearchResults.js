import React from 'react';
import { Link } from 'react-router-dom';
import AccountCard from './AccountCard';

const SearchResults = ({ data }) => {
  return (
    <>
      {data.accounts.map(account => (
        <Link to={`/destiny/characters/${account.membershipType}/${account.membershipId}`} key={account.membershipId}>
          <AccountCard account={account} />
        </Link>
      ))}
    </>
  )
}

export default SearchResults
