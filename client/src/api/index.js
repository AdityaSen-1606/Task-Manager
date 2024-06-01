import axios from "axios"

const api = axios.create({
    baseURL:'http://localhost:3000',
});

export const registerUser = (userData) => api.post('/api/auth/register',userData);

export const loginUser = (userData) => api.post('/api/auth/login',userData);

export const getUserName = (token) => api.get('/api/auth/user',{
    headers:{
        Authorization:token,
    },
});

export const getBoards = (token) => api.get('/api/board',{
    headers:{
        Authorization:token,
    },
});


export const createBoard = ({ token, name}) => {
    console.log("in create Board");
  return api.post(
    "/api/board/create",
    { name },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const getTasks = ({ token, boardId }) =>
  api.get(`/api/tasks/${boardId}`, {
    headers: {
      Authorization: token,
    },
});

export const createTask = ({ title, description, status, boardId,token}) => {
    return api.post('api/tasks/create',{title,description,status,boardId},{
    headers:{
        Authorization:token,
    }
})};

export const removeTask = ({taskId, token}) => {
    return api.delete(`api/tasks/delete/${taskId}`,{
        headers:{
            Authorization:token,
        },
    })
};

export const deleteBoard = ({token,boardId}) => {
    return api.delete(`api/board/delete/${boardId}`,{
        headers:{
            Authorization:token,
        },
    })
};

export const updateBoard = ({token, boardId, name}) => {
    return api.put(`api/board/update/${boardId}`, {name},{
        headers:{
            Authorization:token,
        },
    })
};
