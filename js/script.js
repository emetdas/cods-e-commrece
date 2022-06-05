let show_product = document.querySelector('.products');
let search = document.querySelector('.search');
let cart_product_list = document.querySelector('.list-of-product');
let total_price = document.querySelector('.total-price');
let product;
let add_cart_products = [];

//Sidebar-start
let sidebar = document.querySelector('.sidebar');
let sidebar_toggle = document.querySelector('.sidebar-arrow');
sidebar_toggle.addEventListener('click', () => {
  sidebar.classList.toggle('close');
  if (sidebar.classList.contains('close')) {
    document
      .querySelector('.cart-product-list')
      .classList.remove('sidebar-open-cart');
    if (window.matchMedia('(max-width:1175px)').matches) {
      sidebar_toggle
        .querySelector('ion-icon')
        .setAttribute('name', 'chevron-forward-outline');
    } else {
      sidebar_toggle
        .querySelector('ion-icon')
        .setAttribute('name', 'chevron-back-outline');
    }
  } else {
    document
      .querySelector('.cart-product-list')
      .classList.add('sidebar-open-cart');
    if (window.matchMedia('(max-width:1175px)').matches) {
      sidebar_toggle
        .querySelector('ion-icon')
        .setAttribute('name', 'chevron-back-outline');
    } else {
      sidebar_toggle
        .querySelector('ion-icon')
        .setAttribute('name', 'chevron-forward-outline');
    }
  }
});
//Sidebar-end
//Theme-end
let theme_toggle = document.querySelector('.theme_toggle');
let theme_toggle_icon = document.querySelector('.theme_toggle ion-icon');
let theme_name = document.querySelector('.theme_toggle .sidebar-icon-name');
let get_theme = localStorage.getItem('theme');

if (get_theme !== null) {
  theme_toggle_icon.setAttribute('name', 'moon-outline');
  document.documentElement.setAttribute('theme', get_theme);
  theme_name.innerText = 'dark';
} else {
  theme_toggle_icon.setAttribute('name', 'sunny-outline');
  theme_name.innerText = 'light';
}

theme_toggle.addEventListener('click', (e) => {
  e.preventDefault();
  if (!document.documentElement.hasAttribute('theme')) {
    theme_toggle_icon.setAttribute('name', 'moon-outline');
    document.documentElement.setAttribute('theme', 'dark');
    theme_name.innerText = 'dark';
    localStorage.setItem('theme', 'dark');
  } else {
    theme_toggle_icon.setAttribute('name', 'sunny-outline');
    document.documentElement.removeAttribute('theme');
    theme_name.innerText = 'light';
    localStorage.removeItem('theme');
  }
});
//Theme-end

