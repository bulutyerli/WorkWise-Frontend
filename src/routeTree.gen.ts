/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ContactImport } from './routes/contact'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as AppLayoutImport } from './routes/app/_layout'
import { Route as AppLayoutIndexImport } from './routes/app/_layout/index'
import { Route as AppLayoutSicknessLeaveImport } from './routes/app/_layout/sickness-leave'
import { Route as AppLayoutIncomeImport } from './routes/app/_layout/income'
import { Route as AppLayoutHierarchyImport } from './routes/app/_layout/hierarchy'
import { Route as AppLayoutExpenseImport } from './routes/app/_layout/expense'
import { Route as AppLayoutAnnualLeaveImport } from './routes/app/_layout/annual-leave'
import { Route as AppLayoutStaffIndexImport } from './routes/app/_layout/staff/index'
import { Route as AppLayoutStaffStaffIdIndexImport } from './routes/app/_layout/staff/$staffId/index'
import { Route as AppLayoutStaffStaffIdEditStaffImport } from './routes/app/_layout/staff/$staffId/edit-staff'

// Create Virtual Routes

const AppImport = createFileRoute('/app')()

// Create/Update Routes

const AppRoute = AppImport.update({
  path: '/app',
  getParentRoute: () => rootRoute,
} as any)

const ContactRoute = ContactImport.update({
  path: '/contact',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AppLayoutRoute = AppLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => AppRoute,
} as any)

const AppLayoutIndexRoute = AppLayoutIndexImport.update({
  path: '/',
  getParentRoute: () => AppLayoutRoute,
} as any)

const AppLayoutSicknessLeaveRoute = AppLayoutSicknessLeaveImport.update({
  path: '/sickness-leave',
  getParentRoute: () => AppLayoutRoute,
} as any)

const AppLayoutIncomeRoute = AppLayoutIncomeImport.update({
  path: '/income',
  getParentRoute: () => AppLayoutRoute,
} as any)

const AppLayoutHierarchyRoute = AppLayoutHierarchyImport.update({
  path: '/hierarchy',
  getParentRoute: () => AppLayoutRoute,
} as any)

const AppLayoutExpenseRoute = AppLayoutExpenseImport.update({
  path: '/expense',
  getParentRoute: () => AppLayoutRoute,
} as any)

const AppLayoutAnnualLeaveRoute = AppLayoutAnnualLeaveImport.update({
  path: '/annual-leave',
  getParentRoute: () => AppLayoutRoute,
} as any)

const AppLayoutStaffIndexRoute = AppLayoutStaffIndexImport.update({
  path: '/staff/',
  getParentRoute: () => AppLayoutRoute,
} as any)

const AppLayoutStaffStaffIdIndexRoute = AppLayoutStaffStaffIdIndexImport.update(
  {
    path: '/staff/$staffId/',
    getParentRoute: () => AppLayoutRoute,
  } as any,
)

const AppLayoutStaffStaffIdEditStaffRoute =
  AppLayoutStaffStaffIdEditStaffImport.update({
    path: '/staff/$staffId/edit-staff',
    getParentRoute: () => AppLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/contact': {
      preLoaderRoute: typeof ContactImport
      parentRoute: typeof rootRoute
    }
    '/app': {
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/app/_layout': {
      preLoaderRoute: typeof AppLayoutImport
      parentRoute: typeof AppRoute
    }
    '/app/_layout/annual-leave': {
      preLoaderRoute: typeof AppLayoutAnnualLeaveImport
      parentRoute: typeof AppLayoutImport
    }
    '/app/_layout/expense': {
      preLoaderRoute: typeof AppLayoutExpenseImport
      parentRoute: typeof AppLayoutImport
    }
    '/app/_layout/hierarchy': {
      preLoaderRoute: typeof AppLayoutHierarchyImport
      parentRoute: typeof AppLayoutImport
    }
    '/app/_layout/income': {
      preLoaderRoute: typeof AppLayoutIncomeImport
      parentRoute: typeof AppLayoutImport
    }
    '/app/_layout/sickness-leave': {
      preLoaderRoute: typeof AppLayoutSicknessLeaveImport
      parentRoute: typeof AppLayoutImport
    }
    '/app/_layout/': {
      preLoaderRoute: typeof AppLayoutIndexImport
      parentRoute: typeof AppLayoutImport
    }
    '/app/_layout/staff/': {
      preLoaderRoute: typeof AppLayoutStaffIndexImport
      parentRoute: typeof AppLayoutImport
    }
    '/app/_layout/staff/$staffId/edit-staff': {
      preLoaderRoute: typeof AppLayoutStaffStaffIdEditStaffImport
      parentRoute: typeof AppLayoutImport
    }
    '/app/_layout/staff/$staffId/': {
      preLoaderRoute: typeof AppLayoutStaffStaffIdIndexImport
      parentRoute: typeof AppLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AboutRoute,
  ContactRoute,
  AppRoute.addChildren([
    AppLayoutRoute.addChildren([
      AppLayoutAnnualLeaveRoute,
      AppLayoutExpenseRoute,
      AppLayoutHierarchyRoute,
      AppLayoutIncomeRoute,
      AppLayoutSicknessLeaveRoute,
      AppLayoutIndexRoute,
      AppLayoutStaffIndexRoute,
      AppLayoutStaffStaffIdEditStaffRoute,
      AppLayoutStaffStaffIdIndexRoute,
    ]),
  ]),
])

/* prettier-ignore-end */