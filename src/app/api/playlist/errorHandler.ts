// handle errors
const handleErrors = (err: Record<string, any>) => {
  let errors = { title: "", userId: "", type: "" };

  // validation errors
  if (
    err.message.includes("playlist validation failed") ||
    err.message.includes("Validation failed")
  ) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      const path = properties.path as "title" | "userId" | "type";
      errors[path] = properties.message;
    });
  }

  return errors;
};

export default handleErrors;
