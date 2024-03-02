const cardContainer=getId('cardContainer')

let isSeeMore=false
function SeeMore(){
    isSeeMore=true;
    Api(isSeeMore)
}

let sorted=false
function Sort(){
    sorted=true;
    Api(true,sorted)
}


const Api=(isSeeMore,sorted)=>{
    // console.log(sorted)
    const url='https://openapi.programming-hero.com/api/ai/tools'
fetch(url).then(res=>res.json())
.then(data=>{
// console.log(data)

if(sorted){

    for(let i=0; i<data.data.tools.length;i++){
        // console.log(data.data.tools[i]?.published_in)
data.data.tools.sort((a,b)=>{
    const first=a.published_in
    const second=b.published_in
    const firstLastData=first.slice(first.length-4,first.length)
    const secondLastData=second.slice(second.length-4,second.length)
    const firstNumber=parseInt(firstLastData)
    const secondNumber=parseInt(secondLastData)
    return secondNumber - firstNumber
})

    }
}




let Data=data.data.tools
if(!isSeeMore){
    Data=Data.slice(0,6)
}else{
    Data=Data
    getId('seeMore').classList.add('hidden')
}

cardContainer.innerHTML=''
    Data.forEach(U => {
        // console.log(U)
        // create card
        const UniversalCard=document.createElement('div')
        UniversalCard.classList='card card-compact  bg-base-100 shadow-xl py-3'
        UniversalCard.innerHTML=`
        <figure><img src="${U?.image}" alt="not available" /></figure>
        <div class="card-body border-b-2 ">
          <h2 class="card-title">${U.name}</h2>
          <ol class="list-decimal pl-3 *:font-semibold">
            <li>${U?.features[0]}</li>
            <li>${U?.features[1]}</li>
            <li>${U?.features[2]}</li>
          </ol>
        </div>

<div class="flex items-center justify-between px-3">
    <h1 class="text-xl font-bold">ChatGPT</h1>
    <img src="a.png" alt="" onclick="modal('${U?.description||'InforMation not available '}','${U.name}')">
</div>
<div class='px-3'>
<p>Data: <span class='date'>${U.published_in}</span>
</div>
        `
cardContainer.appendChild(UniversalCard)}); 
})
}
Api(isSeeMore,sorted)




    function modal(description,name){
    D.showModal()
const Details=getId("D")
Details.innerHTML=`
<div class="modal-box">
    <h3 class="font-bold text-lg">${name}</h3>
    <p class="py-4">${description}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
`


}