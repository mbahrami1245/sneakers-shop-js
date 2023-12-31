// global define
const root = document.querySelector("#root");

// global letiant
let user;
let products;
let error;
let cart = [];
let orders = [];
let currentPage = 1;
let totalPriceCart = 0;
let totalPriceOrder = 0;
let totalShippingPrice = 0;
let shippingType = "";
let shippingAddress = "home";
let paymentMethode = "";
let brandForSearch = "";
let isDiscount = false;
let search="";
const discounts = [
  { code: "ma1234", discount: 10 },
  { code: "mo1234", discount: 40 },
  { code: "mr1234", discount: 20 },
];
const shippingPrice = [
  { name: "economy", price: 10 },
  { name: "regular", price: 15 },
  { name: "cargo", price: 20 },
  { name: "express", price: 30 },
];

// global setting
iziToast.settings({
  maxWidth: "400px",
  position: "topCenter",
});

// create slider page ui
const sliderPage = () => {
  let countclick = 0;
  const result = `
<div class="w-full h-screen overflow-hidden">
  <div id="slider"
    class="w-[300%] h-full transition-all duration-500 flex items-center justify-center gap-1"
  >
    <div class="w-1/3 h-full flex items-center justify-center">
      <!-- single cart -->
      <div class="w-[80%] flex flex-col gap-2">
        <!-- img -->
        <div class="w-full">
          <div class="aspect-w-1 sm:aspect-w-4 sm:aspect-h-3 aspect-h-1 rounded-md overflow-hidden">
            <img
              class="w-full h-full object-center object-cover"
              src="../images/1.png"
              alt=""
            />
          </div>
        </div>
        <!-- title -->
        <div class="font-semibold text-[32px]">
          <span>We provide high quality products just for you</span>
        </div>
      </div>
    </div>
    <div class="w-1/3 h-full flex items-center justify-center">
      <!-- single cart -->
      <div class="w-[80%] flex flex-col gap-6">
        <!-- img -->
        <div class="w-full">
          <div class="aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 rounded-md overflow-hidden">
            <img
              class="w-full h-full object-center object-cover"
              src="../images/2.png"
              alt=""
            />
          </div>
        </div>
        <!-- title -->
        <div class="font-semibold text-[32px]">
          <span>Your satisfaction is our number one periority</span>
        </div>
      </div>
    </div>
    <div class="w-1/3 h-full flex items-center justify-center">
      <!-- single cart -->
      <div class="w-[80%] flex flex-col gap-6">
        <!-- img -->
        <div class="w-full">
          <div class="aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 rounded-md overflow-hidden">
            <img
              class="w-full h-full object-center object-cover"
              src="../images/3.png"
              alt=""
            />
          </div>
        </div>
        <!-- title -->
        <div class="font-semibold text-[32px]">
          <span>Let’s fulfill your fashion needs with shoearight now!</span>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- fotter -->
<div class="w-full max-w-2xl  flex flex-col items-center gap-4 h-[20%] px-4">
  <!-- indicator -->
  <div class="w-full flex items-center justify-center gap-1">
    <span id="indicator-1" class="w-10 h-1 bg-black rounded-full"></span>
    <!--  -->
    <span id="indicator-2" class="w-10 h-1 bg-gray-400 rounded-full"> </span>
    <!--  -->
    <span id="indicator-3" class="w-10 h-1 bg-gray-400 rounded-full"> </span>
  </div>
  <!-- button -->
  <div class="w-[80%] flex items-center justify-center">
    <button id="next" class="w-full py-2 bg-black text-white rounded-full">
      Next
    </button>
  </div>
</div>`;
  root.innerHTML = result;
  const slider = document.querySelector("#slider");
  const next = document.querySelector("#next");
  const indicator1 = document.querySelector("#indicator-1");
  const indicator2 = document.querySelector("#indicator-2");
  const indicator3 = document.querySelector("#indicator-3");

  next.addEventListener("click", () => {
    if (countclick == 0) {
      slider.classList.add("-translate-x-1/3");
      indicator1.classList.remove("bg-black");
      indicator1.classList.add("bg-gray-400");
      indicator2.classList.remove("bg-gray-400");
      indicator2.classList.add("bg-black");
      countclick = 1;
      return;
    }
    if (countclick == 1) {
      slider.classList.remove("-translate-x-1/3");
      slider.classList.add("-translate-x-2/3");
      indicator2.classList.remove("bg-black");
      indicator2.classList.add("bg-gray-400");
      indicator3.classList.remove("bg-gray-400");
      indicator3.classList.add("bg-black");
      next.innerText = "Get Started";
      countclick = 2;
      return;
    }
    countclick = 0;
    loginPage();
  });
};

// get all products
const getProductsByPage = async () => {
  await axios
    .get(`http://localhost:4000/sneaker?page=${currentPage}&limit=10`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then((res) => {
      products = res.data;
    })
    .catch((err) => console.log(err));
};

//
const getProductsByBrand = async () => {
  await axios
    .get(
      `http://localhost:4000/sneaker?page=${currentPage}&limit=10&search=${search}&brands=${brandForSearch}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    )
    .then((res) => {
      products = res.data;
    })
    .catch((err) => console.log(err));
};

// get single products
const getSingleProducts = async (id) => {
  await axios
    .get(`http://localhost:4000/sneaker/item/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then((res) => {
      products = res.data;
    })
    .catch((err) => console.log(err));
};

// create home page ui
const mainPage = () => {
  const result = `<div class="w-full h-screen overflow-hidden relative">
    <div class="w-full h-full aspect-w-1 aspect-h-1">
      <img class="w-full h-full object-cover object-center" src="../images/home.png" alt="" />
    </div>
    <div 
      class="absolute bottom-0 left-0 w-full bg-gradient-to-t h-full opacity-30 from-black to-transparent"
    ></div>
    <div class="absolute bottom-0 left-0 w-full p-10 flex flex-col z-10">
      <div class="w-full text-white text-3xl font-semibold flex items-center gap-2">
        <span>Welcome To</span>
        <span class="text-yellow-400"
          ><svg viewBox="0 0 512 512" fill="currentColor" class="w-10 h-10 rotate-45">
            <path
              d="M79.2 211.44c15.52-8.82 34.91-2.28 43.31 13.68l41.38 84.41a7 7 0 008.93 3.43 7 7 0 004.41-6.52V72c0-13.91 12.85-24 26.77-24s26 10.09 26 24v156.64A11.24 11.24 0 00240.79 240 11 11 0 00252 229V24c0-13.91 10.94-24 24.86-24S302 10.09 302 24v204.64A11.24 11.24 0 00312.79 240 11 11 0 00324 229V56c0-13.91 12.08-24 26-24s26 11.09 26 25v187.64A11.24 11.24 0 00386.79 256 11 11 0 00398 245V120c0-13.91 11.08-24 25-24s25.12 10.22 25 24v216c0 117.41-72 176-160 176h-16c-88 0-115.71-39.6-136-88L67.33 255c-6.66-18-3.64-34.75 11.87-43.56z"
            /></svg
        ></span>
      </div>
      <div class="w-full text-[70px] font-bold text-white">
        <span>Shoea</span>
      </div>
      <div class="w-full text-white mb-10">
        <span
          >The best sneakers & shoes e-commerse app of the century for your fashion
          needs!</span
        >
      </div>
      <div class="w-full flex items-center justify-center">
      <button id="start" class="py-2 w-1/2 bg-white text-black rounded-full" >Start</button>
      </div>
    </div>
  </div>`;
  root.innerHTML = result;
  const start = document.querySelector("#start");
  start.addEventListener("click", () => {
    sliderPage();
  });
};

// create signup page ui
const signupPage = () => {
  const result = `<div class="w-[80%] h-screen py-5 flex flex-col gap-6 justify-between">
    <div class="w-full mt-5 flex items-center justify-center p-4">
      <div class="">
        <img class="" src="../images/logo.png" alt="" />
      </div>
    </div>
    <div class="w-full flex flex-col items-center gap-4">
      <h1 class="text-2xl font-bold">Signup Your Account</h1>
      <div class="w-full flex items-center gap-1 border-2 border-gray-400 rounded-md p-2">
        <span class="text-gray-400">
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
            <path
              d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0l-8 5-8-5h16m0 12H4V8l8 5 8-5v10z"
            />
          </svg>
        </span>
        <input id="email" class="flex-1 p-2 outline-none" type="text" placeholder="Email" />
      </div>
      <div class="w-full flex items-center gap-1 border-2 border-gray-400 p-2 rounded-md">
        <span class="text-gray-400">
          <svg fill="none" viewBox="0 0 15 15" class="w-7 h-7">
            <path
              stroke="currentColor"
              d="M12.5 8.5v-1a1 1 0 00-1-1h-10a1 1 0 00-1 1v6a1 1 0 001 1h10a1 1 0 001-1v-1m0-4h-4a2 2 0 100 4h4m0-4a2 2 0 110 4m-9-6v-3a3 3 0 016 0v3m2.5 4h1m-3 0h1m-3 0h1"
            />
          </svg>
        </span>
        <input
          id="password"
          class="flex-1 p-2 outline-none"
          type="password"
          placeholder="Password"
        />
        <span id="password-visibility" class="text-gray-400 cursor-pointer">
          <svg viewBox="0 0 1024 1024" fill="currentColor" class="w-7 h-7">
            <path
              d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
            />
          </svg>
        </span>
      </div>
    </div>
    <div id="goto-login" class="w-full font-bold text-lg">
        <span>I have account?</span>
        <span  class="cursor-pointer">Go to Login page</span>
    </div>
    <div class="w-full px-4 self-end">
      <button id="signup" class="w-full bg-black rounded-full text-white py-2">Sign up</button>
    </div>
  </div>`;
  root.innerHTML = result;
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const passwordvisibility = document.querySelector("#password-visibility");
  const signup = document.querySelector("#signup");
  const gotologin = document.querySelector("#goto-login");
  passwordvisibility.addEventListener("click", () => {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  });
  gotologin.addEventListener("click", () => {
    loginPage();
  });

  signup.addEventListener("click", () => {
    if (email.value.trim().length != 0 && password.value.trim().length != 0) {
      axios
        .post("http://localhost:4000/auth/signup", {
          username: email.value,
          password: password.value,
        })
        .then((res) => {
          user = res.data;
          iziToast.success({
            title: `${user.user.username}`,
            message: "Signup Successfully !",
          });
          homePage();
        })
        .catch((err) => {
          error = err.response.data.message;
          iziToast.error({
            title: "Error",
            message: error,
          });
        });
      return;
    }
    iziToast.error({
      title: "Email or Password is emty!",
      message: "Please fill all input and try again!",
    });
  });
};

