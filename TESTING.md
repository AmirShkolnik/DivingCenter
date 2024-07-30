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

[Back to top](#table-of-contents)

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

[Back to top](#table-of-contents)

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

[Back to top](#table-of-contents)

## JavaScript Validation

### ESLint and Prettier

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

[Back to top](#table-of-contents)

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

[Back to top](#table-of-contents)

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

[Back to top](#table-of-contents)

### Wave Accessibility Evaluation

- **Tool Used:** [Wave Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- **Purpose:** To ensure that the website is accessible to individuals with disabilities by identifying and suggesting fixes for web accessibility issues.
- **Process:** The Wave tool evaluates each page of the Diving Center to ensure it complies with accessibility standards like WCAG and Section 508.

<details>
<summary>Click to View Wave Web Accessibility Screenshot</summary>

**index.html**

![Wave Web Accessibility Evaluation Tool](doc/testing/divingreact/wave/wave.png)

</details>
&nbsp;

[Back to top](#table-of-contents)

## Manual Testing

## Comprehensive Manual Testing of the Diving Center Website

This manual testing process focuses primarily on the frontend functionality of the Diving Center website. However, to provide a comprehensive understanding of how the frontend interacts with the admin panel, we've included split images showing both the user interface and the corresponding admin panel responses. Many images will demonstrate the point of view of the logged-in user and the admin perspective on the Django Rest Framework admin panel. 

For those interested in a more detailed examination of the admin panel testing, you can visit our [in-depth backend testing documentation](https://github.com/AmirShkolnik/DivingCenter_API/blob/main/TESTING.md). This additional resource offers valuable insights into the API endpoints, data handling, and server-side logic that support the frontend features described in this manual testing section.

### Toastify Messages Implementation in the Diving Center Project

Throughout the Diving Center project, Toastify messages are used to provide users with immediate feedback after specific actions are completed on the website. Toastify is a lightweight JavaScript library that enables the display of customizable toast notifications, enhancing user experience by confirming actions and delivering important information.

### Manual Testing Coverage

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

### User Types Tested

The tests are categorized into two main user types:

1. **Non-logged in users**
2. **Logged in users (members)**

This distinction is crucial as it highlights the different levels of access and functionality available to each user type.

By thoroughly testing both the frontend and the admin panel interactions, we ensure that the Diving Center website provides a seamless and robust user experience across all functionalities and user types.

[Back to top](#table-of-contents)

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

[Back to top](#table-of-contents)

### Non Logged-In User

#### Navbar

![Navbar](doc/testing/divingreact/logged-in/navbar/navbar-non.png)

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| Home link | Clicking "Home" navigates to the home page | <details><summary>Home Navigation</summary><img src="doc/testing/divingreact/pages/home.png" alt="Home Navigation"></details> | ✅ |
| Contact Us link | Clicking "Contact Us" navigates to the contact page | <details><summary>Contact Us Navigation</summary><img src="doc/testing/divingreact/pages/contact-us.png" alt="Contact Us Navigation"></details> | ✅ |
| Courses link | Clicking "Courses" navigates to the courses page | <details><summary>Courses Navigation</summary><img src="doc/testing/divingreact/pages/courses-page.png" alt="Courses Navigation"></details> | ✅ |
| Sign In link | Clicking "Sign In" navigates to the sign in page | <details><summary>Sign In Navigation</summary><img src="doc/testing/divingreact/pages/sign-in.png" alt="Sign In Navigation"></details> | ✅ |
| Sign Up link | Clicking "Sign Up" navigates to the sign up page | <details><summary>Sign Up Navigation</summary><img src="doc/testing/divingreact/pages/sign-up.png" alt="Sign Up Navigation"></details> | ✅ |

[Back to top](#table-of-contents)

#### Footer

![Footer](doc/testing/divingreact/logged-in/navbar/footer.png)

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| GitHub link | Clicking "GitHub" navigates to the GitHub page | <details><summary>GitHub Navigation</summary><img src="doc/testing/divingreact/pages/github.png" alt="GitHub Navigation"></details> | ✅ |
| LinkedIn link | Clicking "LinkedIn" navigates to the LinkedIn page | <details><summary>LinkedIn Navigation</summary><img src="doc/testing/divingreact/pages/linkedin.png" alt="Linkedin Navigation"></details> | ✅ |

[Back to top](#table-of-contents)

#### Website

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

[Back to top](#table-of-contents)

### Logged-In Users

#### Navbar

![Navbar](doc/testing/divingreact/logged-in/navbar/navbar.png)

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| Logged-in User Navbar | All navigation elements visible and functional | <details><summary>Navbar Overview</summary>View full navbar<br><img src="doc/testing/divingreact/logged-in/navbar/logged-in-navbar.png" alt="Logged-in Navbar"></details> | ✅ |
| Home Link | Redirects to home page | <details><summary>Home</summary>Click home link<br><img src="doc/testing/divingreact/logged-in/navbar/logged-in-home.png" alt="Logged-in Home"></details> | ✅ |
| Contact Us Link | Opens contact form | <details><summary>Contact Us</summary>Click contact us link<br><img src="doc/testing/divingreact/logged-in/navbar/logged-in-contact-us.png" alt="Logged-in Contact Us"></details> | ✅ |
| Courses Link | Displays available courses | <details><summary>Courses</summary>Click courses link<br><img src="doc/testing/divingreact/logged-in/navbar/logged-in-courses.png" alt="Logged-in Courses"></details> | ✅ |
| Profile Link | Displays user profile | <details><summary>Profile</summary>Click profile link<br><img src="doc/testing/divingreact/logged-in/navbar/logged-in-profile.png" alt="Logged-in Profile"></details> | ✅ |
| My Bookings Link | Shows user's bookings | <details><summary>My Bookings</summary>Click my bookings (empty)<br><img src="doc/testing/divingreact/logged-in/navbar/logged-in-my-bookings-empty-1.png" alt="Logged-in My Bookings Empty">Click my bookings (with bookings)<br><img src="doc/testing/divingreact/logged-in/navbar/logged-in-my-bookings-2.png" alt="Logged-in My Bookings"></details> | ✅ |
| My Feed Link | Displays user feed | <details><summary>Feed</summary>Click my feed link<br><img src="doc/testing/divingreact/logged-in/navbar/logged-in-feed.png" alt="Logged-in Feed"></details> | ✅ |
| Add Post Link | Opens add post form | <details><summary>Add Post</summary>Click add post link<br><img src="doc/testing/divingreact/logged-in/navbar/logged-in-add-post.png" alt="Logged-in Add Post"></details> | ✅ |
| My Likes Link | Shows liked posts | <details><summary>Liked</summary>Click my likes link<br><img src="doc/testing/divingreact/logged-in/navbar/logged-in-liked.png" alt="Logged-in Liked"></details> | ✅ |
| Sign Out | Can sign out | <details><summary>Sign out</summary>Click sign out<br><img src="doc/testing/divingreact/logged-in/navbar/sign-out.png" alt="Logged-in Liked"></details> | ✅ |

[Back to top](#table-of-contents)

#### Footer

![Footer](doc/testing/divingreact/logged-in/navbar/footer.png)

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| GitHub link | Clicking "GitHub" navigates to the GitHub page | <details><summary>GitHub Navigation</summary><img src="doc/testing/divingreact/pages/github.png" alt="GitHub Navigation"></details> | ✅ |
| LinkedIn link | Clicking "LinkedIn" navigates to the LinkedIn page | <details><summary>LinkedIn Navigation</summary><img src="doc/testing/divingreact/pages/linkedin.png" alt="Linkedin Navigation"></details> | ✅ |

### My Bookings

Only logged-in users can book a course. Here are the instructions and rules for bookings:

1. Navigate to the "My Bookings" page from the dropdown menu under your name.
2. If you don't have any bookings yet, the page will be empty with a notification that you haven't booked anything.
3. To make a booking:
   - Choose a course
   - Select a date in the future (must be the 10th of a month)
   - Choose a time (either 09:00 or 15:00)
4. Important rules:
   - You cannot book or update a course for a past date
   - You cannot book or update the same course twice
   - The booking date must be on the 10th of a month
   - Course times are only at 09:00 or 15:00

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| Create Booking | Successful creation of a new booking | <details><summary>Create Booking</summary><strong>Step 1:</strong> Open booking form<br><img src="doc/testing/divingreact/logged-in/bookings/create-step1.png" alt="Create Step 1"><strong>Step 2:</strong> Fill in details<br><img src="doc/testing/divingreact/logged-in/bookings/create-step2.png" alt="Create Step 2"><strong>Step 3:</strong> Review details<br><img src="doc/testing/divingreact/logged-in/bookings/create-step3.png" alt="Create Step 3"><strong>Step 4:</strong> Confirm booking<br><img src="doc/testing/divingreact/logged-in/bookings/create-step4.png" alt="Create Step 4"></details> | ✅ |
| Delete Booking | Successful deletion of a booking | <details><summary>Delete Booking</summary><strong>Step 1:</strong> Select booking<br><img src="doc/testing/divingreact/logged-in/bookings/delete-step1.png" alt="Delete Step 1"><strong>Step 2:</strong> Confirm deletion<br><img src="doc/testing/divingreact/logged-in/bookings/delete-step2.png" alt="Delete Step 2"></details> | ✅ |
| Update Booking | Successful update of an existing booking | <details><summary>Update Booking</summary><strong>Step 1:</strong> Open booking details<br><img src="doc/testing/divingreact/logged-in/bookings/update-step1.png" alt="Update Step 1"><strong>Step 2:</strong> Edit booking info<br><img src="doc/testing/divingreact/logged-in/bookings/update-step2.png" alt="Update Step 2"><strong>Step 3:</strong> Save changes<br><img src="doc/testing/divingreact/logged-in/bookings/update-step3.png" alt="Update Step 3"></details> | ✅ |
| TEST - Booking Past Date | Past date is greyed out | <details><summary>Past Date</summary><strong>Step 1:</strong> Attempt to select past date<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/booking-past-date.png" alt="Past Date"></details> | ✅ |
| TEST - Booking Same Course Twice | Error message for booking the same course twice | <details><summary>Same Course Twice</summary><strong>Step 1:</strong> Select same course<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/booking-same-course-twice.png" alt="Same Course Twice"></details> | ✅ |
| TEST - Course Missing | Error message for missing course selection | <details><summary>Course Missing</summary><strong>Step 1:</strong> Leave course field empty<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/course-missing.png" alt="Course Missing"></details> | ✅ |
| TEST - Date Missing | Error message for missing date selection | <details><summary>Date Missing</summary><strong>Step 1:</strong> Leave date field empty<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/date-missing.png" alt="Date Missing"></details> | ✅ |
| TEST - Time Missing | Error message for missing time selection | <details><summary>Time Missing</summary><strong>Step 1:</strong> Leave time field empty<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/time-missing.png" alt="Time Missing"></details> | ✅ |
| TEST - Update Booking Past Date | Error message for updating to a past date | <details><summary>Update Past Date</summary><strong>Step 1:</strong> Attempt to update to past date<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/update-booking-past-date.png" alt="Update Past Date"></details> | ✅ |
| TEST - Update Booking Same Course Twice | Error message for updating to the same course twice | <details><summary>Update Same Course Twice</summary><strong>Step 1:</strong> Select same course for update<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/update-booking-same-course-twice-step2.png" alt="Update Same Course Twice Step 2"><strong>Step 2:</strong> Confirm update<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/update-booking-same-course-twice.png" alt="Update Same Course Twice"></details> | ✅ |
| TEST - Wrong Date Format | Error message for incorrect date format | <details><summary>Wrong Date</summary><strong>Step 1:</strong> Enter wrong date format<br><img src="doc/testing/divingreact/logged-in/bookings/bookingtesting/wrong-date.png" alt="Wrong Date"></details> | ✅ |

[Back to top](#table-of-contents)

### Add Review

A logged-in user can review and rate a course on the specific course page.

Steps to Add a Review:

1. Navigate to the specific course page where you want to leave a review.
2. Locate the review section and click on the "Add Review" button.
3. Rate the course by selecting the appropriate number of stars.
4. Leave a comment in the provided text area.
5. Submit the review.

If either the rating or the comment is missing, a warning message will appear, prompting the user to complete both fields.

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| Create Review | Successful creation of a new review | <details><summary>Create Review</summary><strong>Step 1:</strong> Open review form<br><img src="doc/testing/divingreact/logged-in/reviews/reviews-step1.png" alt="Reviews Step 1"><strong>Step 2:</strong> Submit review<br><img src="doc/testing/divingreact/logged-in/reviews/reviews-step2.png" alt="Reviews Step 2"></details> | ✅ |
| Delete Review | Successful deletion of a review | <details><summary>Delete Review</summary><strong>Step 1:</strong> Select review to delete<br><img src="doc/testing/divingreact/logged-in/reviews/delete-reviews-step1.png" alt="Delete Reviews Step 1"><strong>Step 2:</strong> Confirm deletion<br><img src="doc/testing/divingreact/logged-in/reviews/delete-reviews-step2.png" alt="Delete Reviews Step 2"></details> | ✅ |
| Update Review | Successful update of an existing review | <details><summary>Update Review</summary><strong>Step 1:</strong> Select review to update<br><img src="doc/testing/divingreact/logged-in/reviews/update-reviews-step1.png" alt="Update Reviews Step 1"><strong>Step 2:</strong> Open edit form<br><img src="doc/testing/divingreact/logged-in/reviews/update-reviews-step2.png" alt="Update Reviews Step 2"><strong>Step 3:</strong> Edit review content<br><img src="doc/testing/divingreact/logged-in/reviews/update-reviews-step3.png" alt="Update Reviews Step 3"><strong>Step 4:</strong> Confirm update<br><img src="doc/testing/divingreact/logged-in/reviews/update-reviews-step4.png" alt="Update Reviews Step 4"></details> | ✅ |
| TEST - Missing Stars Rating | Error message for missing star rating | <details><summary>Missing Stars</summary>Submit without selecting stars<br><img src="doc/testing/divingreact/logged-in/reviews/reviews-testing-missing-stars.png" alt="Reviews Testing Missing Stars"></details> | ✅ |
| TEST - Missing Review Text | Error message for missing review text | <details><summary>Missing Text</summary>Submit without entering text<br><img src="doc/testing/divingreact/logged-in/reviews/reviews-testing-missing-text.png" alt="Reviews Testing Missing Text"></details> | ✅ |

[Back to top](#table-of-contents)

### Add Post

To successfully add a post, the user must follow these steps:
1. Navigate to the posts/create page by clicking the "Add Post" option in the dropdown navigation bar.
2. Choose an image that is less than 2 MB.
3. Add a title and content for the post.

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| Navigate to Add Post page | User can access the Add Post page from the dropdown menu | <details><summary>Step 1: Access Add Post page</summary><img src="doc/testing/divingreact/logged-in/addpost/add-post-step1.png" alt="Access Add Post page"></details> | ✅ |
| Select image | User can choose an image file | <details><summary>Step 2: Select image</summary><img src="doc/testing/divingreact/logged-in/addpost/add-post-step2.png" alt="Select image"></details> | ✅ |
| Add title and content | User can input title and content | <details><summary>Step 3: Add title and content</summary><img src="doc/testing/divingreact/logged-in/addpost/add-post-step3.png" alt="Add title and content"></details> | ✅ |
| Submit post | User can submit the post | <details><summary>Step 4: Submit post</summary><img src="doc/testing/divingreact/logged-in/addpost/add-post-step4.png" alt="Submit post"></details> | ✅ |
| Backend confirmation | Backend confirms post creation | <details><summary>Step 5: Backend confirmation</summary><img src="doc/testing/divingreact/logged-in/addpost/add-post-backend-step5.png" alt="Backend confirmation"></details> | ✅ |
| Large image size warning | Warning displayed for images > 2 MB | <details><summary>Large image size warning</summary><img src="doc/testing/divingreact/logged-in/addpost/add-post-large-image-size-warning.png" alt="Large image size warning"></details> | ✅ |
| Missing fields warning | Warning displayed for missing title or content | <details><summary>Missing fields warning</summary><img src="doc/testing/divingreact/logged-in/addpost/add-post-missing-fields-warning.png" alt="Missing fields warning"></details> | ✅ |

[Back to top](#table-of-contents)

### Update Profile

To modify profile information:
1. Navigate to the profile through the navbar
2. Click the three dots to access options
3. Choose the pen symbol to change bio or image
4. Select the key symbol to change your password
5. Click the newspaper symbol to change your username

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| Profile Bio Update | User can update their bio | <details><summary>Update Bio</summary>Step 1<br><img src="doc/testing/divingreact/logged-in/profile/update-bio-step1.png" alt="Update Bio Step 1"><br>Step 2: Edit and save bio<br><img src="doc/testing/divingreact/logged-in/profile/update-bio-step2.png" alt="Update Bio Step 2"></details> | ✅ |
| Profile Image Update | User can update their profile image | <details><summary>Update Image</summary>Step 1: Click three dots<br><img src="doc/testing/divingreact/logged-in/profile/update-image-step1.png" alt="Update Image Step 1"><br>Step 2: Choose new image<br><img src="doc/testing/divingreact/logged-in/profile/update-image-step2.png" alt="Update Image Step 2"><br>Step 3: Crop and save image<br><img src="doc/testing/divingreact/logged-in/profile/update-image-step3.png" alt="Update Image Step 3"></details> | ✅ |
| Password Change | User can change their password | <details><summary>Change Password</summary>Step 1: Access password change<br><img src="doc/testing/divingreact/logged-in/password/change-pw-step-1.png" alt="Change Password Step 1"><br>Step 2: Enter new password<br><img src="doc/testing/divingreact/logged-in/password/change-pw-step-2.png" alt="Change Password Step 2"><br>Step 3: Confirm change<br><img src="doc/testing/divingreact/logged-in/password/change-pw-step-3.png" alt="Change Password Step 3"> | ✅ |
| TEST - Password Change | Error: Passwords don't match | <details><summary>Error: Passwords don't match</summary><img src="doc/testing/divingreact/logged-in/password/change-pw-dont-match.png" alt="Change Password Error"></details> | ✅ |

[Back to top](#table-of-contents)

### Add Comments

Future Improvements:

1. **Implement a confirmation prompt:** Before updating or deleting a comment, display a warning message asking the user to confirm their action, as it is irreversible and all content will be permanently removed.
2. **Add rich text formatting:** Allow users to format their comments with basic HTML or Markdown for better expression.
3. **Implement a nested comment system:** Enable users to reply directly to other comments, creating threaded discussions.
4. **Add comment voting:** Implement an upvote/downvote system to highlight valuable contributions.
5. **Introduce comment moderation:** Implement a system for flagging inappropriate comments and allow moderators to review and take action.

These improvements will enhance the user experience, encourage more meaningful interactions, and provide better control over the comment section's content.

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| Add comment | Only logged-in users can comment on a post | <details><summary>Add Comment</summary>**Step 1:** Navigate to the post.<br><img src="doc/testing/divingreact/logged-in/add-comment/add-comment-step1.png" alt="Add Comment Step 1"><br>**Step 2:** Type comment and click 'Post'.<br><img src="doc/testing/divingreact/logged-in/add-comment/add-comment-success-step2.png" alt="Add Comment Step 2"></details> | ✅ |
| Post button behavior | Post button is greyed out until comment added | <details><summary>Post Button</summary>**Step 1:** Navigate to the post.<br><img src="doc/testing/divingreact/logged-in/add-comment/add-comment-success-step2.png" alt="Post Button Greyed Out"></details> | ✅ |
| Comment submission | Comment appears on post after submission | <details><summary>Comment Success</summary>**Step 1:** Navigate to the post.<br><img src="doc/testing/divingreact/logged-in/add-comment/add-comment-step1.png" alt="Comment Success Step 1"><br>**Step 2:** Submit comment.<br><img src="doc/testing/divingreact/logged-in/add-comment/add-comment-success-step2.png" alt="Comment Success Step 2"></details> | ✅ |
| Backend verification | Comment appears in admin panel | <details><summary>Admin Panel</summary>**Step 1:** Navigate to admin panel.<br><img src="doc/testing/divingreact/logged-in/add-comment/add-comment-backend-admin-pannel-step3.png" alt="Admin Panel Verification"></details> | ✅ |
| Update comment | User can edit their own comments | <details><summary>Update Comment</summary>**Step 1:** Click on the 3 dots.<br><img src="doc/testing/divingreact/logged-in/update-comment/update-comment-click-3-dots-step1.png" alt="Update Comment Step 1"><br>**Step 2:** Choose the pen icon.<br><img src="doc/testing/divingreact/logged-in/update-comment/update-comment-add-text-step2.png" alt="Update Comment Step 2"><br>**Step 3:** Update text and click 'Post'.<br><img src="doc/testing/divingreact/logged-in/update-comment/update-comment-success-step3.png" alt="Update Comment Step 3"></details> | ✅ |
| Delete comment | User can delete their own comments | <details><summary>Delete Comment</summary>**Step 1:** Click on the 3 dots.<br><img src="doc/testing/divingreact/logged-in/delete-comment/delete-comment-step1.png" alt="Delete Comment Step 1"><br>**Step 2:** Choose the garbage can icon.<br><img src="doc/testing/divingreact/logged-in/delete-comment/delete-comment-success-step2.png" alt="Delete Comment Step 2"></details> | ✅ |

[Back to top](#table-of-contents)

### My Likes

The "Like" feature is an essential engagement tool that allows logged-in users to express their appreciation for a post. By clicking the empty heart icon, users can like a post, and the heart will turn red to indicate their interaction. The total number of likes is visible to all users, providing social proof and encouraging further engagement.

Future improvements:
1. Introduce a "Most Liked" section to highlight popular content.
2. Implement notifications for post owners when their content receives likes.

| What was tested | Expected Result | Image | Fail/Pass |
|-----------------|-----------------|-------|-----------|
| Add like to a post | User can like a post, heart turns red, like count increases | <details><summary>Add Like</summary><img src="doc/testing/divingreact/logged-in/likes/add-like-step1.png" alt="Add Like Step 1"><br><img src="doc/testing/divingreact/logged-in/likes/add-like-step2.png" alt="Add Like Step 2"></details> | ✅ |
| Remove like from a post | User can unlike a post, heart turns empty, like count decreases | <details><summary>Remove Like</summary><img src="doc/testing/divingreact/logged-in/likes/remove-like-step1.png" alt="Remove Like Step 1"><br><img src="doc/testing/divingreact/logged-in/likes/remove-like-step2.png" alt="Remove Like Step 2"></details> | ✅ |
| Like visibility | Total number of likes is visible to all users | <details><summary>Like Visibility</summary><img src="doc/testing/divingreact/logged-in/likes/add-like-step2.png" alt="Like Visibility"></details> | ✅ |

[Back to top](#table-of-contents)

### Browser Compatibility

The purpose of this manual testing was to ensure the functionality, visibility, and error handling of the diving center website across popular web browsers. The testing process involved:

1. Accessing the diving center website on different browsers (Chrome, Firefox, Mozilla, and Opera).
2. Manually navigating through various pages and features of the website.
3. Checking for proper rendering of content, images, and layout.
4. Testing interactive elements such as forms, buttons, and navigation menus.
5. Using browser developer tools to inspect for any console errors or performance issues.

The manual testing was conducted on Chrome, Firefox, Mozilla, and Opera browsers to ensure cross-browser compatibility. Each browser was tested for:

1. Functionality: Verifying that all features work as expected.
2. Visibility: Ensuring proper display of content and layout consistency.
3. Error handling: Checking for any browser-specific errors or issues.

Results were documented in a table format, indicating whether each browser was tested, any issues found, and including relevant screenshots. The testing revealed that the website performed well across all tested browsers, with no significant issues detected.

### Summary of Results
- **Browsers Tested**: Chrome, Firefox, Microsoft Edge, and Opera.
- **Issues Found**: None across all tested browsers.
- **Overall Status**: All browsers passed the functionality and visibility tests successfully. 

| Browser        | Tested? | Issues Found | Image | Pass/Fail |
| -------------- | ------- | ------------ | ----- | --------- |
| Chrome         | Yes     | None         | <details><summary>Chrome</summary><img src="doc/testing/browser/chrom.png" alt="Profiles"></details> | ✅       |
| Firefox        | Yes     | None         | <details><summary>Firefox</summary><img src="doc/testing/browser/mozilla.png" alt="Profiles"></details> | ✅       |
| Microsoft Edge | Yes     | None         | <details><summary>Microsoft Edge</summary><img src="doc/testing/browser/edge.png" alt="Profiles"></details> | ✅       |
| Opera          | Yes     | None         | <details><summary>Opera</summary><img src="doc/testing/browser/opera.png" alt="Profiles"></details> | ✅       |

[Back to top](#table-of-contents)                                         |

### Responsiveness

Responsiveness and interactive elements were thoroughly tested on various devices and through browser developer tools to ensure a seamless user experience across different platforms and screen sizes.

![Am I Responsive Image](doc/images/amiresponsive/amiresponsive.png)

| Device/Method           | Features Tested          |
| ----------------------- | ------------------------ |
| Chrome DevTools         | All                      |
| Firefox Responsive Mode | All                      |
| iPhone xr               | All |
| samsung s21               | All |
| Tablet                    | All                    |
| Real Android Device     | All                      |

## Automated Testing

### NPM Test Results for the Diving Center Project

### Testing Tools and Process

For the Diving Center project, we employed a robust testing strategy using modern JavaScript testing tools:

1. **Jest**: As the primary testing framework, Jest provides a comprehensive suite of testing utilities, including test runners, assertions, and mocking capabilities.

2. **React Testing Library**: This library was used in conjunction with Jest to test React components. It encourages testing components in a way that closely resembles how users interact with the application.

3. **npm**: The Node Package Manager was used to run the tests via the `npm test` command, which executes all test suites in the project.

The testing process involved creating individual test files for each component, located in the `src/components/__tests__` directory. These tests cover various aspects of component functionality, including:

- Rendering checks
- User interaction simulations
- State and prop validations
- Conditional rendering tests
- Event handling verifications

By running `npm test`, we executed all test suites simultaneously, allowing for a comprehensive overview of the project's test coverage and component stability.

### Test Results Table

The following table summarizes the testing files created for various components of the Diving Center project, along with the results of running the tests using npm:

| Component                     | Test File Link                                              | Status  | Time Taken |
|-------------------------------|------------------------------------------------------------|---------|------------|
| App                           | [src/App.test.js](src/App.test.js)                        | PASS    | 6.394 s    |
| Asset                         | [src/components/__tests__/Asset.test.js](src/components/__tests__/Asset.test.js) | PASS    | 9.314 s    |
| Avatar                        | [src/components/__tests__/Avatar.test.js](src/components/__tests__/Avatar.test.js) | PASS    | 9.207 s    |
| Footer                        | [src/components/__tests__/Footer.test.js](src/components/__tests__/Footer.test.js) | PASS    | 9.399 s    |
| MoreDropDown                  | [src/components/__tests__/MoreDropDown.test.js](src/components/__tests__/MoreDropDown.test.js) | PASS    | 9.620 s    |
| NavBar                        | [src/components/__tests__/NavBar.test.js](src/components/__tests__/NavBar.test.js) | PASS    | 9.945 s    |
| NotFound                      | [src/components/__tests__/NotFound.test.js](src/components/__tests__/NotFound.test.js) | PASS    | 9.302 s    |
| ScrollToTop                   | [src/components/__tests__/ScrollToTop.test.js](src/components/__tests__/ScrollToTop.test.js) | PASS    | 9.496 s    |
| VideoPlayer                   | [src/components/__tests__/VideoPlayer.test.js](src/components/__tests__/VideoPlayer.test.js) | PASS    | 9.401 s    |
| VideoPlayerSignIn             | [src/components/__tests__/VideoPlayerSignIn.test.js](src/components/__tests__/VideoPlayerSignIn.test.js) | PASS    | 9.499 s    |
| VideoPlayerSignUp             | [src/components/__tests__/VideoPlayerSignUp.test.js](src/components/__tests__/VideoPlayerSignUp.test.js) | PASS    | 9.401 s    |

### Summary of Test Results

- **Total Test Suites**: 11
- **Passed Test Suites**: 11
- **Total Tests**: 31
- **Passed Tests**: 31
- **Total Snapshots**: 0
- **Total Time Taken**: 13.519 seconds

These results demonstrate the thoroughness of our testing approach and confirm that all components are functioning as expected within the Diving Center project. The successful passing of all tests provides confidence in the reliability and stability of the application's core components.

![npm test Screenshot](doc/testing/npmtest/npmtest.png)

## Bugs

### Solved Bugs

Certainly! I'll create a bug table summarizing the issues, solutions, and references for the problems we've addressed in the PostCreateForm component. Here's the table:

| File Name | Issue | Solution | Reference |
|-----------|-------|----------|-----------|
| PostCreateForm.js | Multiple post submissions when clicking "Create" button repeatedly | Implemented submission state management and early return in `handleSubmit` function | [React Form Submission](https://reactjs.org/docs/forms.html#handling-multiple-inputs) |
| PostCreateForm.js | Lack of user feedback for form actions | Added toast notifications for various actions (create, cancel, error) | [React-Toastify Usage](https://fkhadra.github.io/react-toastify/introduction) |
| PostCreateForm.js | Warning: Can't perform a React state update on an unmounted component | Implemented cleanup function using `useEffect` hook to revoke object URLs | [React useEffect Cleanup](https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup) |
| PostCreateForm.js | Potential memory leak due to unreleased resources | Added cleanup function to revoke object URLs when component unmounts | [MDN URL.revokeObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL) |

These solutions address the main issues we encountered in the PostCreateForm component:

1. Preventing multiple submissions
2. Adding user feedback through toast notifications
3. Resolving the warning about state updates on unmounted components
4. Preventing potential memory leaks

By implementing these solutions, we've improved the component's functionality, user experience, and overall performance. The references provided offer more in-depth information about each solution and the underlying concepts.

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
