import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Loader2 } from "lucide-react";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import {
  BookOpen,
  Building2,
  ClipboardCheck,
  GraduationCap,
  Home as HomeIcon,
  Users,
} from "lucide-react";
import SubjectsList from "./pages/subjects/list";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectsCreate from "./pages/subjects/create";
import SubjectsShow from "./pages/subjects/show";
import SubjectsEdit from "./pages/subjects/edit";
import Dashboard from "./pages/dashboard";

import { dataProvider } from "./providers/data";
import ClassesList from "./pages/classes/list";
import ClassesCreate from "./pages/classes/create";
import ClassesShow from "./pages/classes/show";
import { authProvider } from "./providers/auth";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import DepartmentsList from "./pages/departments/list";
import DepartmentsCreate from "./pages/departments/create";
import DepartmentShow from "./pages/departments/show";
import DepartmentsEdit from "./pages/departments/edit";
import FacultyList from "./pages/faculty/list";
import FacultyShow from "./pages/faculty/show";
import EnrollmentsCreate from "./pages/enrollments/create";
import EnrollmentsJoin from "./pages/enrollments/join";
import EnrollmentConfirm from "./pages/enrollments/confirm";
import { ForgotPassword } from "./pages/forgot-password";
import ClassesEdit from "./pages/classes/edit";
import { Home } from "./pages/home";
import ProfilePage from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            notificationProvider={useNotificationProvider()}
            routerProvider={routerProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: "YwCD3Y-ufGFjF-VUx4VZ",
            }}
            // App title for the sidebar/header
            title={{
              text: "School Management",
            }}
            resources={[
                {
                  name: "dashboard",
                  list: "/app",
                  meta: {
                    label: "Home",
                    icon: <HomeIcon />,
                  },
                },
                {
                  name: "subjects",
                  list: "/subjects",
                  create: "/subjects/create",
                  show: "/subjects/show/:id",
                  edit: "/subjects/edit/:id",
                  meta: {
                    label: "Subjects",
                    icon: <BookOpen />,
                  },
                },
                {
                  name: "departments",
                  list: "/departments",
                  show: "/departments/show/:id",
                  create: "/departments/create",
                  edit: "/departments/edit/:id",
                  meta: {
                    label: "Departments",
                    icon: <Building2 />,
                  },
                },
                {
                  name: "users",
                  list: "/faculty",
                  show: "/faculty/show/:id",
                  meta: {
                    label: "Faculty",
                    icon: <Users />,
                  },
                },
                {
                  name: "enrollments",
                  list: "/enrollments/create",
                  create: "/enrollments/create",
                  meta: {
                    label: "Enrollments",
                    icon: <ClipboardCheck />,
                  },
                },
                {
                  name: "classes",
                  list: "/classes",
                  create: "/classes/create",
                  show: "/classes/show/:id",
                  edit: "/classes/edit/:id",
                  meta: {
                    label: "Classes",
                    icon: <GraduationCap />,
                  },
                },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="public-routes"
                    fallback={<Outlet />}
                    loading={<PageLoader />}
                  >
                    <NavigateToResource fallbackTo="/app" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>

              <Route path="/" element={<Home />} />

              <Route
                element={
                  <Authenticated
                    key="private-routes"
                    fallback={<NavigateToResource fallbackTo="/login" />}
                    loading={<PageLoader />}
                  >
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route path="/app" element={<Dashboard />} />
                <Route path="/profile" element={<ProfilePage />} />

                  <Route path="subjects">
                    <Route index element={<SubjectsList />} />
                    <Route path="create" element={<SubjectsCreate />} />
                    <Route path="edit/:id" element={<SubjectsEdit />} />
                    <Route path="show/:id" element={<SubjectsShow />} />
                  </Route>

                  <Route path="departments">
                    <Route index element={<DepartmentsList />} />
                    <Route path="create" element={<DepartmentsCreate />} />
                    <Route path="edit/:id" element={<DepartmentsEdit />} />
                    <Route path="show/:id" element={<DepartmentShow />} />
                  </Route>

                  <Route path="faculty">
                    <Route index element={<FacultyList />} />
                    <Route path="show/:id" element={<FacultyShow />} />
                  </Route>

                  <Route path="enrollments">
                    <Route path="create" element={<EnrollmentsCreate />} />
                    <Route path="join" element={<EnrollmentsJoin />} />
                    <Route path="confirm" element={<EnrollmentConfirm />} />
                  </Route>

                  <Route path="classes">
                    <Route index element={<ClassesList />} />
                    <Route path="create" element={<ClassesCreate />} />
                    <Route path="edit/:id" element={<ClassesEdit />} />
                    <Route path="show/:id" element={<ClassesShow />} />
                  </Route>
              </Route>
            </Routes>

            <Toaster />
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

const PageLoader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100svh",
    }}
  >
    <Loader2 className="animate-spin" style={{ width: 40, height: 40 }} />
  </div>
);

export default App;
