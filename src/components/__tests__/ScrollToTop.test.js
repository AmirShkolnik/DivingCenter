import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { Router, Route, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ScrollToTop from '../ScrollToTop';
import CourseSingle from '../../pages/courses/CourseSingle';
import SignInForm from '../../pages/auth/SignInForm';
import SignUpForm from '../../pages/auth/SignUpForm';
import PostPage from '../../pages/posts/PostPage';
import PostEditForm from '../../pages/posts/PostEditForm';
import PostCreateForm from '../../pages/posts/PostCreateForm';
import ProfilePage from '../../pages/profiles/ProfilePage';

// Mock dependencies
jest.mock('../../pages/courses/CourseSingle', () => () => <div>Course Single Page</div>);
jest.mock('../../pages/auth/SignInForm', () => () => <div>Sign In Form</div>);
jest.mock('../../pages/auth/SignUpForm', () => () => <div>Sign Up Form</div>);
jest.mock('../../pages/posts/PostPage', () => () => <div>Post Page</div>);
jest.mock('../../pages/posts/PostEditForm', () => () => <div>Post Edit Form</div>);
jest.mock('../../pages/posts/PostCreateForm', () => () => <div>Post Create Form</div>);
jest.mock('../../pages/profiles/ProfilePage', () => () => <div>Profile Page</div>);

// Mock the scrollTo function
beforeAll(() => {
  window.scrollTo = jest.fn();
});

afterAll(() => {
  jest.restoreAllMocks();
});

afterEach(() => {
  cleanup();
  window.scrollTo.mockClear();
});

it('should scroll to the top when pathname changes', () => {
  const history = createMemoryHistory({ initialEntries: ['/posts'] });

  render(
    <Router history={history}>
      <ScrollToTop />
      <Switch>
        <Route path="/posts" exact render={() => <div>Posts Page</div>} />
        <Route path="/posts/create" component={PostCreateForm} />
        <Route path="/posts/:id" exact component={PostPage} />
        <Route path="/posts/:id/edit" component={PostEditForm} />
        <Route path="/courses" exact render={() => <div>Courses Page</div>} />
        <Route path="/courses/:slug" component={CourseSingle} />
        <Route path="/bookings" render={() => <div>Booking Form</div>} />
        <Route path="/contactus" render={() => <div>Contact Form</div>} />
        <Route path="/signin" component={SignInForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/profiles/:id" component={ProfilePage} />
      </Switch>
    </Router>
  );

  // Check initial route
  expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  expect(window.scrollTo).toHaveBeenCalledTimes(1);

  const routes = [
    '/courses',
    '/courses/react-basics',
    '/bookings',
    '/contactus',
    '/signin',
    '/signup',
    '/posts/create',
    '/posts/1',
    '/posts/1/edit',
    '/profiles/1'
  ];

  routes.forEach((route, index) => {
    act(() => {
      history.push(route);
    });

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(window.scrollTo).toHaveBeenCalledTimes(index + 2); // +2 because of initial call
  });
});
