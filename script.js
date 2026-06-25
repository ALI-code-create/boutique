const products = [
    {id:1,name:'Chanel No. 5',category:'Perfumes',price:135,image:'https://images.pexels.com/photos/25440404/pexels-photo-25440404.jpeg?auto=compress&cs=tinysrgb&w=800',description:'The world\'s most iconic fragrance. A timeless floral-aldehyde composition with rose, jasmine, ylang-ylang, and sparkling aldehydes.',rating:4.8,inStock:true},
    {id:2,name:'Miss Dior Blooming Bouquet',category:'Perfumes',price:125,image:'https://images.pexels.com/photos/32630385/pexels-photo-32630385.jpeg?auto=compress&cs=tinysrgb&w=800',description:'A sophisticated floral fragrance capturing the essence of a blooming garden with peony, rose, and white musk.',rating:4.7,inStock:true},
    {id:3,name:'Chanel Coco Mademoiselle',category:'Perfumes',price:130,image:'https://images.pexels.com/photos/755992/pexels-photo-755992.jpeg?auto=compress&cs=tinysrgb&w=800',description:'A modern classic from Chanel. Vibrant orange and jasmine blend with patchouli and vetiver for a spirited elegance.',rating:4.6,inStock:true},
    {id:4,name:'Chanel Chance Eau Tendre',category:'Perfumes',price:120,image:'https://images.pexels.com/photos/11028230/pexels-photo-11028230.jpeg?auto=compress&cs=tinysrgb&w=800',description:'A delicate floral-fruity Chanel fragrance with grapefruit, jasmine, and white musk. Fresh and romantic.',rating:4.7,inStock:true},
    {id:5,name:'Chanel No. 5 L\'Eau',category:'Perfumes',price:138,image:'https://images.pexels.com/photos/21547042/pexels-photo-21547042.jpeg?auto=compress&cs=tinysrgb&w=800',description:'A fresh interpretation of the legendary Chanel No. 5 with citrus, aldehydes, and a luminous floral heart.',rating:4.9,inStock:true},
    {id:6,name:'Designer Fragrance Collection',category:'Perfumes',price:95,image:'https://images.pexels.com/photos/7703038/pexels-photo-7703038.jpeg?auto=compress&cs=tinysrgb&w=800',description:'A curated set of designer perfume bottles featuring Chanel, Jimmy Choo, and Estee Lauder. A treasure for collectors.',rating:4.5,inStock:true},
    {id:7,name:'Chanel Classic Flap Bag',category:'Handbags',price:3500,image:'https://images.pexels.com/photos/20591025/pexels-photo-20591025.jpeg?auto=compress&cs=tinysrgb&w=800',description:'The iconic quilted lambskin flap bag with gold chain strap and CC turn-lock closure. A timeless investment piece.',rating:4.9,inStock:true},
    {id:8,name:'Prada Galleria',category:'Handbags',price:2800,image:'https://images.pexels.com/photos/21357584/pexels-photo-21357584.jpeg?auto=compress&cs=tinysrgb&w=800',description:'The iconic Saffiano leather tote with dual top handles and removable shoulder strap. Distinctive Italian sophistication.',rating:4.7,inStock:true},
    {id:9,name:'Saint Laurent Loulou',category:'Handbags',price:2450,image:'https://images.pexels.com/photos/27835299/pexels-photo-27835299.jpeg?auto=compress&cs=tinysrgb&w=800',description:'A supple quilted leather shoulder bag with YSL monogram and chain strap. Effortless Parisian chic.',rating:4.6,inStock:true},
    {id:10,name:'Balenciaga Classic City',category:'Handbags',price:2250,image:'https://images.pexels.com/photos/12428373/pexels-photo-12428373.jpeg?auto=compress&cs=tinysrgb&w=800',description:'An edgy textured leather City bag with stud details and woven straps. Understated urban luxury.',rating:4.8,inStock:true},
    {id:11,name:'Prada Chain Wallet',category:'Handbags',price:1950,image:'https://images.pexels.com/photos/21263499/pexels-photo-21263499.jpeg?auto=compress&cs=tinysrgb&w=800',description:'A sleek silver leather chain wallet with Prada branding. Compact yet spacious for essentials.',rating:4.7,inStock:true},
    {id:12,name:'Designer Leather Handbag',category:'Handbags',price:2580,image:'https://images.pexels.com/photos/11980639/pexels-photo-11980639.jpeg?auto=compress&cs=tinysrgb&w=800',description:'A striking designer handbag in vibrant orange leather with gold hardware. A bold statement for any wardrobe.',rating:4.8,inStock:true}
];

