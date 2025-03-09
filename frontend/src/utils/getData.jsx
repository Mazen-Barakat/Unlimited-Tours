export const api_url = 'http://127.0.0.1:8000';
export const auth = 'JWT ' + localStorage.getItem('access_token');

export const getTours = async () => {
  return fetch(api_url+`/tours-hub/tours`, {
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


export const getSelectedTours = async (type) => {
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
}

export const getTourDetails = async (id) => {
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
}

export const getTourImages = async (id) => {
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
}

export const getTourReviews = async (id) => {
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
}

export const getTourFacilities = async (id) => {
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
}

export const getTourProgram = async (id) => {
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
}