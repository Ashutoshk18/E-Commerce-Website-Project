# 🛍️ E-Commerce Website Project

A fully functional, modern e-commerce platform built with React and Vite. This project features a complete shopping experience with product browsing, shopping cart management, and order placement with multiple payment options.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38B2AC?logo=tailwind-css)

## ✨ Features

### 🏠 Core Features

- **Product Catalog**: Browse through a wide range of products with detailed views
- **Product Details**: View product images, descriptions, sizes, and pricing
- **Shopping Cart**: Add, remove, and manage items with quantity controls
- **Order Management**: Complete order placement with delivery and payment information
- **Responsive Design**: Fully responsive UI that works seamlessly on all devices

### 🛒 Shopping Cart Features

- Add products to cart with size selection
- Increment/decrement item quantities
- Remove items with confirmation dialog
- Real-time cart total calculation
- Cart count badge in navigation

### 💳 Payment Options

- **Cash on Delivery**: Pay when your order arrives (no payment details required)
- **UPI Payment**: Quick payment using UPI ID
- **Credit/Debit Cards**: Secure card payment with validation

### 🎨 User Interface

- Modern and clean design
- Smooth animations and transitions
- Toast notifications for user feedback
- Search functionality
- Related products suggestions
- Product categories and collections

## 🚀 Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router 7.9.5
- **Styling**: Tailwind CSS 4.1.16
- **State Management**: React Context API
- **Notifications**: React Toastify 11.0.5
- **Code Quality**: ESLint

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ashutoshk18/E-Commerce-Website-Project.git
   cd E-Commerce-Website-Project
   ```

2. **Navigate to the frontend directory**

   ```bash
   cd frontend
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Backend Setup

1. Go to backend folder
2. Create `.env` using `.env.example`
3. Fill environment variables
4. Run:
   ```bash
   npm install
   npm run dev
   ```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── assets/           # Images and static assets
│   ├── components/       # Reusable React components
│   │   ├── BestSeller.jsx
│   │   ├── CartTotal.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── NavBar.jsx
│   │   ├── ProductItem.jsx
│   │   └── ...
│   ├── context/          # React Context for state management
│   │   └── ShopContext.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Product.jsx
│   │   ├── Cart.jsx
│   │   ├── PlaceOrder.jsx
│   │   └── ...
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── public/               # Public assets
├── package.json
└── vite.config.js
```

## 🎯 Key Features in Detail

### Product Browsing

- Browse products by category
- View latest collections
- See best sellers
- Search for products
- View related products

### Shopping Cart

- Add items with size selection
- Adjust quantities with +/- buttons
- Remove items with confirmation
- View cart total with delivery fee
- Empty cart handling

### Order Placement

- Delivery information form
- Multiple payment methods:
  - Cash on Delivery
  - UPI (UPI ID only)
  - Credit/Debit Card (full card details)
- Form validation
- Order confirmation

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features Showcase

### Responsive Design

The application is fully responsive and adapts to different screen sizes:

- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface

### State Management

- Centralized state management using React Context
- Cart state persistence during session
- Real-time updates across components

### User Experience

- Loading states
- Error handling
- Success notifications
- Confirmation dialogs
- Smooth page transitions

## 🔮 Future Enhancements

- [ ] User authentication and accounts
- [ ] Order history page
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Backend integration
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Product filtering and sorting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Authors

**Ashutosh Kumar**
**Ashirwad Mishra**

- GitHub: [@Ashutoshk18](https://github.com/Ashutoshk18)
- GitHub: [@Ashirwad-Mishra](https://github.com/Ashirwad-Mishra)
- Project Link: [https://github.com/Ashutoshk18/E-Commerce-Website-Project](https://github.com/Ashutoshk18/E-Commerce-Website-Project)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the fast build tool
- Tailwind CSS for the utility-first CSS framework
- All contributors and open-source libraries used in this project

---

⭐ If you like this project, please give it a star!