function getCart(){try{return JSON.parse(localStorage.getItem('luxeCart'))||[]}catch{return[]}}
function saveCart(cart){localStorage.setItem('luxeCart',JSON.stringify(cart));updateCartCount()}
function addToCart(id,qty){const cart=getCart();const existing=cart.find(item=>item.id===id);if(existing){existing.qty+=qty}else{cart.push({id,qty})}saveCart(cart)}
function removeFromCart(id){let cart=getCart();cart=cart.filter(item=>item.id!==id);saveCart(cart);renderCart()}
function updateQuantity(id,qty){const cart=getCart();const item=cart.find(i=>i.id===id);if(item){if(qty<1){removeFromCart(id);return}item.qty=qty;saveCart(cart);renderCart()}}
function updateCartCount(){const el=document.getElementById('cart-count');if(el){const cart=getCart();const total=cart.reduce((sum,item)=>sum+item.qty,0);el.textContent=total}}
function getCartTotal(){const cart=getCart();return cart.reduce((sum,item)=>{const p=products.find(pr=>pr.id===item.id);return sum+(p?p.price*item.qty:0)},0)}

function renderProductCard(product){
    return `<div class="product-card${product.inStock?'':' out-of-stock'}" data-id="${product.id}">
        <div class="img-wrap" onclick="window.location='product.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.name}" loading="lazy" width="400" height="400" style="aspect-ratio:1/1;object-fit:cover;background-color:#f5ebe0">
            <span class="badge">${product.category}</span>
        </div>
        <div class="info">
            <h3>${product.name}</h3>
            <p class="category">${product.category}</p>
            <p class="rating">${'<i class=\"fas fa-star\"></i>'.repeat(Math.floor(product.rating))}${product.rating%1>=0.5?'<i class=\"fas fa-star-half-alt\"></i>':''} <span>(${product.rating})</span></p>
            <p class="price">$${product.price}${product.oldPrice?` <span class="original">$${product.oldPrice}</span>`:''}</p>
            ${product.inStock?`<button class="add-btn" onclick="event.stopPropagation();addToCart(${product.id},1)">Add to Bag</button>`:'<button class="add-btn" disabled>Out of Stock</button>'}
        </div>
    </div>`;
}

function renderProducts(productsToRender){
    const grid=document.querySelector('.products-grid');
    if(!grid)return;
    if(productsToRender.length===0){grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--gray)"><i class="fas fa-search" style="font-size:40px;display:block;margin-bottom:15px;color:var(--border)"></i><p style="font-size:18px">No products found.</p></div>';return}
    grid.innerHTML=productsToRender.map(renderProductCard).join('')
}

