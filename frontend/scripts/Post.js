//localstorage items
let userId = localStorage.getItem("userId");
let company = localStorage.getItem("company");
let username = localStorage.getItem("username");

//creating
let userName = document.getElementById("username");
userName.innerText=username
let CompanyName = document.getElementById("company-name");
CompanyName.innerText=company


let container = document.getElementById("container");
async function fetchData(){
    try {
        let response = await fetch(`http://localhost:3000/post?userId=${userId}`)
        let data = await response.json();
        let posts = data.response;
        // console.log(data.msg);
        let msginfo = data.msg
        // console.log(msginfo)
        container.innerHTML = "";
        let bulkbtn = document.createElement("button")
        bulkbtn.setAttribute("id","bulk-add")
        bulkbtn.innerText="Bulk Add"
        bulkbtn.addEventListener("click",async()=>{
            await bulkAdd(posts)
            fetchData();
        })

        //for downlading
        let downloadbtn = document.createElement("button")

        downloadbtn.setAttribute("id","excel")
        downloadbtn.innerText="Download in excel"
        downloadbtn.addEventListener("click",async ()=>{
            try {
                const response = await fetch(`http://localhost:3000/post/download/${userId}`);
                const blob = await response.blob();
                const blobUrl = window.URL.createObjectURL(blob);
            
                const link = document.createElement('a');
                link.href = blobUrl;
                link.setAttribute('download', `post_${userId}.xlsx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              } catch (error) {
                console.error('Error downloading file:', error);
              }
        })
        if(msginfo == "unable to add data internal server error"){
        container.append(bulkbtn)
        }
        else{
        container.append(downloadbtn)
        }
        posts.forEach(item =>{
            let cards = createCard(item)
            container.append(cards)
        })

    } catch (error) {
        console.log(error);
    }
}
fetchData();
function createCard(item){
    let card = document.createElement("div")
    card.className="card"

    let title = document.createElement("h3")
    title.innerText=`Title: ${item.title}`

    let body = document.createElement("p")
    body.innerText=`Body: ${item.body}`

    card.append(title,body)
    return card;

}

async function bulkAdd(posts){
    try {
        let res = await fetch(`http://localhost:3000/post`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(posts)
        })
        let data = await res.json();
        console.log(data);

    } catch (error) {
        console.log(error)
    }
}