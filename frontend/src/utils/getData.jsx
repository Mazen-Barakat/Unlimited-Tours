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
