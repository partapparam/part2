import React from "react"

const Filter = (props) => {
  return (
    <form>
      <h2>Filter list with ( this case sensitive )</h2>
      <input
        type="text"
        value={props.filterListProp}
        onChange={props.onChangeProps}
      />
    </form>
  )
}

export default Filter
