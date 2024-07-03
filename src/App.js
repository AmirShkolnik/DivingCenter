import React from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";
import { Route, Switch, Redirect } from "react-router-dom";
import "./api/axiosDefaults";
import LandingPage from "./pages/homepage/LandingPage.js";
import BookingForm from "./pages/bookings/BookingForm.js";
import BookingPage from './pages/bookings/BookingPage';
import CoursesPage from "./pages/courses/CoursesPage";
import CourseSingle from './pages/courses/CourseSingle';
import ContactForm from "./pages/contactus/ContactForm";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <CurrentUserProvider>
      <ProfileDataProvider>
        <div className={styles.App}>
          <NavBar />
          <div className={styles.MainWrapper}>
            <Container className={styles.Main}>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route
                  exact
                  path="/bookings/create"
                  render={() => (
                    currentUser ? <BookingForm /> : <Redirect to="/signin" />
                  )}
                />
                <Route exact path="/bookings" component={BookingPage} />
                <Route exact path="/courses" component={CoursesPage} />
                <Route
                  exact
                  path="/posts"
                  render={() => (
                    <PostsPage message="No results found. Adjust the search keyword." />
                  )}
                />
                <Route
                  exact
                  path="/feed"
                  render={() => (
                    <PostsPage
                      message="No results found. Adjust the search keyword or follow a user."
                      filter={`owner__followed__owner__profile=${profile_id}&`}
                    />
                  )}
                />
                <Route
                  exact
                  path="/liked"
                  render={() => (
                    <PostsPage
                      message="No results found. Adjust the search keyword or like a post."
                      filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                    />
                  )}
                />
                <Route exact path="/signin" render={() => <SignInForm />} />
                <Route exact path="/signup" render={() => <SignUpForm />} />
                <Route
                  exact
                  path="/posts/create"
                  render={() => (currentUser ? <PostCreateForm /> : <Redirect to="/signin" />)}
                />
                <Route exact path="/posts/:id" render={() => <PostPage />} />
                <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
                <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
                <Route
                  exact
                  path="/profiles/:id/edit/username"
                  render={() => <UsernameForm />}
                />
                <Route
                  exact
                  path="/profiles/:id/edit/password"
                  render={() => <UserPasswordForm />}
                />
                <Route
                  exact
                  path="/profiles/:id/edit"
                  render={() => <ProfileEditForm />}
                />
                <Route exact path="/contactus" component={ContactForm} />
                <Route exact path="/courses/:slug" component={CourseSingle} />
                <Route render={() => <NotFound />} />
              </Switch>
            </Container>
          </div>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            toastClassName={styles.customToast}
            style={{ zIndex: 9999 }}
          />
        </div>
      </ProfileDataProvider>
    </CurrentUserProvider>
  );
}

export default App;