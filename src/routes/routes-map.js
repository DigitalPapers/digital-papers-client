export const routesMap = new Map([
  [
    'dashboard',
    new Map([
      ['home', { name: 'Dashboard', path: '/dashboard' }],
      ['list', { name: 'Clients', path: '/dashboard/clients' }],
      [
        'list-docs',
        { name: 'List Docs', path: '/dashboard/clients/:id/files' },
      ],
    ]),
  ],

  [
    'auth',
    new Map([
      ['login', { name: 'Login', path: '/' }],
      ['callback', { name: 'Login Callback', path: '/callback' }],
      ['logout', { name: 'Logout', path: '/logout' }],
    ]),
  ],
]);
