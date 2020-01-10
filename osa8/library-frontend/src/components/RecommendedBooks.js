import React, { useState, useEffect } from 'react'

const RecommendedBooks = (props) => {
  // const [result, setResult] = useState(null)
  // useEffect(() => {
  //   const result = props.doQuery({
  //     variables: { genre: props.filter }
  //   })
  //   console.log(result.data)
  //   setResult(result.data)
  // }, [props.doQuery])

  if (props.result.loading) {
    return <div>loading...</div>
  }



  //console.log(props.result.data)
  const books = props.result.data.allBooks

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
          
          books
          .filter(a => a.genres.includes(props.filter))
          .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )

}
// perus kyselyllä (tehtävä: 8:20) muokattu...
// return (
//   <div>
//     <table>
//       <tbody>
//         <tr>
//           <th></th>
//           <th>
//             author
//           </th>
//           <th>
//             published
//           </th>
//         </tr>
//         {
        
//         books
//         .filter(a => a.genres.includes(props.filter))
//         .map(a =>
//           <tr key={a.title}>
//             <td>{a.title}</td>
//             <td>{a.author.name}</td>
//             <td>{a.published}</td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </div>
// )

// }

export default RecommendedBooks