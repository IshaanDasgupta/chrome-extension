const linkValueEle = document.getElementById("link")
const saveButtonEle = document.getElementById("save-button")
const ulEle = document.getElementById("link-list")
const deleteButtonEle = document.getElementById("delete-button")
const saveTabButtonEle = document.getElementById("save-tab-button")


let listOfLinks = []
if (localStorage.getItem("myLinks")){
    listOfLinks = JSON.parse(localStorage.getItem("myLinks"))
    renderLinks()
}


saveButtonEle.addEventListener("click", function(){
    listOfLinks.push(linkValueEle.value)
    linkValueEle.value = ""
    renderLinks()

})

deleteButtonEle.addEventListener("dblclick" , function(){
    localStorage.clear()
    listOfLinks = []
    localStorage.setItem("myLinks" , JSON.stringify([]))
    renderLinks()
})

saveTabButtonEle.addEventListener("click" , function(){ 
    chrome.tabs.query({active: true, currentWindow: true} , function(tabs){
        listOfLinks.push(tabs[0].url)
        localStorage.setItem("myLinks" , JSON.stringify(listOfLinks))
        renderLinks()
    })
})


function renderLinks(){
    let temp = ""
    for (let i = 0 ; i<listOfLinks.length ; i++){
        temp += `<li><a target="_blank" href="${listOfLinks[i]}">${listOfLinks[i]}</a></li>`
    }
    localStorage.setItem("myLinks" , JSON.stringify(listOfLinks))
    ulEle.innerHTML = temp
}