// create login page ui
const loginPage = () => {
  const result = `<div class="w-[80%] h-screen py-5 flex flex-col gap-6 justify-between">
    <div class="w-full mt-5 flex items-center justify-center p-4">
      <div class="">
        <img class="" src="../images/logo.png" alt="" />
      </div>
    </div>
    <div class="w-full flex flex-col items-center gap-4">
      <h1 class="text-2xl font-bold">Login to Your Account</h1>
      <div class="w-full flex items-center gap-1 border-2 border-gray-400 rounded-md p-2">
        <span class="text-gray-400">
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
            <path
              d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0l-8 5-8-5h16m0 12H4V8l8 5 8-5v10z"
            />
          </svg>
        </span>
        <input id="email" class="flex-1 p-2 outline-none" type="text" placeholder="Email" />
      </div>
      <div class="w-full flex items-center gap-1 border-2 border-gray-400 p-2 rounded-md">
        <span class="text-gray-400">
          <svg fill="none" viewBox="0 0 15 15" class="w-7 h-7">
            <path
              stroke="currentColor"
              d="M12.5 8.5v-1a1 1 0 00-1-1h-10a1 1 0 00-1 1v6a1 1 0 001 1h10a1 1 0 001-1v-1m0-4h-4a2 2 0 100 4h4m0-4a2 2 0 110 4m-9-6v-3a3 3 0 016 0v3m2.5 4h1m-3 0h1m-3 0h1"
            />
          </svg>
        </span>
        <input
          id="password"
          class="flex-1 p-2 outline-none"
          type="password"
          placeholder="Password"
        />
        <span id="password-visibility" class="text-gray-400 cursor-pointer">
          <svg viewBox="0 0 1024 1024" fill="currentColor" class="w-7 h-7">
            <path
              d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
            />
          </svg>
        </span>
      </div>
    </div>
    <div id="goto-signup" class="w-full font-bold text-lg">
         <span>I have not account?</span>
        <span  class="cursor-pointer">Go to Signup page</span>
    </div>
    <div class="w-full px-4 self-end">
      <button id="login" class="w-full bg-black rounded-full text-white py-2">Log in</button>
    </div>
  </div>`;
  root.innerHTML = result;
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const passwordvisibility = document.querySelector("#password-visibility");
  const login = document.querySelector("#login");
  const gotosignup = document.querySelector("#goto-signup");
  passwordvisibility.addEventListener("click", () => {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  });
  gotosignup.addEventListener("click", () => {
    signupPage();
  });

  login.addEventListener("click", () => {
    if (email.value.trim().length != 0 && password.value.trim().length != 0) {
      axios
        .post("http://localhost:4000/auth/login", {
          username: email.value,
          password: password.value,
        })
        .then((res) => {
          user = res.data;
          iziToast.success({
            title: `${user.user.username}`,
            message: `Login Successfully !`,
          });
          homePage();
        })
        .catch((err) => {
          error = err.response.data.message;
          iziToast.error({
            title: "Error",
            message: error,
          });
        });
      return;
    }
    iziToast.error({
      title: "Email or Password is emty!",
      message: "Please fill all input and try again!",
    });
  });
};

// create home pge ui
const homePage = (page) => {
  getProductsByPage().finally(() => {
    const result = `<div class="w-full flex flex-col h-screen">
    <div id="content" class="flex-1 flex flex-col items-center gap-6 overflow-auto p-2">
    </div>
    <!-- navbar -->
    <div class="w-full h-[80px] gap-4 flex justify-center items-center p-4">
      <!-- home -->
      <div id="home" class="flex-1 transition-all duration-500 flex cursor-pointer p-1 bg-stone-400 shadow-md flex-col items-center justify-center gap-1 rounded-md">
        <span class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg> </span
        ><span class="font-bold">Home</span>
      </div>
      <!--cart -->
      <div id="cart" class="flex-1 transition-all duration-500 flex flex-col cursor-pointer p-1 items-center justify-center gap-1 rounded-md">
        <span class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </span>
        <span class="font-bold">Cart</span>
      </div>
      <!-- orders-->
      <div id="orders" class="flex-1 transition-all duration-500 flex flex-col cursor-pointer p-1 items-center justify-center gap-1 rounded-md">
        <span class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </span>
        <span class="font-bold">Orders</span>
      </div>
      <!-- wallet -->
      <div id="wallet" class="flex-1 transition-all duration-500 flex flex-col cursor-pointer p-1 items-center justify-center gap-1 rounded-md">
        <span class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
            />
          </svg> </span
        ><span class="font-bold">Wallet</span>
      </div>
      <!-- profile -->
      <div id="profile" class="flex-1 transition-all duration-500 flex flex-col cursor-pointer p-1 items-center justify-center gap-1 rounded-md">
        <span class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg> </span
        ><span class="font-bold">Profile</span>
      </div>
    </div>
  </div>`;
    root.innerHTML = result;

    productPage();
    //
    const home = document.querySelector("#home");
    const cart = document.querySelector("#cart");
    const wallet = document.querySelector("#wallet");
    const profile = document.querySelector("#profile");
    const orders = document.querySelector("#orders");

    //
    home.addEventListener("click", () => {
      cart.classList.remove("bg-stone-400", "shadow-md");
      home.classList.add("bg-stone-400", "shadow-md");
      wallet.classList.remove("bg-stone-400", "shadow-md");
      profile.classList.remove("bg-stone-400", "shadow-md");
      orders.classList.remove("bg-stone-400", "shadow-md");
      productPage(content);
    });
    //
    cart.addEventListener("click", () => {
      cart.classList.add("bg-stone-400", "shadow-md");
      home.classList.remove("bg-stone-400", "shadow-md");
      wallet.classList.remove("bg-stone-400", "shadow-md");
      profile.classList.remove("bg-stone-400", "shadow-md");
      orders.classList.remove("bg-stone-400", "shadow-md");
      cartPage();
    });
    //
    wallet.addEventListener("click", () => {
      cart.classList.remove("bg-stone-400", "shadow-md");
      home.classList.remove("bg-stone-400", "shadow-md");
      wallet.classList.add("bg-stone-400", "shadow-md");
      profile.classList.remove("bg-stone-400", "shadow-md");
      orders.classList.remove("bg-stone-400", "shadow-md");
      walletPage();
    });
    //
    profile.addEventListener("click", () => {
      cart.classList.remove("bg-stone-400", "shadow-md");
      home.classList.remove("bg-stone-400", "shadow-md");
      wallet.classList.remove("bg-stone-400", "shadow-md");
      profile.classList.add("bg-stone-400", "shadow-md");
      orders.classList.remove("bg-stone-400", "shadow-md");
      profilePage();
    });
    //
    orders.addEventListener("click", () => {
      cart.classList.remove("bg-stone-400", "shadow-md");
      home.classList.remove("bg-stone-400", "shadow-md");
      wallet.classList.remove("bg-stone-400", "shadow-md");
      profile.classList.remove("bg-stone-400", "shadow-md");
      orders.classList.add("bg-stone-400", "shadow-md");
      ordersPage();
    });
    //
    if (page == "orderspage") {
      cart.classList.remove("bg-stone-400", "shadow-md");
      home.classList.remove("bg-stone-400", "shadow-md");
      wallet.classList.remove("bg-stone-400", "shadow-md");
      profile.classList.remove("bg-stone-400", "shadow-md");
      orders.classList.add("bg-stone-400", "shadow-md");
      ordersPage();
      return;
    }
  });
};

