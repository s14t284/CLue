import { configure } from '@storybook/react';

// configure(require.context('../src', true, /\.stories\.js$/), module);
configure(require.context('../src/components/stories', true, /\.js$/), module);