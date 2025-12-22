const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

let isDrawing = false;
let startX, startY;
let currentTool = 'brush';
let snapshot;

function init() {
    canvas.width = 1200;
    canvas.height = 700;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

/* CARGAR IMAGEN */
document.getElementById('imageLoader').addEventListener('change', function(e){
    const reader = new FileReader();
    reader.onload = function(event){
        const img = new Image();
        img.onload = function(){
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width - img.width * scale)/2;
            const y = (canvas.height - img.height * scale)/2;
            ctx.drawImage(img, x, y, img.width*scale, img.height*scale);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

/* FILTROS */
function applyFilter(type){
    const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    const data = imageData.data;

    for(let i=0;i<data.length;i+=4){
        const r=data[i], g=data[i+1], b=data[i+2];

        if(type==='gray'){
            const avg=(r+g+b)/3;
            data[i]=data[i+1]=data[i+2]=avg;
        } else if(type==='invert'){
            data[i]=255-r; data[i+1]=255-g; data[i+2]=255-b;
        } else if(type==='sepia'){
            data[i]=(r*0.393)+(g*0.769)+(b*0.189);
            data[i+1]=(r*0.349)+(g*0.686)+(b*0.168);
            data[i+2]=(r*0.272)+(g*0.534)+(b*0.131);
        }
    }
    ctx.putImageData(imageData,0,0);
}

/* DIBUJO */
canvas.addEventListener('mousedown', e=>{
    isDrawing=true;
    startX=e.offsetX;
    startY=e.offsetY;
    snapshot = ctx.getImageData(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.strokeStyle=document.getElementById('colorPicker').value;
    ctx.lineWidth=document.getElementById('lineWidth').value;
    ctx.lineCap="round";
});

canvas.addEventListener('mousemove', e=>{
    if(!isDrawing) return;
    ctx.putImageData(snapshot,0,0);

    if(currentTool==='brush'){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);
    } else if(currentTool==='rectangle'){
        ctx.strokeRect(startX,startY,e.offsetX-startX,e.offsetY-startY);
    } else if(currentTool==='circle'){
        const radius=Math.sqrt(Math.pow(startX-e.offsetX,2)+Math.pow(startY-e.offsetY,2));
        ctx.beginPath();
        ctx.arc(startX,startY,radius,0,2*Math.PI);
        ctx.stroke();
    } else if(currentTool==='eraser'){
        ctx.strokeStyle="#fff";
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
        snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);
    }
});

window.addEventListener('mouseup', ()=>isDrawing=false);

/* HERRAMIENTAS */
document.querySelectorAll('.tool').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.tool.active').classList.remove('active');
        btn.classList.add('active');
        currentTool=btn.dataset.tool;
    });
});

/* FILTROS BOTONES */
document.getElementById('filterGray').addEventListener('click', ()=>applyFilter('gray'));
document.getElementById('filterInvert').addEventListener('click', ()=>applyFilter('invert'));
document.getElementById('filterSepia').addEventListener('click', ()=>applyFilter('sepia'));

/* GROSOR */
document.getElementById('lineWidth').addEventListener('input', e=>{
    document.getElementById('wLabel').innerText=e.target.value;
});

/* GUARDAR */
document.getElementById('downloadBtn').addEventListener('click', ()=>{
    const link=document.createElement('a');
    link.download="mi-diseno-pro.png";
    link.href=canvas.toDataURL("image/png");
    link.click();
});

window.onload=init;
