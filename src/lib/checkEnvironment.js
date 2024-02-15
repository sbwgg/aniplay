export const checkEnvironment = () => {
    let base_url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        // ? 'https://bertoo.pro'
        : "https://bertoo.pro";
  
    return base_url;
  };