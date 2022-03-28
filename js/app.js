let input = document.getElementById("input");
let to = document.getElementById("to");
let from = document.getElementById("from");
let result = document.getElementById("result");
let historyList = document.getElementById("history-list");

function createOption(x,y,z) {
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.appendChild(t);
    o.setAttribute("value",toNum(z))
    x.appendChild(o);
}

function toNum(x) {
    return Number(x.replace(",", ""));
}

for (a in data.rates) {
    createOption(from, a, data.rates[a]);
    createOption(to, a, data.rates[a]);
    // console.log(a,data.rates[a]);
}

function createTr(x) {

    let rowSpacer = document.getElementById("rowSpacer");
    if(rowSpacer)
    {
        rowSpacer.remove();
    }

    let tr = document.createElement("tr");

    x.map(function (el) {
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    })
   
    historyList.appendChild(tr);
}

function store() {
    localStorage.setItem("record", historyList.innerHTML);
}

document.getElementById("calc").addEventListener("submit", function (e) {
    e.preventDefault();
    //get state
    
    let x = input.value;
    let y = from.value;
    let z = to.value;
    // console.log(x, y, z);
    
    //process
    let fromText = x+" "+from.options[from.selectedIndex].innerHTML;
    let toText = to.options[to.selectedIndex].innerHTML;
    let first = x * y;
    let second = first / z;
    let res = second.toFixed(2);
    let date = new Date().toLocaleString();
    let arr = [date, fromText, toText, res];
    // console.log(second.toFixed(2));
    createTr(arr);
    store();

    //set state
    result.innerHTML = second.toFixed(2);
    input.value = "";
    input.focus();
    from.value = "";
    to.value = "1";
});

(function () {
    if (localStorage.getItem("record"))
    {
        historyList.innerHTML = localStorage.getItem("record");
    } else {
        historyList.innerHTML = `<tr id="rowSpacer"><td colspan="4">There is no data!</td></tr>`;
    }
})();

function changeMode() {
    document.body.classList.toggle("night-mode");
    document.getElementById("changeIcon").classList.toggle("fa-sun");
}

