import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

// const MoviesTable = (props) => {
class MoviesTable extends Component {
  // raiseSort = (path) => {
  //   const sortColumn = { ...this.props.sortColumn };
  //   if (sortColumn.path === path)
  //     sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
  //   else {
  //     sortColumn.path = path;
  //     sortColumn.order = "asc";
  //   }
  //   this.props.onSort(sortColumn);
  // };
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    // { key: "like",content:<Like/> },
    // { key: "delete" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },

    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btnsm"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        {/* <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")}>title</th>
            <th onClick={() => this.raiseSort("genre.name")}>genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>stock</th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>rate</th>
            <th />
            <th />
          </tr>
        </thead> */}

        <TableBody columns={this.columns} data={movies} />
        {/* <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td> */}
        {/* <Like/> 
        
                <Like liked={movie.liked} onClick={() => onLike(movie)} /> */}
        {/* </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))} */}
        {/* </tbody> */}
      </table>
    );
  }
}
export default MoviesTable;
