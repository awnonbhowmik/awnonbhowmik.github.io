# Personal Website

This repository contains the source code for my personal website, showcasing my portfolio, achievements, and research interests.

## 📌 Project Overview

This website is built using [Next.js](https://nextjs.org) with a focus on creating a modern and responsive design. It includes sections for:

- **About Me**: Introduction and personal information.
- **Skills**: Key technical and professional skills.
- **Resume**: Educational background and work experience.
- **Achievements**: Notable awards and recognitions.
- **Research**: Information on research projects and publications.
- **Broader Impacts**: Contributions to communities like Mathematics Stack Exchange and Quora.
- **Contact**: A form to get in touch with me.
- **Footer**: Links to social profiles and additional resources.

## 🚀 Getting Started

### Prerequisites
Ensure you have **Node.js** installed on your system.

### Installation
To run this project locally, follow these steps:

1. **Clone this repository**:
   ```bash
   git clone https://github.com/your-username/your-repository.git

2. **Navigate to the project directory**:
   ```bash
   cd your-repository

3. **Install dependencies**:
   ```bash
    npm install

4. **Start the development server**:
    ```bash
    npm run dev

5. **Open the browser**:
    Navigate to `http://localhost:3000` to view the website.

# Building for Production
To build the project for production, run:
```bash
npm run build
```

To start the production server, run:
```bash
npm start
```

# Export the project as static HTML files:
```bash
npm run export
```

This will generate a `out` directory containing the static HTML files.

## Project Structure

The project structure is as follows:

```
app/
  ├── page.tsx               # Main entry point
  ├── layout.tsx             # Layout wrapper
components/
  ├── Navbar.tsx             # Navigation bar
  ├── Hero.tsx               # Hero section
  ├── About.tsx              # About Me section
  ├── Skills.tsx             # Skills section
  ├── Research.tsx           # Research & Interests section
  ├── Resume.tsx             # Educational background and Work experience
  ├── Achievements.tsx       # Achievements section
  ├── Contact.tsx            # Contact form
  ├── Footer.tsx             # Footer with social links
public/
  ├── favicon.ico            # Favicon
styles/
  ├── globals.css            # Global styles
```

## 🛠️ Technologies Used
- **Next.js**: React framework for server-rendered applications.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **TypeScript**: Strongly typed programming language for JavaScript.
- **React Icons**: Icons used across different sections of the website.

## 📝 License

All Rights Reserved. Unauthorized copying, modification, distribution, or use of this code or content is strictly prohibited.