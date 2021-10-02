import React from 'react'
import DeleteNote from './DeleteNote';
import UpdateNote from './UpdateNote';

function Notes(props) {
    var rows = [];
    props.alldata.forEach(element => {
        rows.push(
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.title}</td>
            <td>{element.author}</td>
            <td><UpdateNote
                elementId={element.id}
                singledata={props.singledata}
                getNote={props.getNote}
                updateNote={props.updateNote}
                handleChange={props.handleChange}></UpdateNote></td>
            <td>
                <DeleteNote
                elementId={element.id}
                singledata={props.singledata}
                getNote={props.getNote}
                deleteNote={props.deleteNote}></DeleteNote>
            </td>
        </tr>)
    });
    return(
      <table className="table table-striped">
          <thead>
              <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Update</th>
                  <th>Delete</th>
              </tr>
          </thead>
        <tbody>{rows}</tbody>
      </table>
    )
}

export default Notes;