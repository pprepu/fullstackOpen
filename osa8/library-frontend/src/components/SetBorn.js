import React, { useState } from 'react'
import Select from 'react-select'

const SetBorn = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const options = props.authors
    .map(author => {
      return {
      value: author.name,
      label: author.name
    }
    })
  
  // console.log('OPTIONS@setborn: ', options)

  const submit = async (e) => {
    e.preventDefault()

    const bornAsNumber = Number(born)

    console.log('edit author...')
    await props.editAuthor({
      variables: {
        name,
        setBornTo: bornAsNumber
      }
    })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <Select 
        value={name}
        onChange={(author) => setName(author.value)}
        options={options}
     />
      <form onSubmit={submit}>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBorn