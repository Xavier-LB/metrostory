<script lang="ts">
	/**
	 * Historia del Logo del Metro de Santiago
	 * Estilo narrativo editorial con espacios generosos
	 */
	import { onMount } from 'svelte';

	let isVisible = $state(false);

	onMount(() => {
		isVisible = true;
	});
</script>

<svelte:head>
	<title>Historia del Logo del Metro de Santiago | MetroStory</title>
	<meta
		name="description"
		content="Los icónicos tres rombos rojos del Metro de Santiago fueron diseñados por Peter Himmel y Jaime Escudero a fines de los años 60. Conoce su historia y significado."
	/>

	<!-- Open Graph / Facebook / WhatsApp -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content="Los Tres Rombos: Historia del Logo del Metro de Santiago" />
	<meta
		property="og:description"
		content="Descubre la fascinante historia detrás de los icónicos tres rombos rojos que llevan más de 55 años representando al Metro de Santiago."
	/>
	<meta property="og:image" content="https://metrostory.cl/images/logo/metro-logo-preview.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:url" content="https://metrostory.cl/logo" />
	<meta property="og:site_name" content="MetroStory" />
	<meta property="og:locale" content="es_CL" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Los Tres Rombos: Historia del Logo del Metro de Santiago" />
	<meta
		name="twitter:description"
		content="Descubre la fascinante historia detrás de los icónicos tres rombos rojos que llevan más de 55 años representando al Metro de Santiago."
	/>
	<meta name="twitter:image" content="https://metrostory.cl/images/logo/metro-logo-preview.jpg" />

	<!-- Additional metadata -->
	<meta property="article:published_time" content="2026-01-28" />
	<meta property="article:author" content="MetroStory" />
	<meta property="article:section" content="Historia" />
	<meta property="article:tag" content="Metro de Santiago" />
	<meta property="article:tag" content="Logo" />
	<meta property="article:tag" content="Diseño gráfico" />
	<meta property="article:tag" content="Historia de Chile" />

	<style>
		@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
	</style>
</svelte:head>

<div class="story-page" class:visible={isVisible}>
	<!-- Header -->
	<header class="page-header">
		<nav class="nav">
			<a href="/" class="nav-back">&larr; Volver al mapa</a>
			<span class="nav-title">Historia del Logo</span>
			<span class="nav-badge">50 años</span>
		</nav>
	</header>

	<!-- Hero -->
	<section class="hero">
		<p class="hero-overline">Metro de Santiago · 1969–2025</p>
		<h1 class="hero-title">
			Los Tres <em>Rombos</em>
		</h1>
		<div class="hero-logo">
			<svg viewBox="0 0 200 80">
				<g transform="translate(100, 40)">
					<path d="M -55 0 L -35 -20 L -15 0 L -35 20 Z" fill="#d60d27" />
					<path d="M -20 0 L 0 -20 L 20 0 L 0 20 Z" fill="#d60d27" />
					<path d="M 15 0 L 35 -20 L 55 0 L 35 20 Z" fill="#d60d27" />
				</g>
			</svg>
		</div>
		<p class="hero-intro">
			Los icónicos tres rombos rojos del Metro de Santiago fueron diseñados a fines de los años 60
			por los arquitectos <strong>Peter Himmel</strong> y <strong>Jaime Escudero Sanhueza</strong>,
			representando un concepto visionario: la interconexión entre vialidad, buses y transporte
			subterráneo como sistema integral de movilidad urbana.
		</p>
	</section>

	<!-- Narrative: The Beginning -->
	<article class="chapter">
		<span class="chapter-number">I</span>
		<h2>El origen de un símbolo</h2>

		<p class="lead">
			El diseño surgió en un momento clave para el diseño urbano mundial. Mientras este símbolo
			nacía en Chile, en Nueva York <strong>Massimo Vignelli</strong> trabajaba en la unificación
			de la señalización del Metro.
		</p>

		<p>
			Era un período fundamental para el diseño moderno, y Metro de Santiago formó parte de ese
			espíritu. No hubo un concurso específico para el diseño del logo. El símbolo fue creado por
			Himmel y Escudero como parte de su trabajo en el proyecto Metro, bajo la dirección de
			<strong>Juan Parrochia Beguin</strong>, quien había recorrido las redes de metro de
			<strong>50 países</strong> para diseñar el sistema chileno.
		</p>
	</article>

	<!-- Narrative: The Meaning -->
	<article class="chapter">
		<span class="chapter-number">II</span>
		<h2>El significado de los tres rombos</h2>

		<p class="lead">
			Los tres rombos conectados simbolizan que la solución para el transporte metropolitano
			de Santiago se pensó en forma sistémica: un todo compuesto de tres grandes partes
			integradas e interconectadas.
		</p>

		<div class="meaning-visual">
			<div class="meaning-item">
				<div class="rombo" style="background: #4a4845;"></div>
				<h3>Vialidad</h3>
				<p>La superficie vial urbana que estructura la ciudad</p>
			</div>
			<div class="meaning-connector">◆</div>
			<div class="meaning-item">
				<div class="rombo" style="background: #fab515;"></div>
				<h3>Buses</h3>
				<p>La circulación sobre la superficie</p>
			</div>
			<div class="meaning-connector">◆</div>
			<div class="meaning-item">
				<div class="rombo" style="background: #d60d27;"></div>
				<h3>Metro</h3>
				<p>La circulación subterránea</p>
			</div>
		</div>

		<p>
			Esta visión refleja la filosofía de Juan Parrochia de concebir el Metro no como un
			elemento aislado, sino como parte de un sistema integrado. La declaración oficial de
			Metro explica: <em>"La idea era mostrar cómo todo está conectado"</em>.
		</p>
	</article>

	<!-- Narrative: The Creators -->
	<article class="chapter">
		<span class="chapter-number">III</span>
		<h2>Los creadores</h2>

		<p class="lead">
			Tres figuras clave dieron vida al símbolo más reconocido de Santiago: dos arquitectos
			diseñadores y un visionario urbanista que dirigió el proyecto.
		</p>

		<div class="creator-profiles">
			<div class="creator">
				<span class="creator-label">Arquitecto</span>
				<h3>Peter Himmel</h3>
				<p>
					Ingresó al proyecto mediante concurso público en una oficina de planificación
					del Ministerio de Obras Públicas. Trabajó <strong>22 años</strong> en Metro de
					Santiago y participó directamente en el inicio de las obras el
					<strong>29 de mayo de 1969</strong>.
				</p>
				<div class="highlight-box small">
					<p>
						"Nosotros sabíamos que estábamos haciendo algo que iba a ser querido.
						Nos esmerábamos por eso. Era lo único que nos atraía."
					</p>
					<cite>La Tercera, mayo 2022</cite>
				</div>
			</div>

			<div class="creator featured">
				<span class="creator-label">Arquitecto, Ilustrador y Animador</span>
				<h3>Jaime Escudero Sanhueza</h3>
				<span class="creator-dates">Santiago, 1914 – c. 2005</span>
				<p>
					Una figura extraordinariamente versátil en la cultura chilena del siglo XX.
					Estudió en el Instituto Nacional y arquitectura en la Pontificia Universidad
					Católica de Chile. Su talento artístico lo llevó a destacar en múltiples campos.
				</p>
				<div class="creator-achievements">
					<div class="achievement">
						<span class="achievement-icon">🎬</span>
						<span>Creador del <strong>primer largometraje de animación chileno</strong>:
						"15.000 dibujos" (1942)</span>
					</div>
					<div class="achievement">
						<span class="achievement-icon">✏️</span>
						<span>Ilustrador de revistas emblemáticas <strong>El Peneca</strong> y
						<strong>El Cabrito</strong></span>
					</div>
					<div class="achievement">
						<span class="achievement-icon">🚇</span>
						<span>Diseñador de los <strong>logotipos de las estaciones</strong> y
						afiches promocionales del Metro</span>
					</div>
					<div class="achievement">
						<span class="achievement-icon">🎨</span>
						<span>Pintor e investigador del Apocalipsis bíblico</span>
					</div>
				</div>
				<p class="creator-note">
					Jubiló del Metro en 1980. En una entrevista de 2004, a los 90 años, reveló
					la existencia de "Los Tres Pastores" y donó un ejemplar al Museo de la Historieta.
				</p>
				<div class="highlight-box small">
					<p>
						"Fui el diseñador de los logos de las estaciones y de los afiches promocionales.
						Fui el gran divulgador de las obras públicas del país."
					</p>
					<cite>Museo de la Historieta, 2004</cite>
				</div>
			</div>

			<div class="creator featured">
				<span class="creator-label">Arquitecto y Urbanista — Director del Proyecto</span>
				<h3>Juan Parrochia Beguin</h3>
				<span class="creator-dates">Traiguén, 1930 – Santiago, 2016</span>
				<p>
					El ideólogo, gestor y primer director del Metro de Santiago. Se tituló de
					Arquitecto en la Universidad de Chile (1953) y de Urbanista en la Universidad
					de San Lucas, Bélgica (1955). <strong>A los 27 años ya había viajado en los
					metros de 50 países</strong> para diseñar el sistema chileno.
				</p>
				<p>
					Su visión sistémica del transporte —representada en los tres rombos— revolucionó
					la planificación urbana en Chile. Concebía el Metro no como un elemento aislado,
					sino como parte de un sistema integrado de movilidad.
				</p>
				<div class="awards-grid">
					<div class="award">
						<span class="award-year">1996</span>
						<span class="award-name">Premio Nacional de Urbanismo</span>
						<span class="award-note">Primero en recibirlo</span>
					</div>
					<div class="award">
						<span class="award-year">1974</span>
						<span class="award-name">Medalla Metro de São Paulo</span>
					</div>
					<div class="award">
						<span class="award-year">1975</span>
						<span class="award-name">Medalla Metro de París</span>
					</div>
					<div class="award">
						<span class="award-year">1979</span>
						<span class="award-name">Premio Bienal de Arquitectura</span>
					</div>
				</div>
			</div>
		</div>
	</article>

	<!-- Narrative: The Context -->
	<article class="chapter">
		<span class="chapter-number">IV</span>
		<h2>El espíritu del diseño moderno</h2>

		<p class="lead">
			La elección de la tipografía Helvetica responde a la filosofía del diseño moderno
			de los años 60.
		</p>

		<div class="context-grid">
			<div class="context-block">
				<span class="context-label">Tipografía</span>
				<h3>Helvetica</h3>
				<p>
					En esa época era el estándar internacional del diseño moderno. Creada en Suiza
					en 1957, la tipografía buscaba transmitir neutralidad, claridad y funcionalidad.
					<em>No tiene adornos, no tiene personalidad extrema. Justamente para que nada
					distraiga del mensaje.</em>
				</p>
			</div>

			<div class="context-block">
				<span class="context-label">Chile</span>
				<h3>Los años 60</h3>
				<p>
					El diseño del logo coincidió con la profesionalización del diseño gráfico en Chile.
					Las primeras escuelas de Diseño se fundaron hacia 1967, y el diseñador alemán
					<strong>Gui Bonsiepe</strong>, exdocente de la Escuela de Ulm, llegó al país
					enviado por la OIT.
				</p>
			</div>
		</div>
	</article>

	<!-- Narrative: Evolution -->
	<article class="chapter">
		<span class="chapter-number">V</span>
		<h2>Tres versiones en 55 años</h2>

		<div class="versions-timeline">
			<div class="version-block">
				<div class="version-marker">
					<span class="version-years">1969–1997</span>
					<span class="version-duration">28 años</span>
				</div>
				<div class="version-logo">
					<img src="/images/logo/logo-1975-1997.webp" alt="Logo Metro de Santiago 1969-1997" />
				</div>
				<h3>Primera versión: El diseño original</h3>
				<p>
					Creado por Peter Himmel y Jaime Escudero, consiste en tres rombos de color rojo
					dispuestos dentro de un círculo, utilizando tipografía Helvetica. Esta versión
					acompañó al Metro desde su inauguración el <strong>15 de septiembre de 1975</strong>
					(Línea 1, tramo San Pablo–La Moneda) hasta la llegada de la Línea 5.
				</p>
				<ul class="version-features">
					<li>Tres rombos rojos en círculo</li>
					<li>Tipografía Helvetica</li>
					<li>Diseño geométrico puro</li>
					<li>Influencia del diseño suizo</li>
				</ul>
			</div>

			<div class="version-block">
				<div class="version-marker">
					<span class="version-years">1997–2011</span>
					<span class="version-duration">14 años</span>
				</div>
				<div class="version-logo">
					<img src="/images/logo/logo-1997-2011.webp" alt="Logo Metro de Santiago 1997-2011" />
				</div>
				<h3>Segunda versión: Refinamiento con la Línea 5</h3>
				<p>
					Con la inauguración de la Línea 5 el <strong>5 de abril de 1997</strong>, Metro
					renovó su imagen corporativa. Los diseñadores <strong>Sergio Mancilla, Mónica
					Ventura y Alejandro Orellana</strong> refinaron las proporciones y la legibilidad
					del logo.
				</p>
				<ul class="version-features">
					<li>Óvalo exterior agregado</li>
					<li>Texto "Metro de Santiago"</li>
					<li>Tipografía Métrika (propia)</li>
					<li>Simboliza "el cierre de un ciclo y la inserción de Metro en la comunidad"</li>
				</ul>
				<p class="version-note">
					El cambio de señalética comenzó en diciembre de 1997.
				</p>
			</div>

			<div class="version-block current">
				<div class="version-marker">
					<span class="version-years">2011–presente</span>
					<span class="version-duration">13+ años</span>
				</div>
				<div class="version-logo">
					<img src="/images/logo/logo-2011-pressent.svg" alt="Logo Metro de Santiago 2011-presente" />
				</div>
				<h3>Tercera versión: Actualización contemporánea</h3>
				<p>
					Realizada por el equipo de diseño interno de Metro, mantiene los elementos
					históricos —los tres rombos rojos y el texto "Metro de Santiago"— mientras
					actualiza la imagen para las necesidades contemporáneas.
				</p>
				<ul class="version-features">
					<li>Actualización contemporánea</li>
					<li>Tipografías Gotham y Helvetica</li>
					<li>Mantiene elementos históricos</li>
					<li>Adaptado para medios digitales</li>
				</ul>
			</div>
		</div>
	</article>

	<!-- Narrative: Identity -->
	<article class="chapter">
		<span class="chapter-number">VI</span>
		<h2>Identidad visual actual</h2>

		<p class="lead">
			Metro de Santiago cuenta con un Centro de Marca que proporciona acceso a los elementos
			de identidad visual.
		</p>

		<div class="identity-elements">
			<div class="identity-element">
				<div class="identity-visual">
					<div class="rombo-small"></div>
				</div>
				<span class="identity-label">Símbolo</span>
				<span class="identity-value">Tres rombos rojos</span>
			</div>

			<div class="identity-element">
				<div class="identity-visual">
					<div class="color-circle"></div>
				</div>
				<span class="identity-label">Color institucional</span>
				<span class="identity-value">#D60D27</span>
			</div>

			<div class="identity-element">
				<div class="identity-visual">
					<span class="font-sample">Aa</span>
				</div>
				<span class="identity-label">Tipografías</span>
				<span class="identity-value">Gotham + Helvetica</span>
			</div>

			<div class="identity-element">
				<div class="identity-visual">
					<svg viewBox="0 0 40 40" class="rule-icon">
						<path d="M 20 5 L 35 20 L 20 35 L 5 20 Z" fill="#d60d27" />
						<line x1="5" y1="38" x2="35" y2="38" stroke="#d60d27" stroke-width="2" />
						<line x1="20" y1="35" x2="20" y2="42" stroke="#d60d27" stroke-width="1.5" stroke-dasharray="2,2" />
					</svg>
				</div>
				<span class="identity-label">Regla fundamental</span>
				<span class="identity-value">El rombo nunca apunta abajo</span>
			</div>
		</div>

		<div class="rombos-note">
			<p>
				En 2023, Metro presentó a <strong>"Los Rombos"</strong> como personajes corporativos
				animados, con el mensaje: <em>"Estos amigos vienen a ayudarnos para que entre todos
				construyamos viajes más cercanos, más conectados, más seguros. Juntos, en la misma
				dirección"</em>.
			</p>
		</div>
	</article>

	<!-- Narrative: 50 Years -->
	<article class="chapter">
		<span class="chapter-number">VII</span>
		<h2>50 años de historia</h2>

		<div class="anniversary-logo">
			<img src="/images/logo/logo-50-anos.webp" alt="Logo 50 años Metro de Santiago" />
		</div>

		<p class="lead">
			En 2025, el Metro de Santiago celebró medio siglo de operación con intervenciones
			artísticas y exposiciones que homenajearon su identidad visual.
		</p>

		<div class="anniversary-highlights">
			<div class="anniversary-item">
				<span class="anniversary-icon">🧶</span>
				<h3>Intervención artística</h3>
				<p>
					Se recreó el logo con tejidos: tres rombos gigantes de <strong>15 metros de largo</strong>
					y 8 de ancho, confeccionados con 500 mantas de lana compuestas por
					<strong>8.500 rombos pequeños</strong> tejidos colaborativamente.
				</p>
			</div>

			<div class="anniversary-item">
				<span class="anniversary-icon">🎨</span>
				<h3>Exposición "En tránsito"</h3>
				<p>
					Entre noviembre y diciembre de 2025, la exposición <em>"En tránsito. El Metro
					a través del diseño"</em> en la estación Quinta Normal presentó material de
					archivo histórico —boletos, afiches, mapas, señalética y documentos gráficos—
					con una línea de tiempo de <strong>42 hitos fundamentales</strong>.
				</p>
			</div>
		</div>

		<div class="highlight-box centered">
			<p>
				"En casi medio siglo de operación hay elementos que ya forman parte de la cultura
				popular de la ciudad. Desde los inconfundibles rombos que indican el acceso a una
				estación..."
			</p>
			<cite>Especial 50 años Metro de Santiago</cite>
		</div>
	</article>

	<!-- Narrative: Los Tres Pastores -->
	<article class="chapter pastores-chapter">
		<span class="chapter-number">VIII</span>
		<h2>Los Tres Pastores</h2>
		<p class="chapter-subtitle">El cuento navideño secreto del Metro</p>

		<div class="book-cover">
			<img src="/images/portada-los-tres-pastores.jpeg" alt="Portada del libro Los Tres Pastores, 1974" />
			<span class="book-cover-caption">Portada original de "Los Tres Pastores", Navidad 1974</span>
		</div>

		<p class="lead">
			En diciembre de 1974, mientras los primeros trenes ya recorrían los túneles en pruebas
			y faltaban solo nueve meses para la inauguración oficial, Jaime Escudero y Juan Parrochia
			crearon un regalo especial para las familias del equipo.
		</p>

		<div class="story-context">
			<div class="context-item">
				<span class="context-date">Agosto 1974</span>
				<p>Pre-inauguración: primer viaje de un tren en los túneles</p>
			</div>
			<div class="context-item highlight">
				<span class="context-date">Diciembre 1974</span>
				<p>Creación de "Los Tres Pastores"</p>
			</div>
			<div class="context-item">
				<span class="context-date">Septiembre 1975</span>
				<p>Inauguración oficial del Metro</p>
			</div>
		</div>

		<p>
			<em>"Los Tres Pastores"</em> era un libro infantil navideño destinado a los hijos del
			personal del Metro. Pero contenía un secreto: una fascinante simbología oculta que
			solo entendían quienes conocían el proyecto por dentro.
		</p>

		<div class="pastores-reveal">
			<h3>Los personajes y su doble significado</h3>
			<p>
				Para los niños era simplemente un cuento navideño con tres pastores como protagonistas.
				Para los adultos del equipo, cada personaje representaba uno de los tres rombos:
			</p>

			<div class="pastores">
				<div class="pastor">
					<div class="pastor-visual">
						<div class="pastor-rombo" style="background: #d60d27;"></div>
					</div>
					<span class="pastor-name"><span style="color: #d60d27;">M</span>ezor</span>
					<span class="pastor-meaning">Metro</span>
					<span class="pastor-desc">El transporte subterráneo</span>
				</div>
				<div class="pastor">
					<div class="pastor-visual">
						<div class="pastor-rombo" style="background: #fab515;"></div>
					</div>
					<span class="pastor-name"><span style="color: #fab515;">B</span>uzor</span>
					<span class="pastor-meaning">Buses</span>
					<span class="pastor-desc">La circulación en superficie</span>
				</div>
				<div class="pastor">
					<div class="pastor-visual">
						<div class="pastor-rombo" style="background: #4a4845;"></div>
					</div>
					<span class="pastor-name"><span style="color: #4a4845;">V</span>izor</span>
					<span class="pastor-meaning">Vialidad</span>
					<span class="pastor-desc">La infraestructura vial</span>
				</div>
			</div>
		</div>

		<div class="highlight-box">
			<p>
				"Además, para los hijos del personal del Metro, junto a mi jefe, don Juan Parrochia,
				hicimos un hermoso libro infantil llamado 'Los Tres Pastores', en la navidad de 1974,
				lleno de simbología para los que conocían el tejemaneje interno en el Metro."
			</p>
			<cite>Jaime Escudero — Museo de la Historieta, 2004</cite>
		</div>

		<div class="book-mystery">
			<h3>Una pieza casi perdida</h3>
			<p>
				El libro es una pieza extremadamente rara. No existe versión digitalizada pública
				conocida. En 2004, cuando Escudero tenía 90 años, reveló su existencia en una
				entrevista y donó un ejemplar al <strong>Museo de la Historieta de Chile</strong>
				en el Barrio Yungay de Santiago.
			</p>
			<p>
				Es probable que otros ejemplares sobrevivan en colecciones privadas de familias
				de trabajadores del Metro de la época, o en los archivos históricos de la empresa.
			</p>
		</div>
	</article>

	<!-- Narrative: Conclusion -->
	<article class="chapter conclusion">
		<h2>Un patrimonio visual de Santiago</h2>

		<p class="lead">
			El logo de los tres rombos del Metro de Santiago representa un caso excepcional de
			continuidad en diseño de identidad corporativa: <strong>más de 55 años</strong>
			manteniendo esencialmente el mismo símbolo, con actualizaciones que respetan el
			concepto original.
		</p>

		<p>
			La visión de Peter Himmel y Jaime Escudero —interpretar el transporte urbano como
			un sistema integrado donde vialidad, buses y metro forman un todo conectado— resultó
			no solo estéticamente perdurable sino conceptualmente adelantada a su tiempo.
		</p>

		<p>
			El símbolo trascendió su función identificadora para convertirse en patrimonio visual
			de Santiago, un ícono que los santiaguinos reconocen instantáneamente y que ha
			acompañado el crecimiento de la red desde <strong>5 estaciones en 1975</strong> hasta
			las <strong>más de 140 actuales</strong>.
		</p>

		<div class="final-logo">
			<div class="final-rombo"></div>
			<div class="final-rombo"></div>
			<div class="final-rombo"></div>
		</div>
	</article>

	<!-- Sources -->
	<article class="chapter sources-chapter">
		<h2>Fuentes y referencias</h2>

		<div class="sources-grid">
			<div class="source-category">
				<h3>Fuentes oficiales</h3>
				<ul>
					<li><a href="https://www.metro.cl/centrodemarca/" target="_blank" rel="noopener">Metro de Santiago — Centro de Marca</a></li>
					<li><a href="https://www.metro.cl/especial50/" target="_blank" rel="noopener">Metro de Santiago — Especial 50 años</a></li>
					<li><a href="https://www.metro.cl/el-viaje/los-rombos" target="_blank" rel="noopener">Metro de Santiago — Los Rombos</a></li>
					<li><a href="https://www.metro.cl/gobierno-corporativo/historia" target="_blank" rel="noopener">Metro de Santiago — Historia</a></li>
				</ul>
			</div>

			<div class="source-category">
				<h3>Entrevistas y testimonios</h3>
				<ul>
					<li><a href="https://www.latercera.com/la-tercera-domingo/noticia/peter-himmel-arquitecto-del-metro-de-santiago-es-ilogico-destruir-lo-poco-que-tenemos/" target="_blank" rel="noopener">La Tercera — "Peter Himmel, arquitecto del Metro" (2022)</a></li>
					<li><a href="https://museodelahistorietadechile.wordpress.com/2014/06/12/jaime-escudero-sanhueza/" target="_blank" rel="noopener">Museo de la Historieta de Chile — Entrevista a Jaime Escudero (2004)</a></li>
					<li><a href="https://www.uchile.cl/noticias/119212/el-legado-de-juan-parrochia-beguin" target="_blank" rel="noopener">Universidad de Chile — "El legado de Juan Parrochia Beguin" (2016)</a></li>
				</ul>
			</div>

			<div class="source-category">
				<h3>Archivos históricos</h3>
				<ul>
					<li><a href="https://www.memoriachilena.gob.cl/602/w3-propertyvalue-175381.html" target="_blank" rel="noopener">Memoria Chilena — Jaime Escudero Sanhueza</a></li>
					<li><a href="https://www.memoriachilena.gob.cl/602/w3-article-63577.html" target="_blank" rel="noopener">Memoria Chilena — Afiche inauguración Metro 1975</a></li>
					<li><a href="https://repositorio.uchile.cl/handle/2250/139980" target="_blank" rel="noopener">Repositorio UChile — "Metro de Santiago: La historia de una red" (Rojas Luarte)</a></li>
				</ul>
			</div>

			<div class="source-category">
				<h3>Bibliografía</h3>
				<ul>
					<li>"El Gran Libro del Metro de Santiago" (2016) — Agencia Felicidad y Memoria Creativa. <span class="isbn">ISBN: 978-956-7880-00-3</span></li>
					<li>"HDGCH: Historia del diseño gráfico en Chile" (2004) — Pedro Álvarez Caselli, PUC</li>
					<li>"Metro de Santiago: La historia de una red que transformó la capital" — Rodolfo Felipe Rojas Luarte, Universidad de Chile</li>
				</ul>
			</div>
		</div>

		<p class="sources-note">
			La imagen de la portada de "Los Tres Pastores" proviene de la memoria de título
			de Rodolfo Felipe Rojas Luarte, disponible en el Repositorio de la Universidad de Chile.
		</p>
	</article>

	<!-- Footer -->
	<footer class="page-footer">
		<nav class="footer-nav">
			<a href="/">Volver al mapa</a>
		</nav>
	</footer>
