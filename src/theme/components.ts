import { type Components, type Theme } from '@mui/material';

const components: Components<Omit<Theme, 'components'>> = {
  MuiLink: {
    defaultProps: {
      color: 'secondary.light',
      fontWeight: 600,
    },
  },
};

export default components;