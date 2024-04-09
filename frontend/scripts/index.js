 //fetch user
const alluser=document.getElementById("fetch-alluser")
const appContainer = document.getElementById('container');

alluser.addEventListener("click",()=>{
    displayUserCards();
})

 async function fetchUserData() {
    try {
        appContainer.innerHTML="";
      const response = await fetch('https://cointab-assignment-qdjf.onrender.com/user/');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return [];
    }
  }

  //card
  function createUserCard(userData) {
    console.log(userData.presentInSQL)
    const card = document.createElement('div');
    card.classList.add('user-card');

    const name = document.createElement('h2');
    name.textContent = userData.name;
    card.appendChild(name);

    const email = document.createElement('p');
    email.innerHTML = `<strong>Email:</strong> ${userData.email}`;
    card.appendChild(email);

    const phone = document.createElement('p');
    phone.innerHTML = `<strong>Phone:</strong> ${userData.phone}`;
    card.appendChild(phone);

    const website = document.createElement('p');
    website.innerHTML = `<strong>Website:</strong> ${userData.website}`;
    card.appendChild(website);

    const city = document.createElement('p');
    city.innerHTML = `<strong>City:</strong> ${userData.address.city}`;
    card.appendChild(city);

    const company = document.createElement('p');
    company.innerHTML = `<strong>Company:</strong> ${userData.company.name}`;
    card.appendChild(company);

    let addBtn = document.createElement("button");
    addBtn.className = "add";
    addBtn.innerText = "ADD";
    addBtn.addEventListener("click", async() => {
      await addData(userData);
      displayUserCards();
    });
    let openBtn = document.createElement("button");
    openBtn.className = "open";
    openBtn.innerText = "OPEN";
    openBtn.addEventListener("click",()=>{
      localStorage.setItem("userId",userData.id);
      localStorage.setItem("username",userData.name);
      localStorage.setItem("company", userData.company.name)
  
      window.location.href = "./post.html";
    })
    if (userData.presentInSQL) {
      card.append(openBtn);
    } else {
      card.append(addBtn);
    }
  

    return card;
  }

//   const appContainer = document.getElementById('container');

  // display
  async function displayUserCards() {
    const userData = await fetchUserData();
    userData.forEach(user => {
      const userCard = createUserCard(user);
      appContainer.appendChild(userCard);
    });
  }

  

  async function addData(userData) {
    try {
      let res = await fetch("https://cointab-assignment-qdjf.onrender.com/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          city: userData.address.city,
          phone: userData.phone,
          website: userData.website,
          company: userData.company.name,
        }),
      });
      let data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }