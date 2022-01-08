import { getFirestore ,query, onSnapshot, collection, getDocs} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';
const firestore = getFirestore();

async function getCartItems(){
    const snapshot = await onSnapshot(collection(firestore, 'cart-items'))

    const q = query(collection(firestore, 'cart-items'))
    const snap = onSnapshot(q, (querySnapshot)=>{
        let totalCount = 0;
        querySnapshot.forEach((doc)=>{
            totalCount += doc.data().quantity;
        })
        setCartCounter(totalCount)
    })
}
function setCartCounter(totalCount){
    document.querySelector('.total_item').innerText = totalCount
}
getCartItems();

