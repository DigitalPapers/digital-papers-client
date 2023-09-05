export const routesMap = new Map([
  ['home', { name: 'Dashboard Home', path: '/dashboard' }],
  [
    'auth',
    new Map([
      ['login', { name: 'Login', path: '/' }],
      ['callback', { name: 'Login Callback', path: '/callback' }],
      ['logout', { name: 'Logout', path: '/logout' }],
    ]),
  ],
  [
    'clients',
    new Map([
      ['list', { name: 'Clients', path: '/dashboard/clients' }],
      [
        'list-docs',
        { name: 'List Docs', path: '/dashboard/clients/:id/files' },
      ],
    ]),
  ],
]);
