interface PostCssConfig {
  plugins: Record<string, object>;
}

const config: PostCssConfig = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
