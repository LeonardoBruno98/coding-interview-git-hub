# Webpunks Coding Interview

## Overview

This sample repo consists of two parts:

- app/cms: A simple CMS application based on Sanity that allows users to create, edit, and delete blog posts
- app/backend: A frontend nodejs NestJS backend application that exposes a REST APIs
- app/blog: A frontend React nextjs based application that displays the blog posts created in the CMS

## Project setup

In order to setup the project you have to install nodejs and yarn. Then just run the following commands:

```bash
cd app/cms
yarn
yarn dev
```

```bash
cd app/backend
yarn
yarn dev
```

```bash
cd app/blog
yarn
yarn dev
```

## Documentation

To complete the assignments it is necessary to have a basic understanding of the following technologies:

- React / Nextjs: https://nextjs.org/docs
- Node / Nestjs: https://docs.nestjs.com/
- Tailwindcss: https://tailwindcss.com/docs
- Sanity: https://www.sanity.io/docs/connect-your-content-to-next-js

## Assignments

Prior to starting the assignments those steps are necessary:

1. Fork this repo into a new private repository
2. Register to sanity, create a new project and replace the credentials in the sanity.cli.ts and sanity.config.ts files
3. Create some random blog posts in the sanity studio

Here there are some assignments.

### Basic assignments

1. Replace the homepage of the next application with listing of the most recent 10 blog posts. Each post should be rendered as a card with the cover image, the title and the first 100 characters of the post content. The card should link to the post detail page.

2. Implement a dynamic posts detail page that will have those url patter /posts/<post_slug>. The page should display the title, cover image and the post full text. This page should also include the meta title and meta description fetched from sanity.

3. Implement a responsive layout for mobile, tabled and desktop devices. For each device the correct blog post image should be displayed

4. Integrate the backend trackPageView API call in the nextjs application. The call should be triggered on each page view and should include the page title and the page url. In order to easily create a typescript client for the backend you can use https://github.com/ferdikoomen/openapi-typescript-codegen library that will generate the client based on the openapi specification defined by api-spec.json file.

For the basic assignments you can use this figma design as a reference:

https://www.figma.com/file/GsUEynOwmb06aSFgIaa1wZ/Webpunks-Test?type=design&node-id=1%3A2&mode=design&t=qU1RTScVtDtH5lz8-1

### Advanced assignments

5. Implement a new sanity schema object for storing website logo, title and background color. Then render the contents in the website layout component

6. Configure the sanity schemas to allow to be translated in both english and another language. Then implement nextjs internationalization in order to show the blog posts in multiple languages (https://nextjs.org/docs/app/building-your-application/routing/internationalization)

7. Persist the data sent to the backend trackPageView API call in the postgres database. In order to start the postgres database you can use a containerized database version that can be run by `docker-compose up db` command. After the database is up and running you can use a ORM of your choice, for example typeorm or sequelize (https://docs.nestjs.com/techniques/database) and use it for defining the database schema and persisting the data.

8. Then implement a new backend API that will return the number of page views for each page. Then create a new page that will display a table with the page title and the number of page views.

9. Implement a posts carousel for the mobile version of the blog posts listing page using swiper library: https://swiperjs.com/react. The UI of the carousel is included in the figma design inside "Test Advanced Mode" page.

### Contacts

For any doubt feel free to email us at simone@webpunks.it. After the test is completed invite my email to your private repository and write me an email.