//
const productPage = () => {
  const content = document.querySelector("#content");
  const result = ` <!-- header -->
  <div class="w-full flex items-center justify-between p-2">
    <!-- image & title -->
    <div class="flex items-center gap-4 md:gap-6">
      <!-- image -->
      <div>
        <img src="../images/profile.png" alt="" />
      </div>
      <!-- title -->
      <div class="flex flex-col text-lg">
        <div class="flex items-center gap-2">
          <span>Good Morning</span>
          <span><img src="../images/hand.png" alt="" /></span>
        </div>
        <span class="font-bold">${user.user.username}</span>
      </div>
    </div>
    <!-- icons -->
    <div class="flex items-center gap-4">
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </span>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </span>
    </div>
  </div>
  <!-- search bar -->
  <div class="bg-gray-100 flex items-center gap-2 max-w-lg w-full p-2">
    <span class="text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </span>
    <input id="search-input" class="outline-none flex-1 py-1 bg-transparent" type="text" placeholder="search" />
  </div>
  <!-- brands bar -->
  <div class="w-full grid grid-rows-2 grid-cols-4 gap-2">
    <!-- nike -->
    <div class="w-full flex items-center justify-center flex-col gap-2">
      <span class="cursor-pointer rounded-full w-16 h-16 bg-[#ECECEC] flex items-center justify-center">
        <img src="../images/nike.png" alt="" />
      </span>
      <span class="font-bold">Nike</span>
    </div>
    <!-- addidas -->
    <div class="w-full flex items-center justify-center flex-col gap-2">
      <span class="cursor-pointer rounded-full w-16 h-16 bg-[#ECECEC] flex items-center justify-center">
        <img src="../images/addidas.png" alt="" />
      </span>
      <span class="font-bold">Addidas</span>
    </div>
    <!-- puma -->
    <div class="w-full flex items-center justify-center flex-col gap-2">
      <span class="cursor-pointer rounded-full w-16 h-16 bg-[#ECECEC] flex items-center justify-center">
        <img src="../images/puma.png" alt="" />
      </span>
      <span class="font-bold">Puma</span>
    </div>
    <!-- asics -->
    <div class="w-full flex items-center justify-center flex-col gap-2">
      <span class="cursor-pointer rounded-full w-16 h-16 bg-[#ECECEC] flex items-center justify-center">
        <img src="../images/asics.png" alt="" />
      </span>
      <span class="font-bold">Asics</span>
    </div>
    <!-- reebok -->
    <div class="w-full flex items-center justify-center flex-col gap-2">
      <span class="cursor-pointer rounded-full w-16 h-16 bg-[#ECECEC] flex items-center justify-center">
        <img src="../images/reebok.png" alt="" />
      </span>
      <span class="font-bold">Reebok</span>
    </div>
    <!-- new balance -->
    <div class="w-full flex items-center justify-center flex-col gap-2">
      <span class="cursor-pointer rounded-full w-16 h-16 bg-[#ECECEC] flex items-center justify-center">
        <img src="../images/nike.png" alt="" />
      </span>
      <span class="font-bold">New balance</span>
    </div>
    <!-- converse -->
    <div class="w-full flex items-center justify-center flex-col gap-2">
      <span class="cursor-pointer rounded-full w-16 h-16 bg-[#ECECEC] flex items-center justify-center">
        <img src="../images/convese.png" alt="" />
      </span>
      <span class="font-bold">Converse</span>
    </div>
    <!-- more -->
    <div class="w-full flex items-center justify-center flex-col gap-2">
      <span class="cursor-pointer rounded-full w-16 h-16 bg-[#ECECEC] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
      <span class="font-bold">More...</span>
    </div>
  </div>
  <!-- most popular -->
  <div class="w-full flex flex-col gap-2 p-2 text-[#152536]">
    <div class="w-full flex items-center font-bold text-xl justify-between">
      <span>Most Popular</span>
      <span>See All</span>
    </div>
    <!-- brands -->
    <div class="w-full flex items-center gap-2 py-4 px-2 overflow-auto">
      <span
        id="brand"
        data-name=""
        class="cursor-pointer rounded-full bg-[#343A40] text-white py-1 px-4 border-2 border-[#343A40]"
        >All</span
      >
      <span id="brand" data-name="nike" class="cursor-pointer rounded-full py-1 px-4 border-2 border-[#343A40]">Nike</span>
      <span id="brand" data-name="adidas" class="cursor-pointer rounded-full py-1 px-4 border-2 border-[#343A40]"
        >Addidas</span
      >
      <span id="brand" data-name="puma" class="cursor-pointer rounded-full py-1 px-4 border-2 border-[#343A40]">Puma</span>
      <span id="brand" data-name="asics" class="cursor-pointer rounded-full py-1 px-4 border-2 border-[#343A40]"
        >Asics</span
      >
      <span id="brand" data-name="NEW BALANCE" class="cursor-pointer rounded-full py-1 px-4 border-2 border-[#343A40]"
        >balance</span
      >
      <span id="brand" data-name="converse" class="cursor-pointer rounded-full py-1 px-4 border-2 border-[#343A40]"
        >Converse</span
      >
      <span id="brand" data-name="reebok" class="cursor-pointer rounded-full py-1 px-4 border-2 border-[#343A40]"
        >Reebok</span
      >
    </div>
  </div>
  <!-- container -->
  <div id="container" class="w-full px-4 grid grid-cols-1 auto-rows-auto xs:grid-cols-2 xs:px-0 gap-4"> 
  </div>
  <!-- page number -->
  <div id="pagenumber" class="w-full flex items-center justify-center gap-2">   
    </div>`;
  content.innerHTML = result;
  const searchInput=document.getElementById("search-input")
  searchInput.addEventListener("change",()=>{
    search=searchInput.value
    getProductsByBrand().finally(()=>{
      console.log(products)
      productListtGenerator();
      pagenumberGenerator();
    })

  })
  const brands = document.querySelectorAll("#brand");
  brands.forEach((brand) => {
    brand.addEventListener("click", () => {
      brandForSearch = brand.dataset.name.toUpperCase();
      currentPage = 1;
      brands.forEach((brand) => {
        brand.classList.remove("bg-[#343A40]", "text-white");
      });
      brand.classList.add("bg-[#343A40]", "text-white");
      getProductsByBrand().finally(() => {
        productListtGenerator();
        pagenumberGenerator();
      });
    });
  });
  productListtGenerator();
  pagenumberGenerator();
};
//
const cartPage = () => {
  const content = document.querySelector("#content");
  const emptypage = `<div class="w-full h-full flex flex-col items-center justify-center">
  <div class="w-full flex items-center gap-4 p-4">
    <div class="w-5 aspect-w-16 aspect-h-1">
      <img
        class="w-full h-full object-cover object-center"
        src="../images/logo.png"
        alt=""
      />
    </div>
    <div class="font-bold text-[25px]">
      <span>My Cart</span>
    </div>
  </div>
  <div class="w-full flex-1 flex items-center justify-center">
    <div>
      <img src="../images/emty.png" alt="" />
    </div>
  </div>
</div>`;
  const result = `
  <div class="w-full relative h-full flex flex-col items-center justify-center">
    <div class="w-full h-[80%] flex flex-col">
      <!-- heder -->
      <div class="w-full flex items-center gap-4 p-4">
        <div class="w-5 aspect-w-16 aspect-h-1">
          <img
            class="w-full h-full object-cover object-center"
            src="../images/logo.png"
            alt=""
          />
        </div>
        <div class="font-bold text-[25px]">
          <span>My Cart</span>
        </div>
      </div>
      <!-- cart container -->
      <div id="cart-container" class="w-full flex-1 flex flex-col gap-4 p-4 overflow-auto">
        <!-- single cart -->
 
      </div>
    </div>
    <!-- footer -->
    <div
      class="w-full flex-1 flex items-center rounded-t-[50px] bg-stone-100 pt-10 pb-4 shadow-2xl justify-between gap-4 px-8"
    >
      <div class="flex flex-col">
        <span class="text-stone-400">Total Price</span>
        <span id="total" class="font-bold text-[25px]">$585.00</span>
      </div>
      <div class="">
        <button
          class="px-6 py-4 flex justify-center rounded-full items-center gap-4 bg-black text-white"
        >
          <span id="check-out">Check Out</span>
          <span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              data-slot="icon"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div id="modal" class="absolute hidden overflow-hidden transition-all duration-500 justify-center items-end top-0 left-0 w-full h-full">
      <div id="modal-content" class="w-full relative translate-y-[100%] transition-all duration-500 flex flex-col rounded-t-[50px] bg-stone-100 pt-10">
        <div class="w-full p-4 text-2xl flex items-center justify-center">
          <h1>Remove From Cart ?</h1>
        </div>
        <div id="product-to-del" class="w-full p-4">
        
        </div>
        <div class="w-full p-4 flex items-center gap-4 text-white">
          <button id="cancel" class="flex-1 rounded-full py-2 bg-black">Cancel</button>
          <button id="del" class="flex-1 rounded-full py-2 bg-black">Yes,Remove</button>
        </div>
      </div>
    </div>
  </div>`;
  content.innerHTML = cart.length == 0 ? emptypage : result;
  if (cart.length != 0) {
    cartProductGenerator();
    const ckeckOut = document.querySelector("#check-out");
    ckeckOut.addEventListener("click", () => {
      checkOutPage();
    });
  }
};

//
const totalCartCalculator = () => {
  let total = 0;
  cart.map((p) => {
    total = total + parseInt(p.quantity * p.price);
  });
  totalPriceCart = total;
};

//
const bgColorFinder = (color) => {
  switch (color) {
    case "black":
      return "bg-black";
    case "blue":
      return "bg-blue-400";
    case "brown":
      return "bg-amber-700";
    case "red":
      return "bg-red-500";
    case "white":
      return "bg-white";
  }
};

//
const cartProductGenerator = () => {
  let result = "";
  const container = document.querySelector("#cart-container");
  cart.forEach((p) => {
    const bg = bgColorFinder(p.color);
    result += `
    <div class="w-full flex items-stretch gap-2 shadow-sm p-4 rounded-2xl">
    <!-- img -->
    <div class="w-1/3">
      <div class="w-full rounded-xl overflow-hidden">
        <img
          src="${p.imageURL}"
          alt="image"
        />
      </div>
    </div>
    <!-- content -->
    <div class="flex-1 flex flex-col items-center justify-between py-2">
      <!-- title -->
      <div class="w-full flex gap-4 items-center justify-between">
        <span class="font-bold text-[20px]">${p.name}</span>
        <span
          id="delete"
          data-id="${p.id}"
          class="shadow-md text-red-400 border border-red-400 rounded-full flex items-center justify-center p-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            data-slot="icon"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </span>
      </div>
      <!-- featuers -->
      <div class="w-full flex gap-2 items-center text-stone-400 text-[18px]">
        <span class="${bg} w-5 h-5 rounded-full"></span>
        <span>${p.color}</span>
        <hr class="outline-none w-[2px] h-4 bg-black" />
        <span>size : ${p.size}</span>
      </div>
      <div class="w-full flex items-center justify-between gap-4">
        <div class="font-bold text-[20px]">
          <span>$${p.price}.00</span>
        </div>
        <div
          class="bg-stone-200 gap-4 px-4 py-2 rounded-full flex items-center justify-between"
        >
          <span id="decrement" data-id="${p.id}" class="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              data-slot="icon"
              class="w-5 h-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
            </svg>
          </span>
          <span id="quantity" data-id="${p.id}" class="font-bold">${p.quantity}</span>
          <span id="increment" data-id="${p.id}" class="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              data-slot="icon"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>`;
  });
  container.innerHTML = result;
  const increment = document.querySelectorAll("#increment");
  const decrement = document.querySelectorAll("#decrement");
  const del = document.querySelectorAll("#delete");
  const total = document.querySelector("#total");
  const modal = document.querySelector("#modal");
  //
  totalCartCalculator();
  total.innerText = `$${totalPriceCart}.00`;
  //
  increment.forEach((i) => {
    i.addEventListener("click", () => {
      const selected = cart.find((p) => p.id == i.dataset.id);
      selected.quantity++;
      cartPage();
    });
  });
  //
  decrement.forEach((i) => {
    i.addEventListener("click", () => {
      const selected = cart.find((p) => p.id == i.dataset.id);
      if (selected.quantity > 1) {
        selected.quantity--;
        cartPage();
        return;
      }
    });
  });
  //
  del.forEach((i) => {
    const producToDel = document.querySelector("#product-to-del");
    const modalcontent = document.querySelector("#modal-content");
    i.addEventListener("click", () => {
      const selectedProducts = cart.find((p) => p.id == i.dataset.id);
      const bg = bgColorFinder(selectedProducts.color);
      var res = `<div class="w-full bg-white flex items-stretch gap-2 shadow-sm p-4 rounded-2xl">
      <!-- img -->
     <div class="w-1/3">
      <div class="w-full rounded-xl overflow-hidden">
       <img
         src="${selectedProducts.imageURL}"
        alt="image"
      />
    </div>
  </div>
   <!-- content -->
  <div class="flex-1 flex flex-col items-center justify-between py-2">
   <!-- title -->
   <div class="w-full flex gap-4 items-center justify-between">
   <span class="font-bold text-[20px]">${selectedProducts.name}</span>
   
 </div>
 <!-- featuers -->
 <div class="w-full flex gap-2 items-center text-stone-400 text-[18px]">
   <span class="${bg} w-5 h-5 rounded-full"></span>
   <span>${selectedProducts.color}</span>
   <hr class="outline-none w-[2px] h-4 bg-black" />
   <span>size : ${selectedProducts.size}</span>
 </div>
 <div class="w-full flex items-center justify-between gap-4">
   <div class="font-bold text-[20px]">
     <span>$${selectedProducts.price}.00</span>
   </div>
   <div
     class="bg-stone-200 gap-4 px-4 py-2 rounded-full flex items-center justify-between"
   >
     <span id="decrement" class="cursor-pointer">
       <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke-width="1.5"
         stroke="currentColor"
         data-slot="icon"
         class="w-5 h-5"
       >
         <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
       </svg>
     </span>
     <span id="quantity" class="font-bold">${selectedProducts.quantity}</span>
     <span id="increment" class="cursor-pointer">
       <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke-width="1.5"
         stroke="currentColor"
         data-slot="icon"
         class="w-5 h-5"
       >
         <path
           stroke-linecap="round"
           stroke-linejoin="round"
           d="M12 4.5v15m7.5-7.5h-15"
         />
       </svg>
     </span>
   </div>
 </div>
</div>
                </div>`;
      producToDel.innerHTML = res;
      const cancel = document.querySelector("#cancel");
      const del = document.querySelector("#del");
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      modalcontent.classList.remove("translate-y-[100%]");
      cancel.addEventListener("click", () => {
        modalcontent.classList.add("translate-y-[100%]");
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      });
      del.addEventListener("click", () => {
        modalcontent.classList.add("translate-y-[100%]");
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        cart = cart.filter((p) => p.id != i.dataset.id);
        iziToast.success({
          title: "OK",
          message: `Successfully ${selectedProducts.name} Removed!`,
        });
        cartPage();
      });
    });
  });
};
//
const profilePage = () => {
  const content = document.querySelector("#content");
  const result = "profile page";
  content.innerHTML = result;
};
//
const ordersPage = () => {
  const content = document.querySelector("#content");
  const emty = `<div class="w-ful flex flex-col items-center gap-2">
  <div class="h-[300px]">
    <img class="h-full w-auto" src="../images/Empty-cuate.png" alt="">
  </div>
  <div class="w-full flex flex-col gap-4 items-center justify-center">
    <span class="font-bold text-lg">You dont have an order yet</span>
    <span>You dont have an active orders at this time</span>
  </div>
</div>`;
  const result = `<div class="w-full h-full flex flex-col items-center">
  <div class="w-full flex items-center gap-4 p-4">
    <div class="w-5 aspect-w-16 aspect-h-1">
      <img
        class="w-full h-full object-cover object-center"
        src="../images/logo.png"
        alt=""
      />
    </div>
    <div class="font-bold text-[25px]">
      <span>My Orders</span>
    </div>
  </div>
  <!-- buttons -->
  <div class="w-full flex items-center font-bold text-lg p-4">
    <span
      class="flex-1 cursor-pointer transition-all duration-500 flex items-center p-2 border-b-2 border-gray-400 justify-center"
      >Active</span
    >
    <span
      class="flex-1 cursor-pointer transition-all duration-500 flex items-center p-2 justify-center"
      >Completed</span
    >
  </div>
  <!-- order container -->
  <div id="orders-container" class="w-full flex flex-col gap-2 p-4">
    
  </div>
</div>`;
  content.innerHTML = result;
  const container = document.querySelector("#orders-container");
  if (orders.length == 0) {
    container.innerHTML = emty;
  } else {
    let res = ``;
    orders.map((order) => {
      const bg = bgColorFinder(order.color);
      res += `
      <div class="w-full flex items-stretch gap-4 shadow-md p-4 rounded-2xl">
        <!-- img -->
        <div class="w-1/3">
          <div class="w-full rounded-xl overflow-hidden">
            <img src="${order.imageURL}" alt="image" />
          </div>
        </div>
        <!-- content -->
        <div class="flex-1 flex flex-col gap-2 items-center justify-between px-2">
          <!-- title -->
          <div class="w-full flex items-center justify-between">
            <span class="font-bold text-[20px]">${order.name}</span>
          </div>
          <!-- featuers -->
          <div class="w-full flex gap-3 items-center text-stone-400">
            <span class="${bg} w-5 h-5 rounded-full"></span>
            <span>${order.color}</span>
            <hr class="outline-none w-[2px] h-4 bg-black" />
            <span>size : ${order.size}</span>
            <hr class="outline-none w-[2px] h-4 bg-black" />
            <span>Qty : ${order.quantity}</span>
          </div>
          <!-- in delivery -->
          <div class="w-full flex items-center">
            <span class="bg-stone-200 text-black text-xs p-2 rounded-xl">In Delivery</span>
          </div>
          <!-- price -->
          <div class="w-full flex items-center justify-between gap-4">
            <div class="font-bold text-[25px]">
              <span>$ ${order.quantity * order.price}.00</span>
            </div>
            <div class="flex items-center justify-between">
              <button class="rounded-full bg-black text-white px-4 py-2">Track Order</button>
            </div>
          </div>
        </div>
      </div>`;
    });
    container.innerHTML = res;
  }
};
//
const walletPage = () => {
  const content = document.querySelector("#content");
  const result = "wallet page";
  content.innerHTML = result;
};
//
const checkOutPage = () => {
  const result = `
  <!-- checkout && payment && shipping address && shipping methode-->
        <div class="w-full h-full overflow-hidden ">
          <!-- slider -->
          <div
            id="page-changer"
            class="w-[400%] h-full transition-all duration-500 flex items-center justify-center"
          >
            <!-- checkout -->
            <div class="w-1/4 h-full flex overflow-auto py-2 flex-col items-center justify-center">
              <div class="w-full h-full gap-4 flex flex-col p-4">
                <!-- heder -->
                <div class="w-full flex items-center gap-4">
                  <span id="ckeckout-to-main" class="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="3"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                      />
                    </svg>
                  </span>
                  <div class="font-bold text-[25px]">
                    <span>Checkout</span>
                  </div>
                </div>
                <!-- shipping address -->
                <div class="w-full flex flex-col gap-2">
                  <h1 class="font-bold text-lg">Shipping Address</h1>
                  <!-- address -->
                  <div id="address-container" class="w-full">
                    <div class="w-full flex items-center gap-6 shadow-md p-4">
                      <div>
                        <span
                          class="w-12 h-12 ring-8 ring-gray-200 rounded-full bg-black text-white flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-7 h-7"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                          </svg>
                        </span>
                      </div>
                      <div class="flex-1 flex flex-col gap-2 items-stretch">
                        <span class="font-bold text-xl">Home</span>
                        <span class="text-gray-400">61480 Sunbroke Park,PC 5679</span>
                      </div>
                      <div class="flex items-center">
                        <span id="shipping-edit" class="cursor-pointer">
                          <svg viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7">
                            <path
                              d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3l1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- line -->
                <hr class="outline-none w-full h-[1px] bg-gray-200" />
                <!-- order list -->
                <div class="w-full flex flex-col gap-2">
                  <h1 class="font-bold text-lg">Order List</h1>
                  <div id="order-container" class="w-full flex flex-col gap-2"></div>
                </div>
                <!-- line -->
                <hr class="outline-none w-full h-[1px] bg-gray-200" />
                <!-- shipping type -->
                <div class="w-full flex flex-col gap-2">
                  <h1 class="font-bold text-lg">Choose Shipping</h1>
                  <!-- address -->
                  <div id="chooseshipping-container" class="w-full">
                    <div class="w-full flex items-center justify-between shadow-md p-4">
                      <div class="flex items-center gap-4">
                        <span
                          class="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                            />
                          </svg>
                        </span>
                        <div class="flex-1 flex flex-col gap-2 items-stretch">
                          <span class="font-bold text-xl">Choose Shipping Type</span>
                        </div>
                      </div>
                      <div class="flex items-center">
                        <span id="shppingtype-edit" class="cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="3"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- line -->
                <hr class="outline-none w-full h-[1px] bg-gray-200" />
                <!-- promo code -->
                <div class="w-full flex flex-col gap-2">
                  <h1 class="font-bold text-lg">Promo Code</h1>
                  <!-- promo code -->
                  <div class="w-full flex gap-4 items-center p-4 justify-between shadow-md">
                    <div id="promo-container" class="flex-1">
                      <input
                        type="text"
                        id="promocode"
                        class="bg-gray-200 text-lg p-4 rounded-full w-full"
                        placeholder="Enter Promo Code"
                      />
                    </div>
                    <div class="">
                      <span
                        id="promo-btn"
                        class="cursor-pointer transition-all duration-500 w-10 h-10 flex items-center justify-center rounded-full bg-black text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <!--  -->
                  <div class="w-full flex flex-col gap-4 p-4 shadow-md">
                    <div class="w-full flex items-center justify-between">
                      <span>Amount</span>
                      <span class="font-bold">$ ${totalPriceCart}.00</span>
                    </div>
                    <div class="w-full flex items-center justify-between">
                      <span>Shipping</span>
                      <span id="shipping-price" class="font-bold">-</span>
                    </div>
                    <!-- line -->
                    <hr class="outline-none w-full h-[1px] bg-gray-200" />
                    <div class="w-full flex items-center justify-between">
                      <span>Total</span>
                      <span id="total" class="font-bold text-lg">-</span>
                    </div>
                  </div>
                </div>
                <!--  -->
                <div class="w-full p-8 flex items-center justify-center">
                  <button
                    id="payment"
                    class="text-white text-lg w-full py-4 bg-black rounded-full text-center"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </div>
            <!-- shipping address -->
            <div class="w-1/4 h-full flex flex-col items-center justify-center">
              <div class="w-full h-full flex flex-col">
                <!-- heder -->
                <div class="w-full flex items-center gap-4 p-4">
                  <span id="address-to-checkout" class="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="3"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                      />
                    </svg>
                  </span>
                  <div class="font-bold text-[25px]">
                    <span>Shipping Address</span>
                  </div>
                </div>
                <!-- cart container -->
                <div
                  id="cart-container"
                  class="w-full flex-1 flex flex-col gap-4 p-4 overflow-auto"
                >
                  <!-- home -->
                  <div class="w-full flex items-center gap-6 shadow-md p-4">
                    <div>
                      <span
                        class="w-12 h-12 ring-8 ring-gray-200 rounded-full bg-black text-white flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-7 h-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                      </span>
                    </div>
                    <div class="flex-1 flex flex-col gap-2 items-stretch">
                      <div class="w-full flex items-center gap-4">
                        <span class="font-bold text-xl">Home</span>
                        <span class="bg-gray-200 rounded-sm p-2 text-xs">Default</span>
                      </div>
                      <span class="text-gray-400">61480 Sunbroke Park,PC 5679</span>
                    </div>
                    <div class="flex items-center">
                      <input id="home" name="address" class="w-5 h-5" type="radio" checked />
                    </div>
                  </div>
                  <!-- office -->
                  <div class="w-full flex items-center gap-6 shadow-md p-4">
                    <div>
                      <span
                        class="w-12 h-12 ring-8 ring-gray-200 rounded-full bg-black text-white flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-7 h-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                      </span>
                    </div>
                    <div class="flex-1 flex flex-col gap-2 items-stretch">
                      <span class="font-bold text-xl">Office</span>
                      <span class="text-gray-400">6993 Meadow Valley Tera,PC 3637</span>
                    </div>
                    <div class="flex items-center">
                      <input id="office" name="address" class="w-5 h-5" type="radio" />
                    </div>
                  </div>
                  <!-- apartment-->
                  <div class="w-full flex items-center gap-6 shadow-md p-4">
                    <div>
                      <span
                        class="w-12 h-12 ring-8 ring-gray-200 rounded-full bg-black text-white flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-7 h-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                      </span>
                    </div>
                    <div class="flex-1 flex flex-col items-stretch">
                      <span class="font-bold text-xl">Apartment</span>
                      <span class="text-gray-400">21833 Clyde Gallagher,PC 4662</span>
                    </div>
                    <div class="flex items-center">
                      <input id="apartment" name="address" class="w-5 h-5" type="radio" />
                    </div>
                  </div>
                  <!-- parents house -->
                  <div class="w-full flex items-center gap-6 shadow-md p-4">
                    <div>
                      <span
                        class="w-12 h-12 ring-8 ring-gray-200 rounded-full bg-black text-white flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-7 h-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                      </span>
                    </div>
                    <div class="flex-1 flex flex-col items-stretch">
                      <span class="font-bold text-xl">Parent's House</span>
                      <span class="text-gray-400">5259 Blue Bill Park,PC 4627</span>
                    </div>
                    <div class="flex items-center">
                      <input id="parentsthouse" name="address" class="w-5 h-5" type="radio" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full p-8 flex items-center justify-center">
                <button class="text-lg w-full py-4 bg-gray-200 rounded-full text-center">
                  Add New Address
                </button>
              </div>
            </div>
            <!-- choose shipping -->
            <div class="w-1/4 h-full flex flex-col items-center justify-center">
              <div class="w-full h-full flex flex-col">
                <!-- heder -->
                <div class="w-full flex items-center gap-4 p-4">
                  <span id="choose-to-checkout" class="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="3"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                      />
                    </svg>
                  </span>
                  <div class="font-bold text-[25px]">
                    <span>Choose Shipping</span>
                  </div>
                </div>
                <!-- cart container -->
                <div
                  id="cart-container"
                  class="w-full flex-1 flex flex-col gap-6 p-4 overflow-auto"
                >
                  <!-- economy -->
                  <div class="w-full flex items-center gap-4 shadow-md p-4">
                    <div>
                      <span
                        class="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center"
                      >
                        <svg fill="currentColor" viewBox="0 0 16 16" class="w-7 h-7">
                          <path
                            d="M8.186 1.113a.5.5 0 00-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 011.114 0l7.129 2.852A.5.5 0 0116 3.5v8.662a1 1 0 01-.629.928l-7.185 2.874a.5.5 0 01-.372 0L.63 13.09a1 1 0 01-.63-.928V3.5a.5.5 0 01.314-.464L7.443.184z"
                          />
                        </svg>
                      </span>
                    </div>
                    <div class="flex-1 flex flex-col items-stretch">
                      <span class="font-bold text-xl">Economy</span>
                      <span class="text-gray-400">Estimated Arrival,Dec 20-23</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-xl">$10</span>
                      <input id="economy" name="shipping" class="w-5 h-5" type="radio" />
                    </div>
                  </div>
                  <!-- Regular -->
                  <div class="w-full flex items-center gap-4 shadow-md p-4">
                    <div>
                      <span
                        class="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center"
                      >
                        <svg fill="currentColor" viewBox="0 0 16 16" class="w-7 h-7">
                          <path
                            d="M8.186 1.113a.5.5 0 00-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 011.114 0l7.129 2.852A.5.5 0 0116 3.5v8.662a1 1 0 01-.629.928l-7.185 2.874a.5.5 0 01-.372 0L.63 13.09a1 1 0 01-.63-.928V3.5a.5.5 0 01.314-.464L7.443.184z"
                          />
                        </svg>
                      </span>
                    </div>
                    <div class="flex-1 flex flex-col items-stretch">
                      <span class="font-bold text-xl">Regular</span>
                      <span class="text-gray-400">Estimated Arrival,Dec 20-22</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-xl">$15</span>
                      <input id="regular" name="shipping" class="w-5 h-5" type="radio" />
                    </div>
                  </div>
                  <!-- cargo -->
                  <div class="w-full flex items-center gap-4 shadow-md p-4">
                    <div>
                      <span
                        class="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center"
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="{2}"
                          viewBox="0 0 24 24"
                          class="w-7 h-7"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M9 17 A2 2 0 0 1 7 19 A2 2 0 0 1 5 17 A2 2 0 0 1 9 17 z" />
                          <path d="M19 17 A2 2 0 0 1 17 19 A2 2 0 0 1 15 17 A2 2 0 0 1 19 17 z" />
                          <path d="M5 17H3v-4M2 5h11v12m-4 0h6m4 0h2v-6h-8m0-5h5l3 5M3 9h4" />
                        </svg>
                      </span>
                    </div>
                    <div class="flex-1 flex flex-col items-stretch">
                      <span class="font-bold text-xl">Cargo</span>
                      <span class="text-gray-400">Estimated Arrival,Dec 19-20</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-xl">$20</span>
                      <input id="cargo" name="shipping" class="w-5 h-5" type="radio" />
                    </div>
                  </div>
                  <!-- express -->
                  <div class="w-full flex items-center gap-4 shadow-md p-4">
                    <div>
                      <span
                        class="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center"
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="{2}"
                          viewBox="0 0 24 24"
                          class="w-7 h-7"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M9 17 A2 2 0 0 1 7 19 A2 2 0 0 1 5 17 A2 2 0 0 1 9 17 z" />
                          <path d="M19 17 A2 2 0 0 1 17 19 A2 2 0 0 1 15 17 A2 2 0 0 1 19 17 z" />
                          <path d="M5 17H3v-4M2 5h11v12m-4 0h6m4 0h2v-6h-8m0-5h5l3 5M3 9h4" />
                        </svg>
                      </span>
                    </div>
                    <div class="flex-1 flex flex-col items-stretch">
                      <span class="font-bold text-xl">Express</span>
                      <span class="text-gray-400">Estimated Arrival,Dec 18-19</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-xl">$30</span>
                      <input id="express" name="shipping" class="w-5 h-5" type="radio" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full p-8 flex items-center justify-center">
                <button
                  id="chooseshipping-apply"
                  class="text-white text-lg w-full py-4 bg-black rounded-full text-center"
                >
                  Apply
                </button>
              </div>
            </div>

            <!-- payment methode -->
            <div class="w-1/4 h-full flex flex-col items-center justify-center">
              <div class="w-full h-full flex flex-col">
                <!-- heder -->
                <div class="w-full flex items-center gap-4 p-4">
                  <span id="back-to-checkout" class="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="3"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                      />
                    </svg>
                  </span>
                  <div class="font-bold text-[25px]">
                    <span>Payment Methods</span>
                  </div>
                </div>
                <!--  -->
                <div class="w-full p-4">
                  <span>Select the peyment method you want to use</span>
                </div>
                <!-- cart container -->
                <div
                  id="cart-container"
                  class="w-full flex-1 flex flex-col gap-4 p-4 overflow-auto"
                >
                  <!-- wallet -->
                  <div class="w-full flex items-center justify-between gap-4 shadow-md p-4">
                    <div class="flex items-center gap-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-7 h-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                          />
                        </svg>
                      </span>
                      <span class="font-bold text-lg">My Wallet</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold">$9,379</span>
                      <input type="radio" name="payment" id="wallet" class="w-5 h-5" />
                    </div>
                  </div>
                  <!-- paypal -->
                  <div class="w-full flex items-center justify-between gap-4 shadow-md p-4">
                    <div class="flex items-center gap-2">
                      <span>
                        <svg viewBox="0 0 576 512" fill="currentColor" class="w-7 h-7">
                          <path
                            d="M186.3 258.2c0 12.2-9.7 21.5-22 21.5-9.2 0-16-5.2-16-15 0-12.2 9.5-22 21.7-22 9.3 0 16.3 5.7 16.3 15.5zM80.5 209.7h-4.7c-1.5 0-3 1-3.2 2.7l-4.3 26.7 8.2-.3c11 0 19.5-1.5 21.5-14.2 2.3-13.4-6.2-14.9-17.5-14.9zm284 0H360c-1.8 0-3 1-3.2 2.7l-4.2 26.7 8-.3c13 0 22-3 22-18-.1-10.6-9.6-11.1-18.1-11.1zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM128.3 215.4c0-21-16.2-28-34.7-28h-40c-2.5 0-5 2-5.2 4.7L32 294.2c-.3 2 1.2 4 3.2 4h19c2.7 0 5.2-2.9 5.5-5.7l4.5-26.6c1-7.2 13.2-4.7 18-4.7 28.6 0 46.1-17 46.1-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.2 8.2-5.8-8.5-14.2-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9 0 20.2-4.9 26.5-11.9-.5 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H200c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm40.5 97.9l63.7-92.6c.5-.5.5-1 .5-1.7 0-1.7-1.5-3.5-3.2-3.5h-19.2c-1.7 0-3.5 1-4.5 2.5l-26.5 39-11-37.5c-.8-2.2-3-4-5.5-4h-18.7c-1.7 0-3.2 1.8-3.2 3.5 0 1.2 19.5 56.8 21.2 62.1-2.7 3.8-20.5 28.6-20.5 31.6 0 1.8 1.5 3.2 3.2 3.2h19.2c1.8-.1 3.5-1.1 4.5-2.6zm159.3-106.7c0-21-16.2-28-34.7-28h-39.7c-2.7 0-5.2 2-5.5 4.7l-16.2 102c-.2 2 1.3 4 3.2 4h20.5c2 0 3.5-1.5 4-3.2l4.5-29c1-7.2 13.2-4.7 18-4.7 28.4 0 45.9-17 45.9-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.3 8.2-5.5-8.5-14-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9.3 0 20.5-4.9 26.5-11.9-.3 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H484c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm47.5-33.3c0-2-1.5-3.5-3.2-3.5h-18.5c-1.5 0-3 1.2-3.2 2.7l-16.2 104-.3.5c0 1.8 1.5 3.5 3.5 3.5h16.5c2.5 0 5-2.9 5.2-5.7L544 191.2v-.3zm-90 51.8c-12.2 0-21.7 9.7-21.7 22 0 9.7 7 15 16.2 15 12 0 21.7-9.2 21.7-21.5.1-9.8-6.9-15.5-16.2-15.5z"
                          />
                        </svg>
                      </span>
                      <span class="font-bold text-lg">PayPal</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold"></span>
                      <input type="radio" name="payment" id="paypal" class="w-5 h-5" />
                    </div>
                  </div>
                  <!-- google pay -->
                  <div class="w-full flex items-center justify-between gap-4 shadow-md p-4">
                    <div class="flex items-center gap-2">
                      <span>
                        <svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                          <path
                            d="M3.963 7.235A3.963 3.963 0 00.422 9.419a3.963 3.963 0 000 3.559 3.963 3.963 0 003.541 2.184c1.07 0 1.97-.352 2.627-.957.748-.69 1.18-1.71 1.18-2.916a4.722 4.722 0 00-.07-.806H3.964v1.526h2.14a1.835 1.835 0 01-.79 1.205c-.356.241-.814.379-1.35.379-1.034 0-1.911-.697-2.225-1.636a2.375 2.375 0 010-1.517c.314-.94 1.191-1.636 2.225-1.636a2.152 2.152 0 011.52.594l1.132-1.13a3.808 3.808 0 00-2.652-1.033zm6.501.55v6.9h.886V11.89h1.465c.603 0 1.11-.196 1.522-.588a1.911 1.911 0 00.635-1.464 1.92 1.92 0 00-.635-1.456 2.125 2.125 0 00-1.522-.598zm2.427.85a1.156 1.156 0 01.823.365 1.176 1.176 0 010 1.686 1.171 1.171 0 01-.877.357H11.35V8.635h1.487a1.156 1.156 0 01.054 0zm4.124 1.175c-.842 0-1.477.308-1.907.925l.781.491c.288-.417.68-.626 1.175-.626a1.255 1.255 0 01.856.323 1.009 1.009 0 01.366.785v.202c-.34-.193-.774-.289-1.3-.289-.617 0-1.11.145-1.479.434-.37.288-.554.677-.554 1.165a1.476 1.476 0 00.525 1.156c.35.308.785.463 1.305.463.61 0 1.098-.27 1.465-.81h.038v.655h.848v-2.909c0-.61-.19-1.09-.568-1.44-.38-.35-.896-.525-1.551-.525zm2.263.154l1.946 4.422-1.098 2.38h.915L24 9.963h-.965l-1.368 3.391h-.02l-1.406-3.39zm-2.146 2.368c.494 0 .88.11 1.156.33 0 .372-.147.696-.44.973a1.413 1.413 0 01-.997.414 1.081 1.081 0 01-.69-.232.708.708 0 01-.293-.578c0-.257.12-.47.363-.647.24-.173.54-.26.9-.26z"
                          />
                        </svg>
                      </span>
                      <span class="font-bold text-lg">Google Pay</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold"></span>
                      <input type="radio" name="payment" id="googlepay" class="w-5 h-5" />
                    </div>
                  </div>
                  <!-- apple pay -->
                  <div class="w-full flex items-center justify-between gap-4 shadow-md p-4">
                    <div class="flex items-center gap-2">
                      <span>
                        <svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                          <path
                            d="M2.15 4.318a42.16 42.16 0 00-.454.003c-.15.005-.303.013-.452.04a1.44 1.44 0 00-1.06.772c-.07.138-.114.278-.14.43-.028.148-.037.3-.04.45A10.2 10.2 0 000 6.222v11.557c0 .07.002.138.003.207.004.15.013.303.04.452.027.15.072.291.142.429a1.436 1.436 0 00.63.63c.138.07.278.115.43.142.148.027.3.036.45.04l.208.003h20.194l.207-.003c.15-.004.303-.013.452-.04.15-.027.291-.071.428-.141a1.432 1.432 0 00.631-.631c.07-.138.115-.278.141-.43.027-.148.036-.3.04-.45.002-.07.003-.138.003-.208l.001-.246V6.221c0-.07-.002-.138-.004-.207a2.995 2.995 0 00-.04-.452 1.446 1.446 0 00-1.2-1.201 3.022 3.022 0 00-.452-.04 10.448 10.448 0 00-.453-.003zm0 .512h19.942c.066 0 .131.002.197.003.115.004.25.01.375.032.109.02.2.05.287.094a.927.927 0 01.407.407.997.997 0 01.094.288c.022.123.028.258.031.374.002.065.003.13.003.197v11.552c0 .065 0 .13-.003.196-.003.115-.009.25-.032.375a.927.927 0 01-.5.693 1.002 1.002 0 01-.286.094 2.598 2.598 0 01-.373.032l-.2.003H1.906c-.066 0-.133-.002-.196-.003a2.61 2.61 0 01-.375-.032c-.109-.02-.2-.05-.288-.094a.918.918 0 01-.406-.407 1.006 1.006 0 01-.094-.288 2.531 2.531 0 01-.032-.373 9.588 9.588 0 01-.002-.197V6.224c0-.065 0-.131.002-.197.004-.114.01-.248.032-.375.02-.108.05-.199.094-.287a.925.925 0 01.407-.406 1.03 1.03 0 01.287-.094c.125-.022.26-.029.375-.032.065-.002.131-.002.196-.003zm4.71 3.7c-.3.016-.668.199-.88.456-.191.22-.36.58-.316.918.338.03.675-.169.888-.418.205-.258.345-.603.308-.955zm2.207.42v5.493h.852v-1.877h1.18c1.078 0 1.835-.739 1.835-1.812 0-1.07-.742-1.805-1.808-1.805zm.852.719h.982c.739 0 1.161.396 1.161 1.089 0 .692-.422 1.092-1.164 1.092h-.979zm-3.154.3c-.45.01-.83.28-1.05.28-.235 0-.593-.264-.981-.257a1.446 1.446 0 00-1.23.747c-.527.908-.139 2.255.374 2.995.249.366.549.769.944.754.373-.014.52-.242.973-.242.454 0 .586.242.98.235.41-.007.667-.366.915-.733.286-.417.403-.82.41-.841-.007-.008-.79-.308-.797-1.209-.008-.754.615-1.113.644-1.135-.352-.52-.9-.578-1.09-.593a1.123 1.123 0 00-.092-.002zm8.204.397c-.99 0-1.606.533-1.652 1.256h.777c.072-.358.369-.586.845-.586.502 0 .803.266.803.711v.309l-1.097.064c-.951.054-1.488.484-1.488 1.184 0 .72.548 1.207 1.332 1.207.526 0 1.032-.281 1.264-.727h.019v.659h.788v-2.76c0-.803-.62-1.317-1.591-1.317zm1.94.072l1.446 4.009c0 .003-.073.24-.073.247-.125.41-.33.571-.711.571-.069 0-.206 0-.267-.015v.666c.06.011.267.019.335.019.83 0 1.226-.312 1.568-1.283l1.5-4.214h-.868l-1.012 3.259h-.015l-1.013-3.26zm-1.167 2.189v.316c0 .521-.45.917-1.024.917-.442 0-.731-.228-.731-.579 0-.342.278-.56.769-.593z"
                          />
                        </svg>
                      </span>
                      <span class="font-bold text-lg">Apple Pay</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold"></span>
                      <input type="radio" name="payment" id="applepay" class="w-5 h-5" />
                    </div>
                  </div>
                  <!-- master cart -->
                  <div class="w-full flex items-center justify-between gap-4 shadow-md p-4">
                    <div class="flex items-center gap-2">
                      <span>
                        <svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                          <path
                            d="M11.343 18.031c.058.049.12.098.181.146a7.391 7.391 0 01-4.107 1.238 7.416 7.416 0 114.104-13.593c-.06.051-.12.098-.165.15A7.963 7.963 0 008.595 12a7.996 7.996 0 002.748 6.031zm5.241-13.447c-1.52 0-2.931.456-4.105 1.238.06.051.12.098.165.15A7.963 7.963 0 0115.405 12a8.002 8.002 0 01-2.748 6.031c-.058.049-.12.098-.181.146a7.386 7.386 0 004.107 1.238A7.414 7.414 0 0024 12a7.417 7.417 0 00-7.416-7.416zM12 6.174A7.388 7.388 0 009.169 12 7.386 7.386 0 0012 17.827 7.39 7.39 0 0014.831 12 7.388 7.388 0 0012 6.174z"
                          />
                        </svg>
                      </span>
                      <span class="font-bold text-lg">.... .... .... 4679</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold"></span>
                      <input type="radio" name="payment" id="mastercart" class="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full p-8 flex items-center justify-center">
                <button
                  id="payment-confirm"
                  class="text-white text-lg w-full py-4 bg-black rounded-full text-center"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- payment modal -->
        <div
          id="payment-modal"
          class="absolute w-full h-full bg-gradient-to-t from-black to-transparent top-0 left-0 hidden items-center justify-center"
        >
          <div class="flex flex-col gap-4 items-center bg-white rounded-md p-6">
            <div class="flex items-center justify-center">
              <span
                class="flex items-center justify-center bg-black text-white w-20 h-20 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </span>
            </div>
            <div class="flex flex-col items-center justify-center gap-2">
              <span class="font-bold text-xl">Order Successful!</span>
              <span>you have successfully made order</span>
            </div>
            <div class="flex flex-col gap-2">
              <button id="view-order" class="bg-black text-white rounded-full py-2 px-4">
                View Order
              </button>
            </div>
          </div>
        </div>
  `;
  root.innerHTML = result;
  checkOutOrderGenerator();
  const ckeckOutBackBtn = document.querySelector("#ckeckout-to-main");
  const paymentConfirmBtn = document.querySelector("#payment-confirm");
  const goPaymentPage = document.querySelector("#payment");
  const pageChanger = document.querySelector("#page-changer");
  const paymentBackBtn = document.querySelector("#back-to-checkout");
  const goShippingPage = document.querySelector("#shipping-edit");
  const addressBackBtn = document.querySelector("#address-to-checkout");
  const goChooseShipping = document.querySelector("#shppingtype-edit");
  const chooseShippingBackBtn = document.querySelector("#choose-to-checkout");
  const chooseShippingApplyBtn = document.querySelector("#chooseshipping-apply");
  const shippingPriceView = document.querySelector("#shipping-price");
  const promoBtb = document.querySelector("#promo-btn");
  const promocode = document.querySelector("#promocode");
  const promoContainer = document.querySelector("#promo-container");
  const viewOrder = document.querySelector("#view-order");
  const total = document.querySelector("#total");
  const paymentModal = document.querySelector("#payment-modal");
  const chooseShippingInputs = document.querySelectorAll('input[name="shipping"]');
  const shippingAddressInputs = document.querySelectorAll('input[name="address"]');
  const paymentMethodInputs = document.querySelectorAll('input[name="payment"]');
  //
  paymentMethodInputs.forEach((input) => {
    input.addEventListener("change", () => {
      paymentMethode = input.id;
    });
  });
  //
  ckeckOutBackBtn.addEventListener("click", () => {
    homePage();
  });
  //
  promoBtb.addEventListener("click", () => {
    promoCodeHandler();
  });
  //
  const promoCodeHandler = () => {
    if (shippingType == "") {
      iziToast.info({
        title: "Please",
        message: "Choose Your Shipping Type!",
      });
      return;
    }
    if (isDiscount) {
      promoContainer.innerHTML = `<input
      type="text"
      id="promocode"
      class="bg-gray-200 p-4 rounded-full w-full"
      placeholder="Enter Promo Code"
    />`;
      promoBtb.classList.remove("rotate-45");
      total.innerText = `$ ${totalPriceOrder}.00`;
      isDiscount = false;
    } else {
      if (promocode.value == "") {
        iziToast.info({
          title: "Please",
          message: "insert Promo Code and Try again!",
        });
        return;
      }
      const code = discounts.find((d) => d.code == promocode.value);
      if (code) {
        promoContainer.innerHTML = `<span class="bg-black  text-white p-4 block text-lg text-center rounded-full w-full">Discount ${code.discount} % off</span>`;
        promoBtb.classList.add("rotate-45");
        total.innerText = `$ ${totalPriceOrder - (totalPriceOrder * code.discount) / 100}.00`;
        isDiscount = true;
        return;
      }
      iziToast.info({
        title: "Your Code not valid",
        message: "insert valid Promo Code and Try again!",
      });
    }
  };
  //
  paymentConfirmBtn.addEventListener("click", () => {
    if (paymentMethode == "") {
      iziToast.info({
        title: "Please",
        message: "Choose Your Payment Methode!",
      });
      return;
    }
    paymentModal.classList.remove("hidden");
    paymentModal.classList.add("flex");
  });
  //
  viewOrder.addEventListener("click", () => {
    paymentModal.classList.add("hidden");
    paymentModal.classList.remove("flex");
    cart.map((product) => {
      orders.push(product);
    });
    cart = [];
    homePage("orderspage");
  });
  //
  shippingAddressInputs.forEach((input) => {
    input.addEventListener("change", () => {
      shippingAddress = input.id;
    });
  });
  //
  paymentBackBtn.addEventListener("click", () => {
    pageChanger.classList.remove("-translate-x-3/4");
  });
  //
  goPaymentPage.addEventListener("click", () => {
    if (shippingType == "") {
      iziToast.info({
        title: "Please",
        message: "Choose Your Shipping Type!",
      });
      return;
    }
    pageChanger.classList.add("-translate-x-3/4");
  });
  //
  goShippingPage.addEventListener("click", () => {
    pageChanger.classList.add("-translate-x-1/4");
  });
  //
  addressBackBtn.addEventListener("click", () => {
    shippingAddressHandler(pageChanger);
    pageChanger.classList.remove("-translate-x-1/4");
  });
  //
  goChooseShipping.addEventListener("click", () => {
    pageChanger.classList.add("-translate-x-2/4");
  });
  //
  chooseShippingBackBtn.addEventListener("click", () => {
    pageChanger.classList.remove("-translate-x-2/4");
  });
  //
  chooseShippingApplyBtn.addEventListener("click", () => {
    for (const input of chooseShippingInputs) {
      if (input.checked) {
        shippingType = input.id;
        break;
      }
    }
    // check choose
    if (shippingType == "") {
      iziToast.info({
        title: "Please",
        message: "Choose Your Shipping Methode!",
      });
      return;
    }
    // back to checkout page
    shippingChooseHandler(pageChanger);
    shippingPriceCalculator();
    totalPriceOrder = totalShippingPrice + totalPriceCart;
    total.innerText = `$ ${totalPriceOrder}.00`;
    shippingPriceView.innerText = `$ ${totalShippingPrice}.00`;
    pageChanger.classList.remove("-translate-x-2/4");
  });
};
//

