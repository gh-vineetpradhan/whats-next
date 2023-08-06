// handle errors
const handleErrors = (err: Record<string, any>) => {
  let errors = { title: "" };

  // validation errors
  if (
    err.message.includes("item validation failed") ||
    err.message.includes("Validation failed")
  ) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      const path = properties.path as "title";
      errors[path] = properties.message;
    });
  }

  return errors;
};

export default handleErrors;
