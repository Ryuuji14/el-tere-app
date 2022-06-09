export const handleErrorMessage = (error) => {
  if (typeof error === "string") return error;

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    if (error.response.status < 500) {
      if (error.response.status === 422) {
        const errors = error.response.data?.errors;
        if (Array.isArray(errors) && errors.length > 0) {
          return "Fomulario inválido";
        }

        return error.response.data?.message;
      }

      return error.response.data?.message;
    } else {
      return "Error del servidor, por favor contacte a soporte para mas informacion";
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return "Error de red, por favor verifique su conexión a internet, o contacte a soporte para mas informacion";
  } else {
    // Something happened in setting up the request that triggered an Error
    return "error desconocido, contacte a soporte para mas informacion";
  }
};
