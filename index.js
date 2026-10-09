
// ============================================
// SAN ANTOJO - JAVASCRIPT
// Compatible con tu HTML
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    // ============================================
    // 1. ELEMENTOS DEL HTML
    // ============================================

    const encabezado = document.querySelector("#inicio");
    const portada = document.querySelector("#portada");
    const producto = document.querySelector("#producto");
    const nosotros = document.querySelector("#nosotros");
    const invitacion = document.querySelector("#invitacion");
    const contacto = document.querySelector("#contacto");
    const piePagina = document.querySelector("footer");

    const enlacesNavegacion = document.querySelectorAll(
        'header nav a[href^="#"]'
    );

    const enlacesProducto = document.querySelectorAll(
        '#portada a[href="#producto"], ' +
        '#producto a[href="#contacto"], ' +
        '#invitacion a[href="#contacto"]'
    );

    // ============================================
    // 2. NAVEGACIÓN ENTRE SECCIONES
    // ============================================

    const enlacesInternos = document.querySelectorAll('a[href^="#"]');

    enlacesInternos.forEach(function (enlace) {

        enlace.addEventListener("click", function (evento) {

            const idDestino = enlace.getAttribute("href");
            const destino = document.querySelector(idDestino);

            if (!destino) {
                return;
            }

            evento.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Actualizar la dirección sin recargar la página
            history.replaceState(null, "", idDestino);

        });

    });

    // ============================================
    // 3. MARCAR LA SECCIÓN ACTUAL EN EL MENÚ
    // ============================================

    function actualizarNavegacion() {

        const posicion = window.scrollY + 150;

        enlacesNavegacion.forEach(function (enlace) {

            enlace.classList.remove("activo");

            const destino = document.querySelector(
                enlace.getAttribute("href")
            );

            if (
                destino &&
                posicion >= destino.offsetTop &&
                posicion < destino.offsetTop + destino.offsetHeight
            ) {
                enlace.classList.add("activo");
            }

        });

    }

    window.addEventListener("scroll", actualizarNavegacion);
    actualizarNavegacion();

    // ============================================
    // 4. EFECTO DEL ENCABEZADO AL DESPLAZARSE
    // ============================================

    function controlarEncabezado() {

        if (!encabezado) {
            return;
        }

        if (window.scrollY > 50) {
            encabezado.classList.add("encabezado-scroll");
        } else {
            encabezado.classList.remove("encabezado-scroll");
        }

    }

    window.addEventListener("scroll", controlarEncabezado);
    controlarEncabezado();

    // ============================================
    // 5. ANIMAR LAS SECCIONES AL APARECER
    // ============================================

    const secciones = [
        portada,
        producto,
        nosotros,
        invitacion,
        contacto
    ].filter(Boolean);

    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver(
            function (entradas, observadorActual) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add("visible");

                        observadorActual.unobserve(entrada.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        secciones.forEach(function (seccion) {

            seccion.classList.add("animar");
            observador.observe(seccion);

        });

    } else {

        secciones.forEach(function (seccion) {
            seccion.classList.add("visible");
        });

    }

    // ============================================
    // 6. EFECTO EN LAS IMÁGENES DEL PRODUCTO
    // ============================================

    const imagenes = document.querySelectorAll(
        "#portada img, #producto img"
    );

    imagenes.forEach(function (imagen) {

        imagen.addEventListener("error", function () {

            console.warn(
                "No se pudo cargar la imagen:",
                imagen.getAttribute("src")
            );

        });

        imagen.addEventListener("load", function () {

            imagen.classList.add("imagen-cargada");

        });

        // Para imágenes que ya se encuentran cargadas
        if (imagen.complete && imagen.naturalWidth > 0) {
            imagen.classList.add("imagen-cargada");
        }

    });

    // ============================================
    // 7. ACTUALIZAR EL AÑO DEL PIE DE PÁGINA
    // ============================================

    if (piePagina) {

        const textoAnio = piePagina.querySelector("p:last-child");

        if (textoAnio) {

            textoAnio.textContent =
                new Date().getFullYear() +
                " San Antojo by Tower's and Tuki. San Antojo Grill";

        }

    }

    // ============================================
    // 8. MENSAJE DE CONFIRMACIÓN
    // ============================================

    console.log("San Antojo: JavaScript conectado correctamente.");

});
