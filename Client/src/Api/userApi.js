
export const createUser = async (user) => {
  try {
    const { fullName, email, password, repeat_password } = user;
    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
        repeat_password,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (user) => {
  try {
    const { fullName,password} = user;
    const res = await fetch("/update", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        fullName,
        password,

      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (user) => {
  const { email, password } = user;
  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
         Accept: "application/json",
         authorization : 'AftabHusain'
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = async (id) => {
  try {
    const res = await fetch('/logout', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: 'include'
    });
    const data = await res.json();
   // await AuthenticateUser(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async()=>{
  const res = await fetch('/user', {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}