const shippingAddressHandler = (pageChanger) => {
  const container = document.querySelector("#address-container");
  const address = [
    {
      name: "home",
      html: `<div class="w-full flex items-center gap-6 shadow-md p-4">
    <div>
      <span
        class="w-12 h-12 ring-8 ring-gray-200 rounded-full bg-black text-white flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-7 h-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      </span>
    </div>
    <div class="flex-1 flex flex-col gap-2 items-stretch">
      <span class="font-bold text-xl">Home</span>
      <span class="text-gray-400">61480 Sunbroke Park,PC 5679</span>
    </div>
    <div class="flex items-center">
      <span id="shipping-edit" class="cursor-pointer">
        <svg viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7">
          <path
            d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3l1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"
          />
        </svg>
      </span>
    </div>
  </div>`,
    },
    {
      name: "office",
      html: `<div class="w-full flex items-center gap-6 shadow-md p-4">
    <div>
      <span
        class="w-12 h-12 ring-8 ring-gray-200 rounded-full bg-black text-white flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-7 h-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      </span>
    </div>
    <div class="flex-1 flex flex-col gap-2 items-stretch">
      <span class="font-bold text-xl">Office</span>
      <span class="text-gray-400">6993 Meadow Valley Tera,PC 3637</span>
    </div>
    <div class="flex items-center">
    <span id="shipping-edit" class="cursor-pointer">
    <svg viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7">
      <path
        d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3l1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"
      />
    </svg>
  </span>
    </div>
  </div>`,
    },
    {
      name: "apartment",
      html: `<div class="w-full flex items-center gap-6 shadow-md p-4">
    <div>
      <span
        class="w-12 h-12 ring-8 ring-gray-200 rounded-full bg-black text-white flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-7 h-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      </span>
    </div>
    <div class="flex-1 flex flex-col items-stretch">
      <span class="font-bold text-xl">Apartment</span>
      <span class="text-gray-400">21833 Clyde Gallagher,PC 4662</span>
    </div>
    <div class="flex items-center">
    <span id="shipping-edit" class="cursor-pointer">
    <svg viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7">
      <path
        d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3l1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"
      />
    </svg>
  </span>
    </div>
  </div>`,
    },
    {
      name: "parentshouse",
      html: `<div class="w-full flex items-center gap-6 shadow-md p-4">
    <div>
      <span
        class="w-12 h-12 ring-8 ring-gray-200 rounded-full bg-black text-white flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-7 h-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      </span>
    </div>
    <div class="flex-1 flex flex-col items-stretch">
      <span class="font-bold text-xl">Parent's House</span>
      <span class="text-gray-400">5259 Blue Bill Park,PC 4627</span>
    </div>
    <div class="flex items-center">
    <span id="shipping-edit" class="cursor-pointer">
    <svg viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7">
      <path
        d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3l1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"
      />
    </svg>
  </span>
    </div>
  </div>`,
    },
  ];
  const result = address.find((address) => address.name == shippingAddress);

  container.innerHTML = result.html;
  const goShippingPage = document.querySelector("#shipping-edit");
  goShippingPage.addEventListener("click", () => {
    pageChanger.classList.add("-translate-x-1/4");
  });
};

