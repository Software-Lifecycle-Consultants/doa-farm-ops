# DOA Cost of Cultivation Reporting System (Next.js)

![DOA Cost of Cultivation Reporting System](https://softwareconsultant.info/wp-content/themes/slcc/assets/images/logo.png)

The "DOA Cost of Cultivation Reporting System" is a remarkable volunteer-driven project, born out of a strong commitment to our nation's agricultural advancement. At its core, this project represents a collective effort to contribute to the growth and sustainability of Sri Lanka's agricultural landscape.

## Features

- **Notes**:
* We have created the front end app, with dummy data loaded from json files to imitate API data. APIs/ Axios calls should be added during integration.
* We have also added redux tool kit/ redux store for the add crop data as a sample.

- **Login and Registration:**: Farmers and TOs can log in securely to the system.

- **User Profiles**: 
    - Farmer Profile: Farmers can set up and manage their profiles, providing essential information about their contact, location and agricultural activities.
    - Technical Officer Profile: Agriculture department statistics unit officers can maintain their profiles and oversee regional data.
 
- **Add Land Details**: Farmers can input information about their agricultural land, season, including location, size, irrigation and ownership details.

- **Add Crop Details**: Farmers can record data about the crops they cultivate, specifying crop types, quantities, season and more.

- **Add Crop Operation Cost Details:**: Farmers can keep track of expenses related to crop cultivation, such as seeds, fertilizers, labor, and equipment costs.

- **Multilingual support**: Allow users to access the platform in multiple languages, including Sinhala, Tamil, and English.

- **Interactive Map Component**: Allow users to mark/draw areas of their lands when adding land details.

- **Real-time Updates**: Utilize real-time updates to notify users about reservation status and service requests.

- **Concluding notes**: Real-time updates have not been incorporated as of now, and the validation library is also pending inclusion. 

## Agricultural Sector Enhancement

- **Data Sharing**: Collaborative platform allowing farmers and agricultural offices to share and access vital agricultural information.

- **Informed Decision-Making**: Access to data empowers users to make informed decisions for improved agricultural productivity.

- **Supporting Farmers**: The system contributes to the prosperity of farmers and the growth of the entire agricultural sector.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Follow these instructions to set up the Hotel Management System project locally on your machine:

1. Clone the repository to your local machine:
 ```bash
git https://github.com/Software-Lifecycle-Consultants/doa-farm-ops.git
cd  doa-farm-ops
 ```
2. Install the Node Modules:

```bash
npm install
 ```
 
3. Instal Node modules and dependencies for Front-End: 

```bash
cd  doa-farm-ops
npm install
 ```
Note : When you run npm install, it automatically installs all the dependencies listed in the package.json.
Below are the NPM packages (dependencies) used in this project. If any of the dependencies are not installed automatically, you can install them separately by executing the provided `npm install` commands.

- [@mui/material](https://mui.com/material-ui/getting-started/installation/) - Version 5.14.5
  - Material UI is a comprehensive library of components that features our implementation of Google's Material Design system.
  - Install the package in your project directory using the following command.
 ```bash
npm install @mui/material @emotion/react @emotion/styled
 ```

- [@mui/icons-material](https://mui.com/material-ui/icons/) - Version 5.14.3
  - This package provides the Google Material Icons converted to SvgIcon components.
  - Install the package in your project directory using the following command.
 ```bash
npm install @mui/icons-material
 ```
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) - Version 1.9.7
  - The official, opinionated, batteries-included toolset for efficient Redux development.
  - Install the package in your project directory using the following command.
 ```bash
npm install @reduxjs/toolkit react-redux
 ```
- [i18next](https://www.i18next.com/overview/getting-started) - Version 23.6.0
  - An internationalization library to enable multilingual support.
  - Install the package in your project directory using the following command.
 ```bash
npm install i18next
 ```
- [OpenLayers](https://openlayers.org/doc/quickstart.html) - Version 8.1.0
  - A high-performance, feature-packed library for creating interactive maps
  - Install the package in your project directory using the following commands.
 ```bash
npm install ol
npm install @types/ol
 ```
- [React-Toastify](https://www.npmjs.com/package/react-toastifyl) 
  - A React library for creating toast notifications.
  - Install the package in your project directory using the following commands.
 ```bash
npm install react-toastify
 ```

4. Instal dependencies for Back-End: 

```bash
cd  doa-farm-ops\backend
npm install
 ```
Note : When you run npm install, it automatically installs all the dependencies listed in the package.json.
Below are the NPM packages (dependencies) used in this project. If any of the dependencies are not installed automatically, you can install them separately by executing the provided `npm install` commands.

- [Express](https://expressjs.com/en/starter/installing.html) 
  - A back end web application framework for building RESTful APIs with Node.js.
  - Install the package in your project directory using the following commands.
 ```bash
npm install express
 ```
 
- [Axios](https://axios-http.com/docs/intro) - Version 1.6.2
  - A promise-based HTTP Client for node.js and the browser.
  - Install the package in your project directory using the following commands.
 ```bash
npm install axios
 ```

5. Set up the environment variables:
  - Create a .env.local file in the root directory of the project.
  - Add the required environment variables, such as database connection strings, API keys, etc.
    
6. Run the development server:
 ```bash
npm run dev
# or
yarn dev
# or
pnpm dev
 ```
7. Open your browser and navigate to http://localhost:3000 to see the Hotel Management System in action.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) file for details.

## Contact
For any inquiries or feedback, please contact us at hello@softwareconsultant.info  
Your feedback and contributions are welcome!
