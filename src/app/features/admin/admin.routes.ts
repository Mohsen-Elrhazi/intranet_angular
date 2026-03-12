import { Component } from '@angular/core';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import { TeachersComponent } from './pages/teachers/teachers.component';

export const adminRoutes = [
  {
    path: 'dashboard',
    Component: MainLayoutComponent,
    children: [
      {
        path: 'teachers',
        Component: TeachersComponent,
      },
      {
        path: 'students',
        Component: TeachersComponent,
      }
    ],
  },
];
