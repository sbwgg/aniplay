export const checkEnvironment = () => {
    let base_url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        // ? '/https://mussabaniplay.vercel.app'
        : "https://mussabaniplay.vercel.app";
  
    return base_url;
  };
