import { getFirestore,updateDoc, setDoc,getDoc, getDocs, doc, addDoc, collection } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyAYLlsdT9tkpu-H3wb60URjLn43v-yAiP0",
            authDomain: "food-order-8c070.firebaseapp.com",
            projectId: "food-order-8c070",
            storageBucket: "food-order-8c070.appspot.com",
            messagingSenderId: "191491800034",
            appId: "1:191491800034:web:5af2d0afd7d8cf054a57bb"
        };
        const firebase = "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
        const app = initializeApp(firebaseConfig);
const firestore = getFirestore();
        var food = collection(firestore, 'food-items')
        /*async function addNewItem() {
            const newDoc = await addDoc(food, {
                image: 'http://127.0.0.1:5500/product-2.jpg',
                name: 'Cocktails',
                rating: 5,
                price: 249
            })
        }*/
        //addNewItem();
        async function getItems(){
        const querySnapshot = await getDocs(collection(firestore, "items"));
       console.log('get items')
            let items =[];
            querySnapshot.forEach((doc) => {
            items.push({
                        id: doc.id,
                        image: doc.data().image,
                        name: doc.data().name,
                        rating: doc.data().rating,
                        price: doc.data().price,
                        quantity: doc.data().quantity
                    })
                    
                   
        });
        generateItems(items)
    }
        
         async  function addToCart(item){
             console.log(item)
            const cartItems = collection(firestore, 'cart-items')
            const refItems = doc(firestore, 'cart-items', item.id)
            const snapItems = await getDoc(refItems)
            
                if (snapItems.exists()) {
                   console.log('hi')
                    await updateDoc (refItems, {
                        
                        quantity: snapItems.data().quantity+1,
                        
                    })
                } else {
                    setDoc(doc(cartItems, item.id), {
                        image: item.image,
                        name: item.name,
                        rating: item.rating,
                        price: item.price,
                        quantity: 1
                    });
                }
           
            
          
        
        }

        function generateItems(items){
            let itemsHTML ="";
            items.forEach((item)=>{
                let doc = document.createElement('div')
                doc.classList.add('box1')
                doc.innerHTML = ` <img src="${item.image}" alt="">
                <h3>${item.name} </h3>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    ${item.rating}
                </div>
                <div class="price">Rs${item.price}</div>
                
                `
                let addToCartEl = document.createElement('div')
                addToCartEl.classList.add('order-btn')

                addToCartEl.innerText = 'add to cart'
                addToCartEl.addEventListener('click',function(){
                    addToCart(item)
                })
                doc.appendChild(addToCartEl)
                document.querySelector('.box-container').appendChild(doc)
            })
            
        }
         
        getItems()
console.log('Hello')

$(document).ready(function(){

    $('#menu-bar').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('load scroll',function(){

        $('#menu-bar').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        $('section').each(function(){

            let top = $(window).scrollTop();
            let height = $(this).height();
            let id = $(this).attr('id');
            let offset = $(this).offset().top - 200;

            if(top > offset && top < offset + height){
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }

        });

    });

    $('.list .btn').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        let src = $(this).attr('data-src');
        $('.menu .row .image img').attr('src',src);
    });

});
document.getElementById('account').addEventListener('click', function(){
    document.querySelector('.popupAc').style.display='flex';
})
document.querySelector('.close2').addEventListener('click', function(){
    document.querySelector('.popupAc').style.display='none';
})

/**
 * for login popup
 */




document.getElementById('login').addEventListener('click', function(){
    document.querySelector('.popup').style.display='flex';
    
})
document.querySelector('.close').addEventListener('click', function(){
    document.querySelector('.popup').style.display='none';
})

/**
 * Sign up popup
 *
 */
document.getElementById('signup').addEventListener('click', function(){
    document.querySelector('.popup1').style.display='flex';
})
document.querySelector('.close1').addEventListener('click', function(){
    document.querySelector('.popup1').style.display='none'
})



