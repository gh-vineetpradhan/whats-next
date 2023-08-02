// handle errors
const handleErrors = (err: Record<string, any>) => {
  let errors = { username: "", password: "" };

  // duplicate email or username error
  if (err.code === 11000) {
    if (err.keyValue.username)
      errors.username = "Username is already registered";
  }
  // validation errors
  if (
    err.message.includes("user validation failed") ||
    err.message.includes("Validation failed")
  ) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      const path = properties.path as "username" | "password";
      errors[path] = properties.message;
    });
  }

  return errors;
};

export default handleErrors;
