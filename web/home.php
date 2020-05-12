<?php include("include/head.php"); ?>
<title>eniGame</title>
<style>
	body {
		height: 100%;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-areas: "navbar navbar"
			"sidebar content"
			"footer footer";
		grid-template-columns: 10% 90%;
	}

	nav {
		grid-area: navbar;
	}

	aside {
		grid-area: sidebar;
	}

	div.content {
		grid-area: content;
	}

	footer {
		grid-area: footer;
	}
</style>
<script src="include/three/three.js"></script>
<script src="include/three/OrbitControls.js"></script>
<script src="include/three/GLTFLoader.js"></script>
</head>

<body>
	<?php include("include/nav.php"); ?>
	<aside style="text-align:center;padding-top:20px;">
		<button type="button" id="cameraChange" class="btn btn-primary">Change Camera View</button>
	</aside>
	<main class="game" id="scene-container" style="width:99%">
		<script>
			
		</script>
	</main>
	<?php include("include/footer.php"); ?>
</body>

</html>