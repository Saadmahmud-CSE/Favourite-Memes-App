import './style.css';

const tDark = document.querySelector("#dark");
const tDefault = document.querySelector("#default");
const tLight = document.querySelector("#light");
const tSynthwave = document.querySelector("#synthwave");
const tRetro = document.querySelector("#retro");
const tCyberpunk = document.querySelector("#cyberpunk");
const tAqua = document.querySelector("#aqua");
const tForest = document.querySelector("#forest");
const tBlack = document.querySelector("#black");
const tCoffee = document.querySelector("#coffee");
const tDim = document.querySelector("#dim");
const tLuxury = document.querySelector("#luxury");
const saveApiId=document.querySelector("#saveApiId");
const setApiId=document.querySelector("#setApiId");
const apiElements=document.querySelector("#apiElements");
const memeFeed=document.querySelector("#memeFeed");
const memeFeedImg=document.querySelector("#memeFeedImg");
const badRes=document.querySelector("#badRes");
const savedMemeCollection=document.querySelector("#savedMemeCollection");
const savedMemeCollectionInSideBar=document.querySelector("#savedMemeCollectionInSideBar");
const searchMemes=document.querySelector("#searchMemes");
const searchIcon=document.querySelector("#searchIcon");
const warningMsg=document.querySelector("#warningMsg");

const baseUrl="https://api.humorapi.com/memes/search?number=8&api-key=";
let apiKey=localStorage.getItem('apiKey');
let savedMemes=localStorage.getItem('savedMemes');

let startTheme=(
    new URL(document.location.href).searchParams.get("theme") ??
    localStorage.getItem("theme") ??
    "cupcake"
)
let demo = (
    new URL(document.location.href).searchParams.get("demo") ??
    localStorage.getItem("demo") ??
    "false"
)

const setTheme = (theme) =>{
    startTheme=theme;
    document.documentElement.setAttribute("data-theme", startTheme);
    const sp= new URLSearchParams();
    sp.set("demo", localStorage.getItem("demo"));
    sp.set("theme", startTheme);
    const newUrl = `${document.location.origin}?${sp}`;
    window.history.replaceState({},"",newUrl);
    localStorage.setItem("theme",theme);
};
setTheme(startTheme);
const setDemo = (demo) => {
    demo=demo;
    if(demo==='true'){
        localStorage.setItem('apiKey', "nan");
        localStorage.removeItem("savedMemes");
    }
    const sp = new URLSearchParams();
    sp.set("demo", demo);
    sp.set("theme", localStorage.getItem('theme'));
    const newUrl = `${document.location.origin}?${sp.toString()}`;
    window.history.replaceState({}, "", newUrl);
    localStorage.setItem('demo',demo);
};
setDemo(demo);

function themeBtnTrack(crnt) {
    if(crnt==='cupcake') crnt ='default';
    if(document.querySelector(`#${localStorage.getItem('theme')}`))
        document.querySelector(`#${localStorage.getItem('theme')}`).classList.remove("bg-orange-300");
    localStorage.setItem('theme',crnt);
    document.querySelector(`#${localStorage.getItem('theme')}`).classList.add("bg-orange-300");
}
themeBtnTrack(startTheme);

function themeChanger() {
    tDark.addEventListener("click", () => {
        const curTheme=localStorage.getItem('theme');
        if(curTheme!=='dark'){
            document.documentElement.setAttribute("data-theme", "dark");
            setTheme("dark");
            themeBtnTrack('dark');
        }
    });
    tDefault.addEventListener("click", () => {
        const curTheme=localStorage.getItem('theme');
        if(curTheme!=="cupcake"){
            document.documentElement.setAttribute("data-theme", "cupcake");
            themeBtnTrack('cupcake');
            setTheme("cupcake");
        }
    });
    tLight.addEventListener("click", () => {
        const curTheme=localStorage.getItem('theme');
        if(curTheme!=='light'){
            document.documentElement.setAttribute("data-theme", "light");
            themeBtnTrack('light');
            setTheme("light");

        }
    });
    tSynthwave.addEventListener("click", () => {
        const curTheme=localStorage.getItem('theme');
        if(curTheme!=='synthwave'){
            document.documentElement.setAttribute("data-theme", "synthwave");
            themeBtnTrack('synthwave');
            setTheme('synthwave');
        }
    });
    tRetro.addEventListener("click", () => {
        const curTheme=localStorage.getItem('theme');
        if(curTheme!=='retro'){
            document.documentElement.setAttribute("data-theme", "retro");
            themeBtnTrack('retro');
            setTheme('retro');
        }
    });
    tCyberpunk.addEventListener("click", () => {
        const curTheme=localStorage.getItem('theme');
        if(curTheme!=='cyberpunk'){
            document.documentElement.setAttribute("data-theme", "cyberpunk");
            themeBtnTrack('cyberpunk');
            setTheme('cyberpunk');
        }
    });
    tAqua.addEventListener("click", () => {
        const curTheme=localStorage.getItem('theme');
        if(curTheme!=='aqua'){
            document.documentElement.setAttribute("data-theme", "aqua");
            themeBtnTrack('aqua');
            setTheme('aqua');
        }
    });
    tForest.addEventListener("click", () => {
        const curTheme=localStorage.getItem('theme');
        if(curTheme!=='forest'){
            document.documentElement.setAttribute("data-theme", "forest");
            themeBtnTrack('forest');
            setTheme('forest');
        }
    });
    tBlack.addEventListener("click", () => {
        const curTheme=localStorage.getItem('theme');
        if(curTheme!=='black'){
            document.documentElement.setAttribute("data-theme", "black");
            themeBtnTrack('black');
            setTheme('black');
        }
    });
    tCoffee.addEventListener("click", () => {
        const curTheme=localStorage.getItem('theme');
        if(curTheme!=='coffee'){
            document.documentElement.setAttribute("data-theme", "coffee");
            themeBtnTrack('coffee');
            setTheme('coffee');
        }
    });
    tDim.addEventListener("click", () => {
        const curTheme=localStorage.getItem('theme');
        if(curTheme!=='dim'){
            document.documentElement.setAttribute("data-theme", "dim");
            themeBtnTrack('dim');
            setTheme('dim');
        }
    });
    tLuxury.addEventListener("click", () => {
        const curTheme=localStorage.getItem('theme');
        if(curTheme!=='luxury'){
            document.documentElement.setAttribute("data-theme", "luxury");
            themeBtnTrack('luxury');
            setTheme('luxury');
        }
    });

}
themeChanger();

