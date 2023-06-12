import axios from 'axios';

const api = 'http://localhost:8000/api/v1/task';

// Adding task
export const postTask = async (taskObj) => {
  try {
    // {data} destructured from response from server
    const { data } = await axios.post(api, taskObj);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Fetching tasks
export const fetchTask = async () => {
  try {
    // {data} destructured from response from server
    const { data } = await axios.get(api);

    return data;
  } catch (error) {
    console.log(error);
  }
};
