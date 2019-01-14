<?php

  require_once '../ConnectionManager.php';

  $response = array();

  $db = ConnectionManager::getInstance();

  $result = mysql_query("SELECT * FROM scores") or die (mysql_error());

  if(mysql_num_rows($result)>0)
  {
      $response["scores"] = array();

      while($row = mysql_fetch_array($result))
      {
            $scores = array();
            $scores["id"] = $row["id"];
            $scores["ItemNumber"] = $row["ItemNumber"];
            $scores["SubNumber"] = $row["SubNumber"];
            $scores["TitleOfScore"] = $row["TitleOfScore"];
            $scores["InstrumentPart"] = $row["InstrumentsUsed"];
            $scores["<pre></pre>"];
            $scores["<p></p>"];
            array_push($response["scores"], $scores);
      }
      $response["success"] = 1;

      echo json_encode($response, JSON_UNESCAPED_UNICODE);
  }else {

      $response["success"] = 0;
      $response["message"] = "No Scores Found";

      echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }
    ?>
