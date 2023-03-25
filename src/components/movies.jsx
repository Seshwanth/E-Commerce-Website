// import { tab } from "@testing-library/user-event/dist/tab";
import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
// import Like from "./common/like";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "all Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleSort = (sortColumn) => {
    // const sortColumn = { ...this.state.sortColumn };
    // if (sortColumn.path === path)
    //   sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    // else {
    //   sortColumn.path = path;
    //   sortColumn.order = "asc";
    // }
    // // console.log(path);
    // this.setState({ sortColumn: { path, order: "asc" } });
    this.setState({ sortColumn });
  };

  handleDelete = (movie) => {
    // console.log(movie);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    // console.log(page);
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) =>
    // console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });

  render() {
    if (this.state.movies.length === 0)
      return <p>there are no movies in the database</p>;

    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    if (count === 0) <p>there r no movies in db</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return (
      // <React.Fragment>
      <div className="row">
        <div className="col-4">
          <ListGroup
            items={this.state.genres}
            // textproperty="name"
            // valueproperty="_id"
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>showing {filtered.length}movies in the db </p>
        </div>
        {/* <p>showing{this.state.movies.length}movies in the database</p> */}
        <MoviesTable
          movies={movies}
          sortColumn={sortColumn}
          onLike={this.handleLike}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
        {/* </React.Fragment> */}
      </div>
    );
  }
}

export default Movies;
