<?php

 
header("Content-Type: text/html;charset=utf-8");

  $response = array();
  
$dbc = mysqli_connect($servername, $username, $pass, $db)or die("Bad Connect".mysqli_connect_error());

mysqli_query($dbc,"SET CHARACTER SET 'utf8'");
mysqli_query($dbc,"SET SESSION collation_connection ='utf8_unicode_ci'");

$result = $dbc->query("SELECT * FROM events") or die (mysql_error());

 
  if(mysqli_num_rows($result)>0)
  {
    
      $response["events"] = array();

      while( $row = @mysqli_fetch_array($result) ) 
      {
            
            $events = array();
 
 
      $events["id"] = $row["id"];
            $events["DateStart"] = $row["DateStart"];
            $events["DateFinish"] = $row["DateFinish"];
            $events["EventType"] = $row["EventType"];
            $events["Description"] = $row["Description"];
            $events["<pre></pre>"];
            $events["<p></p>"];

            array_push($response["events"], $events);
      }
      $response["success"] = 1;
echo json_encode($response);
  }else {

      $response["success"] = 0;
      $response["message"] = "No Events Found";

      echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }
    ?>
