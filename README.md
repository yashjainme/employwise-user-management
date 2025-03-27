# EmployWise User Management Application

## Project Overview
This is a React-based user management application that integrates with the Reqres API to demonstrate authentication, user listing, and basic CRUD operation interactions.

## Features
- User Authentication
- Paginated User Listing
- Mock Edit and Delete Functionality
- Responsive Design
- Error Handling
- Toast Notifications

## Prerequisites
- Node.js (v18+)
- npm

## Technologies Used
- React
- React Router
- Axios
- Tailwind CSS
- React Hot Toast

## Getting Started

### Installation
1. Clone the repository
```bash
git clone https://github.com/yashjainme/employwise-user-management.git
cd employwise-user-management
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

## Authentication Credentials
- Email: eve.holt@reqres.in
- Password: cityslicka

## Project Structure
```
src/
├── components/
│   ├── Login.jsx
│   ├── UsersList.jsx
│   └── EditUser.jsx
├── services/
│   └── apiService.js
├── App.jsx
└── main.jsx
```

## API Integration
The application uses Reqres mock API:
- Authentication: POST /api/login
- User Listing: GET /api/users
- User Update: PUT /api/users/{id}
- User Delete: DELETE /api/users/{id}

## Notes
- Edit and delete operations are simulated
- API responses are mock and not persistent
- Focused on demonstrating API interaction skills


## Bonus Features
- Responsive design
- Error handling
- Loading states
- Toast notifications

## License
MIT License

## Contact
Your Name - jain.yash837@gmail.com