const shippingChooseHandler = (pageChanger) => {
  const container = document.querySelector("#chooseshipping-container");
  const shipping = [
    {
      name: "economy",
      html: `<div class="w-full flex items-center gap-4 shadow-md p-4">
              <div>
                <span
                  class="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center"
                >
                  <svg fill="currentColor" viewBox="0 0 16 16" class="w-7 h-7">
                    <path
                      d="M8.186 1.113a.5.5 0 00-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 011.114 0l7.129 2.852A.5.5 0 0116 3.5v8.662a1 1 0 01-.629.928l-7.185 2.874a.5.5 0 01-.372 0L.63 13.09a1 1 0 01-.63-.928V3.5a.5.5 0 01.314-.464L7.443.184z"
                    />
                  </svg>
                </span>
              </div>
              <div class="flex-1 flex flex-col items-stretch">
                <span class="font-bold text-xl">Economy</span>
                <span class="text-gray-400">Estimated Arrival,Dec 20-23</span>
              </div>
              <div class="flex items-center gap-2">
              <span id="shppingtype-edit" class="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
              </div>
            </div>`,
    },
    {
      name: "regular",
      html: `<div class="w-full flex items-center gap-4 shadow-md p-4">
    <div>
      <span
        class="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center"
      >
        <svg fill="currentColor" viewBox="0 0 16 16" class="w-7 h-7">
          <path
            d="M8.186 1.113a.5.5 0 00-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 011.114 0l7.129 2.852A.5.5 0 0116 3.5v8.662a1 1 0 01-.629.928l-7.185 2.874a.5.5 0 01-.372 0L.63 13.09a1 1 0 01-.63-.928V3.5a.5.5 0 01.314-.464L7.443.184z"
          />
        </svg>
      </span>
    </div>
    <div class="flex-1 flex flex-col items-stretch">
      <span class="font-bold text-xl">Regular</span>
      <span class="text-gray-400">Estimated Arrival,Dec 20-22</span>
    </div>
    <div class="flex items-center gap-2">
    <span id="shppingtype-edit" class="cursor-pointer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="3"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  </span>
    </div>
  </div>`,
    },
    {
      name: "cargo",
      html: `<div class="w-full flex items-center gap-4 shadow-md p-4">
    <div>
      <span
        class="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="{2}"
          viewBox="0 0 24 24"
          class="w-7 h-7"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M9 17 A2 2 0 0 1 7 19 A2 2 0 0 1 5 17 A2 2 0 0 1 9 17 z" />
          <path d="M19 17 A2 2 0 0 1 17 19 A2 2 0 0 1 15 17 A2 2 0 0 1 19 17 z" />
          <path d="M5 17H3v-4M2 5h11v12m-4 0h6m4 0h2v-6h-8m0-5h5l3 5M3 9h4" />
        </svg>
      </span>
    </div>
    <div class="flex-1 flex flex-col items-stretch">
      <span class="font-bold text-xl">Cargo</span>
      <span class="text-gray-400">Estimated Arrival,Dec 19-20</span>
    </div>
    <div class="flex items-center gap-2">
    <span id="shppingtype-edit" class="cursor-pointer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="3"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  </span>
    </div>
  </div>`,
    },
    {
      name: "express",
      html: `<div class="w-full flex items-center gap-4 shadow-md p-4">
    <div>
      <span
        class="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="{2}"
          viewBox="0 0 24 24"
          class="w-7 h-7"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M9 17 A2 2 0 0 1 7 19 A2 2 0 0 1 5 17 A2 2 0 0 1 9 17 z" />
          <path d="M19 17 A2 2 0 0 1 17 19 A2 2 0 0 1 15 17 A2 2 0 0 1 19 17 z" />
          <path d="M5 17H3v-4M2 5h11v12m-4 0h6m4 0h2v-6h-8m0-5h5l3 5M3 9h4" />
        </svg>
      </span>
    </div>
    <div class="flex-1 flex flex-col items-stretch">
      <span class="font-bold text-xl">Express</span>
      <span class="text-gray-400">Estimated Arrival,Dec 18-19</span>
    </div>
    <div class="flex items-center gap-2">
    <span id="shppingtype-edit" class="cursor-pointer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="3"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  </span>
    </div>
  </div>`,
    },
  ];
  const result = shipping.find((shipp) => shipp.name == shippingType);
  container.innerHTML = result.html;
  const goChooseShipping = document.querySelector("#shppingtype-edit");
  goChooseShipping.addEventListener("click", () => {
    pageChanger.classList.add("-translate-x-2/4");
  });
};

