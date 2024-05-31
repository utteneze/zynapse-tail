# Zynapse :: Tail (Backend APIs)

![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) <br/>
![Alpine Linux](https://img.shields.io/badge/Alpine_Linux-%230D597F.svg?style=for-the-badge&logo=alpine-linux&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)  <br />
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

**This repository** hosts the backend APIs of Zynapse, the GenAI powered second brain project.

## 🚀 Getting Started

1. [Clone the repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository).

```
git clone https://github.com/utteneze/zynapse-tail
```

2. Install the dependencies.

```
pnpm install
```

3. This should fire up the server in development mode. Localhost address will be displayed on the console.

```
pnpm dev
```

## 📂 Folder Structure

```
apps
└── [slice]
    ├── entry-points
    │   ├── api
    │   │   ├── routes.ts
    │   │   └── controller.ts
    │   └── listeners
    ├── domain
    │   ├── emitters
    │   ├── services
    │   │   └── [service].ts
    │   ├── entities
    │   │   └── [entity].ts
    │   └── types
    └── data-access
        ├── repositories
        │   ├── interfaces
        │   │   └── [interface].ts
        │   └── implementations
        │       └── [implementation].ts
        └── models
            └── [model].ts
shared
├── webserver
│   ├── server.ts
│   └── error.ts
├── database
│   └── setup.ts
├── middlewares
├── config
│   ├── bootstrap.ts
│   └── environment.ts
├── interfaces
└── dtos
index.ts
```