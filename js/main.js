// Función para registrar un alumno
function registrarAlumno() {
    const nombre = document.getElementById("nombre").value;
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);

    if (nombre && !isNaN(nota1) && !isNaN(nota2)) {
        const alumno = {
            nombre: nombre,
            nota1: nota1,
            nota2: nota2
        };

        // Almacenar el alumno en el almacenamiento local (localStorage)
        let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
        alumnos.push(alumno);
        localStorage.setItem("alumnos", JSON.stringify(alumnos));

        // Limpiar el formulario
        document.getElementById("studentForm").reset();

        // Actualizar la lista de alumnos y calcular el promedio
        mostrarAlumnos();
        calcularPromedio();
    } else {
        alert("Por favor, ingrese un nombre y notas válidas.");
    }
}

// Función para mostrar la lista de alumnos
function mostrarAlumnos(alumnosList = []) {
    const alumnosListContainer = document.getElementById("alumnos");
    alumnosListContainer.innerHTML = "";

    const alumnosToShow = alumnosList.length ? alumnosList : JSON.parse(localStorage.getItem("alumnos")) || [];

    alumnosToShow.forEach(alumno => {
        const listItem = document.createElement("li");
        listItem.textContent = `${alumno.nombre} - Nota 1: ${alumno.nota1}, Nota 2: ${alumno.nota2}`;
        alumnosListContainer.appendChild(listItem);
    });
}

// Función para calcular y mostrar el promedio de notas
function calcularPromedio() {
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

    if (alumnos.length > 0) {
        const totalNotas = alumnos.reduce((total, alumno) => total + (alumno.nota1 + alumno.nota2), 0);
        const promedio = totalNotas / (alumnos.length * 2);
        document.getElementById("promedio").textContent = `Promedio de Notas: ${promedio.toFixed(2)}`;
    } else {
        document.getElementById("promedio").textContent = "No hay alumnos registrados aún.";
    }
}

// Función para filtrar notas por campo
function filtrarPorNota() {
    const filtroNota = document.getElementById("filtroNota").value;
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    const alumnosFiltrados = alumnos.filter(alumno => {
        if (filtroNota === "nota1") {
            return alumno.nota1 >= 6; // Aquí puedes cambiar la lógica de filtrado según tu criterio
        } else if (filtroNota === "nota2") {
            return alumno.nota2 >= 6; // Aquí también puedes cambiar la lógica
        } else {
            return alumno.nota1 >= 6 && alumno.nota2 >= 6; // Filtrar por ambas notas
        }
    });

    mostrarAlumnos(alumnosFiltrados);
}

// Función para buscar alumnos por nombre
function buscarAlumno() {
    const nombreBusqueda = document.getElementById("nombreBusqueda").value.toLowerCase();
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    const alumnosFiltrados = alumnos.filter(alumno => alumno.nombre.toLowerCase().includes(nombreBusqueda));

    mostrarAlumnos(alumnosFiltrados);
}

// Mostrar la lista de alumnos y el promedio al cargar la página
mostrarAlumnos();
calcularPromedio()