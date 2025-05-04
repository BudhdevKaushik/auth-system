import validator from "validator";

export const validateRegisterInput = (username, email, password) => {
  const errors = {};

  if (!username || username.trim() === "") {
    errors.username = "Username is required";
  } else if (username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  if (!password || password.trim() === "") {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLoginInput = (usernameOrEmail, password) => {
  const errors = {};

  if (!usernameOrEmail || usernameOrEmail.trim() === "") {
    errors.usernameOrEmail = "Username or email is required";
  }

  if (!password || password.trim() === "") {
    errors.password = "Password is required";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
