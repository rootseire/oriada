<?php

header("Content-Type: text/html;charset=utf-8");


  $response = array();
  
$dbc = mysqli_connect($servername, $username, $pass, $db)or die("Bad Connect".mysqli_connect_error());

mysqli_query($dbc,"SET CHARACTER SET 'utf8'");
mysqli_query($dbc,"SET SESSION collation_connection ='utf8_unicode_ci'");

$result = $dbc->query("SELECT ItemNumber, DateStart, DateFinish, Description, Address from letters  WHERE DateFinish IS NOT NULL  AND DateFinish != '0000-00-00' AND DateFinish < '1972-12-31' AND DateFinish > '1945-01-01' ORDER BY DateFinish DESC") or die (mysql_error());

//$result = mysql_query("SELECT ItemNumber, DateStart, DateFinish, Description, Address from letters ORDER BY DateFinish DESC") or die (mysql_error());

//SELECT ItemNumber, DateStart, DateEnd, Description, Address from letters  WHERE DateStart IS NOT NULL AND IsRange = '' AND DateStart > '1948-01-01' AND DateEnd < '1973-01-01'
    
//$result = mysql_query("SELECT * FROM letters ORDER BY DateStart ASC") or die (mysql_error());

  if(mysqli_num_rows($result)>0)
  {
    
      $response["letters"] = array();

      while( $row = @mysqli_fetch_array($result) ) 
      {
            
            $letters = array();

          //$response[] =  array("ItemNumber" => $row['ItemNumber'] , "DateStart" => $row['DateStart'], "DateEnd" => $row['DateEnd'], "Description" => $row['Description']);
          
            $letters["ItemNumber"] = $row["ItemNumber"];
            $letters["DateFinish"] = $row["DateFinish"];
            //$letters["DateEnd"] = $row["DateEnd"];
            $letters["Address"] = $row["Address"];
            $letters["Description"] = $row["Description"];
          
        //  $response = array("item"=>"response");
            //$response->add($letters);
            //$response[] = $letters;
          array_push($response["letters"], $letters);
      }
      //$response["success"] = 1;
      
      echo json_encode($response);
  }else {

      $response["success"] = 0;
      $response["message"] = "No Events Found";

      echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }
    ?>
