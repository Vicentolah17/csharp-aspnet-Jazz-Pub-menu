# The Velvet Note - Admin Dashboard

![The Velvet Note Admin Dashboard Screenshot]  <img width="1873" height="949" alt="image" src="https://github.com/user-attachments/assets/60ef9454-3fca-41b4-815f-5b1f5ae57743" />



A full-stack, single-page application (SPA) featuring a **.NET 9 API** backend and an **Angular 18** frontend. This project was built as a complete portfolio piece in a 48-hour sprint to demonstrate proficiency in a modern, decoupled tech stack.

##  About This Project

This project simulates a simple admin panel for "The Velvet Note," a sophisticated jazz pub. It replaces the traditional "monolithic" approach (like MVC or Razor Pages) with a modern, decoupled architecture preferred by many tech companies:

* **Backend (`/PubJazz`):** A C#/.NET REST API that handles all business logic and database operations via Entity Framework Core. Its only job is to serve JSON data.
* **Frontend (`/JazzPub.Angular`):** An Angular SPA that consumes the .NET API. It handles all routing, state, and UI, providing a dynamic, real-time user interface without page reloads.

This monorepo contains both the frontend and backend applications, demonstrating a common development workflow.

##  Features

* **Full CRUD:** Complete Create, Read, Update, and Delete functionality for the whiskey collection.
* **Decoupled Architecture:** A C# API backend and an Angular frontend operating independently.
* **Real-time UI:** The Angular UI updates instantly on all CRUD operations (Create, Update, Delete) without a page refresh.
* **API Consumption:** Uses Angular's `HttpClient` to communicate with the .NET API, handling all data asynchronously.
* **Database Interaction:** Leverages Entity Framework Core (Code-First) with SQLite for data persistence and migrations.
* **CORS Policy:** The backend API is configured with a proper CORS policy to securely serve data to the Angular frontend.

##  Tech Stack

The technologies used align directly with modern web development standards.

### Backend (.NET API)
* **.NET 9**
* **C# 12**
* **ASP.NET Core Web API** (RESTful)
* **Entity Framework Core 9** (Code-First)
* **SQLite**

### Frontend (Angular)
* **Angular 18**
* **TypeScript**
* **Angular HttpClient**
* **HTML5 / CSS3**

### Tooling
* .NET CLI & Angular CLI
* Git & GitHub
* Visual Studio Code

##  How to Run

You will need two terminals running simultaneously to run this project.

### 1. Backend (.NET API)
```bash
# Navigate to the backend folder
cd PubJazz

# Install dependencies
dotnet restore

# Apply database migrations (creates the .db file)
dotnet ef database update

# Run the server (will listen on http://localhost:5095)
dotnet run

# --- Open a new terminal ---

# Navigate to the frontend folder
cd JazzPub.Angular

# Install dependencies
npm install

# Run the dev server (will open http://localhost:4200)
ng serve --open

The application will be running live at http://localhost:4200.

```
### Status
V1.0 (CRUD Complete)

The core CRUD functionality is 100% complete and functional.

Future plans include implementing authentication (JWT) and expanding the data models.
