import axios from "axios";

const URL = "http://127.0.0.1:8000";

export const createUser = ({ username, password, firstName, lastName }) => {
  axios({
    method: "post",
    url: `${URL}/create-user/`,
    data: {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
    },
  })
    .then((response) => {
      console.log("create-user: ", response);
    })
    .catch((error) => console.log("Error: ", error));
};

export const getToken = async ({ username, password }) => {
  try {
    const response = await axios.post(`${URL}/token/`, {
      username,
      password,
    });
    console.log("response: ", response);
    return response.data.access; // Return the access token
  } catch (error) {
    console.log("Error: ", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const fetchUser = async ({ auth }) => {
  try {
    const response = await axios({
      method: "get",
      url: `${URL}/profile`,
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log("Fetch Response: ", response);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

export const createBook = async ({ title, author, genre }, {auth}) => {
  return axios({
    method: "post",
    url: `${URL}/add_book/`,
    headers: {
        Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      title,
      author,
      genre,
    },
  })
    .then((response) => {
      console.log("create-book: ", response);
      return response.data;
    })
    .catch((error) => {
      console.error("error: ", error);
      throw error;
    });
};

export const getBooks = async ({ auth }) => {
  try {
    const response = await axios({
      url: `${URL}/books`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log("getBooks: ", response);
    return response.data;
  } catch (error) {
    console.error("Error getting books: ", error);
    throw error;
  }
};

export const updateBook = async (bookId, newData) => {
  try {
    const response = await axios.put(`${URL}/books/${bookId}`, newData);
    console.log("updated book: ", response);
    return response.data;
  } catch (error) {
    console.error("Error updating book: ", error);
    throw error;
  }
};

export const deleteBook = async (bookId, {auth}) => {
  try {
    const response = await axios.delete(`${URL}/books/${bookId}`, {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    })
    console.log('Book id: ', bookId)
    console.log("delete book: ", response);
  } catch (error) {
    console.error("Error deleting book: ", error);
    throw error;
  }
};
