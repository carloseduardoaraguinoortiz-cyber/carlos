// Todas las imágenes (Autos + anteriores)
const images = [
    // Autos deportivos
    { id: 1, url:'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=1170', title:'Lamborghini Aventador', category:'autos', year:'2023', description:'Superdeportivo con motor V12, velocidad máxima de 350 km/h.' },
    { id: 2, url:'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=1332', title:'Ferrari F8 Tributo', category:'autos', year:'2022', description:'Elegante diseño italiano y motor V8 turboalimentado.' },
    { id: 3, url:'https://images.unsplash.com/photo-1659611807210-917ac61ff451?q=80&w=1169', title:'Porsche 911 Turbo', category:'autos', year:'2023', description:'Clásico deportivo alemán, motor bóxer turbo, gran rendimiento.' },
    { id: 4, url:'https://images.unsplash.com/photo-1689596323441-94fe62ac5f0c?q=80&w=1170', title:'McLaren 720S', category:'autos', year:'2021', description:'Deportivo británico con motor V8 biturbo y diseño aerodinámico.' },
    { id: 5, url:'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1169', title:'Audi R8', category:'autos', year:'2022', description:'Motor V10 y tracción quattro para máxima precisión.' },
    { id: 6, url:'https://images.unsplash.com/photo-1630037937485-e2da57394d88?q=80&w=1170', title:'BMW M8', category:'autos', year:'2023', description:'Deportivo de lujo alemán con tecnología de punta y motor V8.' },
    { id: 7, url:'https://images.unsplash.com/photo-1752686450387-8ffb452288de?q=80&w=1170', title:'Chevrolet Corvette C8', category:'autos', year:'2023', description:'Motor central V8, primer Corvette de motor central en la historia.' },
    { id: 8, url:'https://images.unsplash.com/photo-1550913424-9fc8df9a7be8?q=80&w=1205', title:'Nissan GT-R', category:'autos', year:'2021', description:'Ícono japonés con tracción integral y alto rendimiento.' },
    // Imágenes anteriores
    { id: 9, url:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500', title:'Montañas al Amanecer', category:'naturaleza', description:'Hermoso paisaje montañoso al amanecer' },
    { id:10, url:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500', title:'Ciudad Moderna', category:'ciudad', description:'Rascacielos en una gran ciudad' },
    { id:11, url:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500', title:'Tecnología Digital', category:'tecnologia', description:'Circuitos y tecnología moderna' },
    { id:12, url:'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500', title:'Retrato Profesional', category:'personas', description:'Fotografía de retrato profesional' },
    { id:13, url:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500', title:'Bosque Mágico', category:'naturaleza', description:'Sendero en un bosque encantado' },
    { id:14, url:'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500', title:'Skyline Nocturno', category:'ciudad', description:'Ciudad iluminada de noche' },
    { id:15, url:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500', title:'Gadgets Modernos', category:'tecnologia', description:'Dispositivos tecnológicos' },
    { id:16, url:'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500', title:'Equipo de Trabajo', category:'personas', description:'Grupo de personas trabajando' }
];

let currentFilter = 'all';
let currentView = 'grid';
let currentLightboxIndex = 0;
let filteredImages = [...images];

const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const viewBtns = document.querySelectorAll('.view-btn');
const imageCount = document.getElementById('imageCount');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');

// Renderizar galería
function renderGallery(imagesToRender = images){
    gallery.innerHTML = '';
    imagesToRender.forEach((image,index)=>{
        const item=document.createElement('div');
        item.className='gallery-item';
        item.dataset.id=image.id;
        item.dataset.index=index;
        item.dataset.category=image.category;
        item.innerHTML=`
            <img src="${image.url}" alt="${image.title}" loading="lazy">
            <div class="gallery-info">
                <span class="gallery-category">${image.category}</span>
                <h3>${image.title}</h3>
                <p class="gallery-description">${image.description}</p>
            </div>`;
        item.addEventListener('click',()=>openLightbox(index));
        gallery.appendChild(item);
    });
    imageCount.textContent=imagesToRender.length;
}

// Filtrado por categoría
function filterByCategory(category){
    currentFilter=category;
    applyFilters(searchInput.value);
}

// Buscar imágenes en tiempo real
function searchImages(query){
    applyFilters(query);
}

// Aplicar filtros
function applyFilters(searchQuery=''){
    filteredImages = images.filter(image=>{
        const matchesCategory = 
            currentFilter==='all' ||
            (currentFilter==='autos' && image.category==='autos') ||
            image.category===currentFilter;

        const matchesSearch = 
            searchQuery==='' ||
            image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            image.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });
    renderGallery(filteredImages);
}

// Cambiar vista
function changeView(view){
    currentView=view;
    if(view==='list') gallery.classList.add('list-view');
    else gallery.classList.remove('list-view');
}

// Lightbox
function openLightbox(index){
    currentLightboxIndex=index;
    updateLightbox();
    lightbox.classList.add('active');
}

function closeLightbox(){ lightbox.classList.remove('active'); }

function updateLightbox(){
    const image=filteredImages[currentLightboxIndex];
    lightboxImg.src=image.url;
    lightboxTitle.textContent=image.title;
    lightboxCategory.textContent=image.category;
}

function nextImage(){
    currentLightboxIndex=(currentLightboxIndex+1)%filteredImages.length;
    updateLightbox();
}

function prevImage(){
    currentLightboxIndex=(currentLightboxIndex-1+filteredImages.length)%filteredImages.length;
    updateLightbox();
}

// Event listeners
searchInput.addEventListener('input',(e)=>searchImages(e.target.value));

filterBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
        filterBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        filterByCategory(btn.dataset.filter);
    });
});

viewBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
        viewBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        changeView(btn.dataset.view);
    });
});

document.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
document.querySelector('.lightbox-next').addEventListener('click',nextImage);
document.querySelector('.lightbox-prev').addEventListener('click',prevImage);

lightbox.addEventListener('click',(e)=>{ if(e.target===lightbox) closeLightbox(); });

document.addEventListener('keydown',(e)=>{
    if(!lightbox.classList.contains('active')) return;
    if(e.key==='Escape') closeLightbox();
    if(e.key==='ArrowRight') nextImage();
    if(e.key==='ArrowLeft') prevImage();
});

// Inicializar galería
renderGallery();