async function init() {
  //show products
  function showProducts(
    pro_img,
    pro_name,
    pro_description,
    pro_sizes,
    pro_category,
    pro_instock,
    pro_offer,
    pro_price,
    pro_color_switch
  ) {
    show_product.innerHTML += `
    <div class="product">
    <div class="product-image">
      <img src="${pro_img}" alt="${pro_name}" class="product_img">
    </div>
    <div class="product-content">
      <h1 class="product-title" data-title="${pro_name}">${
      pro_name.length > 20 ? pro_name.substring(0, 20).concat('...') : pro_name
    }</h1>
      <p class="product-description">${
        pro_description.length > 60
          ? pro_description.substring(0, 60).concat('...')
          : pro_description
      }</p>
      <div class="color-switch">
        <span>Colors</span>
        <div class="color-dots">
        ${pro_color_switch
          .map((color) => `<div class="color-dot" data-color="${color}"></div>`)
          .join('')}
        </div>
      </div>
      ${!pro_sizes ? '' : `<span class="sizes">${pro_sizes}</span>`}
      <span data-category="${pro_category}" hidden></span>
      <div class="instock_offer">
        <span class="instock_badge ${
          pro_instock > 5 ? 'available' : 'left'
        }" data-instock="${pro_instock}">${
      pro_instock > 5 ? 'Available' : 'Only Left ' + pro_instock
    }</span>
    ${!pro_offer ? '' : `<span class="offer">${pro_offer}% off</span>`} 
      </div>
      <div class="price_wrapper">
        <div>
          <h3 class="price">$ ${pro_price}</h3>
        </div>
        <div>
          <div class="add-to-cart">
            <ion-icon name="cart-outline"></ion-icon>
          </div>
          <div class="love-react">
            <ion-icon name="heart-outline"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
   `;
    let add_to_cart = document.querySelectorAll('.add-to-cart');
    // color-switch
    let color_dots = document.querySelectorAll('.color-dots .color-dot');
    color_dots.forEach((dot) => {
      dot.style.background = dot.getAttribute('data-color');
      dot.addEventListener('click', () => {
        let product_img =
          dot.parentElement.parentElement.parentElement.previousElementSibling;
        console.log(product_img);
        product_img.style.background = dot.getAttribute('data-color');
      });
    });
    // color-switch
    // Love React
    let react_product = document.querySelectorAll('.love-react');
    react_product.forEach((react) => {
      react.addEventListener('click', (e) => {
        e.target.classList.toggle('active');
      });
    });
    // Love React
    // Add To Cart
    add_to_cart.forEach((cart) => {
      cart.addEventListener('click', () => {
        let product_select = cart.parentNode.parentNode.parentNode.parentNode;
        let add_cart_product = {
          image: product_select
            .querySelector('.product_img')
            .getAttribute('src'),
          name: product_select
            .querySelector('.product-title')
            .getAttribute('data-title'),
          price: product_select.querySelector('.price').innerText,
          stocks: product_select
            .querySelector('.instock_badge')
            .getAttribute('data-instock'),
          quntatiy: 1,
        };

        let isInCart =
          add_cart_products.filter(
            (cartItem) => cartItem.name === add_cart_product.name
          ).length > 0;

        if (!isInCart) {
          document.querySelector('.btn-checkout').removeAttribute('disabled');
          cart_product_list.insertAdjacentHTML(
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
           <span class="total_stocks" hidden>${add_cart_product.stocks}</span>
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
          add_cart_products.push(add_cart_product);
          let cartItem = document.querySelectorAll('.cart-item');
          cartItem.forEach((cart_item) => {
            if (
              cart_item
                .querySelector('.product-heading')
                .getAttribute('data-name') === add_cart_product.name
            ) {
              // Incress-quntatiy
              cart_item
                .querySelector('[data-action="increase"]')
                .addEventListener('click', () => {
                  if (
                    cart_item
                      .querySelector('.product-heading')
                      .getAttribute('data-name') === add_cart_product.name &&
                    +cart_item.querySelector('.quntatiy').innerText <
                      +cart_item.querySelector('.total_stocks').innerText
                  ) {
                    cart_item.querySelector('.quntatiy').innerText =
                      ++cart_item.querySelector('.quntatiy').innerText;
                    ++add_cart_product.quntatiy;
                    updatePrice();
                  }
                });
              // Incress-quntatiy
              // Decress-quntatiy
              cart_item
                .querySelector('[data-action="decrease"]')
                .addEventListener('click', () => {
                  if (
                    cart_item
                      .querySelector('.product-heading')
                      .getAttribute('data-name') === add_cart_product.name &&
                    +cart_item.querySelector('.quntatiy').innerText > 1
                  ) {
                    cart_item.querySelector('.quntatiy').innerText =
                      --cart_item.querySelector('.quntatiy').innerText;
                    --add_cart_product.quntatiy;
                    updatePrice();
                  } else {
                    cart_item.remove();
                    add_cart_products = add_cart_products.filter(
                      (cartItem) =>
                        cartItem.name !==
                        cart_item
                          .querySelector('.product-heading')
                          .getAttribute('data-name')
                    );
                    add_cart_product.quntatiy = 0;
                    document.querySelector('.cart-badge').innerText =
                      add_cart_products.length;
                    updatePrice();
                  }
                });
              // Decress-quntatiy
              // Remove-Item
              cart_item
                .querySelector('[data-action="remove"]')
                .addEventListener('click', () => {
                  cart_item.remove();
                  add_cart_products = add_cart_products.filter(
                    (cartItem) =>
                      cartItem.name !==
                      cart_item
                        .querySelector('.product-heading')
                        .getAttribute('data-name')
                  );
                  add_cart_product.quntatiy = 0;
                  document.querySelector('.cart-badge').innerText =
                    add_cart_products.length;
                  updatePrice();
                });
              // Remove-Item
            }
          });
          // update Price
          function updatePrice() {
            let total = 0;
            add_cart_products.forEach((ct, i) => {
              let ctp = +ct.price.split('$ ').join('');
              let ctq = +ct.quntatiy;
              total += ctp * ctq;
            });
            total_price.innerText = `Total $${total}`;
          }
          updatePrice();
          // update Price
          document.querySelector('.cart-badge').innerText =
            add_cart_products.length;
        } else {
          let error = document.querySelector('.cart-error');
          error.innerHTML = `
         <span>product already in cart</span>
         `;
          error.classList.add('error');
          setTimeout(() => {
            error.classList.remove('error');
          }, 1300);
        }
      });
    });
    // Add To Cart
  }
  //show products
  //cart-toggle
  let cart_close = document.querySelector('.icon-cart-close');
  let btn_toggle_cart = document.querySelector('.btn-toggle-cart-list');
  cart_close.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.cart-product-list').classList.remove('open');
  });
  btn_toggle_cart.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.cart-product-list').classList.toggle('open');
  });
  //cart-toggle
  // load Product
  async function loadProduct() {
    var url = new Request('../js/data.json');
    let data = await fetch(url);
    if (data.status === 200) {
      let response = await data.json();

      product = await response['product'];
      if (product.length > 0) {
        for (let i = 0; i < product.length; i++) {
          let {
            img,
            name,
            description,
            sizes,
            category,
            instock,
            offer,
            price,
            color_switch,
          } = product[i];
          showProducts(
            img,
            name,
            description,
            sizes,
            category,
            instock,
            offer,
            price,
            color_switch
          );
        }
        show_product.classList.remove('no_products_found');
      } else {
        show_product.innerHTML = `<h1>No Products</h1>`;
        show_product.classList.add('no_products_found');
      }
    } else if (data.status === 400) {
      console.log('file path is worng');
    } else {
      console.log('somthing is worng');
    }
  }
  loadProduct();
  // load Product
  // search Product
  function tralingDubounce(func, dealy) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.call(this, ...args);
      }, dealy);
    };
  }
  function searchHandler(values, category, name, input) {
    return values.filter(
      (v) =>
        v[category].toUpperCase().match(input) ||
        v[name].toUpperCase().match(input)
    );
  }
  async function fetchProduct() {
    let product_Data = product;
    let searchValue = search.value.toUpperCase().trim();
    let filterData = searchHandler(
      product_Data,
      'category',
      'name',
      searchValue
    );
    if (filterData.length > 0) {
      show_product.innerHTML = '';
      for (const product_data of filterData) {
        let {
          img,
          name,
          description,
          sizes,
          category,
          instock,
          offer,
          price,
          color_switch,
        } = product_data;
        showProducts(
          img,
          name,
          description,
          sizes,
          category,
          instock,
          offer,
          price,
          color_switch
        );
      }
      show_product.classList.remove('no_products_found');
    } else {
      show_product.innerHTML = `<h1>No Products match you search keywords</h1>`;
      show_product.classList.add('no_products_found');
    }
  }
  search.addEventListener('input', tralingDubounce(fetchProduct, 500));
  // search Product
}
init();