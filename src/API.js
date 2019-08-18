const endpoint = "http://localhost:3000/api/v1/";
//Sam's Auth code:
const signupUrl = `${endpoint}users/`;
const loginUrl = `${endpoint}login/`;
const validateUrl = `${endpoint}validate/`;
const listingsUrl = `${endpoint}listings/`;
const listingPositonUrl = `${endpoint}listing/`;
const playlistsUrl = `${endpoint}playlists/`;
const likeUrl = `${endpoint}likes/`;

const jsonify = res => {
  if (res.ok) return res.json(); //DEFAULT

  else {

    return res.json().then(data => {
      if (data.errors) {
        throw data.errors; //if errors "throw" errrs
      } else {
        return data;
      }
    });
  }
};

const handleServerError = errors => {
  console.error(errors);
  throw errors;
}; //only called in catch

const fetchAllListings = () => {
  return fetch(listingsUrl)
    .then(resp => resp.json())
    .catch(handleServerError);
};

const fetchAllPlaylists = () => {
  return fetch(playlistsUrl)
    .then(resp => resp.json())
    .catch(handleServerError);
};

const getPlaylist = (id) => {
  return fetch(playlistsUrl + '/' + id)
    .then(resp => resp.json()).then(data => console.log("here is playlist", data))
    .catch(handleServerError);
};

//Sam's Auth Code...
const constructHeaders = (moreHeaders = {}) => ({
  Authorization: localStorage.getItem("token"),
  ...moreHeaders
});

const signUp = user =>
  fetch(signupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  })
    .then(jsonify)
    .then(data => {
      console.log("token: ", data.token);
      localStorage.setItem("token", data.token);
      return data.user;
    })
    .catch(handleServerError);

const logIn = user =>
  fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  })
    .then(jsonify)
    .then(data => {
      console.log("token: ", data.token);
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", data.user.id);
      localStorage.setItem("email", data.user.email);
      return data.user;
    })
    .catch(handleServerError);

const validateUser = () => {
  if (!localStorage.getItem("token"))
    return Promise.resolve({ error: "no token" });

  return fetch(validateUrl, {
    headers: constructHeaders()
  })
    .then(jsonify)
    .then(data => {
      localStorage.setItem("token", data.token);
      return data.user;
    })
    .catch(handleServerError);
};

const logOut = props => {
  localStorage.clear()
  props.clearCurrentUser();
  props.history.push("/");
};

const deleteListing = (id) => {
  return fetch(listingsUrl + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },

  }).then(jsonify)
    .then(listing => {
      console.log(" deleted listing: ", listing)
      return listing
    })
    .catch(handleServerError)
}

const deletePlaylist = (id) => {
  return fetch(playlistsUrl + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },

  }).then(jsonify)
    .then(playlist => {
      console.log(" deleted playlist: ", playlist)
      return playlist
    })
    .catch(handleServerError)
}

const postListing = (listing) => fetch(listingsUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ listing })
}).then(jsonify)
  .then(listing => {
    console.log("listing: ", listing)
    return listing
  })
  .catch(handleServerError)

  const postLike = (like) => fetch(likeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ like })
  }).then(jsonify)
    .then(like => {
      console.log("listing: ", like)
      return like
    })
    .catch(handleServerError)

const updateListingsPositions = (listing, type) => fetch(listingPositonUrl + type, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ listing })
}).then(jsonify)
  .then(listing => {
    console.log("Updated listing: ", listing)
    return listing
  })
  .catch(handleServerError)

const updatePlaylist = (playlist) => fetch(playlistsUrl + playlist.id, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ playlist })
}).then(jsonify)
  .then(playlist => {
    console.log("Updated listing: ", playlist)
    return playlist
  })
  .catch(handleServerError)

const postPlaylist = (playlist) => fetch(playlistsUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ playlist })
}).then(jsonify)
  .then(playlist => {
    console.log("playlist: ", playlist)
    return playlist
  })
  .catch(handleServerError)


export default {
  signUp,
  logIn,
  validateUser,
  logOut,
  fetchAllListings,
  postListing,
  deleteListing,
  postPlaylist,
  deletePlaylist,
  fetchAllPlaylists,
  updateListingsPositions,
  updatePlaylist,
  getPlaylist,
  postLike,
  
};
