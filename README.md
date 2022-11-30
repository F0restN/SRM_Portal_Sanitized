# Student Relationship Management Application (User Interface)

Welcome to SRM, this is an application to track and manage the status of students from when they enroll into a program until they graduate. Hope you have a fullfilling journey in the future :D

## Setup instruction for backend

1. Install git and clone the project to your local foler use command `git clone <url>`
2. Dive into the foler and run `npm install` or `yarn install`
   Tips: during your development, if you want to install some libraries, please remember to check whether its includes in Strapi's dependencies. If it does, than you can't change the version of it since its locked by Strapi platform.
3. Download and install PostgreSQL database. Make sure your database was configured to be exactly like:

```JavaScript
// Notice: create a "SRM" database first

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'SRM'),
        username: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD', 'abccba'),
        schema: env('DATABASE_SCHEMA', 'public'), // Not Required
        ssl: env('DATABASE_SSL_SELF', false),
      },
      options: {},
    },
  },
});
```

or edit the file `config/database.js` to match your database configuration.

5. (Optional) Download and install DBeaver(an IDE for database) and connect it to your database.
6. Run command `strapi develop --watch-admin` under the path of your project folder
7. Congrats, all set! Enjoy

## Customized Backend API Document

https://docs.google.com/document/d/1nWJT4cwjyqB7mvBV2qOGHo5kzQrRM6Qpbm7RBaCvCI4/edit

## DBDiagram

https://dbdiagram.io/d/617e2b04fa17df5ea6767bb3

## Global settings

Now, all global data are stored in `config.json` under src folder.
To import data from `config.json`, run

```js
import config from 'src/config.json';
```

or using relative path, either is fine.

To extract `data` from `config.json`, run for example

```js
const data = config.data;
console.log(data);
```

## Naming convention

**Use UNIX-style newlines (\n)**

Never put forward pull request with \r\n

**Use lowerCamelCase for variables, properties and function names**

Variables, properties and function names should use `lowerCamelCase`. They
should also be descriptive. Single character variables and uncommon
abbreviations should generally be avoided.

```js
let adminUser = db.query('SELECT * FROM users ...');
```

**Use UpperCamelCase for class names**

Class names should be capitalized using `UpperCamelCase`.

```js
function BankAccount() {}
```

**Use UPPERCASE for Constants**

Constants should be declared as regular variables or static class properties,
using all uppercase letters.

```js
let SECOND = 1 * 1000;

function File() {}
File.FULL_PERMISSIONS = 0777;
```

**Use slapdash for database variables**

Wrapped the properties with lowerCase naming. Except: All the variables that retrived directly from database don't have to be wrapped to avoid trivial coding,

```js
{
  "student_id" = 4499958,
  "course_id" = 2145
}

{
  "studentId" = 4499958
  "courseId" = 2145
}
```

**Formate**

You may want to use editorconfig.org to enforce the formatting settings in your editor. Use the Node.js Style Guide `.editorconfig` file to have indentation, newslines and whitespace behavior automatically set to the rules set up below.

Use single quotes
Use single quotes, unless you are writing JSON.

**Object / Array creation**

Use trailing commas and put _short_ declarations on a single line. Only quote
keys when your interpreter complains:

```js
var a = ['hello', 'world'];
var b = {
  good: 'code',
  'is generally': 'pretty',
};
```

**Hook**

The name of self defined hook should also be start with 'ues' eg. useFetch()

## Frequently Asked Questions

### How to fetch data from Backend ?

Basically there are two ways to get data from backend. Go check the file `src/pages/Homepage.js`

Update 2022-Apr-05
Now, since we have `config.json`, where the portal information is stored as `"portal": "http://localhost:3502"`, we do not need to repetitively cite `http://localhost:3502` anymore.

Instead, suppose you properly import `config.json` as introduced above, run like below:

```javascript
//1. Use useFetch() hook to request data from backend(Recommend)
const { loading, error, data } = useFetch(`${config.portal}/students`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authenticationStatus.jwtToken}`,
  },
  // body: JSON.stringify(logInfo)
});
if (loading) {
  return <p>Loading...</p>;
}
if (error) {
  return <p>Error :(</p>;
}

//2. Use axios to request data from backend
const fetchData = async () => {
  let res = await axios.get(`${config.portal}/advisors`, {
    headers: {
      Authorization: `Bearer ${authenticationStatus.jwtToken}`,
    },
  });
  console.log(res);
};
```

**Note that you need to replace quotation mark (`'` or `"`) with backtick character (`` ` ``) to include imported variable into a string.**

### How to get the authentication status ?

Basically, authentication status are stored in the redux store. At the outlier of your very componencts, you should wrapper it with a provider

```javascrit
<Provider store={store}>
  <App />
</Provider>
```

Since we wrapper it at the most out layer, you should be fine and feel comfort about retrieving it. How to use it is just shown below:

```javascript
const [authenticationStatus, setAuthenticationStatus] = useState(store.getState())

return (
        <div>
            <div className="mb-5">
                {/* {console.log(authenticationStatus)} */}
                Homepage for {`${authenticationStatus.authenticationRole}`}
                <br />
                JWT_TOKEN for {`${authenticationStatus.jwtToken}`}
                <br />

    ......
```

### How to customized the Offcanvas(pop-up side bar)

Edit the file `src/components/NavBar/NavBarData.js` authority can be `Faculty` or `Staff` if you set it to be `Public` then both them can see the item in there Offcanvas. Set the title as what you want to show in sidebar. Path is the link for the webpage and notice that you also need to modify the `App.js` as `<Route path="/faculty">`.

```javascript
{
     authority: 'All',
     title: "<Edit your title here>",
     path: '/index',
     icon: <AiIcon.AiOutlineLogout />,
     cName: 'nav-text'
}
```

## Feature & Functions

Student Status / Course Picking / Generate POS ...

## Version Control

- NodeJS : v14.18.1
- Database : v13.0.1
- Strapi : 3.6.8 Community
- React-redux: 7.2.6
- React-router: 5.3.0
- React-icons: 4.3.1
- Reactstrap: 9.0.1

_For other components please follow the package-lock.json file_

### Loading Page

```javascript
import { LinearProgress } from '@mui/material';
<LinearProgress />;
```
