import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createBook as apiCreateBook,
  getBooks as apiGetBooks,
  updateBook as apiUpdateBook,
  deleteBook as apiDeleteBook,
  fetchUser as apiFetchUser,
  updateBook,
} from "./api";

export const Profile = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const [firstName, setFirstName] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      handleFetchUser();
      handleGetBooks();
      // handleCreateBook();
      // handleUpdateBook();
      // handleDeleteBook();
    }
  }, [accessToken]);

  const handleGetBooks = async () => {
    try {
      console.log("Auth: ", accessToken);
      const booksData = await apiGetBooks({ auth: { accessToken } });
      console.log('BLAMMO: BOOKS DATA: ', booksData)
      setBooks(booksData);
    } catch (error) {
      console.error("Error getting books: ", error);
    }
  };

  const handleCreateBook = async () => {
    try {
      console.log("Auth-create: ", accessToken);
      await apiCreateBook(newBook, { auth: { accessToken } });
      await handleGetBooks();
      setNewBook({ title: "", author: "", genre: "" });
    } catch (error) {
      console.error("Error creating book: ", error);
    }
  };

  const handleUpdateBook = async (bookId, newData) => {
    try {
      await apiUpdateBook(bookId, newData, { auth: { accessToken } });
      await handleGetBooks();
    } catch (error) {
      console.error("Error updating book: ", error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    console.log('Book Id front: ', bookId)
    try {
      await apiDeleteBook(bookId, { auth: { accessToken } });
      await handleGetBooks();
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  };

  const handleFetchUser = async () => {
    try {
      const userData = await apiFetchUser({ auth: { accessToken } });
      console.log("User Data: ", userData);
      setFirstName(userData.first_name);
    } catch (error) {
      console.error("Error getting user: ", error);
    }
  };

  console.log("First name: ", firstName);

  return (
    <div className="container">
      <h1 className="header">{firstName}'s Book Collection</h1>
      <div className="form-group">
        <h2>Add New Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          className="input-field"
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          className="input-field"
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={newBook.genre}
          className="input-field"
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
        />
        <div className="button-group">
          <button onClick={handleCreateBook}>Add Book</button>
        </div>
      </div>
      <h2>Your Books</h2>
      <ul className="books-list">
        {books && books.length > 0 && books.map((book) => (
          <li key={book.id} className="book-item">
            <div className="book-details">
              {book.title} - {book.author} - {book.genre}
            </div>
            <div className="book-actions">
              <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
