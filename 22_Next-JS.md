# NEXTJS

1. React framework that allows to develop full stack applications

2. Creating a next project : npx create-next-app@latest <application-name>

3. Next.js works with react server components. Page, HTML is rendered on the server and sent to the client

4. Project structure
    - app is the main folder, only the files inside app folder are considered
    - there are some reserve file names like `page.js, layout.js`
    - `page.js` simply tells the `next.js` to render a page
    - These pages are React server component (syntax is same as any other react component)
    - The return value of the server component is sent to the browser to be rendered as HTML code
    - By default when we run the application this `page.js` gets rendered
    - Name of the files starts with lower case letter

5. Adding new page in the application
    - Let say we want to add `localhost:3000/about` then we have to first create a folder `about` inside the app folder
    - then add a new `page.js` inside it.

6. Navigation from 1 page to another
    - we can use `Link` to do the navigation.
    - Import from `next/link`
    - It takes `href` attribute to set the address
    - we can add other attributes like `className`

```
    <p><Link href="/about">About us</Link></p>
```

7. `layout.js`
   - Just like the `page.js` it is a reserve name for a file
   - `page.js` defines the content of the page
   - `layout.js` defines the shell/ layout or wrapper of one or more pages
   - Example of a `layout.js` is defined below
   - we don't have `head`, instead we have the reserve keyword `metadata` where we define the title and description
   - we can have layout in each page that will not the default layout but just add its content on the current layout.

```
import './globals.css'

export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

```

```
export default function MealsLayout({children}) {
    return (<>
        <h1>Meals Layout</h1>
        {children}
    </>)
}
```

1. `global.css`
      - defines global CSS classes
      - Need to import in the `layout.js` file. So that they can be available to all the pages

2. `icon.png`
      - Also a reserve name
      - Used to set the fab icon that appears on the tab in the browser

3.  Other components
      - `page.js` works as a `App.js` in the next.js
      - So we can add more components in the `page.js` 
      - we can define these components anywhere in the application (even outside app folder)
      - Best approach is to create a folder `components` outside the app folder

```page.js
import Link from 'next/link';
import Header from './header';

export default function Home() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p><Link href="/about">About us</Link></p>
    </main>
  );
}

```

```header.js
export default function Header() {
  return (
    <>
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
    </>
  );
}

```

11. All the reserved file names inside the app folder
    - page.js --- Create a new page
    - layout.js ---- Create a new layout that wraps sibling and nested pages
    - not-found.js --- Fallback page for "Not Found" errors (thrown by sibling or nested pages or layouts)
    - error.js --- Fallback page for other errors (thrown by sibling pages or nested pages or layouts)
    - loading.js --- Fallback page which is shown whilst sibling or nested pages (or layouts) are fetching data
    - route.js --- Allows you to create an API route (i.e., a page which does NOT return JSX code but instead data, e.g., in the JSON format)

12. Dynamic route
    - So let say we have to create dynamic route like `localhost:3000/blog/page-1, localhost:3000/blog/page-2`
    - So first we have to create a `blog` folder in the app folder
    - then we have to create a `page.js` in `blog` folder
    - With that we have to create a special folder inside the `blog` folder like `[slug]`
    - here keyword `slug` will take the dynamic value
    - Now inside this folder we have to again create the page.js
    - So for all the dynamic routes this page.js will get called
    - We can use the `params` passed by Next.js as a prop in this component to retrieve the dynamic value

```
export default function BlogPostPage({params}) {
    return (
        <main>
            <h1>Blog post</h1>
            <p>{params.slug}</p>        // will print page-1
        </main>
    );
}
```