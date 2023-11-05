import React from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = ({ value, onChange }) => {
  return (
    <div className="relative">
      <BiSearch
        size={20}
        className="absolute top-1/2 -translate-y-1/2 right-2"
      />
      <input
        type="text"
        placeholder="Search Users"
        value={value}
        onChange={onChange}
        className="h-10 border border-slate-800 outline-none px-4"
      />
    </div>
  )
}

export default Search
