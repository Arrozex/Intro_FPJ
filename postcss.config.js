module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ 正確方式，不能再寫 `tailwindcss: {}`
    autoprefixer: {},
  },
}
