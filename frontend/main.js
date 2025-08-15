const API_URL = 'http://localhost:3000/api/especies';

const form = document.getElementById('especieForm');
const list = document.getElementById('especiesList');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const especieIdInput = document.getElementById('especieId');

let editMode = false;

function fetchEspecies() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            list.innerHTML = '';
            data.forEach(especie => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${especie.nombre_cientifico}</strong> (${especie.nombre_comun}) - ${especie.tipo}<br>
                    Descripción: ${especie.descripcion || ''}<br>
                    Imagen: <a href="${especie.imagen_url || '#'}" target="_blank">${especie.imagen_url || ''}</a><br>
                    Alertas: ${especie.alertas || ''}<br>
                    Cuidados: ${especie.cuidados_basicos || ''}<br>
                    Peso/Clasificación: ${especie.peso_o_clasificacion || ''}<br>
                    Dieta/Altura: ${especie.dieta_o_altura || ''}<br>
                    Actividad/Floración: ${especie.nivel_actividad_o_floracion || ''}<br>
                    Socialización/Riego: ${especie.socializacion_o_exposicion_riego || ''}<br>
                    Precauciones: ${especie.precauciones || ''}
                `;
                // Botón eliminar
                const delBtn = document.createElement('button');
                delBtn.textContent = 'Eliminar';
                delBtn.onclick = () => deleteEspecie(especie.id);
                li.appendChild(delBtn);

                // Botón editar
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Editar';
                editBtn.onclick = () => startEdit(especie);
                li.appendChild(editBtn);

                list.appendChild(li);
            });
        });
}

form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (editMode && data.id) {
        // Actualizar especie
        fetch(`${API_URL}/${data.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(() => {
            resetForm();
            fetchEspecies();
        });
    } else {
        // Crear especie
        delete data.id; // No enviar id al crear
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(() => {
            form.reset();
            fetchEspecies();
        });
    }
};

function deleteEspecie(id) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => fetchEspecies());
}

function startEdit(especie) {
    editMode = true;
    submitBtn.textContent = 'Actualizar especie';
    cancelEditBtn.style.display = 'inline';

    // Rellenar el formulario con los datos
    Object.keys(especie).forEach(key => {
        if (form.elements[key]) {
            form.elements[key].value = especie[key] || '';
        }
    });
    especieIdInput.value = especie.id;
}

function resetForm() {
    editMode = false;
    submitBtn.textContent = 'Agregar especie';
    cancelEditBtn.style.display = 'none';
    form.reset();
    especieIdInput.value = '';
}

cancelEditBtn.onclick = resetForm;

fetchEspecies();