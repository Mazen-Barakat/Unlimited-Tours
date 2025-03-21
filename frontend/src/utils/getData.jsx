import { redirect } from 'react-router-dom';
export const api_url = 'http://127.0.0.1:8000';
export const auth = 'JWT ' + localStorage.getItem('access_token');

export const getTours = async () => {
  return fetch(api_url + `/tours-hub/tours`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
};

export const getSelectedTours = async type => {
  return fetch(api_url + `/tours-hub/tours/?tour_type=${type}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
};

export const getTourDetails = async id => {
  return fetch(api_url + `/tours-hub/tours/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
};

export const getTourImages = async id => {
  return fetch(api_url + `/tours-hub/tours/${id}/gallery`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
};

export const getTourReviews = async id => {
  return fetch(api_url + `/tours-hub/tours/${id}/reviews`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
};

export const getTourFacilities = async id => {
  return fetch(api_url + `/tours-hub/tours/${id}/facilities`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
};

export const getTourProgram = async id => {
  return fetch(api_url + `/tours-hub/tours/${id}/program`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
};

export const getBlogs = async () => {
  return fetch(api_url + `/blogs-hub/blogs`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
};

export const getBlogDetails = async id => {
  return fetch(api_url + `/blogs-hub/blogs/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
};

export const getBlogImages = async id => {
  return fetch(api_url + `/blogs-hub/blogs/${id}/gallery`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
};

export const getBlogComments = async id => {
  return fetch(api_url + `/blogs-hub/blogs/${id}/comments`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
};

export const signIn = async data => {
  return fetch(api_url + `/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
};

export const logout = async () => {
  localStorage.removeItem('access_token');
  redirect('/');
  window.location.reload();
};

export const getUserProfile = async () => {
  return fetch(api_url + `/auth/users/me/`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: auth,
    },
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
};
