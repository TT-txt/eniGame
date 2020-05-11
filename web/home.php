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
</head>

<body>
	<?php include("include/nav.php"); ?>
	<aside>
		aside
	</aside>
	<main>
		test
	</main>
	<?php include("include/footer.php"); ?>
</body>

</html>