import React, { createContext, useState } from 'react'



export const searchResponseContext=createContext()

function SearchContext({children}) {

 const[searchData,setSearchData] =  useState("")
  return (
    <>
    <searchResponseContext.Provider value={{searchData,setSearchData}}>{children}</searchResponseContext.Provider>
    </>
  )
}

export default SearchContext