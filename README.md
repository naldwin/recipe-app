## 1. Development Process

Initially, I was trying to find the best framework to use. I started with TanStack Start, but as I went on, I realized it was too overkill for this project. Because of that, I decided to switch to React only.

I chose React instead of other frameworks because it is smaller and I am already familiar with its common features such as `useState`, `useEffect`, and how JavaScript is used inside the JSX return area of each component. Although I am not yet fully knowledgeable about React’s best practices, especially in terms of file structure and project organization, I decided to go with what I think I can maintain more easily.

For the backend, I used Supabase for easy database integration, especially due to time constraints. I wanted a smaller and faster tech stack suitable for a project like this.

I started by reviewing documentation online on how to set up a Supabase project and connect it to my React application. Some YouTube videos helped me understand the general flow, but the official documentation helped me more because I realized I was watching tutorials based on older Supabase versions.

YouTube reference:
https://www.youtube.com/watch?v=KxRfAqm8eqI

Supabase documentation:
https://supabase.com/docs/guides/getting-started/quickstarts/reactjs

React documentation:
https://react.dev/learn

I initiated the project by creating the React app, and the initial scaffold that was generated was pushed to a Git repository. Originally, I planned to push per feature, but due to time constraints and being the only developer, I decided to complete everything in one go.

The first push was the initial project setup, and the second push was the final product, where Supabase was already connected, request functions were implemented, and frontend features were completed.

The main challenge I encountered was initially understanding Supabase since it was new to me in terms of actual implementation, even though I was already aware of its general use. After exploring it, I found that the setup process was relatively straightforward.

Another challenge during development was the frontend UI/UX, specifically the UI part. As a Fullstack Developer, I am not very experienced in writing SCSS manually, although I understand the basic concepts. My experience is more focused on using CSS libraries such as ShadCN, Tailwind, PrimeNG, and PrimeFlex, where reusable components are already provided.

To overcome this, I first tried to understand SCSS syntax better. I was already somewhat familiar with it due to my background in graphics, especially with concepts like padding, spacing, and color values, flex, grids, and etc. I utilized AI tools (opencode, DeepSeek model) to generate a starter UI during development. After that, I manually modified and adjusted the design to match my preference. That process helped me finish the project faster instead of investing more time on studying and manually creating everything. I got to focus more on what matters in order to match the project requirements.

For request functions to supabase, I used ChatGPT to help me understand the syntax, and then I implemented the logic later on.

---

## 2. Tools & Libraries

### Core Technologies

- React
- Supabase
- React Router

### Development Tools

- Vite (project bundler)
- SCSS (custom styling)
- Git & GitHub

### AI Tools Used

- ChatGPT – Used for:
  - Understanding Supabase query syntax
  - Assisting in README documentation
- Opencode (DeepSeek model) – Used for generating initial UI layout and starter components, later modified manually for customization

---

## 3. External Resources

- Supabase React Quickstart  
  https://supabase.com/docs/guides/getting-started/quickstarts/reactjs

- React Official Documentation  
  https://react.dev/learn

- YouTube Tutorial (Supabase + React Introduction)  
  https://www.youtube.com/watch?v=KxRfAqm8eqI

---

## 4. Setup Instructions

Follow these steps to run the project locally:

1. Clone the repository
```
git clone <repo-url>
cd <project-folder>
```
2. Install dependencies

Make sure Node.js is installed, then run:

```npm install```

3. Create environment variables

Create a file named .env.local in the root directory and add your Supabase credentials:
```
VITE_SUPABASE_URL=supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=supabase_project_publishable_key
```
4. Run the development server

```npm run dev```

5. Open the application

Open your browser and go to:
```http://localhost:5173```