const shippingPriceCalculator = () => {
  const type = shippingPrice.find((type) => type.name == shippingType);
  totalShippingPrice = type.price;
  return;
};

//
const checkOutOrderGenerator = () => {
  const orderContainer = document.querySelector("#order-container");
  let result = "";
  cart.map((p) => {
    const bg = bgColorFinder(p.color);
    result += `
    <div class="w-full flex items-stretch gap-4 shadow-md p-4 rounded-2xl">
      <!-- img -->
      <div class="w-1/3">
        <div class="w-full rounded-xl overflow-hidden">
          <img
            src="${p.imageURL}"
            alt="image"
          />
        </div>
      </div>
      <!-- content -->
      <div class="flex-1 flex flex-col items-center justify-between py-2">
        <!-- title -->
        <div class="w-full flex items-center justify-between">
          <span class="font-bold">Nike Mercurial Vapor 13 Elite FG</span>
        </div>
        <!-- featuers -->
        <div class="w-full flex gap-2 items-center text-stone-400">
          <span class="${bg} w-5 h-5 rounded-full"></span>
          <span>${p.color}</span>
          <hr class="outline-none w-[2px] h-4 bg-black" />
          <span>size : ${p.size}</span>
        </div>
        <div class="w-full flex items-center justify-between gap-4">
          <div class="font-bold text-[20px]">
            <span>$ ${p.price}.00</span>
          </div>
          <div
            class="bg-stone-200 gap-4 px-4 py-2 rounded-full flex items-center justify-between"
          >
            <span id="quantity" class="font-bold">${p.quantity}</span>
          </div>
        </div>
      </div>
    </div>`;
  });
  orderContainer.innerHTML = result;
};

//
const isExistInCart = () => {
  const index = cart.findIndex((p) => p.id == products.id);
  if (index == -1) return false;
  return true;
};

