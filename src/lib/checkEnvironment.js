export const checkEnvironment = () => {
    let base_url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        // ? 'https://aniplay-next.vercel.app'
        : "https://bertoo.pro";
  
    return base_url;
  };