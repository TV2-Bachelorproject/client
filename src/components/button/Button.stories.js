import React from 'react';

import { action } from '@storybook/addon-actions';

import Button from '../button/Button';

export default {
  title: 'Button',
};

export const Primary = () => (
  <Button onClick={action('Button clicked')} variant="contained">
    Click me!
  </Button>
);

export const Secondary = () => (
<Button color="secondary" onClick={action('Secondary button clicked')} variant="contained">
Secondary
</Button>
);

export const Disabled = () => (
  <Button onClick={action('Secondary button clicked')} disabled>
    Disabled
  </Button>
  );