// export interface MenuItem {
//   label: string;
//   icon: string;
//   route: string;
//   roles: string[];
// }

// export const MENU_ITEMS: MenuItem[] = [
//   // --- ADMIN ---
//   {
//     label: 'Ensignants',
//     icon: 'team',
//     route: '/admin/enseignants',
//     roles: ['ADMIN'],
//   },
//    {
//     label: 'Etudiants',
//     icon: 'team',
//     route: '/admin/etudiants',
//     roles: ['ADMIN'],
//   },
//    {
//     label: 'Departements',
//     icon: 'team',
//     route: '/admin/departements',
//     roles: ['ADMIN'],
//   },

//   // --- TEACHER ---
//   {
//     label: 'courses',
//     icon: 'book',
//     route: '/teacher/courses',
//     roles: ['TEACHER'],
//   },

//   // --- STUDENT ---
//   {
//     label: 'courses',
//     icon: 'book',
//     route: '/student/courses',
//     roles: ['STUDENT'],
//   },
//   {
//     label: 'assignments',
//     icon: 'file-text',
//     route: '/student/assignments',
//     roles: ['STUDENT'],
//   },

// ];

export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  roles: string[];
  children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  // --- ADMIN ---
  {
    label: 'Enseignants',
    icon: 'team',
    roles: ['ADMIN'],
    children: [
      {
        label: ' Actifs',
        route: '/admin/enseignants/actifs',
        roles: ['ADMIN'],
      },
      {
        label: ' Supprimés',
        route: '/admin/enseignants/supprimes',
        roles: ['ADMIN'],
      },
    ],
  },
  {
    label: 'Étudiants',
    icon: 'user',
    route: '/admin/etudiants',
    roles: ['ADMIN'],
    children: [
      {
        label: ' Actifs',
        route: '/admin/etudiants/actifs',
        roles: ['ADMIN'],
      },
      {
        label: ' Supprimés',
        route: '/admin/etudiants/supprimes',
        roles: ['ADMIN'],
      },
    ],
  },
  {
    label: 'Départements',
    icon: 'bank',
    route: '/admin/departements',
    roles: ['ADMIN'],
  },
    {
    label: 'filieres',
    icon: 'file',
    route: '/admin/filieres',
    roles: ['ADMIN'],
  },
  // --- TEACHER ---

  {
    label: 'courses',
    icon: 'book',
    route: '/teacher/courses',
    roles: ['TEACHER'],
  },
];