function displayAllSavedMemes(savedMemes){
    savedMemeCollection.innerHTML="";
    savedMemeCollectionInSideBar.innerHTML="";
    for (let id in savedMemes) {
        if (savedMemes.hasOwnProperty(id)) {
            const meme = savedMemes[id];
            
            const newSpan=document.createElement("span");
            newSpan.innerHTML=`<div class="flex items-center justify-center gap-5">
                <img class="h-10 w-10" src="${meme.url}" alt="">
                <p>${meme.description}</p>
            </div>`;
            savedMemeCollection.appendChild(newSpan);

            const listItem=document.createElement("li");
            listItem.innerHTML=`<div class="flex items-center justify-center gap-3">
            <img class="h-10 w-10" src="${meme.url}" alt="">
            <p>${meme.description}</p>
            </div>`;
            savedMemeCollectionInSideBar.appendChild(listItem);
        }
    }
}
if(savedMemes){
    savedMemes=JSON.parse(savedMemes);
    displayAllSavedMemes(savedMemes);
}else{
    savedMemes = {};   
}

function buildMemesFeed(memes) {
    for(let i=0;i<memes.length;i++)
    {
        let newSpan = document.createElement("div");
        let memei=memes[i];
        console.log(memei, memei.url);
        let img = document.createElement("img");
        
        img.alt = "";
        img.className = "h-60 w-60 rounded-lg hover:scale-x-110 hover:scale-y-110 cursor-pointer";
        let favouriteBtn = document.createElement("span");
        favouriteBtn.id = "favouriteBtn";
        favouriteBtn.className = "absolute top-4 right-4";
        newSpan.appendChild(img);
        try {
            img.setAttribute("src",memei.url);
        } catch (error) {
            console.log(error);
        }
        newSpan.appendChild(favouriteBtn);
        const button=document.createElement("button");
        button.classList.add("star");
        newSpan.querySelector("#favouriteBtn").appendChild(button);

        const favouriteMemeSaveModalActiveBtn=document.querySelector("#favouriteMemeSaveModalActiveBtn");
        const favouriteMemeSaveBtn=document.querySelector("#favouriteMemeSaveBtn");
        const favouriteMemeSaveInput=document.querySelector("#favouriteMemeSaveInput");
        const favouriteMemeSaveModalCloseBtn=document.querySelector("#favouriteMemeSaveModalCloseBtn");

        button.addEventListener("click",()=>{
            
            button.classList.remove("star");
            button.classList.add("star2");
            if(!savedMemes[memes[i].id])
            {
                favouriteMemeSaveModalActiveBtn.click();
                let name="";
                favouriteMemeSaveBtn.addEventListener("click",()=>{
                    name=favouriteMemeSaveInput.value; 
                    console.log(name);
                    savedMemes[memes[i].id] = {url: memes[i].url, description: name ? name : memes[i].description};
                    localStorage.setItem('savedMemes',JSON.stringify(savedMemes));
                    displayAllSavedMemes(savedMemes);
                    favouriteMemeSaveModalCloseBtn.click();
                });
                
            }
        });
        newSpan.classList.add("relative");
        memeFeedImg.appendChild(newSpan);
    }
}

async function randerMemes() {
    if(apiKey)
    {
        apiElements.classList.add("hidden");
        memeFeed.classList.remove("hidden");

        const res = await fetch("/mock/data/search_meme_result.json");
        const data = await res.json();
        buildMemesFeed(data.memes);
    }
    else
    {
        saveApiId.addEventListener("click",async ()=>{

            apiKey=document.getElementById("apikey").value;
            const url=`${baseUrl}${apiKey}`;
            try {
                const res = await fetch("/mock/data/search_meme_result.json");
                if(!res.ok){
                    const errorMsg = await res.json();
                    throw new Error(errorMsg.message);
                }else{
                    const data = await res.json();
                    apiElements.classList.add("hidden");
                    memeFeed.classList.remove("hidden");

                    localStorage.setItem('apiKey', apiKey);
                    buildMemesFeed(([...data.memes]));
                }
            } catch (error) {
                badRes.innerText=error;
                badRes.classList.remove("hidden");
                localStorage.setItem('errorMessage',error);
            }
        });
    }
}

let typingTimer;
searchMemes.addEventListener("input",(e)=>{

    searchIcon.classList.add("hidden");
    clearTimeout(typingTimer);
    typingTimer = setTimeout(()=>{
        if(e.target.value.length<1){
            searchIcon.classList.remove("hidden");
        }else if(e.target.value.length>1 && e.target.value.length<101){
            if(!apiKey){
                setApiId.click();
            }
            warningMsg.classList.add("hidden");
        }else if(e.target.value.length<2){
            warningMsg.innerText="at least 2 characters required";
            warningMsg.classList.remove("hidden");
        }else{
            warningMsg.innerText="at most 100 characters";
            warningMsg.classList.remove("hidden");
        }

    }, "500");
});

window.addEventListener("load",()=>{
    randerMemes();
});