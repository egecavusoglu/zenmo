# Zenmo

Zenmo is a demo app to introduce some web security fundamentals for class CSE 437S: Software Engineering Workshop.

## Vulnerabilities

1. Expose an API key, data leak in a form body that is submitted.
   - Will expose a unique API key to each user that grants access to a fake price api
   - In real world the same key would be exposed to every user 
   - If not properly gated, users could steal this api key for their own project
   - TODO: Expose api key in some front end page
   - TODO: Create page to submit the exposed key and verify it matches the users key

2. Malformed POST request.

   - Send a money from someone else to self by changing the post request body.

3. CSRF GET Request

4. Unprotected Routes (user/other-user)

   - See other user's info by changing

5. XXS: Inject JS to a page
   - We believe we can achieve this React's `dangerouslySetInnerHtml`. More about that [here](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)

## Roadmap

- [x] Build the UI for the pages.
- [x] Set SQL db with prisma
- [x] Add login with email to track which students were in.
- [ ] Develop vulnerabilities in the context of the app.
  - [ ] Expose key
  - [ ] Malformed money sending request
  - [ ] Unprotected profile pages
  - [ ] XSS injection
