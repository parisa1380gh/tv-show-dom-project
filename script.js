let da;
const getdata = async() => {
    let url = ("https://api.tvmaze.com/shows/82/episodes");
    const response = await axios.get(url);
    da = await response.data.map((x) => x);
    return response.data;
};

getdata()
    .then((data) => {
        optionss(data);
        cards(data);
    })
    .catch((err) => {
        console.log("rejected", err);
    });


const select = document.querySelector("#selector");


const serach = document.querySelector(".search");

const container = document.querySelector(".container");




const optionss = (episodesList) => {
    const option = document.createElement("option");
    option.append(`All Episods`);
    select.append(option);
    episodesList.forEach((episod) => {
        const option = document.createElement("option");
        option.value = episod.name;
        option.append(`S0${episod.season}E0${episod.number} - ${episod.name}`);
        select.append(option);
    });
};

const cards = (data) => {
    data.forEach((episod) => {
        card(episod);
    });
};

const card = (episod) => {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const span = document.createElement("span");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const a = document.createElement("a");
    h3.append(episod.name);

    span.append(
        `S${episod.season}E${episod.number}`
    );
    p.innerHTML = episod.summary;
    a.innerText = "See More";
    a.href = episod.url;
    img.src = episod.image.medium;
    img.alt = span.innerText;
    img.style.borderRadius = "5px";
    div.append(img, h3, span, p, a);

    container.append(div);
};



select.addEventListener("change", function(e) {
    if (e.target.value === "All Episods") {
        container.innerHTML = "";
        cards(da);
    } else {
        container.innerHTML = "";

        card(da[e.target.selectedIndex - 1]);
    }
});


serach.addEventListener("input", async(e) => {
    container.innerHTML = "";
    da.forEach((ele) => {
        if (ele.name.toLowerCase().includes(e.target.value.toLowerCase())) {
            card(ele);
        }
    });
});