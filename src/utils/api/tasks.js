import axios from 'axios';
import { urlApi, configHeader } from './vars';
import { getAccessToken } from './auth';


export const fetchTasks = async () => {
  const accessToken = getAccessToken();
  try {
    return await axios.get(
      `${urlApi}/tasks`,
      configHeader(accessToken),
    ).then(
      response => response.data,
    );
  } catch (error) {
    throw error;
  }
};

export const fetchStatusesTasks = async () => {
  const accessToken = getAccessToken();
  try {
    return await axios.get(
      `${urlApi}/tasksStatuses`,
      configHeader(accessToken),
    ).then(
      response => response.data,
    );
  } catch (error) {
    throw error;
  }
};

export const createTask = async (task) => {
  const accessToken = getAccessToken();
  try {
    return await axios.post(
      `${urlApi}/tasks`,
      {
        id: task.id,
        title: task.title,
        description: task.description,
        statusId: task.statusId,
        priority: task.priority,
        deadlineDate: task.deadlineDate,
        doneDate: task.doneDate,
        createDate: task.createDate,
        userId: task.userId,
      },
      configHeader(accessToken),
    ).then(
      response => response.data,
    );
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (task) => {
  const accessToken = getAccessToken();
  try {
    return await axios.patch(
      `${urlApi}/tasks/${task.id}`,
      {
        id: task.id,
        title: task.title,
        description: task.description,
        statusId: task.statusId,
        priority: task.priority,
        deadlineDate: task.deadlineDate,
        doneDate: task.doneDate,
        userId: task.userId,
      },
      configHeader(accessToken),
    ).then(
      response => response.data,
    );
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  const accessToken = getAccessToken();
  try {
    return await axios.delete(
      `${urlApi}/tasks/${taskId}`,
      configHeader(accessToken),
    ).then(
      response => response.data,
    );
  } catch (error) {
    throw error;
  }
};
