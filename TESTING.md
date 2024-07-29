# Testing

This is the TESTING file for the [Diving Center](https://divingspace-900b5a3db777.herokuapp.com/) website.

Return back to the [README.md](README.md) file.

## Table of Contents

- [Testing](#testing)
  - [Table of Contents](#table-of-contents)
  - [Validation](#validation)
    - [HTML Validation](#html-validation)
    - [CSS Validation](#css-validation)
    - [JavaScript Validation](#javascript-validation)
      - [ESLint](#eslint)
      - [Steps to Run JavaScript Validation](#steps-to-run-javascript-validation)
      - [Prettier for Code Formatting](#prettier-for-code-formatting)
    - [Lighthouse](#lighthouse)
    - [Wave Accessibility Evaluation](#wave-accessibility-evaluation)
  - [Manual Testing](#manual-testing)
    - [User Input/Form Validation](#user-inputform-validation)
    - [Browser Compatibility](#browser-compatibility)
    - [Toastify Messages Implementation Testing](#toastify-messages-implementation-testing)
    - [Responsiveness](#responsiveness)
  - [Automated Testing](#automated-testing)
    - [Tools Used](#tools-used)
    - [Running Tests](#running-tests)
  - [Bugs](#bugs)
    - [Solved Bugs](#solved-bugs)
    - [Known Bugs](#known-bugs)
    - [Unknown Bugs](#unknown-bugs)

## Validation

Hey there! Welcome to our testing section for the diving center website we've built using React. We want to make sure everything works smoothly and looks great for all our diving enthusiasts out there. 

In this document, we'll walk you through all the different ways we've tested our website. We've checked everything from the code itself to how it looks and works on different devices and browsers. We've also made sure it's easy to use for everyone, including people who might need extra help accessing websites.

We've done some testing by hand, clicking around and trying things out just like a real user would. We've also used some cool automated tools to catch any sneaky bugs that might be hiding.

By the end of this, you'll see how much care we've put into making sure our diving center website is top-notch and ready for all the underwater adventures to come!

### HTML Validation

<details>
<summary>Click to View HTML Validation Screenshot</summary>

**index.html**

![HTML Validation Screenshot](doc/testing/divingreact/html/html.png)

</details>
&nbsp;

- **Tool Used:** [HTML W3C Markup Validator](https://validator.w3.org/)
- **Purpose:** Validates the HTML code of the application to ensure it is free from syntax errors and adheres to the standards set by the World Wide Web Consortium (W3C).
- **Process:** All HTML pages of Diving Center are checked through the W3C validator to identify and fix any markup errors or warnings.
- Validatuion results with zero errors and warnings in **index.html**.

**HTML Validation Bugs and Solutions**

This table provides a clear overview of the issues, solutions, and resources for the HTML validation bugs we used.

| Model       | Bug Description                                                                                       | Solution                                                                                                                               | Resource                                                                                                            | Solved |
|-------------|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|--------|
| index.html Page   | Trailing slash on void elements has no effect and interacts badly with unquoted attribute values.     | Removed trailing slashes from void elements like `<meta>`, `<link>`, and `<script>` tags.                                              | [MDN Web Docs: HTML Void Elements](https://developer.mozilla.org/en-US/docs/Glossary/Void_element)                  | ✅     |
| index.html Page   | The `type` attribute is unnecessary for JavaScript resources.                                         | Removed the `type="text/javascript"` attribute from the `<script>` tag, as it is unnecessary for JavaScript resources.                  | [MDN Web Docs: Script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)                            | ✅     |

### CSS Validation

<details>
<summary>Click to View CSS Validation Screenshot</summary>

**index.html**

![CSS Validation Screenshot](doc/testing/divingreact/css/no-error.png)

</details>
&nbsp;

- **Tool Used:** [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)
- **Purpose:** Ensures the CSS code is compliant with W3C standards, free from syntax errors, and follows best practices for styling.
- **Process:** All CSS files are validated through the W3C CSS Validation Service to identify and rectify any issues.

The table below indicates that all CSS files located in the `src/styles` directory have successfully passed the W3C CSS validation. If you want to double-check or re-run the validation tests, you can use the [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/). This website allows you to enter CSS code or the URL of a document that includes CSS to validate its correctness.

- **Note:** All files passed the W3C validator test. The CourseSingle.module.css file had warnings that were addressed and now passes the validation.

- **CSS Warnings:** This project includes custom styles, for example in [index.css](#explanation-for-indexcss), that make use of vendor-specific extensions and pseudo-elements. These ensure a consistent and polished user experience across various browsers and operating systems. During the linting process, certain warnings may appear, indicating the use of these vendor-specific extensions. These warnings are expected and can be safely ignored.

| File | Bug Description or Warning | Solution | Resource | Pass/Fail |
|------|---------------------------|----------|----------|-----------|
| [Asset.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/Asset.module.css) | N/A | N/A | N/A | ✅ |
| [Avatar.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/Avatar.module.css) | N/A | N/A | N/A | ✅ |
| [BookingForm.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/BookingForm.module.css) | N/A | N/A | N/A | ✅ |
| [BookingPage.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/BookingPage.module.css) | N/A | N/A | N/A | ✅ |
| [Button.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/Button.module.css) | N/A | N/A | N/A | ✅ |
| [Comment.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/Comment.module.css) | N/A | N/A | N/A | ✅ |
| [CommentCreateEditForm.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/CommentCreateEditForm.module.css) | N/A | N/A | N/A | ✅ |
| [ContactForm.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/ContactForm.module.css) | N/A | N/A | N/A | ✅ |
| [CourseSingle.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/CourseSingle.module.css) | Same color for background-color and border-color | Changed border-color to a different shade | [css-tricks.com](https://css-tricks.com/almanac/properties/b/border/) | ✅ |
| [CoursesPage.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/CoursesPage.module.css) | N/A | N/A | N/A | ✅ |
| [Footer.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/Footer.module.css) | N/A | N/A | N/A | ✅ |
| [index.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/index.css) | Vendor-specific properties and font names | Warnings left as is (see explanation) | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) | ⚠️ |
| [LandingPage.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/LandingPage.module.css) | N/A | N/A | N/A | ✅ |
| [MoreDropdown.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/MoreDropdown.module.css) | N/A | N/A | N/A | ✅ |
| [NavBar.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/NavBar.module.css) | N/A | N/A | N/A | ✅ |
| [NotFound.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/NotFound.module.css) | N/A | N/A | N/A | ✅ |
| [Post.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/Post.module.css) | N/A | N/A | N/A | ✅ |
| [PostCreateEditForm.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/PostCreateEditForm.module.css) | N/A | N/A | N/A | ✅ |
| [PostsPage.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/PostsPage.module.css) | N/A | N/A | N/A | ✅ |
| [Profile.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/Profile.module.css) | N/A | N/A | N/A | ✅ |
| [ProfilePage.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/ProfilePage.module.css) | N/A | N/A | N/A | ✅ |
| [SignInUpForm.module.css](https://github.com/AmirShkolnik/DivingCenter/blob/main/src/styles/SignInUpForm.module.css) | N/A | N/A | N/A | ✅ |

## **Explanation for index.css:**

The warnings in index.css are related to vendor-specific properties and font names. We are leaving these warnings as is for the following reasons:

1. **Vendor-specific properties** (-webkit-font-smoothing, -moz-osx-font-smoothing):
   - These properties are crucial for consistent font rendering across different browsers.
   - They improve text legibility, especially on macOS and iOS devices.
   - While they are non-standard, they are widely used and accepted in professional web development.

2. **System font stack** (-apple-system, BlinkMacSystemFont, etc.):
   - This approach uses system fonts, which improves performance and provides a native look and feel.
   - It's a common and recommended practice in modern web development.
   - While some of these font names are vendor-specific, they ensure the best possible font on each operating system.
   - `-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif`
   - `-webkit-font-smoothing`
   - `-moz-osx-font-smoothing`

3. **Cross-browser compatibility**:
   - These properties and font names ensure a consistent and high-quality user experience across different browsers and operating systems.
   - Removing them could lead to inconsistent rendering on various platforms.
   - `::-webkit-scrollbar`
   - `::-webkit-scrollbar-track`
   - `::-webkit-scrollbar-thumb`

4. **Industry standard practice**:
   - Many major websites and frameworks use similar approaches for font smoothing and system font stacks.
   - It's considered a best practice for balancing performance, aesthetics, and cross-platform consistency.

While these warnings are flagged by the W3C validator, they represent a case where practical web development needs sometimes diverge from strict standards adherence. The benefits of using these properties outweigh the drawbacks of having validator warnings in this specific case.

These styles are essential for ensuring optimal font rendering and custom scrollbar appearance, particularly in WebKit-based browsers (such as Chrome and Safari).

### JavaScript Validation

#### ESLint

Certainly! Here is a detailed step-by-step guide for JavaScript validation in your React project using ESLint and Prettier, written in simple English for an assessment team to understand:

---

## JavaScript Validation

### ESLint

**Tool Used:** [ESLint](https://eslint.org/)

**Purpose:** To detect errors and potential problems in the JavaScript code, ensuring that all scripts run efficiently and are error-free. ESLint helps enforce consistent coding styles and best practices by identifying and fixing problematic patterns in JavaScript code.

**Process:** JavaScript code is run through [ESLint](https://eslint.org/) to identify issues related to syntax, deprecated methods, and other inefficiencies. The validation steps include running `npm test`, `npx eslint .`, and `npm run lint`.

### Steps to Run JavaScript Validation

1. **Install Dependencies:**
   Ensure all necessary dependencies are installed by running:
   ```bash
   npm install
   ```

2. **Configuration Files:**
   - **.eslintrc.json**: This file contains the configuration for ESLint.
     ```json
     {
       "env": {
         "browser": true,
         "es2021": true,
         "jest": true,
         "node": true
       },
       "extends": [
         "eslint:recommended",
         "plugin:react/recommended",
         "plugin:react-hooks/recommended",
         "plugin:jsx-a11y/recommended",
         "plugin:prettier/recommended"
       ],
       "parser": "@babel/eslint-parser",
       "parserOptions": {
         "requireConfigFile": false,
         "babelOptions": {
           "presets": ["@babel/preset-react"]
         },
         "ecmaFeatures": {
           "jsx": true
         },
         "ecmaVersion": 2020,
         "sourceType": "module"
       },
       "plugins": ["react", "react-hooks", "jsx-a11y", "prettier"],
       "rules": {
         "react/prop-types": "off",
         "no-unused-vars": ["warn", { "args": "none" }],
         "react/react-in-jsx-scope": "off",
         "no-undef": "error",
         "no-empty": "warn",
         "prettier/prettier": "error"
       },
       "settings": {
         "react": {
           "version": "detect"
         }
       }
     }
     ```

   - **package.json**: This file [package.json](https://github.com/AmirShkolnik/DivingCenter/blob/main/package.json) includes scripts for running ESLint and Prettier.
     ```json
     {
       "scripts": {
         "lint": "eslint 'src/**/*.{js,jsx}'",
         "format": "prettier --write 'src/**/*.{js,jsx,ts,tsx,css,scss,md}'"
       }
     }
     ```

   - **.prettierrc.json**: This file [.prettierrc.json](https://github.com/AmirShkolnik/DivingCenter/blob/main/.prettierrc.json) contains the configuration for Prettier.
     ```json
     {
       "singleQuote": true,
       "trailingComma": "es5",
       "printWidth": 80
     }
     ```

3. **Run ESLint:**
   To check for linting errors, run:
   ```bash
   npx eslint src/
   ```

   This command will lint all JavaScript and JSX files in the `src` directory.
<details>
<summary>Click to View npx eslint Screenshot</summary>

**npx eslint src/**

![npx eslint src/ Screenshot](doc/testing/divingreact/eslint/eslint.png)

</details>
&nbsp;

4. **Fix Linting Errors:**
   To automatically fix some of the linting errors, run:
   ```bash
   npm run lint -- --fix
   ```

   This command uses the `--fix` option to automatically correct issues that ESLint can fix.

5. **Run Prettier:**
   To format the code according to Prettier's rules, run:
   ```bash
   npm run format
   ```

   This command will format all specified file types in the `src` directory.

6. **Run Tests:**
   To ensure that the code is not only linted but also passes all tests, run:
   ```bash
   npm test
   ```

   This command will run all tests defined in your project.

<details>
<summary>Click to View npm test Screenshot</summary>

**npm test**

![npm test Screenshot](doc/testing/divingreact/npmtest/npmtest.png)

</details>

### Summary of Validation Steps

1. **Install Dependencies:** Ensure all necessary packages are installed.
2. **Configure ESLint and Prettier:** Use `.eslintrc.json` and `.prettierrc.json` for configuration.
3. **Run ESLint:** Check for linting errors in the `src` directory.
4. **Fix Linting Errors:** Use the `--fix` option to automatically correct issues.
5. **Run Prettier:** Format the code according to Prettier's rules.
6. **Run Tests:** Ensure all tests pass.

By following these steps, you can ensure that your JavaScript code is consistently formatted, free of common errors, and adheres to best practices.

### Lighthouse

- **Tool Used:** Lighthouse is an open-source, automated tool for improving the quality of web pages. It performs audits for performance, accessibility, progressive web apps, SEO, and more. You can run it against any web page, public or requiring authentication. For more information, visit [Lighthouse](https://developers.google.com/web/tools/lighthouse).
- **Purpose:** To assess the quality of web pages in terms of performance, accessibility, progressive web apps, SEO, and best practices.
- **Process:** Dive Center is tested with Google Lighthouse, which provides a detailed report on various aspects of the site’s performance and offers recommendations for improvement.

| Page | Mobile | PC |
|------|--------|----|
| [Home](https://divingspace-900b5a3db777.herokuapp.com/) | <details><summary>Click to View Home Mobile</summary>![Home Mobile](doc/testing/divingreact/lighthouse/home-mobile.png)</details> | <details><summary>Click to View Home Pc</summary>![Home Pc](doc/testing/divingreact/lighthouse/home-pc.png)</details> |
| [Contact Us](https://divingspace-900b5a3db777.herokuapp.com/contactus) | <details><summary>Click to View Contact Us Mobile</summary>![Contact Us Mobile](doc/testing/divingreact/lighthouse/contact-us-mobile.png)</details> | <details><summary>Click to View Contact Us PC</summary>![Contact Us PC](doc/testing/divingreact/lighthouse/contact-us-pc.png)</details> |
| [Courses](https://divingspace-900b5a3db777.herokuapp.com/courses) | <details><summary>Click to View Courses Mobile</summary>![Courses Mobile](doc/testing/divingreact/lighthouse/courses-mobile.png)</details> | <details><summary>Click to View Courses PC</summary>![Courses PC](doc/testing/divingreact/lighthouse/courses-pc.png)</details> |
| [Sign In](https://divingspace-900b5a3db777.herokuapp.com/signin) | <details><summary>Click to View Sign In Mobile</summary>![Sign In Mobile](doc/testing/divingreact/lighthouse/signin-mobile.png)</details> | <details><summary>Click to View Sign In PC</summary>![Sign In PC](doc/testing/divingreact/lighthouse/signin-pc.png)</details> |
| [Sign Up](https://divingspace-900b5a3db777.herokuapp.com/signup) | <details><summary>Click to View Sign Up Mobile</summary>![Sign Up Mobile](doc/testing/divingreact/lighthouse/signup-mobile.png)</details> | <details><summary>Click to View Sign Up PC</summary>![Sign Up PC](doc/testing/divingreact/lighthouse/signup-pc.png)</details> |
| [Single Course](https://divingspace-900b5a3db777.herokuapp.com/courses/basic-open-water-diver) | <details><summary>Click to View Single Course Mobile</summary>![Single Course Mobile](doc/testing/divingreact/lighthouse/single-course-mobile.png)</details> | <details><summary>Click to View Single Course PC</summary>![Single Course PC](doc/testing/divingreact/lighthouse/single-course-pc.png)</details> |
[Feed](https://divingspace-900b5a3db777.herokuapp.com/feed) | <details><summary>Click to View Feed Mobile</summary>![Feed Mobile](doc/testing/divingreact/lighthouse/feed-mobile.png)</details> | <details><summary>Click to View Feed PC</summary>![Feed PC](doc/testing/divingreact/lighthouse/feed-pc.png)</details> |

## Improving Lighthouse Scores for React and Django REST Framework

Lighthouse is an essential tool for assessing the quality of web applications, focusing on performance, accessibility, SEO, and best practices. High Lighthouse scores are crucial for enhancing user experience and search engine rankings. This table provides a structured approach to identifying common problems that can negatively impact Lighthouse scores and offers practical solutions for both React on the frontend and Django REST framework on the backend. Each entry includes a clickable link to a resource for further reading and implementation guidance.

| Area | Problem | Solution | Resource Link |
|------|---------|----------|---------------|
| React (Frontend) | Large images affecting load time | Use responsive images to serve appropriately sized images based on device | [Properly size images](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images) |
| React (Frontend) | Unused JavaScript slowing down performance | Code-splitting and dynamic imports to load only necessary code | [Get 100 Lighthouse Performance Score with a React App](https://dev.to/mladenstojanovic/get-100-lighthouse-performance-score-with-a-react-app-hc6) |
| React (Frontend) | Poor SEO and accessibility | Implement best practices for SEO and accessibility, such as semantic HTML and ARIA roles | [5 Tips to Take your Website Lighthouse Score from Meh to WOW!](https://dev.to/ruppysuppy/5-tips-to-take-your-website-lighthouse-score-from-meh-to-wow-2375) |
| React (Frontend) | Slow initial page load | Use server-side rendering (SSR) to pre-render pages on the server | [Optimizing Your Web App: How to Score 100 on Lighthouse](https://www.justjeb.com/post/how-to-score-100-on-lighthouse) |
| Django (Backend) | Slow API responses | Optimize database queries and use caching mechanisms | [Using Google Lighthouse to optimise your mobile site](https://teapot.agency/insights/using-google-lighthouse-to-optimise-your-mobile-site) |
| Django (Backend) | Inefficient static file serving | Use a Content Delivery Network (CDN) to serve static files | [Adapting to Lighthouse 10: How Google's Latest Update Affects Your Site](https://ogalweb.com/lighthouse-10/) |
| Django (Backend) | Lack of proper image dimensions | Ensure images have explicit width and height attributes in HTML | [Responsive images vs Lighthouse performance audit](https://stackoverflow.com/questions/71912806/responsive-images-vs-lighthouse-performance-audit) |
| Django (Backend) | High server response times | Implement asynchronous processing for long-running tasks | [Improve your fashion ecommerce website's Lighthouse score and core web vitals](https://centra.com/news/improve-your-fashion-ecommerce-website-s-lighthouse-score-and-core-web-vitals) |

### Wave Accessibility Evaluation

- **Tool Used:** [Wave Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- **Purpose:** To ensure that the website is accessible to individuals with disabilities by identifying and suggesting fixes for web accessibility issues.
- **Process:** The Wave tool evaluates each page of the Diving Center to ensure it complies with accessibility standards like WCAG and Section 508.

![Wave Web Accessibility Evaluation Tool](doc/testing/divingreact/wave/wave.png)

## Manual Testing

### User Input/Form Validation

Thorough testing was conducted on all forms throughout Fit&Fine to ensure accurate user input validation and to provide necessary feedback.

## Manual Testing

This manual testing process focuses primarily on the frontend functionality of the Diving Center website. However, to provide a comprehensive understanding of how the frontend interacts with the backend, we've included split images showing both the user interface and the corresponding backend responses. For those interested in a more detailed examination of the backend testing, you can visit our [in-depth backend testing documentation](https://github.com/AmirShkolnik/DivingCenter_API/blob/main/TESTING.md). This additional resource offers valuable insights into the API endpoints, data handling, and server-side logic that support the frontend features described in this manual testing section.

The manual testing covers all aspects of the site, including:

- Navigation bar
- Footer
- Home page
- User authentication (Sign In/Sign Up)
- Course listings and individual course pages
- User profiles
- Booking system
- Feed and posts
- Likes and comments
- Reviews and ratings

The tests are categorized into two main user types:

1. Non-logged in users
2. Logged in users (members)

This distinction is crucial as it highlights the different levels of access and functionality available to each user type.

### Non-logged in Users

Non-logged in users have limited access to the site's features. They can:

- View the home page, course listings, and individual course details
- Access the contact form
- See public posts in the feed (hidden but not blocked)
- Sign up or log in

However, they cannot:

- Add, like, or comment on posts
- Book courses
- Leave reviews or ratings

### Logged in Users (Members)

Members have full access to the site's features, including:

- Viewing and editing their personal profile
- Accessing their bookings
- Viewing a personalized feed
- Creating, editing, and deleting their own posts
- Liking and commenting on posts (except their own)
- Booking courses
- Leaving reviews and ratings for courses

The manual testing process ensures that each of these features works correctly for both user types, and that the frontend actions are accurately reflected in the backend. This comprehensive approach helps maintain the integrity and functionality of the Diving Center website, providing a seamless experience for all users while encouraging non-members to sign up for full access to the site's features.

### As a visitor

## Manual Testing

### Overview

The manual testing for the Diving Center website involves verifying the functionality of both the frontend and backend components. The frontend is built using a standard web framework, while the backend is implemented using Django REST Framework. Each test ensures that user actions on the frontend are correctly handled and reflected on the backend. The tests are divided into two categories: logged-in users and non-logged-in users. Logged-in users have access to more features like commenting, liking, adding posts, booking courses, and reviewing/rating them based on their experiences. Non-logged-in users can for the most only read content.

### As a visitor

#### Navbar

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| Home link | Clicking "Home" navigates to the home page | <details><summary>Home Navigation</summary><img src="doc/testing/divingreact/pages/home.png" alt="Home Navigation"></details> | ✅ |
| Contact Us link | Clicking "Contact Us" navigates to the contact page | <details><summary>Contact Us Navigation</summary><img src="doc/testing/divingreact/pages/contact-us.png" alt="Contact Us Navigation"></details> | ✅ |
| Courses link | Clicking "Courses" navigates to the courses page | <details><summary>Courses Navigation</summary><img src="doc/testing/divingreact/pages/courses-page.png" alt="Courses Navigation"></details> | ✅ |
| Sign In link | Clicking "Sign In" navigates to the sign in page | <details><summary>Sign In Navigation</summary><img src="doc/testing/divingreact/pages/sign-in.png" alt="Sign In Navigation"></details> | ✅ |
| Sign Up link | Clicking "Sign Up" navigates to the sign up page | <details><summary>Sign Up Navigation</summary><img src="doc/testing/divingreact/pages/sign-up.png" alt="Sign Up Navigation"></details> | ✅ |

### Footer

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| GitHub link | Clicking "GitHub" navigates to the GitHub page | <details><summary>GitHub Navigation</summary><img src="doc/testing/divingreact/pages/github.png" alt="GitHub Navigation"></details> | ✅ |
| LinkedIn link | Clicking "LinkedIn" navigates to the LinkedIn page | <details><summary>LinkedIn Navigation</summary><img src="doc/testing/divingreact/pages/linkedin.png" alt="Linkedin Navigation"></details> | ✅ |



#### Non Logged-In User

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| Home link | Access to home page | <details><summary>Home Page</summary><img src="doc/testing/divingreact/non-logged-in/home.png" alt="Home Page"></details> | ✅ |
| Contact Us form | Access and use the contact us form | <details><summary>Contact Us Form</summary><img src="doc/testing/divingreact/non-logged-in/contactus.png" alt="Contact Us Form"></details> | ✅ |
| Courses link | Access to courses page | <details><summary>Courses Page</summary><img src="doc/testing/divingreact/non-logged-in/courses.png" alt="Courses Page"></details> | ✅ |
| Feed visibility | Feed is hidden but not blocked | <details><summary>Feed Visibility</summary><img src="doc/testing/divingreact/non-logged-in/feed.png" alt="Feed Visibility"></details> | ✅ |
| Read posts | Can read posts | <details><summary>Read Posts</summary><img src="doc/testing/divingreact/non-logged-in/feed.png" alt="Read Posts"></details> | ✅ |
| Add post | Cannot add posts - Redirect to home page when trying to access /posts/create endpoint which is hidden and blocked for non logged-in users | <details><summary>Add Post</summary><img src="doc/testing/divingreact/non-logged-in/home.png" alt="Add Post"></details> | ✅ |
| Like posts | Cannot like posts | <details><summary>Like Posts</summary><img src="doc/testing/divingreact/non-logged-in/like.png" alt="Like Posts"></details> | ✅ |
| Comment on posts | Cannot comment on posts | <details><summary>Comment on Posts</summary><img src="doc/testing/divingreact/non-logged-in/comment.png" alt="Comment on Posts"></details> | ✅ |
| Book courses | Cannot book courses | <details><summary>Book Courses</summary><img src="doc/testing/divingreact/non-logged-in/book.png" alt="Book Courses"></details> | ✅ |
| Review and rate courses | Cannot review and rate courses | <details><summary>Review and Rate Courses</summary><img src="doc/testing/divingreact/non-logged-in/logg-in-add-review.png" alt="Review and Rate Courses"></details> | ✅ |
| Profiles | Can read profiles | <details><summary>Profiles</summary><img src="doc/testing/divingreact/non-logged-in/profile.png" alt="Profiles"></details> | ✅ |

#### Logged-In User

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| Personal profile | Access to personal profile page | <details><summary>Personal Profile</summary>Personal Profile</details> | ✅ |
| My Bookings | Access to bookings page | <details><summary>My Bookings</summary>My Bookings 1 My Bookings 2</details> | ✅ |
| My Feed | Access to personalized feed | <details><summary>My Feed</summary>My Feed</details> | ✅ |
| Add Post | Can add new posts | <details><summary>Add Post</summary>Add Post 1 Add Post 2</details> | ✅ |
| Liked posts | Can see liked posts | <details><summary>Liked Posts</summary>Liked Posts</details> | ✅ |
| Book a course | Can book diving courses | <details><summary>Book a Course</summary>Book a Course</details> | ✅ |
| Review and rate courses | Can review and rate courses | <details><summary>Review and Rate Courses</summary>Review and Rate Courses</details> | ✅ |
| Like other posts | Can like other posts | <details><summary>Like Other Posts</summary>Like Other Posts</details> | ✅ |
| Comment on posts | Can comment on posts | <details><summary>Comment on Posts</summary>Comment on Posts</details> | ✅ |
| Change username | Can change username | <details><summary>Change Username</summary>Change Username</details> | ✅ |
| Change profile image | Can change profile image | <details><summary>Change Profile Image</summary>Change Profile Image</details> | ✅ |
| Change bio description | Can change bio description | <details><summary>Change Bio</summary>Change Bio</details> | ✅ |
| Edit own posts | Can edit own posts | <details><summary>Edit Own Posts</summary>Edit Own Posts</details> | ✅ |
| Sign Out | Can sign out | <details><summary>Sign Out</summary>Sign Out</details> | ✅ |

### Booking

Here's the updated table with step numbers and brief explanations for each image:

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| Create Booking | Successful creation of a new booking | <details><summary>Create Booking</summary><strong>Step 1:</strong> Open booking form<br><img src="doc/testing/divingreact/logged-in/bookings/create-step1.png" alt="Create Step 1"><strong>Step 2:</strong> Fill in details<br><img src="doc/testing/divingreact/logged-in/bookings/create-step2.png" alt="Create Step 2"><strong>Step 3:</strong> Review details<br><img src="doc/testing/divingreact/logged-in/bookings/create-step3.png" alt="Create Step 3"><strong>Step 4:</strong> Confirm booking<br><img src="doc/testing/divingreact/logged-in/bookings/create-step4.png" alt="Create Step 4"></details> | ✅ |
| Delete Booking | Successful deletion of a booking | <details><summary>Delete Booking</summary><strong>Step 1:</strong> Select booking<br><img src="doc/testing/divingreact/logged-in/bookings/delete-step1.png" alt="Delete Step 1"><strong>Step 2:</strong> Confirm deletion<br><img src="doc/testing/divingreact/logged-in/bookings/delete-step2.png" alt="Delete Step 2"></details> | ✅ |
| Update Booking | Successful update of an existing booking | <details><summary>Update Booking</summary><strong>Step 1:</strong> Open booking details<br><img src="doc/testing/divingreact/logged-in/bookings/update-step1.png" alt="Update Step 1"><strong>Step 2:</strong> Edit booking info<br><img src="doc/testing/divingreact/logged-in/bookings/update-step2.png" alt="Update Step 2"><strong>Step 3:</strong> Save changes<br><img src="doc/testing/divingreact/logged-in/bookings/update-step3.png" alt="Update Step 3"></details> | ✅ |
| Booking Past Date | Past date is greyed out | <details><summary>Past Date</summary><strong>Step 1:</strong> Attempt to select past date<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/booking-past-date.png" alt="Past Date"></details> | ✅ |
| Booking Same Course Twice | Error message for booking the same course twice | <details><summary>Same Course Twice</summary><strong>Step 1:</strong> Select same course<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/booking-same-course-twice.png" alt="Same Course Twice"></details> | ✅ |
| Course Missing | Error message for missing course selection | <details><summary>Course Missing</summary><strong>Step 1:</strong> Leave course field empty<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/course-missing.png" alt="Course Missing"></details> | ✅ |
| Date Missing | Error message for missing date selection | <details><summary>Date Missing</summary><strong>Step 1:</strong> Leave date field empty<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/date-missing.png" alt="Date Missing"></details> | ✅ |
| Time Missing | Error message for missing time selection | <details><summary>Time Missing</summary><strong>Step 1:</strong> Leave time field empty<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/time-missing.png" alt="Time Missing"></details> | ✅ |
| Update Booking Past Date | Error message for updating to a past date | <details><summary>Update Past Date</summary><strong>Step 1:</strong> Attempt to update to past date<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/update-booking-past-date.png" alt="Update Past Date"></details> | ✅ |
| Update Booking Same Course Twice | Error message for updating to the same course twice | <details><summary>Update Same Course Twice</summary><strong>Step 1:</strong> Select same course for update<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/update-booking-same-course-twice-step2.png" alt="Update Same Course Twice Step 2"><strong>Step 2:</strong> Confirm update<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/update-booking-same-course-twice.png" alt="Update Same Course Twice"></details> | ✅ |
| Wrong Date Format | Error message for incorrect date format | <details><summary>Wrong Date</summary><strong>Step 1:</strong> Enter wrong date format<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/wrong-date.png" alt="Wrong Date"></details> | ✅ |

### Courses

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| View courses | Access to courses list | <details><summary>View Courses</summary>View Courses</details> | ✅ |
| Book courses (logged-in) | Can book courses | <details><summary>Book Courses</summary>Book Courses</details> | ✅ |
| Review and rate courses (logged-in) | Can review and rate courses | <details><summary>Review and Rate Courses</summary>Review and Rate Courses Basic Review and Rate Courses Advanced Review and Rate Courses Rescue</details> | ✅ |

### Posts and Feed

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| View feed (non-logged-in) | Feed is hidden but not blocked | <details><summary>View Feed (Non-logged-in)</summary>View Feed Non-logged-in</details> | ✅ |
| View feed (logged-in) | Access to personalized feed | <details><summary>View Feed (Logged-in)</summary>View Feed Logged-in</details> | ✅ |
| Add post (logged-in) | Can add new posts | <details><summary>Add Post</summary>Add Post 1 Add Post 2</details> | ✅ |
| Like posts (logged-in) | Can like other posts | <details><summary>Like Posts</summary>Like Posts</details> | ✅ |
| Comment on posts (logged-in) | Can comment on posts | <details><summary>Comment on Posts</summary>Comment on Posts</details> | ✅ |

I've added the provided image links to the appropriate sections in the table. For some sections where specific images weren't provided (like Sign In, Sign Up, etc.), I left the original placeholders. You may want to add more specific images for these sections if available.

**Form Validation**

| Feature                 | Tested? | Action              | Expected Outcome                                                      | Pass/Fail | Screenshots                                                                                                                                                                 |
| ----------------------- | ------- | ------------------- | --------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SignUp Form             | Yes     | Submit form         | User receives confirmation message and is redirected to the Home page | Pass      | ![screenshot](documentation/screenshots/signup1.JPG) ![screenshot](documentation/screenshots/signup2.JPG) ![screenshot](documentation/screenshots/signup3.JPG)              |
| SignIn Form             | Yes     | Submit credentials  | User is logged in and redirected to the Home page                     | Pass      | ![screenshot](documentation/screenshots/signin1.JPG) ![screenshot](documentation/screenshots/signin2.JPG) ![screenshot](documentation/screenshots/signin3.JPG)              |
| Profile Edit Form       | Yes     | Profile Edit        | Profile is edited and displayed                                       | Pass      | ![screenshot](documentation/screenshots/profilepage.JPG) ![screenshot](documentation/screenshots/profile1.JPG) ![screenshot](documentation/screenshots/changepassword2.JPG) |
| Add Post Form           | Yes     | Create post         | Post is created and displayed                                         | Pass      | ![screenshot](documentation/screenshots/addpostvalidation.JPG)                                                                                                              |
| Add Daily Routine Form  | Yes     | Create dailyroutine | Routine is created and added to user's daily routines                 | Pass      | ![screenshot](documentation/screenshots/dailyroutinevalidate.JPG)                                                                                                           |
| Comment Form            | Yes     | Submit comment      | Comment is added to the post                                          | Pass      | ![screenshot](documentation/screenshots/comment1.JPG)                                                                                                                       |
| Challenge Creation Form | Yes     | Create challenge    | Challenge is created and listed                                       | Pass      | ![screenshot](documentation/screenshots/challengevalidation.JPG)                                                                                                            |
| Collaborate Form        | Yes     | Submit form         | User receives confirmation message                                    | Pass      | ![screenshot](documentation/screenshots/collaborate1.JPG)                                                                                                                   |

**User Input**

| Feature                             | Tested? | User Input Required                | User Feedback Provided                                                                   | Pass/Fail | Notes on Fix (If Any) |
| ----------------------------------- | ------- | ---------------------------------- | ---------------------------------------------------------------------------------------- | --------- | --------------------- |
| Navigation Links                    | Yes     | Click                              | Links redirect to corresponding pages. Hover effects indicate interactivity.             | Pass      | -                     |
| Home Page                           | Yes     | Click                              | Clicking on posts takes users to detailed views.                                         | Pass      | -                     |
| Sign Up Page                        | Yes     | Username/Password/Confirm password | Validation prompts for incorrect input. Success message on account creation.             | Pass      | -                     |
| Sign In Page                        | Yes     | Username and Password              | Correct credentials required for login. Error message for failed login attempt.          | Pass      | -                     |
| Add Post and Submission             | Yes     | Text/Image Upload                  | Mandatory fields checked. Confirmation message upon successful submission.               | Pass      | -                     |
| Add Challenge and Submission        | Yes     | Text/Image Upload                  | Mandatory fields checked. Confirmation message upon successful submission.               | Pass      | -                     |
| Add Daily Routine                   | Yes     | Text Input/Time Input              | All fields validated for correct input. Confirmation message upon successful submission. | Pass      | -                     |
| Edit Profile                        | Yes     | Text/Image Upload                  | Changes saved and confirmation message displayed. Updated profile information shown.     | Pass      | -                     |
| Comment Submission                  | Yes     | Text Input                         | Users can submit comments. Confirmation message displayed.                               | Pass      | -                     |
| Like/Follow Interaction             | Yes     | Click                              | Visual feedback on like/follow. Counts update accordingly.                               | Pass      | -                     |
| Search & Filter functionality       | Yes     | Text Input/Click                   | Relevant search results displayed. Message for no results found.                         | Pass      | -                     |
| Collaborate Form Submission         | Yes     | Text Input                         | Contact details of the user are submitted. Confirmation message displayed.               | Pass      | -                     |
| Post Detail Interaction             | Yes     | Click on various elements          | Detailed view of post with comments and like/follow options.                             | Pass      | -                     |
| Mobile Navigation (Hamburger Menu)  | Yes     | Touch/Click                        | Responsive menu works on touch devices. Toggles correctly.                               | Pass      | -                     |
| Form Error Handling                 | Yes     | Invalid Inputs                     | Forms handle errors with descriptive messages guiding the user.                          | Pass      | -                     |
| Logout Functionality                | Yes     | Click                              | Users can log out successfully with a confirmation message.                              | Pass      | -                     |
| Footer Social Media Icons           | Yes     | Click                              | Social media icons link to external pages in a new tab.                                  | Pass      | -                     |
| Responsive Design Elements          | Yes     | Resize/Change Orientation          | All elements resize and adjust appropriately for different screen sizes.                 | Pass      | -                     |
| Accessibility Features (e.g., ARIA) | Yes     | Use of assistive technology        | ARIA labels and roles are present, ensuring accessibility compliance.                    | Pass      | -                     |

### Browser Compatibility

Fit&Fine was tested on the latest versions of major browsers to ensure compatibility across different platforms.

| Browser        | Tested? | Issues Found | Pass/Fail |
| -------------- | ------- | ------------ | --------- |
| Chrome         | Yes     | None         | Pass      |
| Firefox        | Yes     | None         | Pass      |
| Microsoft Edge | Yes     | None         | Pass      |

These validation steps confirm that Fit&Fine provides a seamless and accessible user experience across various devices and browsers.

### Toastify Messages Implementation Testing

This table documents the Toastify messages used throughout the Fit&Fine website to provide feedback to users after certain actions have been performed.

| Action Performed           | Message Type | Message Text                                 | Implementation Location        | Screenshots                                                                                                                       |
| -------------------------- | ------------ | -------------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| SignUp Success             | Success      | "Successfully signed in."                    | After user form submission     | ![screenshot](documentation/screenshots/signinsuccess.JPG)                                                                        |
| Login Success              | Success      | "Logged in successfully."                    | After user authentication      | ![screenshot](documentation/screenshots/signinsuccess.JPG)                                                                        |
| Logout Action              | Success      | "Successfully logged out!"                   | After user clicks logout       | ![screenshot](documentation/screenshots/signoutsuccess.JPG)                                                                       |
| Post Submission Success    | Success      | "Your post has been submitted for review."   | After submitting a post form   | ![screenshot](documentation/screenshots/postcreated.JPG)                                                                          |
| Post Updated               | Success      | "Your post has been updated"."               | After editing a post           | ![screenshot](documentation/screenshots/postupdated.JPG)                                                                          |
| Post Deletion Confirmation | Success      | "Your post has been deleted."                | After deleting a post          | ![screenshot](documentation/screenshots/postdeletemodal.JPG) ![screenshot](documentation/screenshots/postdeletesuccess.JPG)       |
| Comment                    | Success      | "Your comment has been posted."              | After submitting a comment     | ![screenshot](documentation/screenshots/commented.JPG)                                                                            |
| Comment Updated            | Success      | "Your comment has been updated."             | After updating a comment       | ![screenshot](documentation/screenshots/commentupdatesuccess.JPG)                                                                 |
| Comment Deleted            | Success      | "Your comment has been deleted."             | After deleting a comment       | ![screenshot](documentation/screenshots/commentdeletemodal.JPG) ![screenshot](documentation/screenshots/commentdeletesuccess.JPG) |
| Followed                   | Info         | "Followed successfully."                     | When a user is followed        | ![screenshot](documentation/screenshots/follow.JPG)                                                                               |
| Unfollowed                 | Info         | "Unfollowed successfully"                    | "When a user is unfollowed."   | ![screenshot](documentation/screenshots/unfollow.JPG)                                                                             |
| Collaborate                | Info         | "Collaboration form submitted successfully!" | When details are submitted.    | ![screenshot](documentation/screenshots/collaboratemessage.JPG)                                                                   |
| Challenge Join Success     | Success      | "You have joined the challenge!"             | After joining a challenge      | ![screenshot](documentation/screenshots/challengejoin.JPG)                                                                        |
| Challenge Leave Success    | Success      | "You have left the challenge!"               | After leaving a challenge      | ![screenshot](documentation/screenshots/leavechallenge.JPG)                                                                       |
| Challenge Created          | Success      | "Challenge created successfully!"            | After creating a challenge     | ![screenshot](documentation/screenshots/challengecreate.JPG)                                                                      |
| Challenge Updated          | Success      | "Challenge updated successfully!"            | After updating a challenge     | ![screenshot](documentation/screenshots/challengeupdate.JPG)                                                                      |
| Challenge Deleted          | Success      | "Challenge deleted successfully!"            | After deleting a challenge     | ![screenshot](documentation/screenshots/challengedeletemodal.JPG) ![screenshot](documentation/screenshots/challengedelete.JPG)    |
| Daily Routine Created      | Success      | "Daily routine created successfully!"        | After creating a daily routine | ![screenshot](documentation/screenshots/dailyroutinesuccess.JPG)                                                                  |
| Daily Routine Updated      | Success      | "Daily routine updated successfully!"        | After updating a daily routine | ![screenshot](documentation/screenshots/updatedailyroutine.JPG)                                                                   |
| Daily Routine Deleted      | Success      | "Daily routine deleted successfully!"        | After deleting a daily routine | ![screenshot](documentation/screenshots/dailyroutinedeletesuccess.JPG)                                                            |

### Responsiveness

Responsiveness and interactive elements were thoroughly tested on various devices and through browser developer tools to ensure a seamless user experience across different platforms and screen sizes.

| Device/Method           | Features Tested          |
| ----------------------- | ------------------------ |
| Chrome DevTools         | All                      |
| Firefox Responsive Mode | All                      |
| iPhone 13               | Navigation, forms, posts |
| Tab                     | Few                      |
| Real Android Device     | All                      |

**Identified Issue**
**Add Post Page:** On some devices, the add post page did not display correctly.

## Automated Testing

### Tools Used

- **Jest**: A JavaScript testing framework for creating and running tests.
- **React Testing Library**: A set of helpers that let you test React components without relying on their implementation details.

**Key Areas Tested:**

- **Component Rendering**: Ensure all components render as expected.
- **User Interactions**: Verify interactions like button clicks, form submissions, and navigation.
- **Form Validations**: Check that form inputs are validated correctly and error messages are displayed as needed.

### Running Tests

1. **Install the dependencies:**

   ```sh
   npm install
   ```

2. **Run the tests:**
   ```sh
   npm test
   ```
   ![JS Validation Screenshot](documentation/validation/test.JPG)

## Bugs

### Solved Bugs

1. **Incorrect Display of Joined Date**

   - **Issue:** The joined date for challenges was incorrectly displayed or not formatted properly.
   - **Solution:** Implemented proper date formatting using `toLocaleDateString` to ensure the joined date was displayed in "dd-mm-yyyy" format.
   - **Reference:** [JavaScript Date toLocaleDateString Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)

2. **Navigation Bar Toggle Issue on Mobile Devices**

   - **Issue:** The navigation bar toggle was not working correctly on some mobile devices.
   - **Solution:** Updated the React Bootstrap NavBar component to ensure the toggle functioned properly across all screen sizes.
   - **Reference:** [React Bootstrap NavBar Documentation](https://react-bootstrap.github.io/docs/components/navbar)

3. **Dynamic Filtering of Challenges**

   - **Issue:** Filtering challenges by sport was not dynamically updating the displayed list.
   - **Solution:** Implemented state management using React hooks to ensure the filtered list updated correctly based on user selection.
   - **Reference:** [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)

4. **Form Submission Validation for Daily Routines**

   - **Issue:** Users were able to submit daily routines with future dates and unrealistic water intake values.
   - **Solution:** Added custom validation in the Django serializers to ensure dates were not in the future and water intake was within a realistic range.
   - **Reference:** [Django Serializers Documentation](https://www.django-rest-framework.org/api-guide/serializers/)

5. **Image Upload Errors**

   - **Issue:** Users encountered errors when uploading images, especially when the images exceeded the maximum file size.
   - **Solution:** Integrated file size validation and compression before uploading images to Cloudinary, and provided user feedback on file size issues.
   - **Reference:** [Cloudinary Documentation on Image Uploads](https://cloudinary.com/documentation/image_upload_api)

6. **Navigation Bar Update Issues**

   - **Issue:** The navigation bar did not update dynamically to reflect the user's authentication status.
   - **Solution:** Utilized React's context API to manage global state, ensuring the navigation bar updates in real-time when the user's authentication status changes.
   - **Reference:** [React Context API Documentation](https://reactjs.org/docs/context.html)

7. **Challenges Filtering by Sport**

   - **Issue:** Users were unable to filter challenges by specific sports effectively.
   - **Solution:** Added filter functionality to the challenges API and implemented corresponding frontend filters to allow users to select and view challenges based on specific sports.
   - **Reference:** [Django QuerySet API](https://docs.djangoproject.com/en/3.2/ref/models/querysets/)

8. **Improving Button Layout**

   - **Issue:** Buttons on the Challenges page were overlapping, making them difficult to interact with.
   - **Solution:** Updated the CSS styles to ensure buttons are spaced properly and do not overlap.
   - **Reference:** [CSS Flexbox Documentation](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### Known Bugs

1. **Add Post Page Responsiveness**

   - The Add Post page does not appear responsive on some devices.

2. **Intermittent Login Issues**

   - Some users experience intermittent issues while logging in, where the login button becomes unresponsive.

3. **Slow Load Times on Initial Page Load**
   - The initial page load time is slower than expected, particularly on the home page with many posts.

### Unknown Bugs

There may be other bugs that have not yet been identified.

Credits

https://testing-library.com/docs/react-testing-library/intro/
https://testing-library.com/docs/queries/about/
