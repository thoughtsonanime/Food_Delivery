import { doc, deleteDoc, getFirestore, getDoc, updateDoc, query, onSnapshot, collection } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';
const firestore = getFirestore();
const loadingScreen= document.querySelector('.loading')


function getCartItems() {
    const q = query(collection(firestore, 'cart-items'))
    let cartItems = []
    const snap = onSnapshot(q, (querySnapshot) => {
        cartItems = []
        querySnapshot.forEach((doc) => {
            cartItems.push({
                id: doc.id,
                ...doc.data()
            })

        })
        generateCartItems(cartItems)
        getTotalCost(cartItems)
        loadingScreen.remove()
    })
    return () => { snap() }

}

function getTotalCost(items) {
    let totalCost = 0
    items.forEach((item) => {
        totalCost += (item.price * item.quantity)
    })
    document.querySelector('.total-cost-number').innerText = `Rs ${totalCost}`
}



async function decreaseCount(itemId){
    const q = query(collection(firestore, 'cart-items'))
    const refItems = doc(firestore, 'cart-items', itemId)
    const snapItems = await getDoc(refItems)
    const snap = onSnapshot(q, (querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            if (snapItems.exists()) {
                if (snapItems.data().quantity > 1) {
                     updateDoc(refItems, {
                        quantity: snapItems.data().quantity - 1
                    })
                }
            }
        })
    })
}
/*
async function decreaseCount(itemId) {
    const refItems = doc(firestore, 'cart-items', itemId)
    const snapItems = await getDoc(refItems)

    if (snapItems.exists()) {
        if (snapItems.data().quantity > 1) {
            await updateDoc(refItems, {
                quantity: snapItems.data().quantity - 1
            })
        }
    }
}*/

async function increaseCount(itemId) {
    const refItems = doc(firestore, 'cart-items', itemId)
    const snapItems = await getDoc(refItems)

    if (snapItems.exists()) {
        if (snapItems.data().quantity > 0) {
            await updateDoc(refItems, {
                quantity: snapItems.data().quantity + 1
            })
        }
    }
}

async function deleteItem(itemId) {
    await deleteDoc(doc(firestore, 'cart-items', itemId))
}

function generateCartItems(cartItems) {
    let itemsHTML = ''
    cartItems.forEach((item) => {
        itemsHTML += `
        <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="" height="90px" width="90px">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                </div>
                <div class="cart-item-counter">
                    <div data-id="${item.id}" class="chevron-left">
                        <i class="fas fa-chevron-left fa-xs"></i>
                    </div>

                    x${item.quantity}
                    <div data-id="${item.id}" class="chevron-right">
                        <i class="fas fa-chevron-right fa-xs"></i>
                    </div>


                </div>
                <div class="cart-item-total-cost">
                    <div class="cart-item-details">${item.price * item.quantity}</div>
                </div>
                <div data-id="${item.id}" class="cart-item-delete">
                    <div class="delete">
                        <i class="fas fa-times"></i>
                    </div>
                </div>

           
            </div>`
    })
    document.querySelector('.cart-item').innerHTML = itemsHTML
    createEventListeners()


}
function createEventListeners() {
    let decreaseButtons = document.querySelectorAll(".chevron-left")
    let increaseButtons = document.querySelectorAll(".chevron-right")
    let deleteButtons = document.querySelectorAll('.cart-item-delete')

    console.log(deleteButtons)

    decreaseButtons.forEach((button) => {
        button.addEventListener('click', function () {
            decreaseCount(button.dataset.id)
        })
    })

    increaseButtons.forEach((button) => {
        button.addEventListener('click', function () {
            increaseCount(button.dataset.id)
        })
    })

    deleteButtons.forEach((button) => {
        button.addEventListener('click', function () {
            deleteItem(button.dataset.id)
        })
    })
}

getCartItems()

const checkoutButton = document.getElementById('complete-order-btn')
checkoutButton.addEventListener('click', ()=>{
    console.log('Clicked')
})
