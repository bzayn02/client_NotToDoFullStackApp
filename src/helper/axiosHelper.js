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

// Switching task
export const switchTask = async (taskObj) => {
  try {
    // {data} destructured from response from server
    const { data } = await axios.patch(api, taskObj);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Deleting task
export const deleteTasks = async (ids) => {
  try {
    // {data} destructured from response from server
    // axios.delete(api, { data: ids }); Delete specific method to follow
    const { data } = await axios.delete(api, { data: ids });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