</div>

<style>
	:global(body) {
		--ed-serif: 'Cormorant Garamond', Georgia, serif;
		--ed-sans: 'IBM Plex Sans', -apple-system, sans-serif;
	}

	.story-page {
		min-height: 100vh;
		background: #faf9f7;
		color: #1a1a1a;
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	.story-page.visible {
		opacity: 1;
	}

	/* Header */
	.page-header {
		position: sticky;
		top: 0;
		background: rgba(250, 249, 247, 0.95);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid #e8e5e1;
		z-index: 100;
	}

	.nav {
		max-width: 800px;
		margin: 0 auto;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.nav-back {
		font-family: var(--ed-sans);
		font-size: 0.8rem;
		font-weight: 500;
		color: #666;
		text-decoration: none;
	}

	.nav-back:hover {
		color: #d60d27;
	}

	.nav-title {
		font-family: var(--ed-serif);
		font-size: 1rem;
		font-weight: 500;
	}

	.nav-badge {
		font-family: var(--ed-sans);
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: white;
		background: #d60d27;
		padding: 0.25rem 0.6rem;
		border-radius: 4px;
	}

	/* Hero */
	.hero {
		max-width: 700px;
		margin: 0 auto;
		padding: 8rem 2rem 6rem;
		text-align: center;
	}

	.hero-overline {
		font-family: var(--ed-sans);
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #999;
		margin-bottom: 2rem;
	}

	.hero-title {
		font-family: var(--ed-serif);
		font-size: 4.5rem;
		font-weight: 400;
		line-height: 1;
		margin: 0 0 3rem;
	}

	.hero-title em {
		font-style: italic;
		color: #d60d27;
	}

	.hero-logo {
		margin: 3rem 0 4rem;
	}

	.hero-logo svg {
		width: 240px;
		height: auto;
	}

	.hero-intro {
		font-family: var(--ed-serif);
		font-size: 1.35rem;
		line-height: 1.7;
		color: #333;
	}

	.hero-intro strong {
		color: #1a1a1a;
	}

	/* Chapters */
	.chapter {
		max-width: 700px;
		margin: 0 auto;
		padding: 6rem 2rem;
		border-top: 1px solid #e8e5e1;
	}

	.chapter-number {
		display: block;
		font-family: var(--ed-serif);
		font-size: 3.5rem;
		font-weight: 400;
		color: #e8e5e1;
		margin-bottom: 1.5rem;
	}

	.chapter h2 {
		font-family: var(--ed-serif);
		font-size: 2.25rem;
		font-weight: 500;
		margin: 0 0 2.5rem;
		line-height: 1.2;
	}

	.chapter p {
		font-family: var(--ed-sans);
		font-size: 1.05rem;
		line-height: 1.8;
		color: #444;
		margin: 0 0 1.75rem;
	}

	.chapter p:last-child {
		margin-bottom: 0;
	}

	.chapter .lead {
		font-family: var(--ed-serif);
		font-size: 1.4rem;
		line-height: 1.6;
		color: #333;
		margin-bottom: 2.5rem;
	}

	.chapter strong {
		font-weight: 600;
		color: #1a1a1a;
	}

	.chapter em {
		font-style: italic;
	}

	/* Highlight Box */
	.highlight-box {
		background: #f5f4f2;
		padding: 2.5rem;
		border-radius: 8px;
		margin: 3rem 0;
	}

	.highlight-box.small {
		padding: 1.5rem;
		margin: 1.5rem 0 0;
	}

	.highlight-box.centered {
		text-align: center;
	}

	.highlight-box p {
		font-family: var(--ed-serif);
		font-size: 1.25rem;
		font-style: italic;
		line-height: 1.6;
		color: #333;
		margin: 0 0 1rem;
	}

	.highlight-box.small p {
		font-size: 1rem;
	}

	.highlight-box cite {
		display: block;
		font-family: var(--ed-sans);
		font-size: 0.8rem;
		font-style: normal;
		color: #888;
	}

	/* Meaning Visual */
	.meaning-visual {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		margin: 4rem 0;
		flex-wrap: wrap;
	}

	.meaning-item {
		text-align: center;
		flex: 1;
		min-width: 140px;
	}

	.rombo {
		width: 50px;
		height: 50px;
		transform: rotate(45deg);
		margin: 0 auto 1.5rem;
	}

	.meaning-item h3 {
		font-family: var(--ed-serif);
		font-size: 1.25rem;
		font-weight: 500;
		margin: 0 0 0.5rem;
	}

	.meaning-item p {
		font-family: var(--ed-sans);
		font-size: 0.85rem;
		color: #666;
		margin: 0;
		line-height: 1.5;
	}

	.meaning-connector {
		color: #e8e5e1;
		font-size: 0.75rem;
	}

	/* Creator Profiles */
	.creator-profiles {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin-top: 2rem;
	}

	.creator {
		background: white;
		border: 1px solid #e8e5e1;
		border-radius: 8px;
		padding: 2rem;
	}

	.creator.featured {
		border-color: #d60d27;
		border-width: 2px;
		padding: 2.5rem;
	}

	.creator-label {
		display: inline-block;
		font-family: var(--ed-sans);
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #d60d27;
		margin-bottom: 0.5rem;
	}

	.creator h3 {
		font-family: var(--ed-serif);
		font-size: 1.75rem;
		font-weight: 500;
		margin: 0 0 0.5rem;
	}

	.creator-dates {
		display: block;
		font-family: var(--ed-sans);
		font-size: 0.8rem;
		color: #888;
		margin-bottom: 1.5rem;
	}

	.creator p {
		margin: 0 0 1rem;
	}

	.creator p:last-of-type {
		margin-bottom: 0;
	}

	.creator-note {
		font-size: 0.9rem !important;
		font-style: italic;
		color: #666 !important;
		margin-top: 1.5rem !important;
	}

	.creator-achievements {
		display: grid;
		gap: 0.75rem;
		margin: 1.5rem 0;
		padding: 1.5rem;
		background: #f8f7f5;
		border-radius: 8px;
	}

	.achievement {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		font-family: var(--ed-sans);
		font-size: 0.9rem;
		color: #444;
		line-height: 1.5;
	}

	.achievement-icon {
		flex-shrink: 0;
		font-size: 1rem;
	}

	.awards-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.award {
		background: #f8f7f5;
		padding: 1rem;
		border-radius: 6px;
		text-align: center;
	}

	.award-year {
		display: block;
		font-family: var(--ed-serif);
		font-size: 1.5rem;
		font-weight: 500;
		color: #d60d27;
	}

	.award-name {
		display: block;
		font-family: var(--ed-sans);
		font-size: 0.8rem;
		font-weight: 500;
		color: #333;
		margin-top: 0.25rem;
	}

	.award-note {
		display: block;
		font-family: var(--ed-sans);
		font-size: 0.7rem;
		color: #888;
		font-style: italic;
		margin-top: 0.25rem;
	}

	/* Context Grid */
	.context-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin: 3rem 0;
	}

	.context-block {
		background: white;
		border: 1px solid #e8e5e1;
		border-radius: 8px;
		padding: 2rem;
	}

	.context-label {
		display: block;
		font-family: var(--ed-sans);
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #d60d27;
		margin-bottom: 0.5rem;
	}

	.context-block h3 {
		font-family: var(--ed-serif);
		font-size: 1.35rem;
		font-weight: 500;
		margin: 0 0 1rem;
	}

	.context-block p {
		font-family: var(--ed-sans);
		font-size: 0.95rem;
		line-height: 1.7;
		color: #555;
		margin: 0;
	}

	/* Versions Timeline */
	.versions-timeline {
		margin-top: 2rem;
	}

	.version-block {
		background: white;
		border: 1px solid #e8e5e1;
		border-radius: 8px;
		padding: 2.5rem;
		margin-bottom: 2rem;
	}

	.version-block.current {
		border-color: #d60d27;
		background: linear-gradient(to bottom, rgba(214, 13, 39, 0.02), white);
	}

	.version-marker {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.version-years {
		font-family: var(--ed-sans);
		font-size: 0.75rem;
		font-weight: 600;
		color: #d60d27;
		background: rgba(214, 13, 39, 0.1);
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
	}

	.version-duration {
		font-family: var(--ed-sans);
		font-size: 0.75rem;
		color: #999;
	}

	.version-logo {
		background: #f8f7f5;
		border-radius: 8px;
		padding: 2rem;
		margin: 1.5rem 0 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.version-logo img {
		max-width: 100%;
		max-height: 120px;
		width: auto;
		height: auto;
		object-fit: contain;
	}

	.version-block h3 {
		font-family: var(--ed-serif);
		font-size: 1.35rem;
		font-weight: 500;
		margin: 0 0 1.25rem;
	}

	.version-block p {
		font-family: var(--ed-sans);
		font-size: 0.95rem;
		line-height: 1.7;
		color: #555;
		margin: 0 0 1.25rem;
	}

	.version-features {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.version-features li {
		font-family: var(--ed-sans);
		font-size: 0.85rem;
		color: #666;
		padding-left: 1rem;
		position: relative;
	}

	.version-features li::before {
		content: '◆';
		position: absolute;
		left: 0;
		color: #d60d27;
		font-size: 0.5rem;
		top: 0.3rem;
	}

	.version-note {
		font-size: 0.85rem !important;
		font-style: italic;
		color: #888 !important;
		margin-top: 1rem !important;
		margin-bottom: 0 !important;
	}

	/* Identity Elements */
	.identity-elements {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		margin: 3rem 0;
	}

	.identity-element {
		background: white;
		border: 1px solid #e8e5e1;
		border-radius: 8px;
		padding: 2rem;
		text-align: center;
	}

	.identity-visual {
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.25rem;
	}

	.rombo-small {
		width: 35px;
		height: 35px;
		background: #d60d27;
		transform: rotate(45deg);
	}

	.color-circle {
		width: 45px;
		height: 45px;
		background: #d60d27;
		border-radius: 50%;
	}

	.font-sample {
		font-family: var(--ed-serif);
		font-size: 2.5rem;
		font-weight: 500;
		color: #333;
	}

	.rule-icon {
		width: 45px;
		height: 45px;
	}

	.identity-label {
		display: block;
		font-family: var(--ed-sans);
		font-size: 0.65rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #999;
		margin-bottom: 0.25rem;
	}

	.identity-value {
		font-family: var(--ed-sans);
		font-size: 0.9rem;
		font-weight: 500;
		color: #333;
	}

	.rombos-note {
		background: #f5f4f2;
		padding: 2rem;
		border-radius: 8px;
	}

	.rombos-note p {
		font-family: var(--ed-sans);
		font-size: 0.95rem;
		line-height: 1.7;
		color: #555;
		margin: 0;
		text-align: center;
	}

	/* Anniversary */
	.anniversary-logo {
		text-align: center;
		margin-bottom: 3rem;
	}

	.anniversary-logo img {
		display: block;
		margin: 0 auto;
		max-width: 200px;
		height: auto;
	}

	.anniversary-highlights {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin: 3rem 0;
	}

	.anniversary-item {
		background: white;
		border: 1px solid #e8e5e1;
		border-radius: 8px;
		padding: 2rem;
	}

	.anniversary-icon {
		font-size: 2rem;
		display: block;
		margin-bottom: 1rem;
	}

	.anniversary-item h3 {
		font-family: var(--ed-serif);
		font-size: 1.25rem;
		font-weight: 500;
		margin: 0 0 1rem;
	}

	.anniversary-item p {
		font-family: var(--ed-sans);
		font-size: 0.95rem;
		line-height: 1.7;
		color: #555;
		margin: 0;
	}

	/* Los Tres Pastores Chapter */
	.pastores-chapter {
		background: linear-gradient(180deg, #faf9f7, #f5f3f0);
	}

	.chapter-subtitle {
		font-family: var(--ed-serif);
		font-size: 1.1rem;
		font-style: italic;
		color: #888;
		margin: -1.5rem 0 2.5rem;
	}

	.story-context {
		display: flex;
		gap: 1rem;
		margin: 3rem 0;
		padding: 1.5rem;
		background: white;
		border-radius: 8px;
		border: 1px solid #e8e5e1;
	}

	.context-item {
		flex: 1;
		text-align: center;
		padding: 1rem;
		border-radius: 6px;
	}

	.context-item.highlight {
		background: rgba(214, 13, 39, 0.05);
		border: 1px dashed #d60d27;
	}

	.context-date {
		display: block;
		font-family: var(--ed-sans);
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #d60d27;
		margin-bottom: 0.5rem;
	}

	.context-item p {
		font-family: var(--ed-sans);
		font-size: 0.85rem;
		color: #555;
		margin: 0;
		line-height: 1.4;
	}

	.pastores-reveal {
		background: white;
		border: 1px solid #e8e5e1;
		border-radius: 12px;
		padding: 2.5rem;
		margin: 3rem 0;
	}

	.pastores-reveal h3 {
		font-family: var(--ed-serif);
		font-size: 1.25rem;
		font-weight: 500;
		margin: 0 0 1rem;
		text-align: center;
	}

	.pastores-reveal > p {
		font-family: var(--ed-sans);
		font-size: 0.95rem;
		color: #555;
		text-align: center;
		margin: 0 0 2rem;
	}

	.pastores {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.pastor {
		background: #faf9f7;
		border: 1px solid #e8e5e1;
		padding: 2rem 1.5rem;
		border-radius: 12px;
		flex: 1;
		min-width: 140px;
		max-width: 180px;
		text-align: center;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.pastor:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
	}

	.pastor-visual {
		margin-bottom: 1rem;
	}

	.pastor-rombo {
		width: 40px;
		height: 40px;
		transform: rotate(45deg);
		margin: 0 auto;
	}

	.pastor-name {
		display: block;
		font-family: var(--ed-serif);
		font-size: 1.5rem;
		font-weight: 500;
		margin-bottom: 0.25rem;
	}

	.pastor-name span {
		font-size: 1.75rem;
		font-weight: 600;
	}

	.pastor-meaning {
		display: block;
		font-family: var(--ed-sans);
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #999;
		margin-bottom: 0.5rem;
	}

	.pastor-desc {
		display: block;
		font-family: var(--ed-sans);
		font-size: 0.75rem;
		color: #777;
		line-height: 1.4;
	}

	.book-cover {
		text-align: center;
		margin-bottom: 3rem;
	}

	.book-cover img {
		display: block;
		margin: 0 auto;
		max-width: 280px;
		width: 100%;
		height: auto;
		border-radius: 8px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
	}

	.book-cover-caption {
		display: block;
		font-family: var(--ed-sans);
		font-size: 0.75rem;
		color: #888;
		margin-top: 1rem;
		font-style: italic;
	}

	.book-mystery {
		background: linear-gradient(135deg, rgba(154, 52, 136, 0.04), rgba(214, 13, 39, 0.04));
		border: 2px dashed #e8e5e1;
		border-radius: 12px;
		padding: 2rem;
		margin-top: 3rem;
	}

	.book-mystery h3 {
		font-family: var(--ed-serif);
		font-size: 1.15rem;
		font-weight: 500;
		margin: 0 0 1rem;
	}

	.book-mystery p {
		font-family: var(--ed-sans);
		font-size: 0.9rem;
		line-height: 1.7;
		color: #555;
		margin: 0 0 1rem;
	}

	.book-mystery p:last-child {
		margin-bottom: 0;
	}

	/* Conclusion */
	.chapter.conclusion {
		text-align: center;
		padding-bottom: 4rem;
	}

	.chapter.conclusion h2 {
		font-size: 2rem;
	}

	.chapter.conclusion .lead {
		font-size: 1.3rem;
	}

	.final-logo {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 4rem;
	}

	.final-rombo {
		width: 24px;
		height: 24px;
		background: #d60d27;
		transform: rotate(45deg);
	}

	/* Sources */
	.sources-chapter {
		background: #f5f4f2;
	}

	.sources-chapter h2 {
		font-size: 1.5rem !important;
		margin-bottom: 2rem;
	}

	.sources-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
	}

	.source-category {
		background: white;
		padding: 1.5rem;
		border-radius: 8px;
		border: 1px solid #e8e5e1;
	}

	.source-category h3 {
		font-family: var(--ed-serif);
		font-size: 1rem;
		font-weight: 500;
		margin: 0 0 1rem;
		color: #333;
	}

	.source-category ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.source-category li {
		font-family: var(--ed-sans);
		font-size: 0.8rem;
		line-height: 1.5;
		color: #555;
		padding: 0.5rem 0;
		border-bottom: 1px solid #f0eeec;
	}

	.source-category li:last-child {
		border-bottom: none;
	}

	.source-category a {
		color: #d60d27;
		text-decoration: none;
	}

	.source-category a:hover {
		text-decoration: underline;
	}

	.isbn {
		display: block;
		font-size: 0.7rem;
		color: #999;
		margin-top: 0.25rem;
	}

	.sources-note {
		font-family: var(--ed-sans);
		font-size: 0.8rem;
		color: #888;
		text-align: center;
		margin-top: 2rem;
		font-style: italic;
	}

	/* Footer */
	.page-footer {
		max-width: 700px;
		margin: 0 auto;
		padding: 3rem 2rem 4rem;
		text-align: center;
		border-top: 1px solid #e8e5e1;
	}

	.footer-nav a {
		font-family: var(--ed-sans);
		font-size: 0.85rem;
		font-weight: 500;
		color: #d60d27;
		text-decoration: none;
	}

	.footer-nav a:hover {
		text-decoration: underline;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero {
			padding: 5rem 1.5rem 4rem;
		}

		.hero-title {
			font-size: 3rem;
		}

		.hero-logo svg {
			width: 180px;
		}

		.chapter {
			padding: 4rem 1.5rem;
		}

		.chapter h2 {
			font-size: 1.75rem;
		}

		.chapter .lead {
			font-size: 1.2rem;
		}

		.meaning-visual {
			flex-direction: column;
			gap: 2rem;
		}

		.meaning-connector {
			display: none;
		}

		.context-grid {
			grid-template-columns: 1fr;
		}

		.version-features {
			grid-template-columns: 1fr;
		}

		.identity-elements {
			grid-template-columns: 1fr;
		}

		.pastores {
			flex-direction: column;
			align-items: center;
		}

		.pastor {
			max-width: 100%;
			width: 100%;
		}

		.awards-grid {
			grid-template-columns: 1fr;
		}

		.story-context {
			flex-direction: column;
		}

		.context-item {
			padding: 0.75rem;
		}

		.pastores-reveal {
			padding: 1.5rem;
		}

		.book-mystery {
			padding: 1.5rem;
		}

		.sources-grid {
			grid-template-columns: 1fr;
		}

		.book-cover img {
			max-width: 220px;
		}
	}
</style>