function renderCart(){
    const container=document.querySelector('.cart-items');
    const summary=document.querySelector('.cart-summary');
    const empty=document.querySelector('.cart-empty');
    const page=document.querySelector('.cart-page');
    if(!container)return;
    const cart=getCart();
    if(cart.length===0){
        if(empty)empty.style.display='block';
        if(container)container.style.display='none';
        if(summary)summary.style.display='none';
        if(page)page.style.minHeight='60vh';
        updateCartCount();
        return
    }
    if(empty)empty.style.display='none';
    if(container)container.style.display='flex';
    if(summary)summary.style.display='block';
    let html='';
    cart.forEach(item=>{
        const p=products.find(pr=>pr.id===item.id);
        if(!p)return;
        html+=`<div class="cart-item" data-id="${p.id}">
            <img src="${p.image}" alt="${p.name}" loading="lazy" width="200" height="200" style="aspect-ratio:1/1;object-fit:cover;background-color:#f5ebe0">
            <div class="item-info">
                <h3>${p.name}</h3>
                <p class="item-category">${p.category}</p>
                <p class="item-price">$${p.price}</p>
            </div>
            <div class="item-actions">
                <button class="qty-btn" onclick="updateQuantity(${p.id},${item.qty-1})"${item.qty<=1?' disabled':''}><i class="fas fa-minus"></i></button>
                <span class="item-qty">${item.qty}</span>
                <button class="qty-btn" onclick="updateQuantity(${p.id},${item.qty+1})"><i class="fas fa-plus"></i></button>
                <button class="remove-btn" onclick="removeFromCart(${p.id})" title="Remove"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>`;
    });
    container.innerHTML=html;
    if(summary){
        const subtotal=getCartTotal();
        summary.querySelector('.subtotal-amount').textContent=`$${subtotal}`;
        summary.querySelector('.total-amount').textContent=`$${subtotal}`;
        const waBtn=summary.querySelector('.btn-whatsapp');
        if(waBtn)waBtn.onclick=()=>sendCartWhatsApp();
    }
    updateCartCount()
}

function sendWhatsApp(productId,qty){
    const p=products.find(pr=>pr.id===productId);
    if(!p)return;
    const msg=`Hello! I would like to order:%0A%0A*${p.name}*%0APrice: $${p.price}%0AQuantity: ${qty||1}%0ATotal: $${(p.price*(qty||1)).toFixed(2)}%0A%0APlease provide payment and shipping details.`;
    window.open(`https://wa.me/212661803030?text=${msg}`,'_blank')
}

function sendCartWhatsApp(){
    const cart=getCart();
    if(cart.length===0)return;
    let msg='Hello! I would like to order:%0A%0A';
    cart.forEach((item,i)=>{
        const p=products.find(pr=>pr.id===item.id);
        if(p)msg+=`${i+1}. *${p.name}* - Qty: ${item.qty} - $${(p.price*item.qty).toFixed(2)}%0A`;
    });
    const total=getCartTotal();
    msg+=`%0A*Total: $${total.toFixed(2)}*%0A%0APlease provide payment and shipping details.`;
    window.open(`https://wa.me/212661803030?text=${msg}`,'_blank')
}

