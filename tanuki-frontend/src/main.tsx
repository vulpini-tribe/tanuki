import React from 'react';
import { createRoot } from 'react-dom/client';

import Root from '@core/Root';
import '@radix-ui/themes/styles.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<Root />);
