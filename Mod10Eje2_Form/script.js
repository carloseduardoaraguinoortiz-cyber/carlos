let currentStep = 1;
const totalSteps = 4;
const formData = {};

const form = document.getElementById("wizardForm");
const steps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const successModal = document.getElementById("successModal");
const phoneInput = document.getElementById("phone");

// Permitir solo números en teléfono
phoneInput.addEventListener("input", e=>{
    e.target.value = e.target.value.replace(/\D/g,"").slice(0,8);
});

/**
 * Mostrar paso
 */
function showStep(step){
    steps.forEach((s,i)=>s.classList.toggle("active", i+1===step));
    progressSteps.forEach((s,i)=>{
        s.classList.remove("active","completed");
        if(i+1===step) s.classList.add("active");
        if(i+1<step) s.classList.add("completed");
    });
    prevBtn.style.display = step===1?"none":"inline-block";
    nextBtn.style.display = step===totalSteps?"none":"inline-block";
    submitBtn.style.display = step===totalSteps?"inline-block":"none";
    if(step===totalSteps) showSummary();
}

/**
 * Validar paso
 */
function validateCurrentStep(){
    let valid = true;
    const current = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const inputs = current.querySelectorAll("input:not([type='checkbox']), select, textarea");

    inputs.forEach(input=>{
        const group = input.closest(".form-group");
        const error = group?.querySelector(".error-message");
        group?.classList.remove("error");
        if(error) error.textContent="";

        if(input.hasAttribute("required") && !input.value.trim()){
            if(error) error.textContent="Este campo es obligatorio";
            group.classList.add("error");
            valid=false;
        }

        if(input.type==="email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)){
            if(error) error.textContent="Correo inválido";
            group.classList.add("error");
            valid=false;
        }

        if(input.name==="phone" && input.value.length!==8){
            if(error) error.textContent="Teléfono inválido (8 dígitos)";
            group.classList.add("error");
            valid=false;
        }

        if(input.pattern && input.value && !new RegExp(input.pattern).test(input.value)){
            if(error) error.textContent="Formato incorrecto";
            group.classList.add("error");
            valid=false;
        }
    });

    // Intereses paso 3
    if(currentStep===3){
        const interests = current.querySelectorAll("input[name='interests']:checked");
        const group = current.querySelector(".checkbox-group").closest(".form-group");
        const error = group.querySelector(".error-message");
        if(interests.length===0){ error.textContent="Selecciona al menos una opción"; group.classList.add("error"); valid=false;}
    }

    // Términos paso 4
    if(currentStep===4){
        const terms = document.getElementById("terms");
        const group = terms.closest(".form-group");
        const error = group.querySelector(".error-message");
        if(!terms.checked){ error.textContent="Debes aceptar los términos"; group.classList.add("error"); valid=false;}
    }

    return valid;
}

/**
 * Guardar datos del paso
 */
function saveStepData(){
    const current = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const inputs = current.querySelectorAll("input, select, textarea");
    inputs.forEach(input=>{
        if(input.type==="checkbox" && input.name==="interests"){
            if(!formData.interests) formData.interests=[];
            if(input.checked && !formData.interests.includes(input.value)) formData.interests.push(input.value);
        } else if(input.type==="checkbox"){
            formData[input.name]=input.checked;
        } else if(input.value){
            formData[input.name]=input.value;
        }
    });
}

/**
 * Mostrar resumen final
 */
function showSummary(){
    document.getElementById("summaryPersonal").innerHTML=
        `<p><strong>Nombre:</strong> ${formData.firstName||""} ${formData.lastName||""}</p>
         <p><strong>Email:</strong> ${formData.email||""}</p>
         <p><strong>Teléfono:</strong> ${formData.phone||""}</p>`;

    document.getElementById("summaryAddress").innerHTML=
        `<p><strong>Dirección:</strong> ${formData.street||""}</p>
         <p><strong>Ciudad:</strong> ${formData.city||""}</p>
         <p><strong>CP:</strong> ${formData.zipCode||""}</p>
         <p><strong>País:</strong> ${formData.country||""}</p>`;

    document.getElementById("summaryPreferences").innerHTML=
        `<p><strong>Intereses:</strong> ${(formData.interests||[]).join(", ")||"Ninguno"}</p>
         <p><strong>Newsletter:</strong> ${formData.newsletter?"Sí":"No"}</p>
         ${formData.comments?`<p><strong>Comentarios:</strong> ${formData.comments}</p>`:""}`;
}

// Botones
nextBtn.addEventListener("click", ()=>{
    if(validateCurrentStep()){ saveStepData(); currentStep++; showStep(currentStep);}
});
prevBtn.addEventListener("click", ()=>{ currentStep--; showStep(currentStep); });
form.addEventListener("submit", e=>{
    e.preventDefault();
    if(validateCurrentStep()){ saveStepData(); successModal.classList.add("active"); }
});

// Inicializar
showStep(currentStep);