document.addEventListener('DOMContentLoaded',function(){
    updateCartCount();
    const hamburger=document.querySelector('.hamburger');
    if(hamburger){hamburger.addEventListener('click',function(){document.querySelector('nav').classList.toggle('open');const icon=hamburger.querySelector('i');icon.classList.toggle('fa-bars');icon.classList.toggle('fa-times')})}
    document.querySelectorAll('nav a').forEach(a=>{a.addEventListener('click',()=>document.querySelector('nav')?.classList.remove('open'))});
    if(document.querySelector('.hero')){
        let currentSlide=0;const slides=document.querySelectorAll('.hero-slide');const dots=document.querySelectorAll('.hero-dots span');
        if(slides.length){function showSlide(i){slides.forEach(s=>s.classList.remove('active'));dots.forEach(d=>d.classList.remove('active'));slides[i].classList.add('active');dots[i].classList.add('active')}setInterval(()=>{currentSlide=(currentSlide+1)%slides.length;showSlide(currentSlide)},5000);dots.forEach((d,i)=>{d.addEventListener('click',()=>{currentSlide=i;showSlide(currentSlide)})})}
    }
    if(document.querySelector('.products-grid')&&document.getElementById('shop-page')){
        const urlParams=new URLSearchParams(window.location.search);
        let currentFilter=urlParams.get('category')||'All';
        let currentSort='default';
        function filterAndSort(){let filtered=currentFilter==='All'?products:products.filter(p=>p.category===currentFilter);const sorted=[...filtered];if(currentSort==='price-asc')sorted.sort((a,b)=>a.price-b.price);else if(currentSort==='price-desc')sorted.sort((a,b)=>b.price-a.price);else if(currentSort==='name-asc')sorted.sort((a,b)=>a.name.localeCompare(b.name));else if(currentSort==='name-desc')sorted.sort((a,b)=>b.name.localeCompare(a.name));renderProducts(sorted)}
        document.querySelectorAll('.filter-btn').forEach(btn=>{btn.addEventListener('click',function(){document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');currentFilter=this.dataset.filter;filterAndSort()})});
        const sortSelect=document.querySelector('.sort-select');
        if(sortSelect){sortSelect.addEventListener('change',function(){currentSort=this.value;filterAndSort()})}
        const activeBtn=document.querySelector(`.filter-btn[data-filter="${currentFilter}"]`);
        if(activeBtn)activeBtn.classList.add('active');else document.querySelector('.filter-btn[data-filter="All"]')?.classList.add('active');
        filterAndSort()
    }
    if(document.getElementById('product-detail-page')){
        const params=new URLSearchParams(window.location.search);const id=parseInt(params.get('id'));const product=products.find(p=>p.id===id);
        if(product){document.title=`${product.name} - LuxeScent`;
            const img=document.querySelector('#product-image');if(img){img.src=product.image;img.alt=product.name}
            document.getElementById('product-category').textContent=product.category;
            document.getElementById('product-name').textContent=product.name;
            const stars='<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))+(product.rating%1>=0.5?'<i class="fas fa-star-half-alt"></i>':'');
            document.getElementById('product-rating').innerHTML=`${stars} <span>(${product.rating})</span>`;
            document.getElementById('product-price').textContent=`$${product.price}`;
            document.getElementById('product-description').textContent=product.description;
            const stockEl=document.getElementById('product-stock');
            if(product.inStock){stockEl.textContent='In Stock';stockEl.className='stock in-stock'}else{stockEl.textContent='Out of Stock';stockEl.className='stock out-of-stock'}
            const addBtn=document.getElementById('add-to-cart-btn');
            const waBtn=document.getElementById('whatsapp-order-btn');
            const qtyInput=document.getElementById('qty-input');
            if(addBtn){addBtn.onclick=function(){const q=parseInt(qtyInput.value)||1;addToCart(product.id,q);alert('Added to cart!')}}
            if(waBtn){waBtn.onclick=function(){const q=parseInt(qtyInput.value)||1;sendWhatsApp(product.id,q)}}
            const minusBtn=document.querySelector('.qty-minus');
            const plusBtn=document.querySelector('.qty-plus');
            if(minusBtn)minusBtn.onclick=()=>{let v=parseInt(qtyInput.value)||1;if(v>1)qtyInput.value=v-1};
            if(plusBtn)plusBtn.onclick=()=>{let v=parseInt(qtyInput.value)||1;qtyInput.value=v+1};
            const relatedContainer=document.getElementById('related-products');
            if(relatedContainer){const related=products.filter(p=>p.category===product.category&&p.id!==product.id).slice(0,4);relatedContainer.innerHTML=related.map(renderProductCard).join('')}
        }else{document.getElementById('product-detail-page').innerHTML='<div style="text-align:center;padding:100px 20px"><h2>Product not found</h2><a href="shop.html" class="btn btn-primary" style="margin-top:20px">Back to Shop</a></div>'}
    }
    if(document.getElementById('cart-page')){
        renderCart()
    }
    const revealElements=document.querySelectorAll('.reveal');
    if(revealElements.length){const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:0.15});revealElements.forEach(el=>observer.observe(el))}
    const backBtn=document.querySelector('.back-to-top');
    if(backBtn){window.addEventListener('scroll',function(){if(window.scrollY>400)backBtn.classList.add('show');else backBtn.classList.remove('show')});backBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}))}
});
