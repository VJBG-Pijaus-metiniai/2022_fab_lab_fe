import axios from "axios";

const API = "http://localhost:8000";

enum Routes {
  Login = "/login",
  Register = "/register",
  Projects = "/project",
  User = "/user",
  Reg = "/reg",
}

export const GetCurrentUser = async () => {
  try {
    const response = await axios
      .create({ withCredentials: true })
      .get(API + Routes.User);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const CreateProject = async (
  title: string,
  description: string,
  supervisor: string,
  images: string[]
) => {
  try {
    const response = await axios.create({ withCredentials: true }).post(
      API + Routes.Projects,
      JSON.stringify({
        title,
        description,
        supervisor,
        images,
      }),
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const DeleteProject = async (id: string) => {
  const response = await axios
    .create({ withCredentials: true })
    .delete(API + Routes.Projects + `/${id}`);
  return response.data;
};

export const GetProjects = async () => {
  const response = await axios.get(API + Routes.Projects);
  return response;
};

export const GetProject = async (id: string) => {
  const response = await axios.get(API + Routes.Projects + `/${id}`);
  return response.data;
};

export const LoginFunc = async (email: string, password: string) => {
  const response = await axios.create({ withCredentials: true }).post(
    API + Routes.Login,
    JSON.stringify({
      email,
      password,
    }),
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  return response;
};

export const CheckRegisterKey = async (register_key: string) => {
  const { data } = await axios
    .create({ withCredentials: true })
    .post(API + Routes.Reg, JSON.stringify({ register_key }), {
      headers: {
        "Content-type": "application/json",
      },
    });

  return data.success;
};

export const RegisterFunc = (
  email: string,
  password: string,
  name: string,
  secret: string
) => {
  axios
    .create({ withCredentials: true })
    .post(
      API + Routes.Register,
      JSON.stringify({
        email,
        password,
        name,
        secret,
      }),
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e.message);
      return e.message;
    });
};

export const Logout = async () => {
  const response = await axios
    .create({ withCredentials: true })
    .delete(API + Routes.Login);
  return response.data;
};