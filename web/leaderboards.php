<?php include("include/head.php"); ?>
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
					if (isset($_GET["sortBy"])) {
						$sortBy = htmlspecialchars($_GET["sortBy"]);
						if (strlen($sortBy) > 100)
							header("location:home.php");

						include("include/connect.php");
						if ($sortBy == "score") {
							$sql = "SELECT who, score, (SELECT name FROM USERS WHERE USERS.id = SCORES.who ) as name FROM SCORES ORDER by score DESC LIMIT 10;";
							$result = mysqli_query($link, $sql);
							$i = 0;
							if (mysqli_num_rows($result) > 0) {
								// output data of each row
								while ($row = mysqli_fetch_assoc($result)) {
									$i += 1;
									echo "<tr><th scope='col'>" . $i . "</th> <th scope='col'> " . $row["name"] . " </th> <th> " . $row["score"] . " </th> </tr> ";
								}
							} else {
								echo "0 results";
							}
						} else if ($sortBy == "level") {
							$sql = "SELECT score, (SELECT name FROM USERS WHERE USERS.id = SCORES.who ) as name FROM SCORES ORDER by score;";
							$result = mysqli_query($link, $sql);

							$scoreArray = array();
							$whoArray = array();

							if (mysqli_num_rows($result) > 0) {
								// output data of each row

								while ($row = mysqli_fetch_assoc($result)) {
									$alreadyAdded = false;

									foreach ($whoArray as $val) {
										if ($val == $row["name"])
											$alreadyAdded = true;
									}
									if ($alreadyAdded == false) {
										array_push($whoArray, $row["name"]);
										array_push($scoreArray, $row["score"]);
									} else {
										foreach ($whoArray as $key => $val) {
											if ($val == $row["name"])
												$scoreArray[$key] += $row["score"];
										}
									}
								}

								//Bubble sort
								for ($mainIndex = 0; $mainIndex < count($scoreArray); $mainIndex += 1) {
									for ($toSortIndex = count($scoreArray) - 1; $toSortIndex > $mainIndex; $toSortIndex -= 1) {
										if ($scoreArray[$toSortIndex] > $scoreArray[$toSortIndex - 1]) {
											$tmp = $scoreArray[$toSortIndex];
											$scoreArray[$toSortIndex] = $scoreArray[$toSortIndex - 1];
											$scoreArray[$toSortIndex - 1] = $tmp;

											$tmp = $whoArray[$toSortIndex];
											$whoArray[$toSortIndex] = $whoArray[$toSortIndex - 1];
											$whoArray[$toSortIndex - 1] = $tmp;
										}
									}
								}


								$i = 0;
								foreach ($scoreArray as $key => $val) {
									if ($i > 10);
									echo "<tr><th scope='col'>" . $i . "</th> <th scope='col'> " . $whoArray[$key] . " </th> <th> " . $val . " </th> </tr> ";
									$i += 1;
								}
							} else {
								echo "0 results";
							}
						} else {
							header("location:home.php");
						}
					} else {
						header("location:home.php");
					}




					//$sql = "SELECT who, score, date FROM scores WHERE id = (SELECT name FROM users) ORDER by score DESC LIMIT 10";

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