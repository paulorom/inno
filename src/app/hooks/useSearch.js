'use client'

import { useState, createContext, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const today = new Date().toISOString().split('T')[0];
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [searchParams, setSearchParams] = useState({
    query: '',
    beginDate: sevenDaysAgo.toISOString().split('T')[0],
    endDate: today,
  });
  const [showSearch, setShowSearch] = useState(false);

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams, showSearch, setShowSearch }}>
      {children}
    </SearchContext.Provider>
  );
};