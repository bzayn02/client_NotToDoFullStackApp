import { toast } from 'react-toastify';
import { fetchTask, postTask, switchTask } from '../helper/axiosHelper';
import { setTaskList } from './taskSlice';

export const getTaskLists = () => async (dispatch) => {
  // taskList from server
  const { status, taskList } = await fetchTask();
  if (status === 'success' && taskList.length) {
    // setList(taskList);
    dispatch(setTaskList(taskList));
  }
};

export const addTaskList = (taskObj) => async (dispatch) => {
  try {
    const responsePromise = postTask(taskObj);
    toast.promise(responsePromise, {
      pending: 'Please Wait...',
    });
    const { status, message } = await responsePromise;

    console.log(status);
    toast[status](message);

    if (status === 'success') {
      // call the api to fetch tasks
      dispatch(getTaskLists());
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateTask = (taskObj) => async (dispatch) => {
  const dataPending = switchTask(taskObj);

  toast.promise(dataPending, {
    pending: 'Please wait...',
  });

  const { status, message } = await dataPending;
  toast[status](message);

  if (status === 'success') {
    dispatch(getTaskLists());
  }
};
