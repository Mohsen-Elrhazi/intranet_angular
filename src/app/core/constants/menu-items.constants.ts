export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles: string[];
}

export const MENU_ITEMS: MenuItem[] = [
  // --- ADMIN ---
  {
    label: 'teachers',
    icon: 'team',
    route: '/admin/teachers',
    roles: ['ADMIN'],
  },

  // --- TEACHER ---
  {
    label: 'courses',
    icon: 'book',
    route: '/teacher/courses',
    roles: ['TEACHER'],
  },

  // --- STUDENT ---
  {
    label: 'courses',
    icon: 'book',
    route: '/student/courses',
    roles: ['STUDENT'],
  },
  {
    label: 'assignments',
    icon: 'file-text',
    route: '/student/assignments',
    roles: ['STUDENT'],
  },


    
];