// create product page ui
const singleProductPage = (id) => {
  getSingleProducts(id).finally(() => {
    let color = "black";
    let size = "41";
    let quantity = 1;
    const result = `
    <!-- header -->
    <div class="w-full flex items-center p-4">
      <span class="cursor-pointer" id="back"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </span>
    </div>
    <div class="w-full h-screen flex shadow-md items-center flex-col gap-2 px-4">
    <!-- image -->
    <div class="w-full flex items-center justify-center">
      <div class="w-full aspect-w-2 aspect-h-1 rounded-md overflow-hidden">
        <img
          class="w-full h-full object-contain object-center"
          src="${products.imageURL}"
          alt="product"
        />
      </div>
    </div>
    <!-- title & icons-->
    <div class="w-full flex flex-col gap-2 p-2">
      <!-- tittle -->
      <div class="w-full flex items-center gap-8 justify-between">
        <span class="text-[25px] font-bold">${products.name}</span>
        <span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </span>
      </div>
      <!-- tag -->
      <div class="w-full flex items-center gap-4">
      <!-- tag -->
        <div class="flex items-center gap-2 bg-stone-200 rounded-md p-2">
          <span
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-5 h-5">
             <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
          </span>
          <span class="text-xs font-bold">${products.brand}</span>
        </div>
        <!-- tag -->
        <div class="flex items-center gap-2 bg-stone-200 rounded-md p-2">
          <span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
              />
            </svg>
          </span>
          <span class="text-xs font-bold">${products.category}</span>
        </div>
        <!-- tag -->
        <div class="flex items-center gap-2 bg-stone-200 rounded-md p-2">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </span>
          <span class="text-xs font-bold">${products.gender}</span>
        </div>
      </div>
    </div>
    <!-- line -->
    <hr class="outline-none w-full h-[1px] bg-stone-200" />
    <!-- colors -->
    <div class="w-full flex items-center gap-4 p-2">
      <div class="flex items-center justify-center">
        <span class="font-bold text-[20px]"> Color : </span>
      </div>
      <div class="flex-1 flex items-center gap-2">
        <span id="black"
          class="w-6 h-6 bg-black ring-offset-2 ring-2 ring-gray-400 shadow-md rounded-full cursor-pointer"
        >
        </span>
        <span id="brown"
          class="w-6 h-6 bg-amber-700 ring-offset-2 shadow-md rounded-full cursor-pointer"
        ></span>
        <span id="white"
          class="w-6 h-6 bg-white ring-offset-2 shadow-md rounded-full cursor-pointer"
        ></span>
        <span id="blue"
          class="w-6 h-6 bg-blue-400 ring-offset-2 shadow-md rounded-full cursor-pointer"
        ></span>
        <span id="red"
          class="w-6 h-6 bg-red-500 ring-offset-2 shadow-md rounded-full cursor-pointer"
        ></span>
      </div>
    </div>
    <!-- size -->
    <div class="w-full flex items-center gap-4 p-2">
      <div class="flex items-center justify-center">
        <span class="font-bold text-[20px]"> Size : </span>
      </div>
      <div class="flex-1 flex items-center gap-2">
        <span id="size-41"
          class="w-8 h-8 flex border-2 border-black bg-black text-white items-center justify-center shadow-md rounded-full cursor-pointer"
          >41</span
        >
        <span id="size-43"
          class="w-8 h-8 border-2 border-black flex items-center justify-center shadow-md rounded-full cursor-pointer"
          >43</span
        >
        <span id="size-45"
          class="w-8 h-8 border-2 border-black flex items-center justify-center shadow-md rounded-full cursor-pointer"
          >45</span
        >
      </div>
    </div>
    <!-- quantity -->
    <div class="w-full flex items-center gap-4 p-2">
      <div class="flex items-center justify-center">
        <span class="font-bold text-[20px]"> Quantity : </span>
      </div>
      <div class="flex items-center gap-2 bg-stone-200 rounded-full px-4 py-2 text-black">
        <span id="decrement" class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            data-slot="icon"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
          </svg>
        </span>
        <span id="quantity" class="w-8 h-8 flex font-bold items-center justify-center">1</span>
        <span id="increment" class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            data-slot="icon"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </div>
    </div>
    <!-- line -->
    <hr class="outline-none w-full h-[1px] bg-stone-200" />
    <!-- add cart -->
    <div class="w-full flex items-center gap-4 p-2">
      <!-- total price -->
      <div class="flex-1 flex flex-col">
        <span class="text-stone-400">Total Price</span>
        <span id="total" class="text-[25px] font-bold">$${products.price}.00</span>
      </div>
      <!-- button -->
      <div class="flex-1">
        <button id="add-to-cart"
          class="w-full flex items-center justify-center gap-4 bg-black text-white rounded-full py-4"
        >
          <span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              data-slot="icon"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </span>
          <span id="button-title">Add to Cart</span>
        </button>
      </div>
    </div>
  </div>`;
    root.innerHTML = result;
    const back = document.querySelector("#back");
    const black = document.querySelector("#black");
    const white = document.querySelector("#white");
    const brown = document.querySelector("#brown");
    const blue = document.querySelector("#blue");
    const red = document.querySelector("#red");
    const size41 = document.querySelector("#size-41");
    const size43 = document.querySelector("#size-43");
    const size45 = document.querySelector("#size-45");
    const decrement = document.querySelector("#decrement");
    const increment = document.querySelector("#increment");
    const quantityvalue = document.querySelector("#quantity");
    const totalprice = document.querySelector("#total");
    const add = document.querySelector("#add-to-cart");
    const buttontitle = document.querySelector("#button-title");
    //

    back.addEventListener("click", () => {
      homePage();
    });
    //
    black.addEventListener("click", () => {
      black.classList.add("ring-gray-400", "ring-2");
      white.classList.remove("ring-gray-400", "ring-2");
      brown.classList.remove("ring-gray-400", "ring-2");
      blue.classList.remove("ring-gray-400", "ring-2");
      red.classList.remove("ring-gray-400", "ring-2");
      color = "black";
    });
    //
    white.addEventListener("click", () => {
      black.classList.remove("ring-gray-400", "ring-2");
      white.classList.add("ring-gray-400", "ring-2");
      brown.classList.remove("ring-gray-400", "ring-2");
      blue.classList.remove("ring-gray-400", "ring-2");
      red.classList.remove("ring-gray-400", "ring-2");
      color = "white";
    });
    //
    brown.addEventListener("click", () => {
      black.classList.remove("ring-gray-400", "ring-2");
      white.classList.remove("ring-gray-400", "ring-2");
      brown.classList.add("ring-gray-400", "ring-2");
      blue.classList.remove("ring-gray-400", "ring-2");
      red.classList.remove("ring-gray-400", "ring-2");
      color = "brown";
    });
    //
    blue.addEventListener("click", () => {
      black.classList.remove("ring-gray-400", "ring-2");
      white.classList.remove("ring-gray-400", "ring-2");
      brown.classList.remove("ring-gray-400", "ring-2");
      blue.classList.add("ring-gray-400", "ring-2");
      red.classList.remove("ring-gray-400", "ring-2");
      color = "blue";
    });
    //
    red.addEventListener("click", () => {
      black.classList.remove("ring-gray-400", "ring-2");
      white.classList.remove("ring-gray-400", "ring-2");
      brown.classList.remove("ring-gray-400", "ring-2");
      blue.classList.remove("ring-gray-400", "ring-2");
      red.classList.add("ring-gray-400", "ring-2");
      color = "red";
    });
    //
    size41.addEventListener("click", () => {
      size41.classList.add("bg-black", "text-white");
      size43.classList.remove("bg-black", "text-white");
      size45.classList.remove("bg-black", "text-white");
      size = "41";
    });
    //
    size43.addEventListener("click", () => {
      size41.classList.remove("bg-black", "text-white");
      size43.classList.add("bg-black", "text-white");
      size45.classList.remove("bg-black", "text-white");
      size = "43";
    });
    //
    size45.addEventListener("click", () => {
      size41.classList.remove("bg-black", "text-white");
      size43.classList.remove("bg-black", "text-white");
      size45.classList.add("bg-black", "text-white");
      size = "45";
    });
    //
    increment.addEventListener("click", () => {
      quantity++;
      quantityvalue.innerText = quantity;
      const total = products.price * quantity;
      totalprice.innerText = `$${total}.00`;
    });
    //
    decrement.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityvalue.innerText = quantity;
        const total = products.price * quantity;
        totalprice.innerText = `$${total}.00`;
        return;
      }
      iziToast.info({
        title: "attention",
        message: "quantity cannot less than one!",
      });
    });
    //
    add.addEventListener("click", () => {
      if (isExistInCart()) {
        iziToast.info({
          title: "sorry",
          message: "your product is exist in cart!",
        });
        return;
      }
      const productToCart = {
        id: products.id,
        name: products.name,
        imageURL: products.imageURL,
        price: products.price,
        color,
        quantity,
        size,
      };
      cart.push(productToCart);

      iziToast.success({
        title: `${products.name}`,
        message: "Successfully Added To Cart!",
      });
    });
  });
};

//
const productListtGenerator = () => {
  const container = document.querySelector("#container");
  let res = ``;
  products.data.map((product) => {
    res += `
        <div id="product" class="w-full cursor-pointer h-[355px] flex flex-col shadow-md rounded-md" data-id="${product.id}">
          <div class="h-2/3 w-full aspect-w-2 aspect-h-1 rounded-md overflow-hidden">
            <img class="h-full w-full object-cover object-center" src="${product.imageURL}" alt="product image" />
          </div>
          <div class="w-full flex flex-col gap-2 text-[#152536] p-2">
            <span class="font-bold truncate text-[18px]">${product.name}</span>
            <span class="font-semibold">$ ${product.price}</span>
          </div>
        </div>`;
  });
  container.innerHTML = res;
  const product = document.querySelectorAll("#product");
  product.forEach((p) => {
    p.addEventListener("click", () => {
      const id = p.dataset.id;
      singleProductPage(id);
    });
  });
};
//
const pagenumberGenerator = () => {
  let result = ``;
  const pagenumber = document.querySelector("#pagenumber");
  for (let i = 1; i <= products.totalPages; i++) {
    result += `<span
    id="page"
    class="${
      currentPage == i && "bg-black text-white"
    } w-10 h-10 flex cursor-pointer items-center justify-center rounded-md shadow-md" data-page="${i}"
    >${i}</span
    >`;
  }
  pagenumber.innerHTML = result;
  const page = document.querySelectorAll("#page");
  page.forEach((p) => {
    p.addEventListener("click", () => {
      currentPage = p.dataset.page;
      getProductsByBrand().finally(() => {
        productListtGenerator();
        pagenumberGenerator();
      });
    });
  });
};

// create loading page ui
const loadingPage = () => {
  const result = `<div class="w-full h-screen flex flex-col gap-4 items-center justify-center">
    <div
      class="rounded-full border-8 animate-spin border-t-black w-28 h-28 flex items-center justify-center gap-4"
    ></div>
    <div>
      <span class="font-bold">Loading...</span>
    </div>
  </div>`;
  root.innerHTML = result;
};

//
window.addEventListener("DOMContentLoaded", mainPage());
