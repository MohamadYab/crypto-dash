import React from 'react'

function FilterInput({ placeholder, value, onChange }) {
  return (
    <div className='filter'>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default FilterInput