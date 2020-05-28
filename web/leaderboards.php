<?php include("include/head.php");?>
<title>eniGame ~ Leaderboards</title>

<style>
		main {
			height: 900px;
		}
</style>

</head>

<body>
	<?php include("include/nav.php"); ?>
	<main>
	<div class="container">
		<?php 
		include("include/connect.php");
		?>

		<table class="table table-hover mt-5">
		<thead class="thead-dark">
			<tr>
				<th scope="col" colspan="3">Leaderboards :</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<!--Nothing also to explain, we get the type-->
				<th scope="col">Rank</th>
				<th scope="col">Username</th>
				<th scope="col">Score</th>
			</tr>
			
				<?php 
				$sql = "SELECT who, score, (SELECT name FROM users as users WHERE users.id = scores.who ) as name FROM scores as scores ORDER by score DESC LIMIT 10";
				
				//$sql = "SELECT who, score, date FROM scores WHERE id = (SELECT name FROM users) ORDER by score DESC LIMIT 10";
				$result = mysqli_query($link, $sql);
				$i = 0;
				if (mysqli_num_rows($result) > 0) {
				// output data of each row
				while($row = mysqli_fetch_assoc($result)) {
					$i = $i + 1;
					echo "<tr><th scope='col'>" . $i . "</th> <th scope='col'> " . $row["name"]. " </th> <th> " . $row["score"]. " </th> </tr> ";
					}
				} 
				else {
					echo "0 results";
					}
				?>
				
			</tr>
			<tr>
				
			</tr>
		</tbody>
	</table>
	</div> 

	
	</main>
	<?php include("include/footer.php"); ?>
</body>

</html>