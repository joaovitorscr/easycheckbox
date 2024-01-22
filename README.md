# EasyCheckBox
I create this project so I could solve a big problem for me, organizing myself. This web app will help you create simple lists of checkboxes being able to organize yourself easy and fast, bringing simplicity and fast pace note taking for your daily workflow. <br /> <br />
Who never had a lot of thing to do in a day and couldn't figure it out what to do next? Just thick that box and keep going! Check a box never has been that easy.

## Live version on [Vercel](https://easycheckbox.vercel.app/)

## 🧱 Stack
* Next.js
* TailwindCSS
* Prisma
* PostgreSQL
* shadcn/ui

## ⚠️ Prerequesites
npm >=10.1.0
node >=18.171

## 🔌 Getting Started

### 1. Clone the repo executing the command below or opening the <>code tab in repository page:
```bash
git clone https://github.com/joaovitorscr/easycheckbox.git
```

### 2. Access the folder that has been created and execute:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Create a .env file in the root of the project and the define the necessary variables, that you can see at .env.sample file.
```bash
DATABASE_URL="Put here your DB Url for Prisma."
NEXTAUTH_SECRET="A password for your NextAuth."
```

### 4. Push the prisma shema to your database.
```bash
npx prisma migrate dev --name init
```

### 5. Initalize the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💻 Usage

#### 1. Create a new account clicking at the right top corner button. (/sign-up)
#### 2. Login at the page of sign in that you will be redirected automatically. (/sign-in)
#### 3. At the boxes page insert the name of your list and press enter, at smaller devices like phones will appear a plus button. (/boxes)
#### 4. Access the list you had created and insert your first checkbox, the same usage from the list creation. (/boxes/${listID})
#### 5. You can change your password by accesing the edit profile tab at the right top corner in the user menu. (/settings)

## 🛠️ Testing

The cypress.config.ts baseURL is set by default for (http://localhost:3000), you need to change that configuration if you are hosting at a different place.

### This project uses Cypress E2E tests. So you can run the command below to execute the tests.
```bash
npx cypress run
```
