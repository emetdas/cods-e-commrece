
## web font
```html
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    
```
## sass reset
```scss
// misins
@mixin media($backepoint, $size) {
  @media (#{$backepoint}-width:#{$size}px) {
    @content
  }
}
// misins

@import url('https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&display=swap');
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
}

:root {
  --bg: #ffffff;
  --white: #fff;
  --primary: #fff;
  --text: rgba(71, 71, 71, 1);
  --link-br: rgba(190, 190, 190, 0.5);
  --icon: #6a6a6a;
  --card-img-bg: #f6f6f6;
  --color-switch-bg: rgba(208, 208, 208, 0.8);
  --color-switch-br: rgba(190, 190, 190, 0.2);
  --availability: rgba(255, 147, 69, 0.8);
  --available: rgba(0, 167, 17, 0.5);
  --hart-bg: #e86f6f;
  --hart-badge: rgba(255, 121, 121, 0.5);
  --cart-badge: rgba(0, 133, 255, 0.7);
  --card-shadow: 0.5rem 0.5rem 2rem rgba(133, 133, 133, 0.2);
  --search-box-shadow: 0.5rem 0.5rem 2rem rgba(181, 181, 181, 0.2);
  --border: 0.1rem solid rgba(190, 190, 190, 0.5);
  --shadow: 0.5rem 0.5rem 2rem rgba(133, 133, 133, 0.25);
  --container: 144rem;
  --nav-height: 7rem;
  --transition: all 0.5s ease-in-out;
}

html[theme='dark'] {
  --bg: #212121;
  --primary: #424242;
  --text: #e0e0e0;
  --link-br: rgba(190, 190, 190, 0.5);
  --icon: #d4d4d4;
  --card-img-bg: rgb(246, 246, 246);
  --card-shadow: 0.5rem 0.5rem 2rem rgba(29, 29, 29, 0.5);
  --search-box-shadow: 0.5rem 0.5rem 2rem rgba(29, 29, 29, 0.5);
  --shadow: 0.5rem 0.5rem 2rem rgba(156, 156, 156, 0.2);
}

html {
  font-size: 62.5%;
  font-family: 'Almarai', sans-serif;
  scroll-behavior: smooth;
}

body {
  font-size: 1.6rem;
  background: var(--bg);
  transition: all 0.5s ease;
}

::-webkit-scrollbar {
  width: 1.4rem;
}

::-webkit-scrollbar-thumb {
  background: rgb(132, 124, 250);
  border-radius: 2rem;
}

::-webkit-scrollbar-track {
  background: rgb(180, 186, 255);
}

.container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
}

ion-icon {
  color: var(--text);
}

.heading {
  padding-bottom: 2rem;
  color: var(--text);
}
```

```
(
  'beforeend',
  `
<div class="cart-item">
  <div>
    <img src="${add_cart_product.image}" alt="${
    add_cart_product.name
  }" />
  </div>
  <div>
    <h5 class="product-heading" data-name="${
      add_cart_product.name
    }">${String(add_cart_product.name)
    .substring(0, 11)
    .concat('...')}</h5>
    <span class="product-price">${add_cart_product.price}</span>
  </div>
  <div class="cart-item_action">
    <span class="btn action-btn" data-action="decrease">
      <ion-icon name="remove-outline"></ion-icon>
    </span>
    <span class="quntatiy">1</span>
    <span class="total_stocks" hidden>${
      add_cart_product.stroks
    }</span>
    <span class="btn action-btn" data-action="increase">
    <ion-icon name="add-outline"></ion-icon>
    </span>
    <div class="btn" data-action="remove">
      <ion-icon name="close-outline"></ion-icon>
    </div>
  </div>
</div>
`
);
```