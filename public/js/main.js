const delBtn = document.querySelectorAll('.del')
const likeBtn = document.querySelectorAll('li .q')
const unlikeBtn = document.querySelectorAll('li .liked')

Array.from(delBtn).forEach((el)=> {
    el.addEventListener('click', delQuote)
})
Array.from(likeBtn).forEach((el)=>{
    el.addEventListener('click', lkQuote)
})
Array.from(unlikeBtn).forEach((el)=>{
    el.addEventListener('click', unlkQuote)
})

async function delQuote() {
    const quoteText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('delQuote', {
            method: 'delete', 
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'erasers': quoteText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function lkQuote() {
    const quoteText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('likeQuote', {
            method: "put",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'likers': quoteText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function unlkQuote() {
    const quoteText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('unlikeQuote', {
            method: "put",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'likers': quoteText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}