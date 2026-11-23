# Shopping Cart: Plan

## Folder structure

```
shopping-cart/
├── public/
│   └── _redirects            (Netlify) or vercel.json at the root (Vercel)
├── src/
│   ├── assets/
│   │   └── hero.jpg
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── QuantityInput.jsx   (reusable: shop cards + cart items)
│   │   ├── QuantityInput.test.jsx
│   │   └── CartItem.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   └── Cart.jsx
│   ├── context/
│   │   ├── cartContextObject.js  (createContext only)
│   │   └── CartContext.jsx       (CartProvider only)
│   ├── hooks/
│   │   ├── useCart.js
│   │   └── useProducts.js
│   ├── App.jsx                   (layout: CartProvider + Navbar + Outlet)
│   ├── routes.jsx
│   ├── setupTests.js
│   └── main.jsx
└── PLAN.md
```

## Key decisions

- One file per component (no per-component folders).
- Cart state lives in a context so the navbar, shop, and cart pages share it.
- Context object, provider, and hook are in separate files (Fast Refresh rule).
- `QuantityInput` is reusable and used on both the shop and cart pages.
- Cart item shape: `{ id, title, price, image, quantity }`
- The navbar shows the total quantity of items, only when the cart is not empty.
- The cart is held in memory only (a page refresh empties it).
- The `-` button stops at 1; use Remove to delete an item.
- Products come from https://fakestoreapi.com/products via `useProducts`.

## Progress

- [x] 1. Create React project (Vite)
- [x] 2. Plan structure
- [x] 3. Routing and navbar
- [x] 4. Home page
- [x] 5. Shop cards with quantity input
- [x] 6. Live cart count in navbar
- [x] 7. Cart page
- [x] 8. Fetch from FakeStore API
- [x] 9. Tests (React Testing Library)
- [x]10. QuantityInput
- [x]11. ProductCard
- [x]12. Navbar
  - [ ] CartItem
  - [ ] Cart page
  - [ ] Shop page (mock fetch)
- [ ] 10. Styling
- [ ] 11. Deploy (SPA redirects)
