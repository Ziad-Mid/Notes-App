import React from "react";
import CreateNote from "./Components/CreateNote";
import Notes from "./Components/Notes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      singledata: {
        title: "",
        author: ""
      }
    };
    this.getNotes = this.getNotes.bind(this);
    this.getNote = this.getNote.bind(this);
    this.createNote = this.createNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getNotes() {
    this.setState({ loading: true }, () => {
      fetch("http://localhost:4000/notes")
        .then(res => res.json())
        .then(result =>
          this.setState({
            loading: false,
            alldata: result
          })
        )
        .catch(console.log);
    });
  }

  handleChange(event) {
    var title = this.state.singledata.title;
    var author = this.state.singledata.author;
    if (event.target.name === "title") title = event.target.value;
    else author = event.target.value;

    this.setState({
      singledata: {
        title: title,
        author: author
      }
    });
  }

  createNote() {
    fetch("http://localhost:4000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singledata)
    }).then(
      this.setState({
        singledata: {
          title: "",
          author: ""
        }
      })
    );
  }

  getNote(event, id) {
    this.setState(
      {
        singledata: {
          title: "Loading...",
          author: "Loading..."
        }
      },
      () => {
        fetch("http://localhost:4000/notes/" + id)
          .then(res => res.json())
          .then(result => {
            this.setState({
              singledata: {
                title: result.title,
                author: result.author ? result.author : ""
              }
            });
          });
      }
    );
  }

  updateNote(event, id) {
    fetch("http://localhost:4000/notes/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singledata)
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          singledata: {
            title: "",
            author: ""
          }
        });
        this.getNotes();
      });
  }

  deleteNote(event, id) {
    fetch("http://localhost:4000/notes/" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          singledata: {
            title: "",
            author: ""
          }
        });
        this.getNotes();
      });
  }

  render() {
    const NoteTable = this.state.loading ? (
      <span>Loading...</span>
    ) : (
      <Notes
        alldata={this.state.alldata}
        singledata={this.state.singledata}
        getNote={this.getNote}
        updateNote={this.updateNote}
        deleteNote={this.deleteNote}
        handleChange={this.handleChange}
      />
    );

    return (
      <div className="container">
        <span className="title-bar">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.getNotes}
          >
            Get Notes
          </button>
          <CreateNote
            singledata={this.state.singledata}
            createNote={this.createNote}
            handleChange={this.handleChange}
          />
        </span>
        <br />
        {NoteTable}
      </div>
    );
  }
}

export default App;
