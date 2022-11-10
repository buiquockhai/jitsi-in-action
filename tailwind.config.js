module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        link: '#1890ff',
        success: '#52c41a',
        warning: '#faad14',
        error: '#f5222d',
        disabled: '#646e73',
        background: '#f5f5f5',
      },
    },
    borderRadius: {
      none: '0',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      large: '12px',
    },
  },
  variants: {
    extend: {
      borderWidth: ['first', 'last', 'hover'],
      borderRadius: ['first', 'last', 'hover'],
    },
  },
  plugins: [],
};
